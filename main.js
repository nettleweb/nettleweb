"use strict";

import { contents } from "./contents.js";
import { ContentFrame } from "./contentframe.js";
import { TestGameDB } from "./testgamedb.js";

(() => {
// default error handler
window.onerror = (msg, src, lineno, colno, e) => {
	alert(msg, "Error");
};

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag("js", new Date());
gtag("config", "G-MPQKJFLRE1");

if(!("serviceWorker" in navigator)) {
	// service workers are not supported
	new webAlert.Dialog({
		title: "Warning",
		message: "Your browser does not support service workers, please use a supported browser to continue."
	}).show();
	return;
}

if (window != window.top) {
	alert(`This page might not function properly while running inside a frame. Click <a href="${window.location.href}" target="_blank">here</a> to open it in a new tab.`, "Warning");
}

window.navigator.serviceWorker.register("/sw.js", {
	scope: "/",
	type: "classic",
	updateViaCache: "all"
});

let homeScreen = document.getElementById("home-screen");
let gamesScreen = document.getElementById("games-screen");
let toolsScreen = document.getElementById("tools-screen");
document.getElementById("home").onclick = () => {
	gamesScreen.style.display = "none";
	toolsScreen.style.display = "none";
	homeScreen.style.display = "block";
};
document.getElementById("games").onclick = () => {
	homeScreen.style.display = "none";
	toolsScreen.style.display = "none";
	gamesScreen.style.display = "block";
};
document.getElementById("tools").onclick = () => {
	homeScreen.style.display = "none";
	gamesScreen.style.display = "none";
	toolsScreen.style.display = "block";
};

let html5Games = contents.html5Games;
let dosGames = contents.dosGames;
let flashGames = contents.flashGames;

function initContent(contents, container) {
	for (let i in contents) {
		let content = contents[i];
		let item = document.createElement("div");
		item.className = "game-item";
		let label = document.createElement("div");
		label.className = "game-label";
		label.innerHTML = content.name;
		item.appendChild(label);
		let frameContainer = document.createElement("div");
		frameContainer.className = "game-frame-container";
		frameContainer.style.display = "none";
		item.appendChild(frameContainer);
		container.appendChild(item);

		label.onclick = (e) => {
			e.preventDefault();
			if (frameContainer.style.display == "none") {
				let frame = document.createElement("content-frame");
				let path = content.path;
				if (path != null)
					frame.setAttribute("path", content.path);
				else frame.setAttribute("src", content.url);
				frame.setAttribute("type", "text/plain");
				if (document.documentElement.clientWidth < 850) {
					// for mobile phones
					frame.inNewTab();	
				} else {
					frameContainer.appendChild(frame);
					frameContainer.style.display = "block";
				}
			} else {
				frameContainer.innerHTML = "";
				frameContainer.style.display = "none";
			}
		}
	}
}

initContent(html5Games, document.getElementById("html5-game-container"));
initContent(dosGames, document.getElementById("dos-game-container"));
initContent(flashGames, document.getElementById("flash-game-container"));

function cFrame(id, src) {
	let frame = document.getElementById(id);
	if (frame.style.display == "none") {
		if (document.documentElement.clientWidth < 850) {
			// for mobile phones
			frame.style.width = "100%";
			frame.style.height = "100%";
		}
		let embed = document.createElement("embed");
		embed.type = "text/plain";
		embed.width = "1024";
		embed.height = "768";
		embed.src = src;
		frame.appendChild(embed);
		frame.style.display = "block";
	} else {
		frame.innerHTML = "";
		frame.style.display = "none";
	}
}

document.getElementById("youtube-adless").onclick = (e) => {
	e.preventDefault();
	cFrame("youtube-adless-frame", "ebutuoy");
};
document.getElementById("vmlinux").onclick = (e) => {
	e.preventDefault();
	cFrame("vmlinux-frame", "vmlinux");
};
document.getElementById("private-search").onclick = (e) => {
	e.preventDefault();
	cFrame("private-search-frame", "google-search.html?key=6505c81d738124627");
};
document.getElementById("google-sites-finder").onclick = (e) => {
	e.preventDefault();
	cFrame("gsf-frame", "google-search.html?key=b7716b371218d4d34");
};

document.getElementById("load-custom-games").onclick = () => {
	let container = document.getElementById("custom-game-container");
	container.innerHTML = `<div class="text">Loading...</div>`;
	TestGameDB.load().then(() => {
		container.innerHTML = "";
		initContent(TestGameDB.data, container);
	});
};

function imNotARobot() {
	return new Promise((resolve, reject) => {
		let allowClick = false;
		setTimeout(() => allowClick = true, 1000);

		let dialog = new webAlert.Dialog({
			title: "",
			message: "I'm not a robot",
			input: {
				type: "checkbox"
			},
			positiveButton: {
				text: "Confirm",
				onclick: () => {
					if (allowClick)
						resolve(dialog.inputElement.checked);
					else reject("You are a robot!");
					dialog.dismiss();
				}
			},
			negativeButton: {
				text: "Cancel",
				onclick: () => {
					resolve(null);
					dialog.cancel();
				}
			}
		});
		dialog.show().then(() => {
			let timer = null;
			dialog.inputElement.onclick = (e) => {
				e.preventDefault();
				let el = e.target;
				if (timer != null)
					return;
				timer = setTimeout(() => {
					el.checked = !el.checked;
					timer = null;
				}, 800);
			};
		});
	});
}

document.getElementById("request-custom-game").onclick = async () => {
	let gameName = await prompt("Game Name");
	if (gameName == null)
		return;
	if (gameName.length == 0) {
		alert("Name cannot be empty.");
		return;
	}

	let gameUrl = await prompt("Game URL");
	if (gameUrl == null)
		return;
	if (gameUrl.length == 0) {
		alert("URL cannot be empty.");
		return;
	}
	try {
		gameUrl = new URL(gameUrl).href;
	} catch(e) {
		alert("Invalid URL");
		return;
	}

	let checked = await imNotARobot();
	if (checked == null)
		return;
	if (!checked) {
		alert("🖕🏼");
		return;
	}

	TestGameDB.append({
		name: gameName,
		url: gameUrl
	});

	window.location.reload();
};


let contextMenu = document.getElementById("context-menu");
document.body.oncontextmenu = (e) => {
	e.preventDefault();
	contextMenu.style.top = e.clientY + "px";
	contextMenu.style.left = e.clientX + "px";
	contextMenu.style.display = "block";
};
document.body.onclick = () => {
	contextMenu.style.display = "none";
};
document.getElementById("clear-site-data").onclick = async () => {
	window.sessionStorage.clear();
	window.localStorage.clear();
	let databases = await indexedDB.databases();
	for (let i = 0; i < databases.length; i++)
		indexedDB.deleteDatabase(databases[i].name);
};
document.getElementById("clear-cache").onclick = async () => {
	let keys = await caches.keys();
	for (let i = 0; i < keys.length; i++)
		await caches.delete(keys[i]);
};
document.getElementById("unregister-sw").onclick = async () => {
	let regs = await window.navigator.serviceWorker.getRegistrations();
	for (let i = 0; i < regs.length; i++)
		await regs[i].unregister();
};

})();

export {};
