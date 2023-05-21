"use strict";

(() => {
let display = document.getElementById("screen");
let optionBar = document.getElementById("option-bar");

// toolbar
let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let saveStateButton = document.getElementById("save-state");
let restoreStateButton = document.getElementById("restore-state");
let fullscreenButton = document.getElementById("fullscreen");
let vmOptionsButton = document.getElementById("vm-options");

// vm options
let osSelection = document.getElementById("os");
let memoryInput = document.getElementById("memory-size");
let vgaMemoryInput = document.getElementById("vga-memory-size");
let dwInput = document.getElementById("display-width");
let dhInput = document.getElementById("display-height");
let osSetupMenu = document.getElementById("os-setup-menu");
let applyButton = document.getElementById("apply");

// os setup menu
let biosSelection = document.getElementById("bios");
let vgaBiosSelection = document.getElementById("vga-bios");
let bootOrderSelection = document.getElementById("boot-order");
let hdaInput = document.getElementById("hda");
let hdbInput = document.getElementById("hdb");
let fdaInput = document.getElementById("fda");
let fdbInput = document.getElementById("fdb");
let cdromInput = document.getElementById("cdrom");

let presets = {
	freedos: {
		fda: {
			url: "img/freedos.img",
			async: true
		}
	},
	linux2_6_34: {
		cdrom: {
			url: "img/linux2.6.34.iso",
			async: true
		}
	},
	linux3_18_0: {
		cdrom: {
			url: "img/linux3.18.0.iso",
			async: true
		}
	},
	linux4_16_13: {
		cdrom: {
			url: "img/linux4.16.13.iso",
			async: true
		}
	},
	msdos: {
		hda: {
			url: "img/msdos.img",
			async: true
		}
	},
	win98: {
		hda: {
			url: "extended-img/windows98.img",
			async: true
		},
		state: {
			url: "img/win98.bin.zst"
		},
		preserve_mac_from_state_image: true
	}
};

let defconfig = {
	wasm_path: "v86.wasm",
	screen_container: display,
	bios: { url: "bios/seabios.bin" },
	vga_bios: { url: "bios/vgabios.bin" },
	memory_size: 536870912, // 512NB
	vga_memory_size: 67108864, // 64MB
	cdrom: {},
	filesystem: {},
	autostart: false
};

let emulator = new V86Starter({...defconfig});

display.onclick = (e) => {
	emulator.keyboard_set_status(true);
	display.focus();
	display.requestPointerLock();
};

function start() {
	applyConfig(true);
	startButton.innerHTML = "Stop";
	pauseButton.setAttribute("disabled", "false");
	saveStateButton.setAttribute("disabled", "false");
	applyButton.setAttribute("disabled", "true");
}

function stop() {
	emulator.stop();
	emulator.destroy();
	startButton.innerHTML = "Start";
	pauseButton.innerHTML = "Pause";
	pauseButton.setAttribute("disabled", "true");
	saveStateButton.setAttribute("disabled", "true");
	applyButton.setAttribute("disabled", "false");
}

function pause() {
	emulator.stop();
	pauseButton.innerHTML = "Resume";
}

function resume() {
	emulator.run();
	pauseButton.innerHTML = "Pause";
}

async function restoreFromUrl(url) {
	let r =  await fetch(url);
	let d = await r.blob();
	let reader = new FileReader();
	reader.onload = (e) => {
		emulator.restore_state(e.target.result);
		emulator.run();
	};
	reader.readAsArrayBuffer(d);
}

function createImageConfig(file) {
	if (file != null) {
		return {
			async: true,
			size: file.size,
			url: URL.createObjectURL(file)
		};
	} else return null;
}

function getPreset(name) {
	if (name == "custom") {
		let config = {};
		let fda = fdaInput.files[0];
		let fdb = fdbInput.files[0];
		let hda = hdaInput.files[0];
		let hdb = hdbInput.files[0];
		let cdrom = cdromInput.files[0];
		config.fda = createImageConfig(fda);
		config.fdb = createImageConfig(fdb);
		config.hda = createImageConfig(hda);
		config.hdb = createImageConfig(hdb);
		config.cdrom = createImageConfig(cdrom);
		config.boot_order = parseInt(bootOrderSelection.value, 16);
		console.log(config);
		return config;
	} else return presets[name];
}

function applyConfig(autostart = false) {
	try {
		emulator.stop();
		emulator.destroy();
	} catch(err) {
		// ignore
	}
	let preset = getPreset(osSelection.value);
	let cfg = {...defconfig, ...preset};
	cfg.memory_size = (parseInt(memoryInput.value) || 512) * 1024 * 1024;
	cfg.vga_memory_size = (parseInt(vgaMemoryInput.value) || 64) * 1024 * 1024;
	cfg.autostart = autostart;
	emulator = new V86Starter(cfg);
	if (cfg.state != null)
		restoreFromUrl(cfg.state.url);
}

startButton.onclick = (e) => {
	if (startButton.getAttribute("disabled") == "true")
		return;

	if (startButton.innerHTML == "Start") 
		start();
	else stop();
};

pauseButton.onclick = (e) => {
	if (pauseButton.getAttribute("disabled") == "true")
		return;

	if (pauseButton.innerHTML == "Pause") 
		pause();
	else resume();
};

saveStateButton.onclick = (e) => {
	if (saveStateButton.getAttribute("disabled") == "true")
		return;
	
	emulator.save_state((err, state) => {
		if (err)
			throw err;

		let a = document.createElement("a");
		a.download = "vmstate.bin";
		a.href = URL.createObjectURL(new Blob([state]));
		a.dataset.downloadurl = "application/octet-stream:" + a.download + ":" + a.href;
		a.click();
	});
};

restoreStateButton.onclick = (e) => {
	if (restoreStateButton.getAttribute("disabled") == "true")
		return;

	restoreStateButton.getElementsByTagName("input")[0].onchange = (e) => {
		let reader = new FileReader();
		reader.onload = (e) => {
			emulator.restore_state(e.target.result);
			emulator.run();
		};
		reader.readAsArrayBuffer(e.target.files[0]);
	};
};

fullscreenButton.onclick = (e) => {
	display.requestFullscreen({ navigationUI: "hide" }).catch(err => {
		alert("Error attempting to enable fullscreen mode: " + err.message + "(" + err.name + ")");
	});
};

vmOptionsButton.onclick = (e) => {
	if (optionBar.style.display == "block")
		optionBar.style.display = "none";
	else optionBar.style.display = "block";
};

applyButton.onclick = (e) => {
	if (applyButton.getAttribute("disabled") == "true")
		return;

	applyConfig(false);
};

osSelection.onchange = (e) => {
	if (e.target.value == "custom")
		osSetupMenu.style.display = "block";
	else osSetupMenu.style.display = "none";
};

})();