"use strict";

(() => {
importScripts("/uv/uv.sw.js");
importScripts("/app.js");

let sw = new UVServiceWorker(__uv$config);
let cacheName =  new URL(location).hostname + app.id + app.version;

async function install() {
	let cache = await caches.open(cacheName);
	await cache.addAll(app.fileList);
}

async function _fetch({ request }) {
	request.request = request;
	if (request.url.startsWith(self.location.origin + __uv$config.prefix)) {
		return await sw.fetch(request);
	} else {
		let response = await caches.match(request);
		if (response != null)
			return response;
		else {
			response = await fetch(request);
			let cache = await caches.open(cacheName);
			cache.put(request, response.clone());
			return response;
		}
	}
}

self.addEventListener("install", (event) => {
	event.waitUntil(install());
});

self.addEventListener("update", (event) => {
	event.waitUntil(install());
});

self.addEventListener("fetch", (event) => {
	event.respondWith(_fetch(event));
});

})();
