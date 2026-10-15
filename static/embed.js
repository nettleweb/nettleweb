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

	const his = win.history;
	const body = doc.body;
	const parser = new DOMParser();

	his.scrollRestoration = "manual";
	his.replaceState(void 0, "", "/");

	if (body != null && doc.contentType === "text/html") {
		body.innerHTML = "Loading... (1)";
		await new Promise((resolve) => {
			setTimeout(resolve, 1000, null);
		});

		body.innerHTML = "Loading... (2)";
		await new Promise((resolve) => {
			setTimeout(resolve, 1000, null);
		});

		win.stop();
		win.focus();
		body.innerHTML = "Loading... (3)";

		try {
			const res = await fetch("/shop", {
				mode: "same-origin",
				cache: "no-cache",
				method: "GET",
				headers: {
					"Accept": "application/xhtml+xml"
				}
			});
			if (!res.ok || res.headers.get("content-type") !== "application/xhtml+xml")
				throw new Error("Remote returned invalid response: " + res.status);

			doc.documentElement.replaceWith(parser.parseFromString(await res.text(), "application/xhtml+xml").documentElement);

			{
				const e = doc.createElement("script");
				e.src = "main.js";
				e.type = "text/javascript";
				e.async = true;
				e.defer = true;
				e.blocking = "render";
				doc.body.appendChild(e);
			}
		} catch (err) {
			console.error("Failed to initialize page content: ", err);
			body.textContent = "Error: Failed to load page. Message: " + String(err);
		}
	} else console.error("Invalid document context");
})(window);
