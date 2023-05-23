"use strict"; (async () => {
	// default error handler
	window.onerror = (e, source, lineno, colno, err) => {
		let msg = "Unhandled error at " + (source || "unknown source ");
		if (lineno != null)
			msg += lineno;
		if (colno != null)
			msg += ":" + colno;
		if (err != null)
			msg += "\n\n" + err;

		error(msg);
	};

	// wait document loading to fully complete
	await new Promise(resolve => {
		const timer = setInterval(() => {
			if (document.readyState === "complete") {
				clearInterval(timer);
				resolve();
			}
		}, 50);
	});

	// register service worker
	const nsw = window.navigator.serviceWorker;
	if (nsw != null) {
		try {
			await nsw.register("/sw.js", {
				scope: "/",
				type: "classic",
				updateViaCache: "none"
			});
			await nsw.ready;
		} catch (err) {
			// ignore as service worker is optional
		}
	}

	const errorMsg = document.getElementById("error");
	const gamesPage = document.getElementById("games-page");
	const gamesSearch = document.getElementById("game-search");
	const gamesContainer = document.getElementById("game-container");

	// menu switcher
	for (const elem of document.querySelectorAll("#nav-bar>button")) {
		elem.onclick = () => {
			for (const e of document.querySelectorAll("#nav-bar>button, #body>div"))
				e.removeAttribute("current")

			elem.setAttribute("current", "true");
			document.getElementById(elem.id + "-page").setAttribute("current", "true");
		};
	}

	// app launch listeners
	document.getElementById("ytunbl").onclick = () => inNewWindow(createFrame("/apps/ytunbl/"));
	document.getElementById("vmlinux").onclick = () => inNewWindow(createFrame("/apps/vmlinux/"));
	document.getElementById("privsearch").onclick = () => inNewWindow(createFrame("/apps/privsearch/"));

	// game search bar
	gamesSearch.oninput = () => {
		const value = gamesSearch.value.toLowerCase();
		if (value.length == 0) {
			updateGameList(gameList);
			return;
		}

		const matchList = [];
		for (const it of gameList) {
			if (it.name.toLowerCase().includes(value))
				matchList.push(it);
		}

		updateGameList(matchList);
	};

	/**
	 * @param {string | null} message 
	 */
	function error(message) {
		if (message != null) {
			errorMsg.style.display = "block";
			errorMsg.textContent = message;
		} else errorMsg.style.display = "none";
	}

	/**
	 * @param {GameInfo} game 
	 */
	function createGameFrame(game) {
		return createFrame("player.xht?type=" + game.type + "&url=" + encodeURIComponent(game.url));
	}

	/**
	 * @param {string} url 
	 */
	function createFrame(url) {
		const frame = document.createElement("embed");
		frame.setAttribute("type", "text/plain");
		frame.setAttribute("width", "800");
		frame.setAttribute("height", "600");
		frame.setAttribute("loading", "lazy");
		frame.setAttribute("allow", "cross-origin-isolated");
		frame.setAttribute("allowfullscreen", "true");
		frame.setAttribute("src", url);
		return frame;
	}

	/**
	 * @param {HTMLElement} elem 
	 */
	function inNewWindow(elem) {
		const win = window.open("", "_blank");
		if (win == null) {
			error("Error: Failed to open popup window, please allow popups in your browser settings.");
			return;
		}
		win.focus();

		const doc = win.document;
		doc.open();
		doc.write(`<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<meta http-equiv="Referrer-Policy" content="no-referrer" />
		<meta name="referrer" content="no-referrer" />
		<meta name="viewport" content="width=device-width,initial-scale=1" />
		<base href="${window.origin}"/>
		<link rel="icon" type="image/x-icon" href="res/google.ico" />
		<title>Google</title>
		<style type="text/css">
* {
	margin: 0px;
	padding: 0px;
}

body, embed, iframe {
	position: absolute;
	display: block;
	width: 100%;
	height: 100%;
	border: none;
	overflow: hidden;
}
		</style>
	</head>
	<body>
	</body>
</html>`);
		doc.close();
		doc.body.appendChild(elem);
	}

	/**
	 * @typedef {{ readonly name: string; readonly type: "html5" | "flash" | "dos"; readonly url: string; }} GameInfo
	 * @param {GameInfo[]} list 
	 */
	function updateGameList(list) {
		gamesContainer.innerHTML = "";
		for (const game of list) {
			const name = game.name;

			const elem = document.createElement("div");
			elem.style.backgroundImage = `url("preview.jpg?game=${encodeURIComponent(name)}")`;
			elem.onclick = () => inNewWindow(createGameFrame(game));
			elem.oncontextmenu = (e) => {
				e.preventDefault();
				e.stopPropagation();

				// TODO add proxy related functions here
			};

			const elem2 = document.createElement("div");
			elem2.textContent = name;
			elem.appendChild(elem2);

			const label = document.createElement("label");
			elem.appendChild(label);

			switch (game.type) {
				case "html5":
					label.textContent = "HTML5";
					label.style.background = "#ff9933";
					break;
				case "flash":
					label.textContent = "Flash";
					label.style.background = "#00cc99";
					break;
				case "dos":
					label.textContent = "Dos";
					label.style.background = "#80bfff";
					break;
			}
			gamesContainer.appendChild(elem);
		}
	}

	// load game list
	/**
	 * @type {GameInfo[]}
	 */
	const gameList = await (async () => {
		const res = await fetch("/games/list.txt");
		if (res.ok) {
			const list = [];
			for (const it of (await res.text()).split("\n").sort()) {
				const data = it.split(";", 3);
				list.push({ name: data[0], type: data[1], url: data[2] });
			}
			return list;
		} else {
			error("Error: Failed to load game list.");
			return [];
		}
	})();
	updateGameList(gameList);
})();