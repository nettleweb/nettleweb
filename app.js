const app = {
	debug: true,
	cacheName: "whitespider",
	cacheVersion: "0.2.0",
	cacheList: [],
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET",
		"Access-Control-Allow-Credentials": "true",
		//"Cross-Origin-Embedder-Policy": "require-corp",
		//"Cross-Origin-Opener-Policy": "same-origin",
		"Referrer-Policy": "origin-when-cross-origin",
		"X-Content-Type-Options": "nosniff",
		//"X-Frame-Options": "SAMEORIGIN"
	}
};

export { app };
