importScripts("/uv/uv.config.js");
importScripts("/uv/uv.bundle.js");

// This file has been modified from original
// Original version: https://github.com/titaniumnetwork-development/Ultraviolet/blob/main/src/uv.sw.js

"use strict";

(() => {

const headers = {
	csp: [
		'cross-origin-embedder-policy',
		'cross-origin-opener-policy',
		'cross-origin-resource-policy',
		'content-security-policy',
		'content-security-policy-report-only',
		'expect-ct',
		'feature-policy',
		'origin-isolation',
		'strict-transport-security',
		'upgrade-insecure-requests',
		'x-content-type-options',
		'x-download-options',
		'x-frame-options',
		'x-permitted-cross-domain-policies',
		'x-powered-by',
		'x-xss-protection'
	],
	forward: [
		'accept-encoding',
		'connection',
		'content-length'
	]
};

const method = {
	empty: [
		'GET',
		'HEAD'
	]
};

const statusCode = {
	empty: [
		204,
		304
	]
};

const browser = Ultraviolet.Bowser.getParser(self.navigator.userAgent).getBrowserName();
if (browser === 'Firefox') {
	headers.forward.push('user-agent');
	headers.forward.push('content-type');
}

const location = new URL(self.location.href);

/**
 * @param {Response} response 
 */
function getBarerResponse(response) {
	// copy headers
	const headers = {};
	const raw = JSON.parse(response.headers.get('x-bare-headers'));
	for (const key in raw)
		headers[key.toLowerCase()] = raw[key];

	// get status
	const status = parseInt(response.headers.get('x-bare-status'));
	const statusText = response.headers.get('x-bare-status-text');

	return {
		headers,
		status: status,
		statusText: statusText,
		body: statusCode.empty.includes(status) ? null : response.body
	};
}

class UVServiceWorker {
	constructor(config = __uv$config) {
		this.address = new URL(config.bare);
		this.config = config;
		this.prefix = location.origin + config.prefix;
		this.browser = browser;
		this.headers = headers;
		this.method = method;
		this.statusCode = statusCode;
	}

	/**
	 * @param {Request} request
	 */
	async fetch(request) {
		if (!request.url.startsWith(this.prefix))
			// ignore
			return null;

		const ultraviolet = new Ultraviolet(this.config);
		const db = await ultraviolet.cookie.db();

		ultraviolet.meta.origin = location.origin;
		ultraviolet.meta.base = ultraviolet.meta.url = new URL(ultraviolet.sourceUrl(request.url));

		const requestCtx = new RequestContext(
			request,
			this,
			ultraviolet,
			method.empty.includes(request.method.toUpperCase()) ? null : await request.blob()
		);

		if (ultraviolet.meta.url.protocol === 'blob:') {
			requestCtx.blob = true;
			requestCtx.base = requestCtx.url = new URL(requestCtx.url.pathname);
		};

		if (request.referrer && request.referrer.startsWith(location.origin)) {
			const referer = new URL(ultraviolet.sourceUrl(request.referrer));

			if (requestCtx.headers.origin || ultraviolet.meta.url.origin !== referer.origin && request.mode === 'cors') {
				requestCtx.headers.origin = referer.origin;
			};

			requestCtx.headers.referer = referer.href;
		};

		const cookies = await ultraviolet.cookie.getCookies(db) || [];
		const cookieStr = ultraviolet.cookie.serialize(cookies, ultraviolet.meta, false);

		if (this.browser === 'Firefox' && !(request.destination === 'iframe' || request.destination === 'document')) {
			requestCtx.forward.shift();
		};

		if (cookieStr) requestCtx.headers.cookie = cookieStr;
		requestCtx.headers.Host = requestCtx.url.host;

		const response = await fetch(requestCtx.send);

		if (response.status === 500) {
			return Promise.reject('');
		};

		const responseCtx = new ResponseContext(requestCtx, response);

		for (const name of this.headers.csp) {
			if (responseCtx.headers[name]) delete responseCtx.headers[name];
		};

		if (responseCtx.headers.location) {
			responseCtx.headers.location = ultraviolet.rewriteUrl(responseCtx.headers.location);
		};

		if (responseCtx.headers['set-cookie']) {
			Promise.resolve(ultraviolet.cookie.setCookies(responseCtx.headers['set-cookie'], db, ultraviolet.meta)).then(() => {
				self.clients.matchAll().then(function (clients) {
					clients.forEach(function (client) {
						client.postMessage({
							msg: 'updateCookies',
							url: ultraviolet.meta.url.href,
						});
					});
				});
			});
			delete responseCtx.headers['set-cookie'];
		};

		if (responseCtx.body) {
			switch (request.destination) {
				case 'script':
				case 'worker':
					responseCtx.body = `if (!self.__uv && self.importScripts) importScripts('${__uv$config.bundle}', '${__uv$config.config}', '${__uv$config.handler}');\n`;
					responseCtx.body += ultraviolet.js.rewrite(
						await response.text()
					);
					break;
				case 'style':
					responseCtx.body = ultraviolet.rewriteCSS(
						await response.text()
					);
					break;
				case 'iframe':
				case 'document':
					if (isHtml(ultraviolet.meta.url, (responseCtx.headers['content-type'] || ''))) {
						responseCtx.body = ultraviolet.rewriteHtml(
							await response.text(),
							{
								document: true,
								injectHead: ultraviolet.createHtmlInject(
									this.config.handler,
									this.config.bundle,
									this.config.config,
									ultraviolet.cookie.serialize(cookies, ultraviolet.meta, true),
									request.referrer
								)
							}
						);
					};
			};
		};

		if (requestCtx.headers.accept === 'text/event-stream') {
			responseCtx.headers['content-type'] = 'text/event-stream';
		};

		return new Response(responseCtx.body, {
			headers: responseCtx.headers,
			status: responseCtx.status,
			statusText: responseCtx.statusText,
		});
	}
}

self.UVServiceWorker = UVServiceWorker;


class ResponseContext {
	/**
	 * @param {RequestContext} request 
	 * @param {Response} response 
	 */
	constructor(request, response) {
		const { headers, status, statusText, body } = !request.blob ? getBarerResponse(response) : {
			status: response.status,
			statusText: response.statusText,
			headers: Object.fromEntries([...response.headers.entries()]),
			body: response.body,
		};
		this.request = request;
		this.raw = response;
		this.ultraviolet = request.ultraviolet;
		this.headers = headers;
		this.status = status;
		this.statusText = statusText;
		this.body = body;
	}

	get url() {
		return this.request.url;
	}

	get base() {
		return this.request.base;
	}

	set base(val) {
		this.request.base = val;
	}
}

class RequestContext {
	/**
	 * @param {Request} request 
	 * @param {UVServiceWorker} worker 
	 * @param {*} ultraviolet
	 * @param {*} body
	 */
	constructor(request, worker, ultraviolet, body = null) {
		this.ultraviolet = ultraviolet;
		this.request = request;
		this.headers = Object.fromEntries([...request.headers.entries()]);
		this.method = request.method;
		this.forward = [...worker.headers.forward];
		this.address = worker.address;
		this.body = body;
		this.redirect = request.redirect;
		this.credentials = 'omit';
		this.mode = request.mode;
		this.blob = false;
	}

	get send() {
		return new Request((!this.blob ? this.address.href + 'v1/' : 'blob:' + location.origin + this.url.pathname), {
			method: this.method,
			headers: {
				'x-bare-protocol': this.url.protocol,
				'x-bare-host': this.url.hostname,
				'x-bare-path': this.url.pathname + this.url.search,
				'x-bare-port': this.url.port || (this.url.protocol === 'https:' ? '443' : '80'),
				'x-bare-headers': JSON.stringify(this.headers),
				'x-bare-forward-headers': JSON.stringify(this.forward),
			},
			redirect: this.redirect,
			credentials: this.credentials,
			mode: "cors",
			body: this.body
		});
	}

	get url() {
		return this.ultraviolet.meta.url;
	}

	set url(val) {
		this.ultraviolet.meta.url = val;
	}

	get base() {
		return this.ultraviolet.meta.base;
	}

	set base(val) {
		this.ultraviolet.meta.base = val;
	}
}

/**
 * @param {URL} url 
 * @param {string} contentType 
 */
function isHtml(url, contentType) {
	return (Ultraviolet.mime.contentType((contentType || url.pathname)) || 'text/html').split(';')[0] === 'text/html';
}

})();