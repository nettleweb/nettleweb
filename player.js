"use strict"; (async () => {
	await new Promise(resolve => {
		const timer = setInterval(() => {
			if (document.readyState === "complete") {
				clearInterval(timer);
				resolve();
			}
		}, 50);
	});

	const options = new URLSearchParams(window.location.search);
	const url = options.get("url") || "/";
	const name = options.get("name") || "";
	const bios = options.get("bios") || "";

	window.stop();
	window.focus();

	if (url === "/")
		window.history.replaceState(void 0, "", "/");
	if (name.length > 0)
		document.title = name + " - WhiteSpider";

	/**
	 * @param {string} url 
	 */
	function loadJS(url) {
		return new Promise((resolve, reject) => {
			const elem = document.createElement("script");
			elem.type = "text/javascript";
			elem.src = url;
			elem.async = true;
			elem.defer = true;
			elem.onload = resolve;
			elem.onerror = reject;
			document.body.appendChild(elem);
		});
	}

	switch (parseInt(url === "/" ? "0" : options.get("type") || "0", 10)) {
		case 1:
			{
				await loadJS("/lib/ruffle/ruffle.js");
				const rp = window.RufflePlayer;
				rp.config = Object.create(null);
				const frame = rp.newest().createPlayer();
				document.body.appendChild(frame);
				frame.load({
					url: url,
					scale: "showAll",
					quality: "best",
					autoplay: "auto",
					logLevel: "warn",
					letterbox: "on",
					openUrlMode: "confirm",
					upgradeToHttps: true
				});
			}
			break;
		case 2:
			{
				await loadJS("lib/jsdos/js-dos.js");
				const frame = document.createElement("div");
				document.body.appendChild(frame);
				window.emulators.pathPrefix = "/lib/jsdos/";
			 	window.Dos(frame).run(url);
			}
			break;
		case 4:
			{
				await loadJS("lib/emulatorjs/emulator.min.js");
				document.body.appendChild(document.createElement("div"));
				new window.EmulatorJS("body>div", {
					system: options.get("core") || "",
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
				const frame = document.createElement("embed");
				frame.type = "text/plain";
				frame.width = "1024";
				frame.height = "768";
				frame.src = url;
				document.body.appendChild(frame);
			}
			break;
	}

	setTimeout(() => {
		window.focus();
		if (url.startsWith("blob:"))
			URL.revokeObjectURL(url);
		if (bios.startsWith("blob:"))
			URL.revokeObjectURL(bios);
	}, 5000);
})();