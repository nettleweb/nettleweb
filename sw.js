"use strict";

(() => {
importScripts("/uv/uv.sw.js");

let sw = new UVServiceWorker();
self.addEventListener('fetch', event => event.respondWith(sw.fetch(event)));

})();
