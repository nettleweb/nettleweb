/// <reference lib="WebWorker" />
((_) => {
	"use strict";

	/**
	 * @type {ServiceWorkerGlobalScope}
	 */
	const self = _;
	const hostname = self.location.hostname;
	const cacheName = "167e1f07-b59a-4742-bb45-15cf3caabcce";

	/**
	 * @param {FetchEvent} e 
	 * @returns {Promise<Response>}
	 */
	async function handleFetch(e) {
		const request = e.request;
		const url = new URL(request.url);

		switch (url.protocol) {
			case "http:":
			case "https:":
				break;
			default:
				return await self.fetch(request);
		}

		switch (request.method) {
			case "GET":
			case "HEAD":
				break;
			default:
				return await self.fetch(request);
		}

		const cached = await caches.match(request, { cacheName });
		if (cached != null)
			return cached;

		const response = await e.preloadResponse || await self.fetch(request);
		if (hostname !== "localhost") {
			const cache = await caches.open(cacheName);
			await cache.put(request, response.clone());
		}
		return response;
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
		await cache.addAll(["sw.js", "manifest.json"]);
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

		const mfReq = new Request("/manifest.json", {
			cache: "no-cache",
			method: "GET",
			headers: {
				"Accept": "application/json"
			}
		});

		const oldMf = await caches.match(mfReq, { cacheName });
		const newMf = await self.fetch(mfReq);
		if (!newMf.ok) {
			console.error("Failed to fetch manifest.");
			return;
		}

		if (oldMf != null) {
			const oldVersion = (await oldMf.json()).version;
			const newVersion = (await newMf.clone().json()).version;

			if (oldVersion !== newVersion) {
				await caches.delete(cacheName);
				await (await caches.open(cacheName)).put(mfReq, newMf);
			}
		} else await (await caches.open(cacheName)).put(mfReq, newMf);
	}

	self.addEventListener("fetch", (e) => e.respondWith(handleFetch(e)), { passive: true });
	self.addEventListener("message", (e) => e.waitUntil(handleMessage(e)), { passive: true });
	self.addEventListener("install", (e) => e.waitUntil(handleInstall(e)), { passive: true });
	self.addEventListener("activate", (e) => e.waitUntil(handleActivate(e)), { passive: true });
})(self);