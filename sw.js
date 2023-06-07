/// <reference lib="WebWorker" />
"use strict";

((_) => {
	/**
	 * @type {ServiceWorkerGlobalScope}
	 */
	const self = _;

	const cacheName = "7f00c2e9-9338-4f9d-959c-6b6fbb87f8fb";
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
					switch (response.type) {
						case "cors":
						case "basic":
						case "default":
							if (!response.ok) {
								// error responses are not cached and only status code is passed
								return new Response(void 0, { status: response.status });
							}
							break;
						default:
							break;
					}

					if (hostname !== "localhost" && url.pathname !== "/socket.io/") {
						const cache = await caches.open(cacheName);
						await cache.put(request, response.clone());
					}
					return response;
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