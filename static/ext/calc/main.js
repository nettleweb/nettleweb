"use strict"; (async ({ window: win, document: doc }) => {
	if (doc.readyState !== "complete") {
		await new Promise((resolve) => {
			const callback = () => {
				if (doc.readyState === "complete") {
					doc.removeEventListener("readystatechange", callback);
					setTimeout(resolve, 1000, null);
				}
			};
			doc.addEventListener("readystatechange", callback, { passive: true });
		});
	}

	const body = doc.body;

	win.stop();
	win.focus();
	body.innerHTML = "Loading... (1)";

	const e = doc.createElement("script");
	e.type = "text/javascript";
	e.src = "calculator.js";
	e.async = true;
	e.defer = true;

	e.onload = () => {
		const e = doc.createElement("div");
		body.innerHTML = "";
		body.appendChild(e);
		win.Desmos.GraphingCalculator(e);
	};

	body.appendChild(e);
})(window);