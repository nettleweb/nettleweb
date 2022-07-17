"use strict";

// default error handler
window.onerror = (msg, src, lineno, colno, e) => {
};

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

import { contents } from "./contents.js";
import { ContentFrame } from "./contentframe.js";
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

document.getElementById("youtube-adless").onclick = () => {
	let frame = document.getElementById("youtube-adless-frame");
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
		embed.src = "ebutuoy";
		frame.appendChild(embed);
		frame.style.display = "block";
	} else {
		frame.innerHTML = "";
		frame.style.display = "none";
	}
};
document.getElementById("vmlinux").onclick = () => {
	let frame = document.getElementById("vmlinux-frame");
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
		embed.src = "vmlinux";
		frame.appendChild(embed);
		frame.style.display = "block";
	} else {
		frame.innerHTML = "";
		frame.style.display = "none";
	}
};



import { TestGameDB } from "./testgamedb.js";
document.getElementById("load-custom-games").onclick = () => {
	let container = document.getElementById("custom-game-container");
	container.innerHTML = `<div class="text">Loading...</div>`;
	TestGameDB.load().then(() => {
		container.innerHTML = "";
		initContent(TestGameDB.data, container);
	});
};

function imNotARobot() {
	let resolve;
	let reject;
	let promise = new Promise((a, b) => {
		resolve = a;
		reject = b;
	});

	let allowClick = false;
	setTimeout(() => allowClick = true, 200);

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
					resolve(dialog.inputElement().checked);
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
		dialog.inputElement().onclick = (e) => {
			e.preventDefault();
			setTimeout(() => {
				let el = e.target;
				el.checked = !el.checked;
			}, 800);
		};	
	});
	return promise;
}

document.getElementById("request-custom-game").onclick = async () => {
	let gameName = await prompt("Game Name");
	if (gameName == null)
		return;
	if (gameName.length == 0) {
		alert("Please input a name for your game.");
		return;
	}

	let gameUrl = await prompt("Game URL");
	if (gameUrl == null)
		return;
	if (gameUrl.length == 0) {
		alert("Please input a valid URL.");
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
};

export {  }
export default {  }
