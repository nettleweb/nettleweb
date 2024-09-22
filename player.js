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

	const opt = new URLSearchParams(win.location.search);
	const url = opt.get("url") || "/";
	const bios = opt.get("bios") || "";
	const name = opt.get("name") || "";

	win.stop();
	win.focus();
	his.scrollRestoration = "manual";
	his.replaceState(void 0, "", "/");
	body.textContent = "Loading... (1)";

	if (name.length > 0)
		doc.title = name + " - NettleWeb";

	/**
	 * @param {string} url 
	 */
	function loadJS(url) {
		return new Promise((resolve, reject) => {
			const elem = doc.createElement("script");
			elem.type = "text/javascript";
			elem.src = url;
			elem.async = true;
			elem.defer = true;
			elem.onload = resolve;
			elem.onerror = reject;
			doc.body.appendChild(elem);
		});
	}

	switch (opt.get("type") || "") {
		case "flash":
			{
				await loadJS("/lib/ruffle/ruffle.js");
				const frame = win.RufflePlayer.newest().createPlayer();
				body.innerHTML = "";
				body.appendChild(frame);
				await frame.load({
					url: url,
					wmode: "opaque",
					scale: "showAll",
					quality: "best",
					autoplay: "auto",
					logLevel: "warn",
					letterbox: "on",
					openUrlMode: "confirm",
					upgradeToHttps: true,
					warnOnUnsupportedContent: true
				});
			}
			break;
		case "dos":
			{
				await loadJS("/lib/jsdos/js-dos.js");
				const frame = doc.createElement("div");
				body.innerHTML = "";
				body.appendChild(frame);
				win.Dos(frame, {
					url: url,
					theme: "light",
					noCloud: true,
					noCursor: true,
					autoStart: true,
					pathPrefix: "/lib/jsdos/emulators/",
					workerThread: true,
					mouseCapture: true
				});
			}
			break;
		case "emu":
			{
				await loadJS("/lib/emulatorjs/emulator.min.js");
				body.innerHTML = "";
				body.appendChild(doc.createElement("div"));
				new win.EmulatorJS("body>div", {
					system: opt.get("core") || "",
					gameUrl: url,
					biosUrl: bios,
					dataPath: "/lib/emulatorjs/",
					gameName: name,
					startOnLoad: true
				});
			}
			break;
		default:
			{
				const frame = doc.createElement("embed");
				frame.type = "text/plain";
				frame.width = "1024";
				frame.height = "768";
				frame.src = url;
				body.innerHTML = "";
				body.appendChild(frame);
			}
			break;
	}

	setTimeout(() => {
		win.focus();

		if (url.startsWith("blob:"))
			URL.revokeObjectURL(url);
		if (bios.startsWith("blob:"))
			URL.revokeObjectURL(bios);
	}, 5000);
})(window);
