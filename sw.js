"use strict";

(() => {
importScripts("/app.js");

const cacheName = `${location.hostname}-${app.cacheName}-${app.cacheVersion}`;

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
	let response = await caches.match(request, { cacheName });
	if (response == null) {
		response = await fetch(request);
		if (response.status == 0)
			return response; // cross origin responses

		await cache(request, response);
	}

	const headers = new Headers(response.headers);
	const head = app.headers;
	for (let h in head) {
		headers.set(h, head[h]);
	}

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
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
