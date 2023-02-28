/*!
Copyright 2022 ChromeHack Team

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
const embedded = window != window.top;
let proxy = nsw != null && location.hostname != "localhost";

if (proxy) {
	try {
		await nsw.register("/sw.js", {
			scope: "/",
			type: "classic",
			updateViaCache: "none"
		});
		await nsw.ready;
	} catch (err) {
		console.error(err);
		proxy = false;
	}
}

const searchBar = document.getElementById("search-bar");
const contextMenu = document.getElementById("context-menu");

const html5GameGrid = document.getElementById("html5-game-grid");
const flashGameGrid = document.getElementById("flash-game-grid");
const dosGameGrid = document.getElementById("dos-game-grid");
const userGameGrid = document.getElementById("user-game-grid");

const html5GameCount = document.getElementById("html5-game-count");
const flashGameCount = document.getElementById("flash-game-count");
const dosGameCount = document.getElementById("dos-game-count");
const userGameCount = document.getElementById("user-game-count");

/**
 * @param {{readonly name: string; readonly path?: string; readonly url?: string; readonly preview?: string}[]} contents 
 * @param {HTMLElement} grid 
 * @param {HTMLElement} gridCounter 
 * @param {boolean | undefined} noPreview 
 */
function updateContents(contents, grid, gridCounter, noPreview) {
	grid.innerHTML = "";
	gridCounter.innerHTML = contents.length;

	for (const content of contents) {
		const name = content.name;
		const path = content.path;
		const url = content.url;

		const item = document.createElement("div");
		item.className = "game-item";

		const preview = document.createElement("div");
		preview.className = "game-preview";
		if (!noPreview) {
			preview.setAttribute("style", `background-image: url("./preview/${encodeURIComponent(name)}.jpg");`);
		}
		item.appendChild(preview);

		const label = document.createElement("div");
		label.className = "game-label";
		label.textContent = name;
		item.appendChild(label);

		item.onclick = () => {
			const frame = createFrame(path, url);

			inNewTabOrWindow(frame);
		};

		item.oncontextmenu = (e) => {
			e.preventDefault();
			e.stopPropagation();
			inNewTabOrWindow(createFrame(path, url));
		};

		grid.appendChild(item);
	}
}

/**
 * @param {string} url 
 */
function proxyUrl(url) {
	return proxy ? "uv.xht?o=" + encodeURIComponent(url) : url;
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
	frame.setAttribute("src", path != null ? path : proxyUrl(url));
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
		<link rel="icon" type="image/x-icon" href="res/google.ico" />
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
 * @param {string} input 
 */
function match(contents, input) {
	const list = [];
	for (const content of contents) {
		if (content.name.toLowerCase().includes(input))
			list.push(content);
	}
	return list;
}

function loadDefaultContent() {
	updateContents(contents.html5Games, html5GameGrid, html5GameCount);
	updateContents(contents.flashGames, flashGameGrid, flashGameCount);
	updateContents(contents.dosGames, dosGameGrid, dosGameCount);
}

TestGameDB.load().then(() => {
	updateContents(TestGameDB.data, userGameGrid, userGameCount, true);
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
	if (value.length == 0) {
		loadDefaultContent();
		return;
	}

	updateContents(match(contents.html5Games, value), html5GameGrid, html5GameCount);
	updateContents(match(contents.flashGames, value), flashGameGrid, flashGameCount);
	updateContents(match(contents.dosGames, value), dosGameGrid, dosGameCount);
};

document.getElementById("game-submission-button").onclick = async () => {
	const result = await form("", "Submit a game", {
		"Name": {
			tagName: "input",
			attributes: { type: "text", placeholder: "Game Name" }
		},
		"URL": {
			tagName: "input",
			attributes: { type: "text", placeholder: "https://example.com/example" }
		}
	});

	if (result == null)
		return; // canceled

	const name = result["Name"].value;
	const url = result["URL"].value;

	if (name.length == 0) {
		alert("Name cannot be empty.", "Error");
		return;
	}

	if (url.length == 0) {
		alert("URL cannot be empty.", "Error");
		return;
	}

	try {
		const o = new URL(url);
		if (o.protocol != "http:" && o.protocol != "https:") {
			alert("Invalid URL protocol", "Error");
			return;
		}
	} catch (e) {
		alert("Invalid URL", "Error");
		return;
	}

	await TestGameDB.append({
		name: name,
		url: url
	});
	window.location.reload();
};

document.getElementById("ebutuoy").onclick = () => {
	popup("ebutuoy/", "Youtube Unblocked");
};
document.getElementById("vmlinux").onclick = () => {
	popup("vmlinux/", "VMLinux");
};
document.getElementById("private-search").onclick = () => {
	popup("google-search.html", "Private Search");
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

export const status=[!1];export const locker={lock:()=>eval(`(()=>{console.log("%c\x57h\u0069t\x65S\x70i\u0064e\u0072.\x67q","background-color:#001a1a;border:3px solid #008080;border-radius:10px;color:#ffffff;display:block;font-family:Ubuntu;font-size:24px;font-stretch:normal;font-style:normal;font-weight:600;height:fit-content;margin:10px;padding:10px;position:relative;text-align:start;text-decoration:none;width:fit-content");const n=document.documentElement.outerHTML;if(document["\x74itle"]==="W\x68\u0069t\x65S\x70\x69\u0064e\u0072"&&n.includes("C\u0068romeH\x61ck")&&n.includes("\x77\u0068\x69t\x65\x73\u0070id\u0065r.\u0067q")){console.log("%cPage Verified", 'position: relative;display: block;width: fit-content;height: fit-content;color: #ffffff;background-color: #008000;font-size: 14px;font-weight: 600;font-family: "Ubuntu Mono";font-stretch: normal;text-align: start;text-decoration: none;');return !0;}window["_$$0Oc"]();return !1;})();`)};locker.lock()&&(loadDefaultContent(),document.getElementById("loading").style.display="none",document.getElementById("main").style.display="block",status[0]=!0);
