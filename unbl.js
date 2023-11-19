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

	/**
	 * @type {<E>(obj: ArrayLike<E>) => E[]}
	 */
	function toArray(obj) {
		const array = [];
		for (let i = 0; i < obj.length; i++) {
			array[i] = obj[i];
		}
		return array;
	}

	function guiNewTab() {
		const tab = document.createElement("div");
		tab.innerHTML = "<img src=\"res/empty.ico\" width=\"19\" height=\"19\" draggable=\"false\" alt=\"favicon\" />";
		tab.setAttribute("current", "true");
		tab.appendChild(document.createElement("div"));
		tab.onclick = () => {
			tabs.children[Symbol.iterator]
			const elems = toArray(tabs.children);
			for (const elem of elems)
				elem.removeAttribute("current");
			tab.setAttribute("current", "true");
			socket.emit("focustab", elems.indexOf(tab));
			currentTab = tab;
		};

		const close = document.createElement("button");
		close.type = "button";
		close.title = "Close";
		close.onclick = (e) => {
			e.stopPropagation();
			socket.emit("closetab", toArray(tabs.children).indexOf(tab));
		};
		tab.appendChild(close);

		for (const elem of tabs.children)
			elem.removeAttribute("current");
		currentTab = tab;
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

	// connection error listeners
	socket.io.on("reconnect", () => message(null));
	socket.io.on("error", () => message("Server connection error"));
	socket.io.on("reconnect_attempt", () => message("Reconnecting..."));
	socket.io.on("reconnect_error", () => message("Failed to reconnect"));

	// wait for connection
	message("Connecting to server...");
	await new Promise((resolve) => {
		socket.once("connect", resolve);
	});

	// start new session
	message("Requesting new session...");
	socket.emit("request_new_session", {
		_width: document.documentElement.clientWidth,
		_height: document.documentElement.clientHeight,
		touch: window.navigator.maxTouchPoints > 0,
		url: location.searchParams.get("q") || "",
		tor: location.searchParams.get("t") === "true"
	});
	const { width, height } = await new Promise(resolve => socket.once("session_ready", resolve));

	container.style.width = width + "px";
	container.style.height = height + "px";
	frame.width = width;
	frame.height = height;
	frame.autofocus = true;
	frame.focus({ preventScroll: true });
	message(null);

	document.getElementById("back").onclick = () => socket.emit("goback");
	document.getElementById("forward").onclick = () => socket.emit("goforward");
	document.getElementById("refresh").onclick = () => socket.emit("refresh");
	document.getElementById("new-tab").onclick = () => socket.emit("newtab");

	address.onkeydown = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
			socket.emit("navigate", rewriteURL(address.value, "https://www.google.com/search?q="));
			address.blur();
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

	socket.on("data", (data) => {
		frame.src = "data:image/jpeg;base64," + data.buffer;
		if (document.activeElement !== address)
			address.value = data.url;
		currentTab.querySelector("div").textContent = data.title;
	});

	socket.on("tabopen", () => guiNewTab());
	socket.on("tabclose", (i) => {
		const elems = toArray(tabs.children);
		elems[i - 1].setAttribute("current", "true");
		elems[i].remove();
	});

	guiNewTab();
	setInterval(() => socket.emit("sync"), 100);
})();