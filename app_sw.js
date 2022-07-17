"use strict";

const prefix = "whitespider";
const version = "1.0";
const fileList = [];
const cacheName = prefix + "-" + self.registration.scope + "-" + version;

let cache;

async function getCache() {
	if (cache == null)
		cache = await caches.open(cacheName)
	return cache;
}

async function install() {
	let cache = await getCache();
	cache.addAll(fileList);
}

async function update() {
}

async function fetch(request) {
	let cache = await getCache();
	let response = await cache.match(request);
	if (response != null)
		return response;
	else return await fetch(request);
}

self.addEventListener("install", (e) => {
	e.waitUntil(install());
}, true);

self.addEventListener("update", (e) => {
	e.waitUntil(update());
}, true);

self.addEventListener("fetch", (e) => {
	e.respondWith(fetch(e.request));
}, true);
