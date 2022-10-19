import contents from "./contents.js";
import TestGameDB from "./testgamedb.js";

// default error handler
window.onerror = (message, src, lineno, colno, error) => {
	console.log(`Error at "${src}", line ${lineno}:${colno}: \n${error}`, "Error");
};

let proxy = true;
const nsw = window.navigator.serviceWorker;
if (nsw == null) {
	alert("Your browser does not support service workers, game proxy will be disabled.", "Warning");
	proxy = false;
} else {
	nsw.register("/sw.js", {
		scope: "/",
		type: "classic",
		updateViaCache: "none"
	}).catch(err => {
		console.warn(err);
		alert("Failed to register service worker, game proxy will be disabled.", "Warning");
		proxy = false;
	});
}

const baseUrl = window.location.origin;

const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");
const dynamicScreen = document.getElementById("dynamic-screen");
const searchBar = document.getElementById("search-bar");
const homeButton = document.getElementById("home-button");

const gameTitle = document.getElementById("game-title");
const frameContainer = document.getElementById("frame-container");
const fullscreenButton = document.getElementById("fullscreen-button");
const reloadButton = document.getElementById("reload-button");

const html5GameGrid = document.getElementById("html5-game-grid");
const dosGameGrid = document.getElementById("dos-game-grid");
const flashGameGrid = document.getElementById("flash-game-grid");
const userGameGrid = document.getElementById("user-game-grid");
const gameItemTemplate = document.getElementById("game-item-template");
const contextMenu = document.getElementById("context-menu");

/**
 * @param {string} text 
 */
function encodeText(text) {
	return text.replace(/[&"'\<\>]/g, (ch) => {
		switch (ch) {
			case "&":
				return "&amp;";
			case "'":
				return "&#39;";
			case '"':
				return "&quot;";
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
		}
	});
}

/**
 * @param {{readonly name: string; readonly path?: string; readonly url?: string; readonly preview?: string}[]} contents
 * @param {HTMLElement} container
 */
function updateContents(contents, container) {
	container.innerHTML = "";
	for (let content of contents) {
		// To be super safe, always escape illegal html characters in name
		const displayName = encodeText(content.name);

		/**
		 * @type {HTMLElement}
		 */
		const item = gameItemTemplate.cloneNode(true);
		item.removeAttribute("id");
		item.getElementsByClassName("game-info")[0].innerHTML = displayName;

		const preview = content.preview;
		if (preview != null) {
			item.getElementsByClassName("game-preview")[0].setAttribute("style", `background-image: url("${preview}");`);
		}

		item.onclick = () => {
			const frame = createFrame(content.path, content.url);
			if (document.documentElement.clientWidth < 850) {
				// for mobile phones
				inNewTabOrWindow(frame);
				return;
			}

			homeScreen.style.display = "none";
			gameScreen.style.display = "block";
			searchBar.style.display = "none";
			homeButton.style.display = "block";

			gameTitle.innerHTML = displayName;
			frameContainer.appendChild(frame);

			fullscreenButton.onclick = () => {
				frame.focus({ preventScroll: true });
				if (document.fullscreenEnabled)
					frame.requestFullscreen({ navigationUI: "hide" });
				else inNewTabOrWindow(frame, true);
			};

			reloadButton.onclick = () => {
				frame.src = frame.getAttribute("src");
			};
		};

		container.appendChild(item);
	}
}

/**
 * @param {string | undefined} path 
 * @param {string | undefined} url 
 */
function createFrame(path, url) {
	const frame = document.createElement(window == window.top ? "iframe" : "embed");
	frame.setAttribute("type", "text/plain");
	frame.setAttribute("width", "800");
	frame.setAttribute("height", "600");
	frame.setAttribute("loading", "lazy");
	frame.setAttribute("allowfullscreen", "true");
	frame.setAttribute("allow", "cross-origin-isolated");
	frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-popups");
	frame.setAttribute("src", path != null ? path : (proxy ? baseUrl + "/service.html?url=" + encodeURIComponent(url) : url));
	return frame;
}

