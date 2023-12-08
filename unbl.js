"use strict"; (async () => {
	/**
	 * @type {(id: string) => HTMLElement}
	 */
	const $ = (id) => {
		const elem = document.getElementById(id);
		if (elem == null)
			throw new Error("Element does not exist: " + id);
		return elem;
	};
	const msgElem = $("message");

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
				resolve(void 0);
			}
		}, 50);
	});

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

	async function startOrRestoreSession() {
		socket.removeAllListeners();
		socket.emit("request_new_session", connectOptions);

		{
			const { width, height } = await new Promise((resolve) => {
				socket.once("session_ready", (d) => resolve(d));
			});

			container.style.width = width + "px";
			container.style.height = height + "px";
			frame.width = width;
			frame.height = height;
		}

		for (const page of pages) {
			socket.emit("newtab");
			await new Promise((resolve) => {
				socket.once("tabopen", () => resolve(void 0));
			});

			socket.emit("navigate", page.url);
			await new Promise((resolve) => {
				socket.once("tabinfo", (data) => {
					const tab = tabs.children[data.id];
					page.title = tab.querySelector("div").textContent = data.title || "Untitled";
					page.favicon = tab.querySelector("img").src = data.favicon || "/res/empty.ico";
					resolve(void 0);
				});
			});
		}

		socket.on("url", (url) => {
			pages[currentTabId].url = url;
			if (document.activeElement !== address)
				address.value = url;
		});
		socket.on("frame", (data) => {
			frame.src = "data:image/jpeg;base64," + data;
		});
		socket.on("tabinfo", (data) => {
			const { id } = data;
			const tab = tabs.children[id];
			const page = pages[id];
			page.title = tab.querySelector("div").textContent = data.title || "Untitled";
			page.favicon = tab.querySelector("img").src = data.favicon || "/res/empty.ico";
		});
		socket.on("tabopen", () => {
			const tabElem = document.createElement("div");
			tabElem.innerHTML = "<img src=\"res/empty.ico\" width=\"19\" height=\"19\" draggable=\"false\" decoding=\"async\" loading=\"lazy\" alt=\"Site Icon\" /><div></div>";
			tabElem.onclick = () => {
				for (const elem of tabs.children)
					elem.removeAttribute("current");
				tabElem.setAttribute("current", "true");

				socket.emit("focustab", currentTabId = pages.indexOf(page));
			};

			const close = document.createElement("button");
			close.type = "button";
			close.title = "Close";
			close.onclick = (e) => {
				e.preventDefault();
				e.stopPropagation();
				socket.emit("closetab", pages.indexOf(page));
			};
			tabElem.appendChild(close);

			for (const elem of tabs.children)
				elem.removeAttribute("current");
			tabElem.setAttribute("current", "true");

			/**
			 * @type {PageInfo}
			 */
			const page = {
				url: "",
				title: "",
				favicon: ""
			};

			currentTabId = pages.length;
			pages.push(page);
			tabs.appendChild(tabElem);
		});
		socket.on("tabclose", (i) => {
			const elems = tabs.children;

			if (i === currentTabId) {
				if (i > 1)
					elems[currentTabId = i - 1].setAttribute("current", "true");
				else if (pages.length > 0)
					elems[currentTabId = 0].setAttribute("current", "true");
			}

			elems[i].remove();
			pages.splice(i, 1);
		});

		if (currentTabId >= 0)
			socket.emit("focustab", currentTabId);
		else
			socket.emit("newtab");

		message(null);
		frame.loading = "eager";
		frame.decoding = "sync";
		frame.autofocus = true;
		frame.focus({ preventScroll: true });
	}

	const location = new URL(window.location.href);
	const buttons = ["left", "middle", "right", "back", "forward"];

	// html element constants
	const tabs = $("tabs");
	const frame = $("frame");
	const address = $("address");
	const container = $("container");

	/**
	 * @typedef {{ url: string; title: string; favicon: string; }} PageInfo
	 * @type {PageInfo[]}
	 */
	const pages = [];
	const connectOptions = {
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight,
		touch: window.navigator.maxTouchPoints > 0,
		tor: location.searchParams.get("t") === "true"
	};

	/**
	 * @type {number}
	 */
	let currentTabId = -1;

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
	socket.io.on("error", (err) => message("Server connection error. Message: " + err.message));
	socket.io.on("reconnect_attempt", () => message("Reconnecting..."));
	socket.io.on("reconnect_failed", () => message("Failed to reconnect."));

	// reconnect listener
	socket.io.on("reconnect", () => {
		message("Restoring session...");
		startOrRestoreSession().then(() => {
			message(null);
		});
	});

	// wait for socket connection
	message("Connecting to server...");
	await new Promise((resolve) => {
		socket.once("connect", () => resolve(void 0));
	});

	// start new session
	message("Requesting new session...");
	await startOrRestoreSession();

	$("menu").onclick = () => socket.emit("sync");
	$("back").onclick = () => socket.emit("goback");
	$("forward").onclick = () => socket.emit("goforward");
	$("refresh").onclick = () => socket.emit("refresh");
	$("new-tab").onclick = () => socket.emit("newtab");

	address.onkeydown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			e.stopPropagation();

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

	setTimeout(() => {
		const q = location.searchParams.get("q");
		if (q != null && q.length > 0)
			socket.emit("navigate", rewriteURL(q, "https://www.google.com/search?q="));

		message(null);
	}, 500);
})();