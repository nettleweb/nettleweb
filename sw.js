"use strict";

(() => {
// SERVICE WORKER

importScripts("/uv/uv.config.js");
importScripts("/uv/uv.sw.js");

const sw = new UVServiceWorker();
const cacheName =  self.location.hostname + "-" + "whitespider";

async function fetchRe({ request }) {
	request.request = request;
	if (request.url.startsWith(self.location.origin + __uv$config.prefix))
		return await sw.fetch(request);

	let response = await caches.match(request);
	if (response == null) {
		response = await fetch(request);
		(await caches.open(cacheName)).put(request, response.clone());
	}

	return response;
}

self.addEventListener("fetch", (event) => {
	event.respondWith(fetchRe(event));
});

})();
