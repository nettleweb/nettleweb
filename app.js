
self.app = {
	debug: true,
	cacheName: "whitespider",
	cacheVersion: "1.0.0-beta3",
	cacheList: [],
	headers: {
		// cross orgin isolation disabled due to issues with Firebase API

		// "Cross-Origin-Embedder-Policy": "require-corp",
		// "Cross-Origin-Opener-Policy": "same-origin",
		"Referrer-Policy": "no-referrer",
		"X-Content-Type-Options": "nosniff"
	}
};
