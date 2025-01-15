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

	const sid = new URLSearchParams(win.location.search).get("s");
	const his = win.history;
	const body = doc.body;
	const parent = win.parent || win;

	win.stop();
	win.focus();
	his.scrollRestoration = "manual";
	his.replaceState(void 0, "", "/");
	body.innerHTML = "Loading... (1)";

	if (sid == null || sid.length < 2 || parent === win) {
		body.innerHTML = "Error: Invalid session context";
		return;
	}

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

			elem.onload = () => {
				resolve(null);
				elem.onload = null;
				elem.onerror = null;
			};
			elem.onerror = (e) => {
				reject(e);
				elem.onload = null;
				elem.onerror = null;
			};

			body.appendChild(elem);
		});
	}

	/**
	 * @param {Uint8Array} data 
	 */
	async function loadPs2(data) {
		body.innerHTML = "<canvas id=\"outputCanvas\" width=\"1280\" height=\"720\" tabIndex=\"1\"></canvas>";

		const module = await (await import("/lib/playjs/Play.js")).default();
		await module.ccall("initVm", "", [], []);

		module.discImageDevice = {
			getFileSize: () => data.byteLength,
			isDone: () => true,
			read: (ptr, off, len) => {
				module.HEAPU8.set(data.subarray(off, off + len), ptr);
			}
		};
		module.bootDiscImage("file.iso");
	}

	/**
	 * @param {ArrayBuffer} data 
	 */
	async function loadSwf(data) {
		await loadJS("/lib/ruffle/ruffle.js");
		const player = win.RufflePlayer;
		if (player == null)
			throw new Error("Failed to load Ruffle player.");

		const frame = player.newest().createPlayer();
		body.innerHTML = "";
		body.appendChild(frame);

		await frame.load({
			data: data,
			wmode: "opaque",
			scale: "showAll",
			quality: "best",
			autoplay: "auto",
			logLevel: "warn",
			letterbox: "on",
			openUrlMode: "confirm",
			upgradeToHttps: true
		});
	}

	/**
	 * @param {Uint8Array} data 
	 */
	async function loadDos(data) {
		await loadJS("/lib/jsdos/js-dos.js");
		const Dos = win.Dos;
		if (Dos == null)
			throw new Error("Failed to load player API.");

		const frame = doc.createElement("div");
		body.innerHTML = "";
		body.appendChild(frame);

		const url = URL.createObjectURL(new Blob([data], { type: "application/octet-stream", endings: "native" }));

		Dos(frame, {
			onEvent: (e) => {
				if (e === "emu-ready")
					URL.revokeObjectURL(url);
			},
			url: url,
			theme: "light",
			backend: "dosboxX",
			noCloud: true,
			noCursor: true,
			autoStart: true,
			pathPrefix: "/lib/jsdos/emulators/",
			workerThread: true,
			mouseCapture: true,
			renderAspect: "4/3",
			renderBackend: "webgl"
		});
	}

	/**
	 * @param {string} url
	 * @param {string} bios
	 * @param {string} core
	 */
	async function loadEmu(url, bios, core) {
		await loadJS("/lib/emulatorjs/emulator.min.js");
		const EmulatorJS = win.EmulatorJS;
		if (EmulatorJS == null)
			throw new Error("Failed to load player API.");

		body.innerHTML = "";
		body.appendChild(doc.createElement("div"));

		const obj = new win.EmulatorJS("body>div", {
			system: core,
			gameUrl: url,
			biosUrl: bios,
			threads: true,
			dataPath: "/lib/emulatorjs/",
			gameName: "Game",
			startOnLoad: true
		});

		await new Promise((resolve) => {
			const timer = setInterval(() => {
				if (obj.started) {
					clearInterval(timer);
					resolve(null);
				}
			}, 1000);
		});

		if (url.startsWith("blob:"))
			URL.revokeObjectURL(url);
		if (bios.startsWith("blob:"))
			URL.revokeObjectURL(bios);
	}

	/**
	 * @param {MessageEvent} e 
	 */
	function messageCallback(e) {
		if (e.origin === win.origin) {
			const { id, buf, off, len } = e.data || {};
			switch (id) {
				case "ps2":
					loadPs2(new Uint8Array(buf, off, len));
					break;
				case "swf":
				case "flash":
					loadSwf(buf);
					break;
				case "dos":
					loadDos(new Uint8Array(buf, off, len));
					break;
				case "emu":
					loadEmu(buf[0], buf[1], buf[2]);
					break;
				default:
					console.error("Unknown player type: ", id);
					break;
			}
			win.removeEventListener("message", messageCallback);
		}
	}

	win.addEventListener("message", messageCallback, { passive: true });
	parent.postMessage(sid, win.origin, []);
})(window);
