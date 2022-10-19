"use strict";

(() => {
importScripts("/uv/uv.sw.js");
importScripts("/app.js");

const cacheName =  `${self.location.hostname}-${app.cacheName}-${app.cacheVersion}`;
const sw = new UVServiceWorker();

async function install() {
	const cache = await caches.open(cacheName);
	await cache.addAll(app.cacheList);
}

/**
 * @param {Request} request 
 * @param {Response} response 
 */
async function cache(request, response) {
	try {
		const cache = await caches.open(cacheName);
		await cache.put(request, response.clone());
	} catch(err) {
		// ignore - this is usually caused by an unsupported request method
	}
}

/**
 * @param {Request} request 
 */
async function fetchRe(request) {
	// lookup from caches first
	let response = await caches.match(request);
	if (response == null) {
		// if null, fetch from uv service worker
		response = await sw.fetch(request);
		if (response == null) {
			// fetch as normal
			response = await fetch(request);

			// cross-origin response
			if (response.status == 0)
				return response; 
		}
		// add response to caches
		await cache(request, response);
	}

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: (() => {
			let head = new Headers(response.headers);
			for (let e of Object.entries(app.headers))
				head.set(e[0], e[1]);
			return head;
		})()
	});
}

async function removeOldCaches() {
	for (let k of await caches.keys()) {
		if (k != cacheName)
			await caches.delete(k);
	}
}

self.addEventListener("install", (event) => {
	event.waitUntil(install());
});

self.addEventListener("fetch", (event) => {
	event.respondWith(fetchRe(event.request));
});

self.addEventListener("activate", (event) => {
	event.waitUntil(removeOldCaches());
});

})();