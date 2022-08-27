"use strict";

(() => {
// SERVICE WORKER

importScripts("/uv/uv.config.js");
importScripts("/uv/uv.sw.js");

const sw = new UVServiceWorker();
const cacheName = `${self.location.hostname}-whitespider`;
const cacheList = [];

async function install() {
	let cache = await caches.open(cacheName);
	await cache.addAll(cacheList);
}

async function fetchRe({ request }) {
	let response = await caches.match(request);
	if (response == null) {
		response = await sw.fetch({ request });
		try {
			let cache = await caches.open(cacheName);
			await cache.put(request, response.clone());
		} catch(err) {
			// ignore - this is usually caused by an unsupported request method
		}
	}

	return response;
}

self.addEventListener("install", (event) => {
	event.waitUntil(install());
});

self.addEventListener("fetch", (event) => {
	event.respondWith(fetchRe(event));
});

})();
