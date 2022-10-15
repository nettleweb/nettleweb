
self.app = {
	debug: true,
	cacheName: "whitespider",
	cacheVersion: "0.4.2",
	cacheList: [],
	headers: {
		// cross orgin isolation disabled due to issues with Firebase API

		// "Cross-Origin-Embedder-Policy": "require-corp",
		// "Cross-Origin-Opener-Policy": "same-origin",
		"Referrer-Policy": "no-referrer",
		"X-Content-Type-Options": "nosniff"
	}
};
