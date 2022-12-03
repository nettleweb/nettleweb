/*!
Copyright 2022 Ruochen Jia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import contents from "./contents.js";
import TestGameDB from "./testgamedb.js";

// default error handler
window.onerror = (message, src, lineno, colno, error) => {
	alert(`Error at "${src}", line ${lineno}:${colno}: \n${error}`, "Error");
};

const location = new URL(window.location.href);
const nsw = window.navigator.serviceWorker;
const embedded = (window != window.top);

if (nsw != null && location.hostname != "localhost") {
	try {
		await nsw.register("/sw.js", {
			scope: "/",
			type: "classic",
			updateViaCache: "none"
		});
		await nsw.ready;
	} catch(err) {
		console.warn(err);
	}
}

const searchBar = document.getElementById("search-bar");
const html5GameGrid = document.getElementById("html5-game-grid");
const dosGameGrid = document.getElementById("dos-game-grid");
const flashGameGrid = document.getElementById("flash-game-grid");
const userGameGrid = document.getElementById("user-game-grid");
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
 * @param {boolean} noprev 
 */
function updateContents(contents, container, noprev = false) {
	container.innerHTML = "";
	for (let content of contents) {
		// To be super safe, always escape illegal html characters in name
		const displayName = encodeText(content.name);

		const item = document.createElement("div");
		item.className = "game-item";
		
		const preview = document.createElement("div");
		preview.className = "game-preview";
		item.appendChild(preview);
		if (!noprev) {
			preview.setAttribute("style", `background-image: url("./preview/${encodeURIComponent(content.name)}.jpg");`);
		}

		const label = document.createElement("div");
		label.className = "game-label";
		label.innerHTML = displayName;
		item.appendChild(label);

		item.onclick = item.oncontextmenu = (e) => {
			e.preventDefault();
			e.stopPropagation();

			inNewTabOrWindow(createFrame(content.path, content.url));
		};

		container.appendChild(item);
	}
}

/**
 * @param {string | undefined} path 
 * @param {string | undefined} url 
 */
function createFrame(path, url) {
	const frame = document.createElement(embedded ? "embed" : "iframe");
	frame.setAttribute("type", "text/plain");
	frame.setAttribute("width", "800");
	frame.setAttribute("height", "600");
	frame.setAttribute("loading", "lazy");
	frame.setAttribute("allowfullscreen", "true");
	frame.setAttribute("allow", "cross-origin-isolated");
	frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-popups");
	frame.setAttribute("src", new URL(path != null ? path : url, location.origin).href);
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
	doc.open();
	doc.write(`<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
		<meta http-equiv="Referrer-Policy" content="no-referrer" />
		<meta name="referrer" content="no-referrer" />
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1" />
		<base href="${location.origin}"/>
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

embed, iframe {
	position: absolute;
	display: block;
	width: 100%;
	height: 100%;
	border: none;
}
		</style>
	</head>
	<body>
		<script type="text/javascript">
"use strict";

(() => {

window.onbeforeunload = window.onunload = (e) => {
	e.preventDefault();
	e.stopPropagation();

	const msg = "prevent default";
	e.returnValue = msg;
	return msg;
};

})();
		</script>
	</body>
</html>`);
	doc.close();
	doc.body.appendChild(elem);
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

TestGameDB.load().then(() => {
	updateContents(TestGameDB.data, userGameGrid, true);
});

for (let item of document.getElementsByClassName("expand")) {
	item.onclick = () => {
		const gridElem = item.parentElement.getElementsByClassName("game-grid")[0];
		if (gridElem.hasAttribute("expanded")) {
			gridElem.removeAttribute("expanded");
			item.innerHTML = "Show more";
		} else {
			gridElem.setAttribute("expanded", "true");
			item.innerHTML = "Show less";
		}
	};
}

searchBar.oninput = () => {
	const value = searchBar.value.toLowerCase();
	updateContents(match(contents.html5Games, value), html5GameGrid);
	updateContents(match(contents.dosGames, value), dosGameGrid);
	updateContents(match(contents.flashGames, value), flashGameGrid);
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
	const frame = createFrame(url);
	window.popup(frame);
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
document.getElementById("leave-without-history").onclick = () => {
	window.location.replace(new URL("https://www.google.com/"));
};

loadDefaultContent();

// export const status = [!1];export const locker = { lock: () => eval(``) };
// locker.lock()&&(loadDefaultContent(),status[0]=!0);document.getElementById("background-screen").style.display="none";document.getElementById("home-screen").style.display="block";
