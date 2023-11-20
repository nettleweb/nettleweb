"use strict"; (async () => {
	const msgElem = document.getElementById("message");

	// default error handler
	window.onerror = (e, source, lineno, colno, err) => {
		let msg = "Unhandled error at " + (source || "unknown source ");
		if (lineno != null)
			msg += lineno;
		if (colno != null)
			msg += ":" + colno;
		if (err != null)
			msg += "\n\n" + err;

		msgElem.textContent = msg;
		msgElem.style.display = "block";
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

	const location = new URL(window.location.href);
	const buttons = ["left", "middle", "right", "back", "forward"];

	// html element constants
	const tabs = document.getElementById("tabs");
	const frame = document.getElementById("frame");
	const address = document.getElementById("address");
	const container = document.getElementById("container");

	/**
	 * @type {HTMLElement}
	 */
	let currentTab = null;

	/**
	 * @param {string | null} msg 
	 */
	function message(msg) {
		if (msg != null) {
			msgElem.textContent = msg;
			msgElem.style.display = "block";
		} else msgElem.style.display = "none";
	}

	/**
	 * @param {MouseEvent} e 
	 */
	function mouseEventHandler(e) {
		e.preventDefault();
		e.stopPropagation();
		e.returnValue = false;

		socket.emit("event", {
			type: e.type,
			x: e.offsetX,
			y: e.offsetY,
			button: buttons[e.button]
		});

		return false;
	}

	/**
	 * @param {TouchEvent} e 
	 */
	function touchEventHandler(e) {
		e.preventDefault();
		e.stopPropagation();
		e.returnValue = false;

		const touches = e.touches;
		if (touches.length == 0) {
			socket.emit("event", { type: e.type });
			return false;
		}

		const rect = frame.getBoundingClientRect();
		for (const touch of touches) {
			socket.emit("event", {
				type: e.type,
				x: touch.clientX - rect.x,
				y: touch.clientY - rect.y
			});
		}
		return false;
	}

	/**
	 * @param {WheelEvent} e 
	 */
	function wheelEventHandler(e) {
		e.preventDefault();
		e.stopPropagation();
		e.returnValue = false;

		socket.emit("event", {
			type: e.type,
			deltaX: e.deltaX,
			deltaY: e.deltaY
		});

		return false;
	}

	/**
	 * @param {KeyboardEvent} e 
	 */
	function keyboardEventHandler(e) {
		e.preventDefault();
		e.stopPropagation();
		e.returnValue = false;

		socket.emit("event", {
			type: e.type,
			key: e.key
		});

		return false;
	}

	/**
	 * @param {Event} e 
	 */
	function preventDefault(e) {
		e.preventDefault();
		e.stopPropagation();
		e.returnValue = false;
		frame.focus({ preventScroll: true });
		return false;
	}

	/**
	 * @param {string} str 
	 * @returns {URL | null}
	 */
	function optURL(str) {
		try {
			return new URL(str);
		} catch (err) {
			return null;
		}
	}

	/**
	 * @param {string} str 
	 */
	function isHostname(str) {
		str = str.toLowerCase();
		for (let i = 0; i < str.length; i++) {
			const ch = str.charCodeAt(i);
			if ((ch < 48 || ch > 57) && (ch < 97 || ch > 122) && ch !== 45 && ch !== 46) {
				return false;
			}
		}
		return true;
	}

	/**
	 * @param {string} value 
	 * @param {string} search 
	 * @returns {string}
	 */
	function rewriteURL(value, search) {
		value = value.replace(/\s+/g, " ").trim();

		const url = optURL(value);
		if (url != null)
			return url.href;

		if (value.includes(" "))
			return search + encodeURIComponent(value);

		const i = value.indexOf("/");
		if (i === 0)
			return search + encodeURIComponent(value);

		if (i > 0) {
			const host = value.substring(0, i);
			if (isHostname(host))
				return "http://" + value;
		} else {
			if (isHostname(value) && value.includes("."))
				return "http://" + value;
		}

		return search + encodeURIComponent(value);
	}

	function guiNewTab() {
		const tab = document.createElement("div");
		tab.innerHTML = "<img src=\"res/empty.ico\" width=\"19\" height=\"19\" draggable=\"false\" alt=\"favicon\" /><div></div>";
		tab.setAttribute("current", "true");
		tab.onclick = () => {
			for (const elem of tabElems)
				elem.removeAttribute("current");

			currentTab = tab;
			tab.setAttribute("current", "true");
			socket.emit("focustab", Array.from(tabElems).indexOf(tab));
		};

		const close = document.createElement("button");
		close.type = "button";
		close.title = "Close";
		close.onclick = (e) => {
			e.preventDefault();
			e.stopPropagation();
			socket.emit("closetab", Array.from(tabElems).indexOf(tab));
		};
		tab.appendChild(close);

		const tabElems = tabs.children;
		for (const elem of tabElems)
			elem.removeAttribute("current");

		currentTab = tab;
		tab.setAttribute("current", "true");
		tabs.appendChild(tab);
	}

	// start socket.io connection
	/**
	 * @type {import("socket.io-client").Socket}
	 */
	const socket = io(location.searchParams.get("sv") || "https://gq.whitespider.eu.org/", {
		path: "/mortes/",
		secure: true,
		upgrade: true,
		timeout: 5000,
		forceNew: true
	});

	window.socket = socket;

	// connection error listeners
	socket.io.on("error", (err) => message("Server connection error. Message: " + err.message));
	socket.io.on("reconnect", () => message(null));
	socket.io.on("reconnect_attempt", () => message("Reconnecting..."));
	socket.io.on("reconnect_failed", () => message("Failed to reconnect"));

	// wait for connection
	message("Connecting to server...");
	await new Promise((resolve) => {
		socket.once("connect", resolve)
	});

	// start new session
	message("Requesting new session...");
	socket.emit("request_new_session", {
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight,
		touch: window.navigator.maxTouchPoints > 0,
		url: location.searchParams.get("q") || "",
		tor: location.searchParams.get("t") === "true"
	});
	const { width, height } = await new Promise(resolve => socket.once("session_ready", resolve));

	container.style.width = width + "px";
	container.style.height = height + "px";
	frame.width = width;
	frame.height = height;
	frame.tabIndex = 0;
	frame.autofocus = true;
	frame.focus({ preventScroll: true });
	message(null);

	document.getElementById("back").onclick = () => socket.emit("goback");
	document.getElementById("forward").onclick = () => socket.emit("goforward");
	document.getElementById("refresh").onclick = () => socket.emit("refresh");
	document.getElementById("new-tab").onclick = () => socket.emit("newtab");
	document.getElementById("menu").onclick = () => socket.emit("sync");

	address.onkeydown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			frame.focus({ preventScroll: true });
			socket.emit("navigate", rewriteURL(address.value, "https://www.google.com/search?q="));
		}
	};

	frame.addEventListener("mousedown", mouseEventHandler, { passive: false });
	frame.addEventListener("mouseup", mouseEventHandler, { passive: false });
	frame.addEventListener("mousemove", mouseEventHandler, { passive: false });
	frame.addEventListener("touchstart", touchEventHandler, { passive: false });
	frame.addEventListener("touchend", touchEventHandler, { passive: false });
	frame.addEventListener("touchmove", touchEventHandler, { passive: false });
	frame.addEventListener("wheel", wheelEventHandler, { passive: false });
	frame.addEventListener("keydown", keyboardEventHandler, { passive: false });
	frame.addEventListener("keyup", keyboardEventHandler, { passive: false });
	frame.addEventListener("click", preventDefault, { passive: false });
	frame.addEventListener("contextmenu", preventDefault, { passive: false });

	socket.on("url", (url) => {
		if (document.activeElement !== address)
			address.value = url;
	});
	socket.on("frame", async (data) => {
		frame.src = "data:image/jpeg;base64," + data;

		let tm = false;
		setTimeout(() => {
			tm = true;
			socket.emit("sync");
		}, 1000);

		await frame.decode();
		if (!tm)
			socket.emit("sync");
	});

	socket.on("tabinfo", (data) => {
		const tab = tabs.children[data.id];
		tab.querySelector("div").textContent = data.title;
		tab.querySelector("img").src = data.favicon;
	});
	socket.on("tabopen", () => guiNewTab());
	socket.on("tabclose", (i) => {
		const elems = tabs.children;
		if (i > 1) {
			const e = elems[i - 1];
			currentTab = e;
			e.setAttribute("current", "true");
		}
		elems[i].remove();
	});

	guiNewTab();
	socket.emit("sync");
})();