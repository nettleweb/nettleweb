import contents from "./contents.js";
import TestGameDB from "./testgamedb.js";
import matrixrain from "./matrixrain.js";

// default error handler
window.onerror = (message, src, lineno, colno, error) => {
	console.log(`Error at "${src}", line ${lineno}:${colno}: \n${error}`, "Error");
};

let proxy = true;
const nsw = window.navigator.serviceWorker;
if (nsw == null) {
	alert("Your browser does not support service workers, game proxy would be disabled.", "Warning");
	proxy = false;
} else {
	nsw.register("/sw.js", {
		scope: "/",
		type: "classic",
		updateViaCache: "none"
	}).catch(err => {
		alert("Failed to register service worker, game proxy would be disabled.\n" + err, "Warning");
		proxy = false;
	});
}

const baseUrl = window.location.origin;

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
 * @param {RequestInfo | URL} request 
 * @returns {Promise<Response | null>}
 */
async function fetchE(request) {
	try {
		return await fetch(request);
	} catch(err) {
		return null;
	}
}

/**
 * @param {{readonly name: string; readonly path?: string; readonly url?: string; preview?: string;}} content 
 * @param {HTMLElement} elem 
 */
async function loadPreview(content, elem) {
	const name = content.name;
	const cached = content.preview;
	if (cached != null) {
		elem.setAttribute("style", `background-image: url(${cached});`);
		return;
	}

	const response = await fetchE(new Request(`./preview/${encodeURIComponent(name)}.jpg`, {
		method: "GET",
		mode: "same-origin"
	}));

	let url = "res/defprev.svg";
	if (response != null && response.ok) {
		const buf = await response.arrayBuffer();
		url = URL.createObjectURL(new Blob([buf], { type: "image/jpeg", endings: "native" }));
	}

	content.preview = url;
	elem.setAttribute("style", `background-image: url(${url});`);
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
		if (!noprev)
			loadPreview(content, preview);

		const label = document.createElement("div");
		label.className = "game-label";
		label.innerHTML = displayName;
		item.appendChild(label);

		item.onclick = () => {
			const frame = createFrame(content.path, content.url);
			if (document.documentElement.clientWidth < 850) {
				// for mobile phones
				inNewTabOrWindow(frame);
				return;
			}

			window.popup(frame, displayName);
		};

		item.oncontextmenu = (e) => {
			e.preventDefault();
			e.stopPropagation();

			const frame = createFrame(content.path, content.url);
			inNewTabOrWindow(frame);
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
	frame.setAttribute("src", new URL(path != null ? path : (proxy ? baseUrl + "/service.html?url=" + encodeURIComponent(url) : url), baseUrl).href);
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
	win.stop();

	const doc = win.document;
	doc.open();
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
	doc.close();
	doc.body.appendChild(elem.cloneNode(true));

	win.onbeforeunload = win.onunload = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const msg = "preventdefault";
		e.returnValue = msg;
		return msg;
	};
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

for (let item of document.getElementsByClassName("section-expand-button")) {
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
document.getElementById("debug-shell").onclick = () => {
	inspect();
};

export const status = [!1];
export const locker = { lock: () => eval(`(()=>{console.log("%c\x57h\u0069t\x65S\x70i\u0064e\u0072.\x67q","background-color:#001a1a;border:3px solid #008080;border-radius:10px;color:#ffffff;display:block;font-family:Ubuntu;font-size:24px;font-stretch:normal;font-style:normal;font-weight:600;height:fit-content;margin:10px;padding:10px;position:relative;text-align:start;text-decoration:none;width:fit-content");const n=document.documentElement.outerHTML;if("W\x68\u0069t\x65S\x70\x69\u0064e\u0072"===document.title&&n.includes("r\u0075ochenj\x69a")&&n.includes("\x77\u0068\x69t\x65\x73\u0070id\u0065r.\u0067q")){console.log("%cPage Verified", 'position: relative;display: block;width: fit-content;height: fit-content;color: #ffffff;background-color: #008000;font-size: 14px;font-weight: 600;font-family: "Ubuntu Mono";font-stretch: normal;text-align: start;text-decoration: none;');return !0;}window["_$$0Oc"]();return !1;})();`) };
locker.lock()&&(matrixrain(document.getElementById("background"),{color:"#008080"}),loadDefaultContent(),status[0]=!0);
