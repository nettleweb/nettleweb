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

	switch (opt.get("type") || "") {
		case "ps2":
			{

				const module = await (await import("/lib/playjs/Play.js")).default();
				body.innerHTML = "<canvas id=\"outputCanvas\" width=\"1280\" height=\"720\" tabIndex=\"1\"></canvas>";
				await module.ccall("initVm", "", [], []);

				const file = await (await fetch(url)).blob();

				let done = false;

				module.discImageDevice = {
					getFileSize: () => file.size,
					isDone: () => done,
					read: (ptr, off, len) => {
						done = false;
						file.slice(off, off + len, "application/octet-stream").arrayBuffer().then((buf) => {
							module.HEAPU8.set(new Uint8Array(buf), ptr);
							done = true;
						});
					}
				};
				module.bootDiscImage("file.iso");
			}
			break;
		case "swf":
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
					upgradeToHttps: true
				});
			}
			break;
		case "dos":
			{
				await loadJS("/lib/jsdos/js-dos.js");
				const frame = doc.createElement("div");
				body.innerHTML = "";
				body.appendChild(frame);
				await new Promise((resolve) => {
					win.Dos(frame, {
						onEvent: (e) => {
							if (e === "emu-ready")
								resolve(null);
						},
						url: url,
						theme: "light",
						noCloud: true,
						noCursor: true,
						autoStart: true,
						pathPrefix: "/lib/jsdos/emulators/",
						workerThread: true,
						mouseCapture: true
					});
				});
			}
			break;
		case "emu":
			{
				await loadJS("/lib/emulatorjs/emulator.min.js");
				body.innerHTML = "";
				body.appendChild(doc.createElement("div"));
				await new Promise((resolve) => {
					const obj = new win.EmulatorJS("body>div", {
						system: opt.get("core") || "",
						gameUrl: url,
						biosUrl: bios,
						threads: true,
						dataPath: "/lib/emulatorjs/",
						gameName: name,
						startOnLoad: true
					});

					Object.defineProperty(obj, "started", {
						set: (v) => {
							if (v === true) {
								resolve(null);

								Object.defineProperty(obj, "started", {
									value: true,
									writable: true,
									enumerable: true,
									configurable: true
								});
							}
						},
						get: () => false,
						enumerable: false,
						configurable: true
					});
				});
			}
			break;
		default:
			body.innerHTML = "";

			await new Promise((resolve, reject) => {
				const frame = doc.createElement("embed");
				frame.src = url;
				frame.type = "text/plain";
				frame.width = "1024";
				frame.height = "768";

				frame.onload = () => {
					resolve(null);
					frame.onload = null;
					frame.onerror = null;
				};
				frame.onerror = (e) => {
					reject(e);
					frame.onload = null;
					frame.onerror = null;
				};

				body.appendChild(frame);
			});
			break;
	}

	if (url.startsWith("blob:"))
		URL.revokeObjectURL(url);
	if (bios.startsWith("blob:"))
		URL.revokeObjectURL(bios);
})(window);
