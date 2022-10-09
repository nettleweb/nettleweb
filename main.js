import { contents } from "./contents.js";
import { TestGameDB } from "./testgamedb.js";

(() => {

// default error handler
window.onerror = (msg, src, lineno, colno, e) => {
	alert(msg, "Error");
};

if(!("serviceWorker" in navigator)) {
	block("Your browser does not support service workers, please use a supported browser to continue.", "Warning");
	return;
}

window.navigator.serviceWorker.register("/sw.js", {
	scope: "/",
	type: "classic",
	updateViaCache: "none"
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

function loadContent(contents, container) {
	container.innerHTML = "";

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

		label.onclick = () => {
			if (frameContainer.style.display == "none") {
				let frame = document.createElement("content-frame");
				if (content.path != null)
					frame.path = content.path;
				else frame.src = content.url;

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

let html5GameContainer = document.getElementById("html5-game-container");
let dosGameContainer = document.getElementById("dos-game-container");
let flashGameContainer = document.getElementById("flash-game-container");

function loadDefaultContent() {
	loadContent(contents.html5Games, html5GameContainer);
	loadContent(contents.dosGames, dosGameContainer);
	loadContent(contents.flashGames, flashGameContainer);
}

loadDefaultContent();

let youtubeAdlessFrame = document.getElementById("youtube-adless-frame");
let vmLinuxFrame = document.getElementById("vmlinux-frame");
let privateSearchFrame = document.getElementById("private-search-frame");
let gsfFrame = document.getElementById("gsf-frame");
document.getElementById("youtube-adless").onclick = () => {
	if (youtubeAdlessFrame.style.display == "none") {
		youtubeAdlessFrame.style.display = "block";
		youtubeAdlessFrame.resizeToContent();
	} else youtubeAdlessFrame.style.display = "none";
};
document.getElementById("vmlinux").onclick = () => {
	if (vmLinuxFrame.style.display == "none") {
		vmLinuxFrame.style.display = "block";
		vmLinuxFrame.resizeToContent();
	} else vmLinuxFrame.style.display = "none";
};
document.getElementById("private-search").onclick = () => {
	if (privateSearchFrame.style.display == "none") {
		privateSearchFrame.style.display = "block";
		privateSearchFrame.resizeToContent();
	} else privateSearchFrame.style.display = "none";
};
document.getElementById("google-sites-finder").onclick = (e) => {
	if (gsfFrame.style.display == "none") {
		gsfFrame.style.display = "block";
		gsfFrame.resizeToContent();
	} else gsfFrame.style.display = "none";
};

document.getElementById("load-custom-games").onclick = () => {
	let container = document.getElementById("custom-game-container");
	container.innerHTML = `<div class="text">Loading...</div>`;
	TestGameDB.load().then(() => {
		loadContent(TestGameDB.data, container);
	});
};
document.getElementById("game-search-bar").oninput = (e) => {
	let value = e.target.value.toLowerCase();
	if (value.length == 0) {
		// reset to default when search is empty
		loadDefaultContent();
		return;
	}

	function match(cs) {
		let a = [];
		for (let g of cs) {
			if (g.name.toLowerCase().includes(value))
				a.push(g);
		}
		return a;
	}

	loadContent(match(contents.html5Games), html5GameContainer);
	loadContent(match(contents.dosGames), dosGameContainer);
	loadContent(match(contents.flashGames), flashGameContainer);
};

document.getElementById("request-custom-game").onclick = async () => {
	let result = await form("", "Submit a game", [
		{
			label: "Name",
			input: {
				type: "text",
				placeholder: "Game Name"
			}
		},
		{
			label: "URL",
			input: {
				type: "text",
				placeholder: "https://example.com/example"
			}
		}
	]);

	if (result == null)
		return;

	let gameName = result[0].value;
	let gameUrl = result[1].value;

	if (gameName.length == 0) {
		alert("Name cannot be empty.");
		return;
	}

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

	await TestGameDB.append({
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
document.getElementById("leave-without-history").onclick = () => {
	window.location.replace(new URL("https://www.google.com/"));
};

})();
