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

		const url = new URL(request.url);
		switch (url.protocol) {
			case "http:":
			case "https:":
				try {
					const response = await self.fetch(request);
					if (hostname !== "localhost" && url.pathname !== "/socket.io/") {
						const cache = await caches.open(cacheName);
						await cache.put(request, response);
					}

					switch (response.type) {
						case "cors":
						case "basic":
						case "default":
							return new Response(response.body, {
								status: response.status,
								statusText: response.statusText,
								headers: response.headers
							});
						default:
							return response;
					}
				} catch (err) {
					console.error(err);
					return Response.error();
				}
			case "data:":
			case "blob:":
				return await self.fetch(request);
			default:
				console.error("Aborted");
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