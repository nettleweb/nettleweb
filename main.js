"use strict";

// default error handler
window.onerror = (msg, src, lineno, colno, e) => {
};

let homeScreen = document.getElementById("home-screen");
let gamesScreen = document.getElementById("games-screen");
let toolsScreen = document.getElementById("tools-screen");
let gameRequestScreen = document.getElementById("game-request-screen");
document.getElementById("home").onclick = () => {
	gamesScreen.style.display = "none";
	toolsScreen.style.display = "none";
	gameRequestScreen.style.display = "none";
	homeScreen.style.display = "block";
};
document.getElementById("games").onclick = () => {
	homeScreen.style.display = "none";
	toolsScreen.style.display = "none";
	gameRequestScreen.style.display = "none";
	gamesScreen.style.display = "block";
};
document.getElementById("tools").onclick = () => {
	homeScreen.style.display = "none";
	gamesScreen.style.display = "none";
	gameRequestScreen.style.display = "none";
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
document.getElementById("request-custom-game").onclick = () => {
	let gameName = prompt("Game Name");
	if (gameName == null)
		return;
	if (gameName.length == 0) {
		alert("Please input a name for your game.");
		return;
	}

	let gameUrl = prompt("Game URL");
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

	let imNotARobot = prompt("I'm not a robot", "No");
	if (imNotARobot == null)
		return;
	if (imNotARobot.toLowerCase() != "yes") {
		alert("🖕");
		return;
	}

	TestGameDB.append({
		name: gameName,
		url: gameUrl
	});
};

export {  }
export default {  }
