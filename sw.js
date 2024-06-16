/// <reference lib="WebWorker" />
"use strict"; ((_) => {
	/**
	 * @type {ServiceWorkerGlobalScope}
	 */
	const self = _;
	const origin = self.location.origin;
	const cacheName = "167e1f07-b59a-4742-bb45-15cf3caabcce";
	const errorResponse = Response.error();

	/**
	 * 
	 * @param {Request} request 
	 * @returns {Promise<Response>}
	 */
	async function optFetch(request) {
		try {
			return await self.fetch(request);
		} catch (err) {
			return errorResponse;
		}
	}

	/**
	 * @param {FetchEvent} e 
	 * @returns {Promise<Response>}
	 */
	async function handleFetch(e) {
		const request = e.request;
		switch (request.method) {
			case "GET":
			case "HEAD":
				break;
			default:
				return await optFetch(request);
		}

		const url = new URL(request.url);
		switch (url.protocol) {
			case "http:":
			case "https:":
				break;
			default:
				return await optFetch(request);
		}

		if (url.origin === origin && url.pathname === "/manifest.json") {
			return await optFetch(url, {
				body: null,
				mode: "same-origin",
				cache: "no-cache",
				method: request.method,
				headers: request.headers
			});
		}

		const res = await caches.match(request, { cacheName }) || await e.preloadResponse || await optFetch(request);
		if (origin !== "http://localhost:8000") {
			try {
				await (await caches.open(cacheName)).put(request, res.clone());
			} catch (err) {
				// ignore
			}
		}
		return res;
	}

	/**
	 * @param {ExtendableMessageEvent} e 
	 */
	async function handleMessage(e) {
	}

	/**
	 * @param {ExtendableEvent} e 
	 */
	async function handleInstall(e) {
		const cache = await caches.open(cacheName);
		await cache.addAll(["manifest.json", "sw.js",]);
	}

	/**
	 * @param {ExtendableEvent} e 
	 */
	async function handleActivate(e) {
		await self.clients.claim();
		for (const k of await caches.keys()) {
			if (k != cacheName)
				await caches.delete(k);
		}
	}

	async function handlePaymentRequest(e) {
		let resolve, reject;
		e.respondWith(new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		}));

		/**
		 * @type {WindowClient | null}
		 */
		const client = await e.openWindow("/auth.html?url=" + encodeURIComponent(e.methodData[0].data[0]));
		if (client == null || client.type !== "window") {
			reject("Error: Failed to open payment window");
			return;
		}
		client.postMessage("dummy");
	}

	self.addEventListener("fetch", (e) => e.respondWith(handleFetch(e)), { passive: true });
	self.addEventListener("message", (e) => e.waitUntil(handleMessage(e)), { passive: true });
	self.addEventListener("install", (e) => e.waitUntil(handleInstall(e)), { passive: true });
	self.addEventListener("activate", (e) => e.waitUntil(handleActivate(e)), { passive: true });
	self.addEventListener("canmakepayment", (e) => e.respondWith(Promise.resolve(true)), { passive: true });
	self.addEventListener("paymentrequest", (e) => e.waitUntil(handlePaymentRequest(e)), { passive: true });
})(self);
