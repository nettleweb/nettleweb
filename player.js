"use strict"; (async ({ window: win, document: doc }) => {
	await new Promise(resolve => {
		const timer = setInterval(() => {
			if (doc.readyState === "complete") {
				clearInterval(timer);
				resolve();
			}
		}, 50);
	});

	const opt = new URLSearchParams(win.location.search);
	const url = opt.get("url") || "/";
	const bios = opt.get("bios") || "";

	win.stop();
	win.focus();

	if (win === (win.parent || win)) {
		const e = doc.createElement("embed");
		e.type = "text/plain";
		e.width = "1024";
		e.height = "768";
		e.src = url;
		doc.body.appendChild(e);

		win.history.replaceState(void 0, "", "/");
		return;
	}

	if (url === "/")
		win.history.replaceState(void 0, "", "/");

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
				const rp = win.RufflePlayer;
				rp.config = Object.create(null);
				const frame = rp.newest().createPlayer();
				doc.body.appendChild(frame);
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
				await loadJS("lib/jsdos/js-dos.js");
				const frame = doc.createElement("div");
				doc.body.appendChild(frame);
				win.emulators.pathPrefix = "/lib/jsdos/";
				win.Dos(frame).run(url);
			}
			break;
		case "emu":
			{
				await loadJS("lib/emulatorjs/emulator.min.js");
				doc.body.appendChild(doc.createElement("div"));
				new win.EmulatorJS("body>div", {
					system: opt.get("core") || "",
					gameUrl: url,
					biosUrl: bios,
					dataPath: "/lib/emulatorjs/",
					gameName: "NettleWeb",
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
				doc.body.appendChild(frame);
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
