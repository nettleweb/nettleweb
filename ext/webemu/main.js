"use strict"; (async () => {
	/**
	 * @type {(id: string) => HTMLElement}
	 */
	const $ = (id) => {
		const elem = document.getElementById(id);
		if (elem == null)
			throw new Error("Element does not exist: " + id);
		return elem;
	};
	const msgElem = $("message");
	const emptyBuf = Object.freeze(new ArrayBuffer(128));

	window.onerror = (e, source, lineno, colno, err) => {
		let msg = "Unhandled error at " + (source || "unknown source ");
		if (lineno != null)
			msg += lineno;
		if (colno != null)
			msg += ":" + colno;
		if (err != null)
			msg += "\n\n" + err;

		msgElem.textContent = msg;
		msgElem.style.display = "block";
	};

	await new Promise(resolve => {
		const timer = setInterval(() => {
			if (document.readyState === "complete") {
				clearInterval(timer);
				resolve(void 0);
			}
		}, 50);
	});

	/**
	 * @param {string | null} msg 
	 */
	function message(msg) {
		if (msg != null) {
			msgElem.textContent = msg;
			msgElem.style.display = "block";
		} else msgElem.style.display = "none";
	}

	const runBtn = $("run");
	const saveBtn = $("save");
	const pauseBtn = $("pause");
	const restoreBtn = $("restore");
	const settingsBtn = $("settings");
	const fullscreenBtn = $("fullscreen");
	const screenshotBtn = $("screenshot");

	const options = $("options");
	const customOptions = $("custom-options");

	const preset = $("preset");
	const cdrom = $("cdrom");
	const hda = $("hda");
	const fda = $("fda");
	const ram = $("ram");
	const vgaRam = $("vga-ram");
	const bootOrder = $("boot-order");
	const kernelArgs = $("kernel-args");
	const kernelImage = $("kernel-image");
	const initrdImage = $("initrd-image");
	const initialState = $("initial-state");
	const networkProxy = $("network-proxy");
	const disableAudio = $("disable-audio");
	const disableMouse = $("disable-mouse");
	const disableKeyboard = $("disable-keyboard");

	const viewport = $("viewport");
	/**
	 * @type {HTMLInputElement}
	 */
	const fileupload = $("fileupload");

	/**
	 * @type {typeof import("./v86").default.V86Starter}
	 */
	const V86 = window.V86Starter;
	if (typeof V86 !== "function") {
		message("Error: V86 library not loaded");
		return;
	}

	/**
	 * @typedef {import("./v86").default.V86Options} V86Options
	 * @type {V86Options}
	 */
	const baseOptions = {
		bios: {
			url: "bios/seabios.bin",
			size: 131072,
			async: false
		},
		vga_bios: {
			url: "bios/vgabios.bin",
			size: 36352,
			async: false
		},
		autostart: true,
		wasm_path: "v86.wasm",
		screen_container: viewport,
		network_relay_url: "wss://relay.widgetry.org/",
		preserve_mac_from_state_image: true
	};

	/**
	 * @type {[import("./v86").default.V86Starter]}
	 */
	const vm = [null];
	Object.setPrototypeOf(vm, null);
	Object.defineProperty(vm, "length", { value: 1, writable: false, enumerable: false, configurable: false });

	pauseBtn.onclick = () => {
		if (pauseBtn.hasAttribute("ed")) {
			vm[0].run();
			pauseBtn.title = "Pause";
			pauseBtn.removeAttribute("ed", "");
		} else {
			vm[0].stop();
			pauseBtn.title = "Resume";
			pauseBtn.setAttribute("ed", "");
		}
	};
	saveBtn.onclick = async () => {
		const url = URL.createObjectURL(new Blob([await vm[0].save_state()], { type: "application/octet-stream", endings: "native" }));
		const elem = document.createElement("a");
		elem.href = url;
		elem.target = "_blank";
		elem.download = "vmstate.zip";
		elem.click();
		URL.revokeObjectURL(url);
	};
	restoreBtn.onclick = () => {
		pauseBtn.click();
		fileupload.onchange = async () => {
			const file = fileupload.files?.item(0);
			if (file != null) {
				vm[0].restore_state(await file.arrayBuffer());
				pauseBtn.click();
			}
		};
		fileupload.click();
	};
	fullscreenBtn.onclick = () => {
		if (!document.fullscreenEnabled) {
			message("Fullscreen is not supported in the current browsing context.");
			return;
		}
		viewport.requestFullscreen({ navigationUI: "hide" });
	};
	screenshotBtn.onclick = () => {
		const elem = document.createElement("a");
		elem.href = vm[0].screen_make_screenshot().src;
		elem.target = "_blank";
		elem.download = "screenshot.png";
		elem.click();
	};
	settingsBtn.onclick = () => {
		if (settingsBtn.hasAttribute("ed")) {
			options.style.display = "none";
			settingsBtn.removeAttribute("ed");
		} else {
			options.style.display = "block";
			settingsBtn.setAttribute("ed", "");
		}
	};
	preset.onchange = () => {
		if (preset.value === "custom")
			customOptions.style.display = "block";
		else
			customOptions.style.display = "none";
	};
	ram.onblur = () => {
		const value = parseInt(ram.value, 10)
		if (value < 32)
			ram.value = "32";
		if (value > 8192)
			ram.value = "8192";
	};
	vgaRam.onblur = () => {
		const value = parseInt(vgaRam.value, 10);
		if (value < 8)
			vgaRam.value = "8";
		if (value > 128)
			vgaRam.value = "128";
	};

	viewport.onclick = () => {
		viewport.focus({ preventScroll: true });
		viewport.requestPointerLock();

		const inst = vm[0];
		if (inst != null) {
			inst.mouse_set_status(true);
			inst.keyboard_set_status(true);
		}
	};

	/**
	 * @param {string} url 
	 * @param {number} size 
	 * @returns {Promise<ArrayBuffer>} 
	 */
	async function loadSplitDiskImage(url, size) {
		const buffer = new Uint8Array(new ArrayBuffer(size), 0, size);
		for (let i = 0, s = 0; ; i++) {
			const res = await window.fetch(url + i.toString(10).padStart(2, "0"), { method: "GET" });
			if (!res.ok)
				throw new Error("Failed to fetch disk image");

			const buf = new Uint8Array(await res.arrayBuffer());
			buffer.set(buf, s, s += buf.byteLength);

			if (s >= size)
				break;
		}
		return buffer.buffer;
	}

	runBtn.onclick = async () => {
		if (runBtn.title === "Stop") {
			const inst = vm[0];
			if (inst.is_running()) {
				inst.stop();
				inst.destroy();
			}
			delete vm[0];
			saveBtn.disabled = true;
			pauseBtn.disabled = true;
			restoreBtn.disabled = true;
			fullscreenBtn.disabled = true;
			screenshotBtn.disabled = true;
			runBtn.title = "Start";
			runBtn.style.backgroundImage = "url(\"res/start.svg\")";
			return;
		}

		runBtn.disabled = true;
		/**
		 * @type {V86Options}
		 */
		const options = { ...baseOptions };

		switch (preset.value) {
			case "msdos":
				options.hda = { buffer: emptyBuf };
				options.initial_state = {
					url: "img/msdos.zst",
					size: 3153487
				};
				options.memory_size = 33554432;
				options.vga_memory_size = 8388608;
				break;
			case "freedos":
				options.hda = { buffer: emptyBuf };
				options.initial_state = {
					buffer: await loadSplitDiskImage("img/freedos.zst", 91216870)
				};
				options.memory_size = 67108864;
				options.vga_memory_size = 8388608;
				break;
			case "win95":
				options.hda = { buffer: emptyBuf };
				options.initial_state = {
					buffer: await loadSplitDiskImage("img/win95.zst", 42297358)
				};
				options.memory_size = 536870912;
				options.vga_memory_size = 33554432;
				break;
			case "win98":
				options.hda = { buffer: emptyBuf };
				options.initial_state = {
					buffer: await loadSplitDiskImage("img/win98.zst", 91261942)
				};
				options.memory_size = 536870912;
				options.vga_memory_size = 33554432;
				break;
			case "linux2.6.34":
				options.cdrom = {
					url: "img/linux2.6.34.iso",
					size: 6547456
				};
				options.memory_size = 33554432;
				options.vga_memory_size = 8388608;
				break;
			case "linux3.18.0":
				options.cdrom = {
					url: "img/linux3.18.0.iso",
					size: 8638464
				};
				options.memory_size = 33554432;
				options.vga_memory_size = 8388608;
				break;
			case "linux4.16.13":
				options.cdrom = {
					url: "img/linux4.16.13.iso",
					size: 7731200
				};
				options.memory_size = 33554432;
				options.vga_memory_size = 8388608;
				break;
			case "deb12":
				options.hda = { buffer: emptyBuf };
				options.initial_state = {
					buffer: await loadSplitDiskImage("./img/debian12.zst", 290267178)
				};
				options.memory_size = 536870912;
				options.vga_memory_size = 33554432;
				break;
			case "custom":
				{
					const cdromBuf = cdrom.files?.item(0);
					const hdaBuf = hda.files?.item(0);
					const fdaBuf = fda.files?.item(0);
					const kernelBuf = kernelImage.files?.item(0);
					const initrdBuf = initrdImage.files?.item(0);
					const stateBuf = initialState.files?.item(0);

					if (cdromBuf != null)
						options.cdrom = { buffer: cdromBuf };
					if (hdaBuf != null)
						options.hda = { buffer: hdaBuf };
					if (fdaBuf != null)
						options.fda = { buffer: fdaBuf };
					if (kernelBuf != null)
						options.bzimage = { buffer: kernelBuf };
					if (initrdBuf != null)
						options.initrd = { buffer: initrdBuf };
					if (stateBuf != null)
						options.initial_state = { buffer: stateBuf };
				}

				options.cmdline = kernelArgs.value || void 0;
				options.boot_order = parseInt(bootOrder.value, 16);
				options.memory_size = parseInt(ram.value, 10) * 1048576;
				options.vga_memory_size = parseInt(vgaRam.value, 10) * 1048576;
				options.disable_speaker = disableAudio.checked || void 0;
				options.disable_mouse = disableMouse.checked || void 0;
				options.disable_keyboard = disableKeyboard.checked || void 0;
				break;
			default:
				message("Invalid preset value: " + preset.value);
				return;
		}

		vm[0] = new V86(options);

		setTimeout(() => {
			runBtn.disabled = false;
			saveBtn.disabled = false;
			pauseBtn.disabled = false;
			restoreBtn.disabled = false;
			fullscreenBtn.disabled = false;
			screenshotBtn.disabled = false;
			runBtn.title = "Stop";
			runBtn.style.backgroundImage = "url(\"res/stop.svg\")"
		}, 1000);
	};
})();