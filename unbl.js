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

		alert(msg, "Error");
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
	// mouse button names, used in server side
	const buttons = ["left", "middle", "right", "back", "forward"];

	// html element constants
	const frameContainer = document.getElementById("frame-container");
	const frameOverlay = document.getElementById("frame-overlay");
	const frame = document.getElementById("frame");
	const tabs = document.getElementById("tabs");
	const address = document.getElementById("address");

	/**
	 * @type {HTMLElement}
	 */
	let currentTab = null;

	/**
	 * @param {string | null} msg 
	 */
	function message(msg) {
		if (msg != null) {
			frameOverlay.textContent = msg;
			frameOverlay.style.display = "block";
		} else frameOverlay.style.display = "none";
	}

	/**
	 * @param {string} s 
	 */
	function isURL(s) {
		try {
			new URL(s);
			return true;
		} catch (err) {
			return false;
		}
	}

	/**
	 * @param {string} s 
	 */
	function isHostname(s) {
		s = s.toLowerCase();

		for (let i = 0; i < s.length; i++) {
			const ch = s.charCodeAt(i);
			if ((ch < 0x30 || ch > 0x39) && (ch < 0x61 || ch > 0x7a) && ch != 0x2d && ch != 0x2e) {
				return false;
			}
		}
		return true;
	}

	/**
	 * @param {string} input 
	 * @param {string} search 
	 */
	function fixURL(input, search) {
		input = input.replace(/\s+/g, " ").trim();

		if (isURL(input))
			return input;

		const slash = input.indexOf("/");
		if (slash > 0) {
			if (isHostname(input.substring(0, slash)))
				return "http://" + input;
		} else {
			if (input.includes(".") && isHostname(input))
				return "http://" + input;
		}

		return search + encodeURIComponent(input);
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
	 * @type {NodeJS.EventEmitter & { readonly io: NodeJS.EventEmitter; }}
	 */
	const socket = io("/", {
		forceNew: true,
		reconnectionDelayMax: 10000
	});

	// connection error listeners
	socket.io.on("reconnect", () => message(null));
	socket.io.on("error", () => message("Server connection error"));
	socket.io.on("reconnect_attempt", () => message("Reconnecting..."));
	socket.io.on("reconnect_error", () => message("Failed to reconnect"));

	// wait for connection
	message("Connecting to server");
	await new Promise(resolve => socket.once("connect", resolve));

	// start new session
	message("Requesting new session");
	socket.emit("request_new_session", {
		_width: document.documentElement.clientWidth,
		_height: document.documentElement.clientHeight,
		touch: window.navigator.maxTouchPoints > 0,
		url: location.searchParams.get("q") || "",
		tor: location.searchParams.get("t") === "true"
	});
	const { width, height } = await new Promise(resolve => socket.once("session_ready", resolve));

	frameContainer.style.width = width + "px";
	frameContainer.style.height = height + "px";
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
			socket.emit("navigate", fixURL(address.value, "https://www.google.com/search?q="));
			address.blur();
		}
	};

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