"use strict"; (async ({ window: win, document: doc }) => {
	if (doc.readyState !== "complete") {
		await new Promise((resolve) => {
			const callback = () => {
				if (doc.readyState === "complete") {
					doc.removeEventListener("readystatechange", callback);
					setTimeout(resolve, 500, null);
				}
			};
			doc.addEventListener("readystatechange", callback, { passive: true });
		});
	}

	const loc = win.location;
	const body = doc.body;

	const q = (new URLSearchParams(loc.search).get("q") || "").trim();
	if (q.length === 0) {
		loc.replace("/");
		return;
	}

	win.stop();
	win.focus();
	doc.title = q + " - NettleWeb Search";
	body.innerHTML = "<div class=\"gcse-search\"></div>";

	Object.defineProperty(win, "history", {
		value: Object.freeze(Object.setPrototypeOf({
			get state() {
				return null;
			},
			get length() {
				return 0;
			},
			get scrollRestoration() {
				return "auto";
			},
			go: () => void 0,
			back: () => void 0,
			forward: () => void 0,
			pushState: () => void 0,
			replaceState: () => void 0
		}, null)),
		writable: false,
		enumerable: true,
		configurable: false
	});

	const e = doc.createElement("script");
	e.type = "text/javascript";
	e.src = "https://cse.google.com/cse.js?cx=6505c81d738124627";
	e.async = true;
	e.defer = true;
	body.appendChild(e);
})(window);