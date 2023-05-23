/// <reference lib="WebWorker" />
"use strict";

((_) => {
	/**
	 * @type {ServiceWorkerGlobalScope}
	 */
	const self = _;

	const cacheName = "582a8aa6-0e82-417c-a5ce-d948ec881746";
	const hostname = self.location.hostname;

	async function handleInstall() {
		const cache = await caches.open(cacheName);
		await cache.addAll(["sw.js", "manifest.json"]);
	}

	/**
	 * @param {Request} request 
	 */
	async function handleFetch(request) {
		const cached = await caches.match(request, { cacheName });
		if (cached != null) {
			return cached;
		}

		try {
			const response = await self.fetch(request);
			if (hostname !== "localhost") {
				const cache = await caches.open(cacheName);
				await cache.put(request, response.clone());
			}
			return response;
		} catch (err) {
			return Response.error();
		}
	}

	/**
	 * @param {ExtendableMessageEvent} e 
	 */
	async function handleMessage(e) {
	}

	async function handleActivate() {
		for (const k of await caches.keys()) {
			if (k != cacheName)
				await caches.delete(k);
		}
		await self.clients.claim();
	}

	self.addEventListener("install", (e) => e.waitUntil(handleInstall()), { passive: true });
	self.addEventListener("fetch", (e) => e.respondWith(handleFetch(e.request)), { passive: true });
	self.addEventListener("message", (e) => e.waitUntil(handleMessage(e)), { passive: true });
	self.addEventListener("activate", (e) => e.waitUntil(handleActivate()), { passive: true });
})(self);