/**
 * @param {HTMLElement} elem 
 * @param {boolean | undefined} newWindow 
 */
function inNewTabOrWindow(elem, newWindow) {
	const win = newWindow ? window.open("", "_blank", "height=" + screen.availHeight + ", width=" + screen.availWidth) : window.open("", "_blank");
	if (win == null) {
		alert("Failed to open new window.", "Error");
		return;
	}
	win.focus();

	const doc = win.document;
	doc.write(`<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<meta http-equiv="Referrer-Policy" content="no-referrer" />
		<meta name="referrer" content="no-referrer" />
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1" />
		<base href="${baseUrl}"/>
		<link rel="icon" type="image/x-icon" href="https://www.google.com/favicon.ico" />
		<title>Google</title>
		<style type="text/css">
* {
	margin: 0px;
	padding: 0px;
}

body {
	position: absolute;
	display: block;
	width: 100%;
	height: 100%;
	overflow: hidden;
}

iframe, embed {
	position: absolute;
	display: block;
	width: 100%;
	height: 100%;
	border: none;
}
		</style>
	</head>
</html>`);
	doc.body.appendChild(elem.cloneNode(true));
}

/**
 * @param {{readonly name: string; readonly path?: string; readonly url?: string; readonly preview?: string}[]} contents 
 * @param {string} lowerCaseInput 
 */
function match(contents, lowerCaseInput) {
	if (lowerCaseInput.length == 0)
		return contents;

	let r = [];
	for (let c of contents) {
		if (c.name.toLowerCase().includes(lowerCaseInput))
			r.push(c);
	}
	return r;
}

function loadDefaultContent() {
	updateContents(contents.html5Games, html5GameGrid);
	updateContents(contents.dosGames, dosGameGrid);
	updateContents(contents.flashGames, flashGameGrid);
}

loadDefaultContent();
TestGameDB.load().then(() => {
	updateContents(TestGameDB.data, userGameGrid);
});

searchBar.oninput = () => {
	const value = searchBar.value.toLowerCase();
	updateContents(match(contents.html5Games, value), html5GameGrid);
	updateContents(match(contents.dosGames, value), dosGameGrid);
	updateContents(match(contents.flashGames, value), flashGameGrid);
};
homeButton.onclick = () => {
	frameContainer.innerHTML = ""; // clear frame
	dynamicScreen.innerHTML = "";
	gameScreen.style.display = "none";
	dynamicScreen.style.display = "none";
	homeScreen.style.display = "block";
	homeButton.style.display = "none";
	searchBar.style.display = "block";
};

document.getElementById("html5-games").onclick = () => {
	html5GameGrid.scrollIntoView({
		behavior: "smooth",
		block: "start",
		inline: "nearest"
	});
};
document.getElementById("dos-games").onclick = () => {
	dosGameGrid.scrollIntoView({
		behavior: "smooth",
		block: "start",
		inline: "nearest"
	});
};
document.getElementById("flash-games").onclick = () => {
	flashGameGrid.scrollIntoView({
		behavior: "smooth",
		block: "start",
		inline: "nearest"
	});
};
document.getElementById("tools").onclick = () => {
	document.getElementById("tools-grid").scrollIntoView({
		behavior: "smooth",
		block: "start",
		inline: "nearest"
	});
};
document.getElementById("game-submission-button").onclick = async () => {
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

/**
 * @param {string} url 
 */
function dynscr(url) {
	homeScreen.style.display = "none";
	dynamicScreen.style.display = "block";
	searchBar.style.display = "none";
	homeButton.style.display = "block";

	const frame = createFrame(url);
	dynamicScreen.appendChild(frame);
}

document.getElementById("ebutuoy").onclick = () => {
	dynscr("ebutuoy/");
};
document.getElementById("vmlinux").onclick = () => {
	dynscr("vmlinux/");
};
document.getElementById("private-search").onclick = () => {
	dynscr("google-search.html?key=6505c81d738124627");
};

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
