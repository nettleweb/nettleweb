import * as analytics from "firebase/analytics";
import * as firebase from "firebase/app";
import NettleWeb from "@nettleweb/core";
import config from "./misc/config";
import _logger from "./misc/misc";
import { deflateSync } from "fflate";
import { generate } from "lean-qr";
import { Picker } from "@nettleweb/emoji-picker-lite";
import { Socket, SocketOptions } from "engine.io-client";
import { AES, ArrayBuffer, Base32, Base64, doc, Error, Hex, NTON, Object, Uint8Array, UTF_8, win } from "./misc/ctxfn";

(async () => {
	function $(id: string): HTMLElement {
		const e = doc.getElementById(id);
		if (e != null)
			return e;

		throw new Error("Cannot access element: " + id);
	}

	function q(q: string): HTMLElement {
		const e = doc.querySelector<HTMLElement>(q);
		if (e != null)
			return e;

		throw new Error("Cannot access element selector: " + q);
	}

	function error(message: string | nul) {
		if (message != null) {
			errEl.textContent = message;
			errEl.style.display = "block";
		} else errEl.style.display = "none";
	}

	function optURL(s: string): URL | null {
		try {
			return new URL(s);
		} catch (err) {
			return null;
		}
	}

	function shuffle<E extends ListLike<any>>(list: E): E {
		for (let i = list.length - 1; i >= 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[list[i], list[j]] = [list[j], list[i]];
		}
		return list;
	}

	function proxyURL(url: string): string {
		return url.startsWith(proxyBase) ? url : (proxyBase + config.c + "?W=" + encodeURIComponent(Base64.encode(deflateSync(UTF_8.encode(url), { mem: 10, level: 9 }))));
	}

	function dateToStr(date: number): string {
		return new Date(date).toLocaleString("POSIX", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false
		});
	}

	function escapeHTML(text: string): string {
		return text.replace(/[&<"']/g, (ch) => {
			switch (ch) {
				case "&":
					return "&amp;";
				case "<":
					return "&lt;";
				case ">":
					return "&gt;";
				case "\"":
					return "&quot;";
				default:
					return "";
			}
		});
	}

	async function optGetText(url: string, cache?: RequestCache | nul): Promise<string | null> {
		try {
			const res = await fetch(url, {
				cache: cache || "force-cache",
				method: "GET"
			});
			return res.ok ? await res.text() : null;
		} catch (err) {
			return null;
		}
	}

	async function resizeImage(blob: Blob, width: number, height?: number | nul): Promise<Blob | null> {
		try {
			const img = new Image(512, 512);
			img.loading = "eager";
			img.decoding = "sync";
			img.draggable = false;

			{
				const url = URL.createObjectURL(blob);
				img.src = url;
				await img.decode();
				URL.revokeObjectURL(url);
			}

			let nw: number = img.naturalWidth;
			let nh: number = img.naturalHeight;

			{
				const ratio = height == null ? nh / nw : height / width;
				if (nh >= (nw * ratio))
					nh = Math.floor(nw * ratio);
				else
					nw = Math.floor(nh / ratio);
			}

			if ((width = Math.min(width, nw)) < 10 || (height = height == null ? nh : Math.min(height, nh)) < 10)
				throw new Error("Image must have at least 100 pixels.");

			const canvas = new OffscreenCanvas(width, height);
			const context = canvas.getContext("2d", { alpha: false });

			if (context == null)
				throw new Error("Failed to initialize canvas context.");

			context.imageSmoothingEnabled = true;
			context.imageSmoothingQuality = "high";
			context.drawImage(img, 0, 0, nw, nh, 0, 0, width, height);

			return await canvas.convertToBlob({
				type: "image/jpeg",
				quality: 100
			});
		} catch (err) {
			console.error("Image resize error: ", err);
			return null;
		}
	}

	function sioBuf(sid: number, path: SIOPath, data: any): ArrayBuffer {
		const buf = new ArrayBuffer((data = NTON.encode(data)).byteLength + 10);
		new DataView(buf, 1, 8).setFloat64(0, sid, true);

		{
			const view = new Uint8Array(buf);
			view[0] = 3;
			view[9] = path;
			view.set(data, 10);
		}

		return buf;
	}

	function fetchSIO(path: SIOPath, data?: any): Promise<any> {
		return new Promise(($, _) => {
			const now = performance.now();
			const buf = sioBuf(now, path, data);
			socket.send(buf, { compress: true });
			sioreq.set(now, [$, _, buf]);
		});
	}

	function initStorage(): AbstractStorage {
		try {
			const { localStorage: ls } = win;
			if (ls == null)
				throw new Error("Storage interface not available.");

			const key = "___whitespider___";
			const val = Date.now().toString(36);

			ls.setItem(key, val);
			if (ls.getItem(key) !== val)
				throw new Error("Storage test failed: value mismatch");

			return ls;
		} catch (err) {
			return sstub;
		}
	}

	function createFrame(url: string) {
		frame.appendChild(createFrameElement(url));
		frameView.style.display = "block";
	}

	function createPRQEmbed(url: string) {
		const prq = (winTop || win).PaymentRequest;
		if (typeof prq !== "function") {
			error("Error: Your browser does not support this feature.");
			return;
		}

		new prq([
			{
				data: [url],
				supportedMethods: Constants.origin + "/res/pay.json",
			}
		], {
			id: "nettleweb_premium",
			total: {
				label: "Premium",
				amount: {
					value: "200",
					currency: "USD"
				},
				pending: true
			},
			modifiers: [],
			displayItems: []
		}).show();
	}

	function createGameURL(file: string, gid: string): string {
		if (file.startsWith("https://"))
			return file;

		let url = proxyBase + "g/" + gid + "/";

		if (file.startsWith("/games/flash/")) {
			const i = file.indexOf("/", 13);
			if (i > 13)
				url += file.slice(i + 1);
		}

		return url;
	}

	function createGameFrame(type: string, url: string | string[], window?: Window | nul): HTMLElement {
		if (type === "html5" && typeof url === "string")
			return createFrameElement(url);

		window ||= win;
		const sid = performance.now().toString(36);
		const el = createFrameElement("/player.html?s=" + sid);

		const cb = ({ data, origin, source }: MessageEvent) => {
			if (origin === window.origin && data === sid) {
				if (source != null) {
					source.postMessage({
						id: type,
						url: url
					}, { targetOrigin: origin });
				}
				window.removeEventListener("message", cb);
			}
		};
		window.addEventListener("message", cb, { passive: true });

		return el;
	}

	function createGameElement(game: GameInfo): HTMLElement {
		const gid = game.date.toString(36);
		const name = game.name;

		const elem = mkElem("button");
		elem.type = "button";
		elem.title = "Play " + name;
		elem.className = "game";
		elem.style.backgroundImage = "url(\"" + proxyBase + "p/" + gid + "\")";

		elem.onclick = (e) => {
			if (!e.ctrlKey) {
				e.preventDefault();
				e.stopPropagation();
				playGame(game).catch((err) => {
					consoleLog(err);
					error("Failed to launch game. Message: " + err);
				});
			}
		};

		{
			const e = mkElem("div");
			e.textContent = name;
			elem.appendChild(e);
		}

		if (game.file.startsWith("https://")) {
			const e = mkElem("img");
			e.src = "/res/cloud.svg";
			e.alt = "Cloud";
			e.title = "Embedded from third-party servers";
			e.width = 24;
			e.height = 24;
			e.loading = "lazy";
			e.decoding = "async";
			e.draggable = false;
			elem.appendChild(e);
		}

		switch (game.type) {
			case "html5":
				{
					const e = mkElem("span");
					e.textContent = "HTML5";
					e.style.background = "#c04000";
					elem.appendChild(e);
				}
				break;
			case "flash":
				{
					const e = mkElem("span");
					e.textContent = "Flash";
					e.style.background = "#008000";
					elem.appendChild(e);
				}
				break;
			case "dos":
				{
					const e = mkElem("span");
					e.textContent = "Dos";
					e.style.background = "#0000ff";
					elem.appendChild(e);
				}
				break;
			default:
				elem.style.backgroundImage = "url(\"/res/preview.svg\")";
				break;
		}

		return elem;
	}

	function createFrameElement(url: string): HTMLElement {
		if (url.startsWith("https://") && !url.startsWith(proxyBase)) {
			const e = mkElem("iframe");
			e.name = "Frame";
			e.width = "1024";
			e.height = "768";
			e.loading = "lazy";
			e.referrerPolicy = "no-referrer";
			e.allowFullscreen = true;
			e.setAttribute("sandbox", "allow-forms allow-popups allow-scripts allow-same-origin allow-pointer-lock");
			e.setAttribute("scrolling", "no");
			e.setAttribute("frameborder", "0");
			e.setAttribute("credentialless", "true");
			e.setAttribute("allowpaymentrequest", "true");

			{
				const src = "data:application/xhtml+xml;base64," + Base64.encode(UTF_8.encode(`<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="referrer" content="no-referrer" />
		<meta name="viewport" content="width=device-width,initial-scale=1" />
		<base href="${orig}" target="_blank" />
		<link rel="icon" type="image/x-icon" href="res/google.ico" />
		<link rel="stylesheet" type="text/css" href="data:text/css;base64,Ym9keSxlbWJlZCxpZnJhbWV7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpibG9jazt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO21hcmdpbjowcHg7cGFkZGluZzowcHg7Ym9yZGVyOm5vbmU7b3ZlcmZsb3c6aGlkZGVuO30K" />
		<title>Google</title>
	</head>
	<body>
		<embed type="text/plain" width="1024" height="768" src="${escapeHTML(url)}" />
	</body>
</html>`));

				e.addEventListener("load", () => {
					const win = e.contentWindow;
					if (win != null) {
						win.stop();
						win.focus();
						win.location.replace(src);
					} else e.src = src; // fallback
				}, { once: true, passive: true });

				frames.set(e, url);
			}

			return e;
		} else {
			const e = mkElem("embed");
			e.src = url;
			e.type = "text/html";
			e.width = "1024";
			e.height = "768";
			return e;
		}
	}

	function restoreRootPath() {
		unblEndSes = null;
		if (!cloaking)
			doc.title = "NettleWeb";

		his.replaceState(void 0, "", "/");
	}

	function createNewWindow(): Window | null {
		const window = win.open(void 0, "_blank", "");
		if (window != null) {
			window.focus();
			return window;
		}
		return window;
	}

	function openPopupWindow(url: string) {
		const win = createNewWindow();
		if (win == null) {
			error("Please allow popups in your browser settings and try again.");
			return;
		}
		win.location.replace(url);
	}

	function openInNewWindow(elem: Element, win?: Window | nul) {
		if ((win ||= createNewWindow()) == null) {
			error("Please allow popups in your browser settings and try again.");
			return;
		}

		const doc = win.document;
		doc.head.innerHTML = "<meta charset=\"utf-8\" /><meta name=\"referrer\" content=\"no-referrer\"/><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/><base href=\"" + win.origin + "\" target=\"_blank\" /><link rel=\"icon\" type=\"image/x-icon\" href=\"res/google.ico\" /><link rel=\"stylesheet\" type=\"text/css\" href=\"data:text/css;base64,Ym9keSxlbWJlZCxpZnJhbWV7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpibG9jazt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO21hcmdpbjowcHg7cGFkZGluZzowcHg7Ym9yZGVyOm5vbmU7b3ZlcmZsb3c6aGlkZGVuO30K\"/>";
		doc.body.appendChild(elem);
		doc.title = "Google";
	}

	function injectAnchorFrame() {
		const e = mkElem("iframe");
		e.name = "API Anchor";
		e.width = "1024";
		e.height = "768";
		e.loading = "lazy";
		e.referrerPolicy = "no-referrer";
		e.allowFullscreen = true;
		e.setAttribute("id", "anchor");
		e.setAttribute("scrolling", "no");
		e.setAttribute("frameborder", "0");
		e.setAttribute("credentialless", "true");
		e.setAttribute("allowpaymentrequest", "true");

		e.addEventListener("load", () => {
			const win = e.contentWindow;
			if (win != null) {
				win.stop();
				win.focus();
				win.location.replace(Constants.origin + "/?m=1");
			} else e.src = Constants.origin + "/?m=1"; // fallback
		}, { once: true, passive: true });

		docBody.appendChild(e);
	}

	const loc = win.location;
	const his = win.history;
	const orig = win.origin;
	const errEl = $("error");
	const script = doc.currentScript;
	const mkElem: <K extends string>(tag: K, opt?: any) => K extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[K] : Element = doc.createElementNS.bind(doc, "http://www.w3.org/1999/xhtml") as any;
	const install = $("install");
	const content = $("content");
	const hasHead = doc.contentType !== "image/svg+xml";
	const docBody = doc.body || content.parentElement!; // workaround for svg mode
	const manifest = navigator.onLine ? await optGetText("/manifest.json", "no-cache") : null;

	if (doc.readyState !== "complete") {
		await new Promise<void>((resolve) => {
			const callback = () => {
				if (doc.readyState === "complete") {
					doc.removeEventListener("readystatechange", callback);
					setTimeout(resolve, 100, null);
				}
			};
			doc.addEventListener("readystatechange", callback, { passive: true });
		});
	}

	win.focus();
	doc.title = "NettleWeb";

	let winTop: Window | nul;
	try {
		const top = win.top;
		if (top != null)
			winTop = top === win ? win : top.origin === orig ? top : null;
	} catch (err) {
		// ignore
	}

	{
		// chrome blocks all cookies in data urls, reopen it in a new tab to fix this
		if (win !== winTop) {
			if (loc.ancestorOrigins?.item(0) === "null") {
				const elem = mkElem("div");
				elem.style.padding = "15px";
				elem.textContent = "Click here to continue";
				elem.onclick = () => {
					const e = mkElem("embed");
					e.type = "text/plain";
					e.width = "1280";
					e.height = "720";
					e.src = Constants.rootI;
					openInNewWindow(e);
				};
				docBody.innerHTML = "";
				docBody.appendChild(elem);
				return;
			}
			if (loc.origin !== Constants.origin) {
				loc.replace(Constants.rootI);
				return;
			}
		}
	}

	const sstub: globalThis.AbstractStorage = Object.freeze(Object.setPrototypeOf({
		length: 0,
		clear: () => { },
		setItem: () => { },
		getItem: () => null,
		removeItem: () => { }
	}, null));

	const mirror = win !== winTop || (orig !== Constants.origin && orig !== "http://localhost:8000");
	const frames = new WeakMap<Element, string>();
	const sioreq = new Map<number, any[]>();
	const storage = initStorage();

	const frame = $("frame");
	const frameView = $("frame-view");
	const accnBtn = $("accn-btn");
	const nmsgBtn = $("nmsg-btn") as HTMLButtonElement;
	const sideMenu = $("side-menu") as HTMLInputElement;

	let fba: analytics.Analytics | nul;
	let user: string | nul;
	let likes: number[] = [];
	let myuid: string | nul;
	let socket: Socket;
	let cloaking: boolean;
	let gameList: GameList;
	let proxyBase: string;
	let unblEndSes: (() => void) | null = null;
	let loadAccnInfo: () => void;

	// lateinit functions
	let openURL: (url: string) => Promise<void>;
	let openChat: (info: UserInfo) => Promise<void>;
	let playGame: (game: GameInfo) => Promise<void>;
	let openVideo: (vid: string) => void; // TODO!
	let openProfile: (uid: string) => Promise<void>;
	let openChannel: (chId: string) => Promise<void>;
	let initGameList: () => Promise<void>;

	// lateinit page openers
	let openHomePage: () => void;
	let openAppsPage: () => void;
	let openChatPage: () => void;
	let openGamePage: () => void;
	let openStrmPage: () => void;
	let openInfoPage: () => void;

	// socket message callback
	let onLogin: (() => void) | null = null;
	let onLoginError: ((msg: string) => void) | null = null;
	let onGPTResponse: ((msg: string) => void) | null = null;
	let onGPTResError: ((err: string) => void) | null = null;
	let onCommentCreate: ((id: number, msg: Message) => void) | null = null;
	let onCommentUpdate: ((id: number, msg: string, text: string) => void) | null = null;
	let onMessageCreate: ((ch: string, msg: Message) => void) | null = null;
	let onMessageDelete: ((ch: string, msg: string) => void) | null = null;
	let onMessageUpdate: ((ch: string, msg: string, text: string) => void) | null = null;

	if (win.isSecureContext ?? loc.protocol === "https:") {
		if (storage !== sstub && manifest != null) {
			const version = JSON.parse(manifest).version;
			if (version !== storage.getItem("__mf_version")) {
				docBody.innerHTML = "Updating contents...";
				for (const key of await caches.keys())
					await caches.delete(key);

				storage.setItem("__mf_version", version);
				loc.reload();
				return;
			}

			$("version").textContent = "v" + version;
			user = storage.getItem("__secrets_") || void 0;
		}

		try {
			const nsw = win.navigator.serviceWorker;
			if (nsw != null) { // This property is undefined in Firefox private tab
				await nsw.register("/sw.js", {
					type: "classic",
					scope: "/",
					updateViaCache: "none"
				});
				await nsw.ready;
			}
		} catch (err) { // ignore
		}
	}

	{
		const aes = new AES(Hex.decode(NettleWeb.sha256(Constants.domain)));
		const key = config["_Zetta"];
		const data = config["_Yotta"];

		delete config["_Zetta"];
		delete config["_Yotta"];

		for (const k of Object.keys(config))
			config[k] = UTF_8.decode(aes.decryptCTR(Base64.decode(config[k]), Hex.decode(NettleWeb.md5(k))));
		for (let i = 0; i < 16; i++)
			key[i] += ((i % 3) + 1) * 2 - 2022;

		if (config["_g"].slice(6, 8) !== ":(") {
			error("Keyring decoding error!");
			return;
		}

		_logger["_"](win, UTF_8.decode(aes.decryptCTR(data, key)));
	}

	const consoleLog = _logger["$"];

	{
		const { _a, _b, _c, _e, _f, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r,
			_s, _t, _u, _z, _Z, _Y } = config;

		if ((() => {
			consoleLog(_a, _b);
			const url = new URL(loc.href);
			const host = url.hostname;
			const origin = url.origin;

			switch (url.protocol) {
				case "http:":
					if (host !== "localhost") {
						url.protocol = "https:";
						loc.replace(url.href);
						return false;
					}
					break;
				case "https:":
					break;
				default:
					return true;
			}

			{
				const e = (doc as any)[_o](_h);
				if (hasHead && (e == null || e[_j](_i) !== _l))
					return true;
			}

			for (const e of (doc as any)[_m](_n)) {
				switch (e[_j]("type") || "") {
					case "":
					case "text/javascript":
					case "application/javascript":
						break;
					default:
						e.remove();
						return true;
				}

				const src = e[_j]("src");
				if (!src || e.textContent) {
					e.remove();
					return true;
				}

				const url = new URL(src.startsWith("//") ? "https:" + src : src, origin);
				if (url.origin !== origin) {
					switch (url.protocol) {
						case "https":
							const parts = url.host.split(".");
							const length = parts.length;

							if (parts[length - 1] === "com") {
								const dom = parts[length - 2];
								if (dom.indexOf("google") >= 0 || dom.indexOf("firebase") >= 0)
									continue;
							}
							break;
						case "chrome-extension:": // more flexible checking
							e.remove();
							continue;
						default:
							break;
					}

					e.remove();
					return true;
				}
			}

			const sigFail = script == null || (script as any)[_j](_s) !== _t + _u || (script as any)[_j](_z) !== _Z;
			const { "q": e, "r": g, "p": a, "s": b, "y": c, "e": z } = config;

			if (e != null && g != null) {
				config.X = e + g + b + z + "3.sha" + c + a + "/";
				config.Y = e + g + config.b + "/";
			} else return true;

			return (hasHead && (q(_Y) as any)[_j](_h.slice(10, 14)).slice(0, _c) !== _f) ||
				(doc as any)[_o](_p) == null ||
				(doc as any)[_o](_q) == null ||
				(doc as any)[_r] !== _a.slice(2, 11) || sigFail;
		})()) {
			consoleLog(_e, _k);
			setTimeout(() => {
				loc.replace(Constants.root);
			}, 300);
			return;
		}

		for (const k of Object.getOwnPropertyNames(config)) {
			if (k.length === 2)
				delete config[k];
		}
	}

	// {
	// 	const n = win.Notification;
	// 	if (n != null) {
	// 		let p = n.permission;
	// 		while (p === "default")
	// 			p = await n.requestPermission();

	// 		if (p === "denied")
	// 			error("Error: Permission denied. Certain features might not behave as expected.");
	// 	}
	// }

	win.onerror = (_, file, line, col, err) => {
		const msg = "Unhandled error at " + (file || "unknown source") + " " + (line || "X") + ":" + (col || "X") + "\n\n Message: " + String(err);
		console.error(msg, err);
		errEl.textContent = msg;
		errEl.style.display = "block";
	};
	win.onappinstalled = (e) => {
		e.preventDefault();
		e.stopPropagation();
		install.style.display = "none";
	};
	win.onbeforeinstallprompt = (e) => {
		e.preventDefault();
		e.stopPropagation();

		install.style.display = "block";
		install.onclick = () => {
			e.prompt().catch((err) => {
				error("Failed to show install prompt. Message: " + String(err));
			});
		};
	};
	win.onpopstate = win.onhashchange = (e: Event) => {
		e.preventDefault();
		e.stopPropagation();
		openURL(loc.hash);
	};

	errEl.onclick = () => {
		errEl.innerHTML = "";
		errEl.style.display = "none";
	};
	$("frame-close").onclick = () => {
		frame.innerHTML = "";
		frameView.style.display = "none";
	};
	$("frame-expand").onclick = (e) => {
		if (doc.fullscreenEnabled && !e.ctrlKey) {
			frame.requestFullscreen({ navigationUI: "hide" }).catch((err) => {
				error("Failed to enter fullscreen mode. Message: " + String(err));
			});
		} else {
			const elem = frame.firstElementChild;
			if (elem != null) {
				const url = frames.get(elem) || "";
				if (url.startsWith("https://"))
					openInNewWindow(createFrameElement(url));
			}
			frame.innerHTML = "";
			frameView.style.display = "none";
		}
	};

	$("content-page").outerHTML = _logger.l;

	{
		const favicon = hasHead ? q("link[rel*='icon']") : null;
		const overlay = $("overlay");
		const notice = $("notice");
		const status = $("status");
		const theme = $("theme") as HTMLSelectElement;
		const image = $("image") as HTMLInputElement;
		const font = $("font") as HTMLSelectElement;
		const curl = $("cdn") as HTMLInputElement;
		const burl = $("backend") as HTMLInputElement;
		const tabn = $("tabname") as HTMLInputElement;
		const tabi = $("tabicon") as HTMLInputElement;
		const sm = $("stealth-mode") as HTMLSelectElement;

		const options: SocketOptions = {
			path: "/K7e8UQ1JqnTj/",
			secure: true,
			upgrade: true,
			protocols: [],
			transports: ["polling", "websocket"],
			timestampParam: "x",
			addTrailingSlash: true,
			timestampRequests: true,
			rejectUnauthorized: true,
			closeOnBeforeunload: true
		};

		let server: string | undefined;
		let proxyDef: string | undefined;
		let themeCSS: Element | undefined;

		function createSocket(server: string) {
			socket = new Socket(server, options);
			status.innerHTML = "Connecting...";
			status.style.color = "#808000";

			socket.on("open", () => {
				status.title = "";
				status.innerHTML = "\u2713Connected";
				status.style.color = "#008000";
			});
			socket.on("close", (msg) => {
				status.title = msg;
				status.innerHTML = "\u2715Disconnected";
				status.style.color = "#ff0000";

				// attempt to reconnect after 5 seconds
				setTimeout(createSocket, 5000, server);
			});
			socket.on("message", (data: ArrayBuffer) => {
				const buf = new Uint8Array(data, 0, data.byteLength);
				switch (buf[0]) {
					case 1: // login response
						if (typeof myuid !== "string")
							myuid = UTF_8.decode(buf.subarray(1));
						if (onLogin != null)
							onLogin();
						break;
					case 2: // login error
						if (onLoginError != null)
							onLoginError(UTF_8.decode(buf.subarray(1)));
						break;
					case 3: // annoncement
						if (buf.byteLength > 1) {
							notice.textContent = UTF_8.decode(buf.subarray(1));
							notice.style.display = "block";
						}
						break;
					case 4: // notification
						nmsgBtn.setAttribute("data-unread", "");
						break;
					case 5: // comment create
						if (onCommentCreate != null) {
							const data = JSON.parse(UTF_8.decode(buf.subarray(1)));
							onCommentCreate(data[0], data[1]);
						}
						break;
					case 6: // comment update
						if (onCommentUpdate != null) {
							const data = JSON.parse(UTF_8.decode(buf.subarray(1)));
							onCommentUpdate(data[0], data[1], data[2]);
						}
						break;
					case 7: // message create
						if (onMessageCreate != null) {
							const data = JSON.parse(UTF_8.decode(buf.subarray(1)));
							onMessageCreate(data[0], data[1]);
						}
						break;
					case 8: // message delete
						if (onMessageDelete != null) {
							const data = JSON.parse(UTF_8.decode(buf.subarray(1)));
							onMessageDelete(data[0], data[1]);
						}
						break;
					case 9: // message update
						if (onMessageUpdate != null) {
							const data = JSON.parse(UTF_8.decode(buf.subarray(1)));
							onMessageUpdate(data[0], data[1], data[2]);
						}
						break;
					case 10: // GPT response
						if (onGPTResponse != null)
							onGPTResponse(UTF_8.decode(buf.subarray(1)));
						break;
					case 11: // GPT error response
						if (onGPTResError != null)
							onGPTResError(UTF_8.decode(buf.subarray(1)));
						break;
					case 12:
						{
							const key = new DataView(data, 1, 8).getFloat64(0, true);
							const cb = sioreq.get(key);
							if (cb != null) {
								cb[0](NTON.decode(buf.subarray(9)));
								sioreq.delete(key);
							}
						}
						break;
					case 13:
						{
							const key = new DataView(data, 1, 8).getFloat64(0, true);
							const cb = sioreq.get(key);
							if (cb != null) {
								cb[1](UTF_8.decode(buf.subarray(9)));
								sioreq.delete(key);
							}
						}
						break;
					default:
						consoleLog("[WARN] Received invalid message ID: ", buf[0]);
						break;
				}
			});

			socket.binaryType = "arraybuffer";
			if (user != null)
				socket.send(UTF_8.encode("\x01" + user)); // login

			// re-fetch interrupted messages
			for (const [, , buf] of sioreq.values())
				socket.send(buf, { compress: true });
		}

		function updateBackend(value: string) {
			if (server == null)
				server = config.X || "";
			if (socket != null)
				socket.close(); // ensure socket is closed to avoid memory leaks

			createSocket(value || server || "https://service.nettleweb.com/");
		}

		function updateCDN(value: string) {
			if (proxyDef == null)
				proxyDef = config.Y || "";

			proxyBase = value || proxyDef || "https://cdn.nettleweb.com/Zetta/";
		}

		function updateFont(value: string) {
			if (value === "mono")
				docBody.style.fontFamily = "\"Ubuntu Mono\", monospace";
			else
				docBody.style.removeProperty("font-family");
		}

		function updateImage(value: string) {
			if (value.startsWith("data:image/jpeg;base64,"))
				content.style.background = "url(\"" + value + "\")";
			else
				content.style.removeProperty("background");
		}

		function updateTheme(value: string) {
			if (themeCSS == null) {
				themeCSS = mkElem("style");
				themeCSS.setAttribute("type", "text/css");
				themeCSS.textContent = "@import url(\"/index.dark.css\");";
				(doc.head || doc.documentElement).appendChild(themeCSS);
			}

			switch (value) {
				case "light":
					themeCSS.textContent = "";
					themeCSS.removeAttribute("media");
					break;
				case "dark":
					themeCSS.textContent = "@import url(\"/index.dark.css\");";
					themeCSS.removeAttribute("media");
					break;
				default:
					themeCSS.textContent = "@import url(\"/index.dark.css\");";
					themeCSS.setAttribute("media", "all and (prefers-color-scheme: dark)");
					break;
			}
		}

		function updateTabName(value: string) {
			if (value.length > 0) {
				cloaking = true;
				doc.title = value;
			} else {
				cloaking = false;
				doc.title = "NettleWeb";
			}
		}

		function updateTabIcon(value: string) {
			if (favicon != null) {
				if (value.startsWith("data:image/jpeg;base64,")) {
					favicon.setAttribute("type", "image/jpeg");
					favicon.setAttribute("href", value);
				} else {
					favicon.setAttribute("type", "image/x-icon");
					favicon.setAttribute("href", "favicon.ico");
				}
			}
		}

		function updateStealthMode(value: string) {
			switch (value) {
				case "blur":
					doc.onblur = doc.onmouseleave = () => {
						docBody.setAttribute("style", "filter: blur(15px);");
					};
					doc.onmousedown = doc.ontouchstart = () => {
						docBody.removeAttribute("style");
					};

					overlay.innerHTML = "";
					overlay.removeAttribute("data-x");
					content.setAttribute("data-x", "");
					break;
				case "blank":
				case "google":
					doc.onblur = doc.onmouseleave = () => {
						content.removeAttribute("data-x");
						overlay.setAttribute("data-x", "");
					};
					doc.onmousedown = doc.ontouchstart = () => {
						overlay.removeAttribute("data-x");
						content.setAttribute("data-x", "");
					};
					overlay.innerHTML = value === "blank" ? "" : "<iframe width=\"1024\" height=\"768\" allowfullscreen=\"true\" allowpaymentrequest=\"true\" name=\"Frame\" allow=\"fullscreen payment\" loading=\"lazy\" scrolling=\"no\" frameborder=\"0\" credentialless=\"true\" referrerpolicy=\"no-referrer\" src=\"https://www.google.com/webhp?igu=1\"></iframe>";
					break;
				default:
					overlay.innerHTML = "";
					overlay.removeAttribute("data-x");
					content.setAttribute("data-x", "");
					doc.onblur = doc.onmouseleave = doc.onmousedown = doc.ontouchstart = null;
					break;
			}
		}

		theme.onchange = () => {
			const value = theme.value;
			updateTheme(value);
			storage.setItem("__set_theme", value);
		};
		image.onchange = async () => {
			const file = image.files?.item(0);
			if (file != null) {
				if (file.size > 10485760) {
					error("Error: Selected file is too large.");
					return;
				}

				const blob = await resizeImage(file, 1280);
				if (blob == null) {
					error("Error: Failed to decode image file.");
					return;
				}

				const value = "data:image/jpeg;base64," + Base64.encode(new Uint8Array(await blob.arrayBuffer()));
				updateImage(value);
				storage.setItem("__set_image", value);
			} else {
				updateImage("")
				storage.setItem("__set_image", "");
			}
		};
		font.onchange = () => {
			const value = font.value;
			updateFont(value);
			storage.setItem("__set_font", value);
		};
		burl.onblur = () => {
			const url = optURL(burl.value.trim());
			if (url != null) {
				const href = url.href;
				updateBackend(burl.value = href);
				storage.setItem("__backendURL_", href);
			} else {
				updateBackend(burl.value = "");
				storage.removeItem("__backendURL_");
			}
		};
		curl.onblur = () => {
			const url = optURL(curl.value.trim());
			if (url != null) {
				const href = url.href;
				updateCDN(curl.value = href);
				storage.setItem("__cdn__", href);
			} else {
				updateCDN(curl.value = "");
				storage.removeItem("__cdn__");
			}
		};
		tabn.onblur = () => {
			const value = tabn.value.trim();
			updateTabName(value);
			storage.setItem("__set_tabn", value);
		};
		tabi.onchange = async () => {
			const file = tabi.files?.item(0);
			if (file != null) {
				if (file.size > 10485760) {
					error("Error: Selected file is too large.");
					return;
				}

				const blob = await resizeImage(file, 128, 128);
				if (blob == null) {
					error("Error: Failed to decode image file.");
					return;
				}

				const value = "data:image/jpeg;base64," + Base64.encode(new Uint8Array(await blob.arrayBuffer()));
				updateTabIcon(value);
				storage.setItem("__set_tabi", value);
			} else {
				updateTabIcon("");
				storage.setItem("__set_tabi", "");
			}
		};
		sm.onchange = () => {
			const value = sm.value;
			updateStealthMode(value);
			storage.setItem("__set_sm", value);
		};

		updateBackend(burl.value = storage.getItem("__backendURL_") || "");
		updateCDN(curl.value = storage.getItem("__cdn__") || "");
		updateFont(font.value = storage.getItem("__set_font") || "normal");
		updateImage(storage.getItem("__set_image") || "");
		updateTheme(theme.value = storage.getItem("__set_theme") || "default");
		updateTabName(tabn.value = storage.getItem("__set_tabn") || "");
		updateTabIcon(tabi.value = storage.getItem("__set_tabi") || "");
		updateStealthMode(sm.value = storage.getItem("__set_sm") || "disabled");
	}

	{
		const searchInput = q("#search>input") as HTMLInputElement;

		$("search").onsubmit = (e) => {
			e.preventDefault();
			e.stopPropagation();

			const value = searchInput.value.trim();
			if (value.length > 0)
				createFrame("/search.html?q=" + encodeURIComponent(value));
		};
		$("clear-data").onclick = async () => {
			for (const key of await caches.keys())
				await caches.delete(key);

			storage.clear();
			loc.reload();
		};
		$("clear-cache").onclick = async () => {
			for (const key of await caches.keys())
				await caches.delete(key);

			loc.reload();
		};
	}

	{
		const gameContainer = $("game-container");
		const gameComments = $("comments");
		const gamePlayer = $("player");
		const gameShare = $("share");
		const gameLike = $("like") as HTMLButtonElement;
		const gamePage = $("game-page");
		const gameCode = $("ecode");
		const gameEdit = $("edit") as HTMLButtonElement;
		const gameName = $("name");
		const gameType = $("type");
		const gameTags = $("tags");
		const gameDate = $("date");
		const gameUser = $("user");
		const gameDesc = $("desc");
		const gameId = $("code");

		const lock = $("lock");
		const comm = $("comm") as HTMLTextAreaElement;
		const post = $("post") as HTMLTextAreaElement;
		const eName = $("e-name") as HTMLInputElement;
		const eTags = $("e-tags") as HTMLInputElement;
		const eDesc = $("e-desc") as HTMLTextAreaElement;
		const submit = $("e-subm") as HTMLButtonElement;
		const editor = $("editor");
		const sGames = $("s-games");
		const loadmore = $("loadmore");
		const controller = $("controller");

		const gameBtn = $("game-btn") as HTMLButtonElement;
		const gameBtn2 = $("goto-games") as HTMLButtonElement;
		const gamesPage = $("games-page");
		const gnavBack = $("gnav-back") as HTMLButtonElement;
		const gnavForward = $("gnav-forward") as HTMLButtonElement;
		const gnavPageNo = $("gnav-page-no") as HTMLInputElement;
		const gnavPageCount = $("gnav-page-count");

		const pages: GameList[] = [];

		let order: string = "p";
		let match: string = "all";
		let search: string = "";
		let currentPage: number = 0;
		let currentGame: [string, string, string] | null = null;
		let gameListInitLock: Promise<void> | null = null;

		{
			const gameSearch = $("game-search") as HTMLFormElement;
			const searchInput = q("#game-search>input") as HTMLInputElement;

			let __timer__: number = 0;

			gameSearch.onsubmit = (e) => {
				e.preventDefault();
				e.stopPropagation();

				search = searchInput.value.trim().toLowerCase();
				clearTimeout(__timer__);
				updateGameList();
			};
			searchInput.onblur = () => {
				search = searchInput.value.trim().toLowerCase();
				clearTimeout(__timer__);
				updateGameList();
			};
			searchInput.oninput = () => {
				clearTimeout(__timer__);
				__timer__ = setTimeout(() => {
					search = searchInput.value.trim().toLowerCase();
					updateGameList();
				}, 1000);
			};
		}
		{
			const buttons = doc.querySelectorAll<HTMLElement>("#game-category>ul>li>button");
			for (const elem of buttons) {
				elem.onclick = () => {
					for (const e of buttons)
						e.removeAttribute("data-current");

					match = elem.getAttribute("data-match") || "all";
					elem.setAttribute("data-current", "");
					updateGameList();
				};
			}
		}
		{
			const elem = $("game-sort") as HTMLSelectElement;
			elem.value = order = storage.getItem("__gamesortorder") || "p";
			elem.onchange = () => {
				storage.setItem("__gamesortorder", order = elem.value);
				updateGameList();
			};
		}

		function matchGameList(): GameList {
			switch (match) {
				case "all":
					return search.length === 0 ? [...gameList] : gameList.filter((e) => e.name.toLowerCase().indexOf(search) >= 0 || e.tags.indexOf(search) >= 0);
				case "dos":
					return gameList.filter((e) => e.type === "dos" && (search.length === 0 || e.name.toLowerCase().indexOf(search) >= 0 || e.tags.indexOf(search) >= 0));
				case "flash":
					return gameList.filter((e) => e.type === "flash" && (search.length === 0 || e.name.toLowerCase().indexOf(search) >= 0 || e.tags.indexOf(search) >= 0));
				case "html5":
					return gameList.filter((e) => e.type === "html5" && (search.length === 0 || e.name.toLowerCase().indexOf(search) >= 0 || e.tags.indexOf(search) >= 0));
				default:
					return gameList.filter((e) => e.tags.split(",").indexOf(match) >= 0 && (search.length === 0 || e.name.toLowerCase().indexOf(search) >= 0));
			}
		}

		function updateGameList() {
			currentPage = 0;
			pages.length = 0;

			const list = matchGameList();
			if (list.length === 0) {
				gnavBack.disabled = true;
				gnavForward.disabled = true;
				gameContainer.innerHTML = "No matching results found :(";
				return;
			}

			switch (order) {
				case "r":
					if (myuid === "Joey" || myuid === "anonymous")
						list.sort((a, b) => a.desc.length - b.desc.length);
					else
						shuffle(list);
					break;
				case "d":
					list.sort((a, b) => b.date - a.date);
					break;
				case "p":
					list.sort((a, b) => (b.count || 0) - (a.count || 0));
					break;
				default:
					break;
			}

			for (let i = 0; i < list.length; i += 100)
				pages.push(list.slice(i, i + 100));

			updatePageList();
		}

		function updatePageList() {
			gnavPageNo.min = "1";
			gnavPageNo.max = gnavPageCount.innerHTML = String(pages.length);
			gnavPageNo.value = String(currentPage + 1);
			gameContainer.innerHTML = "";

			if (currentPage < 1)
				gnavBack.disabled = true;
			else
				gnavBack.disabled = false;

			if (currentPage >= pages.length - 1)
				gnavForward.disabled = true;
			else
				gnavForward.disabled = false;

			for (const game of pages[currentPage])
				gameContainer.appendChild(createGameElement(game));
		}

		function createCommentElement({ id, msg, uid, vip, user: _user, icon }: Message, game: number): HTMLElement {
			const elem = mkElem("div");
			elem.setAttribute("id", id);

			const usr = mkElem("div");
			usr.className = "user";
			usr.textContent = _user;

			switch (vip) {
				case 3:
					usr.setAttribute("data-vip", "gold");
					break;
				case 4:
					usr.setAttribute("data-vip", "diamond");
					break;
				default:
					break;
			}

			{
				const img = mkElem("img");
				img.src = proxyURL(icon);
				img.alt = "Avatar";
				img.width = 32;
				img.height = 32;
				img.loading = "lazy";
				img.decoding = "async";
				img.draggable = false;

				if (uid != null) {
					img.style.cursor = usr.style.cursor = "pointer";
					img.onclick = usr.onclick = () => {
						openProfile(uid).catch((err) => {
							error("Failed to open user profile. Message: " + err);
						});
					};
				}

				elem.appendChild(img);
			}

			const wid = mkElem("div");
			wid.appendChild(usr);

			if (msg.length > 0) {
				const el = mkElem("span");
				el.textContent = msg;
				wid.appendChild(el);

				if (myuid != null && uid === myuid) {
					{
						const e = mkElem("button");
						e.type = "button";
						e.title = "Edit";
						e.className = "edit";

						e.onclick = () => {
							const elem = mkElem("div");

							const input = mkElem("input");
							input.type = "text";
							input.value = msg;
							input.required = true;
							input.minLength = 1;
							input.maxLength = 1000;
							input.placeholder = "Message";
							input.autocomplete = "off";
							elem.appendChild(input);

							const tick = mkElem("button");
							tick.type = "button";
							tick.title = "Save";
							tick.className = "tick";
							elem.appendChild(tick);

							const cross = mkElem("button");
							cross.type = "button";
							cross.title = "Cancel";
							cross.className = "cross";
							elem.appendChild(cross);

							tick.onclick = () => {
								const value = input.value.trim();
								if (value.length < 1) {
									error("Comments cannot be empty.");
									return;
								}
								if (value.length > 1000) {
									error("Comments cannot be longer than 1000 characters.");
									return;
								}

								fetchSIO(SIOPath.editcomment, [user, id, game, value]).then(() => {
									msg = value;
									elem.remove();
									e.disabled = false;
								}).catch((err) => {
									error("Failed to update the comment. Message: " + err);
								});
							};
							cross.onclick = () => {
								elem.remove();
								e.disabled = false;
								el.innerHTML = msg;
							};

							e.disabled = true;
							el.innerHTML = "";
							el.appendChild(elem);
						};

						elem.appendChild(e);
					}
					{
						const e = mkElem("button");
						e.type = "button";
						e.title = "Delete";
						e.className = "delete";

						e.onclick = () => {
							e.disabled = true;

							fetchSIO(SIOPath.editcomment, [user, id, game, ""]).catch((err) => {
								error("Failed to delete the comment. Message: " + err);
							});
						};

						elem.appendChild(e);
					}
				}
			}

			elem.appendChild(wid);

			return elem;
		}

		playGame = async ({ name, type, tags, date, desc, file }: GameInfo) => {
			if (unblEndSes != null)
				unblEndSes();
			for (const elem of curElems)
				elem.removeAttribute("data-current");

			content.scrollTo({
				top: 0,
				left: 0,
				behavior: "instant"
			});

			sideMenu.checked = false;
			gamePage.setAttribute("data-current", "");

			unblEndSes = () => {
				unblEndSes = null;
				lock.title = "Enable scroll lock";
				lock.style.backgroundImage = "url(\"res/lock-open-w.svg\")";

				if (!mirror) {
					if (!cloaking)
						doc.title = "NettleWeb";

					his.replaceState(void 0, "", "/");
				}

				currentGame = null;
				onCommentCreate = null;
				onCommentUpdate = null;
				gamePlayer.innerHTML = "";
				content.style.overflow = "";
			};

			comm.value = "";
			eName.value = "";
			eTags.value = "";
			eDesc.value = "";
			sGames.innerHTML = "";
			gameUser.innerHTML = "";
			gameLike.innerHTML = "Like";
			gameShare.innerHTML = "Share";
			gameComments.innerHTML = "";

			editor.style.display = "none";
			gameEdit.style.display = "block";
			controller.style.display = "block";

			const gid = date.toString(36);
			gameId.textContent = gid;
			gameName.textContent = name;
			gameType.textContent = type.toUpperCase();
			gameTags.textContent = tags.replace(/\,/g, ", ") || "None";
			gameDate.textContent = dateToStr(date);
			gameDesc.textContent = desc || "No information provided by the uploader.";
			gamePlayer.appendChild(createGameFrame(type, createGameURL(file, gid)));

			{
				const url = "/#/games/" + gid;
				const furl = Constants.origin + url;

				if (!mirror) {
					if (!cloaking)
						doc.title = name + " - NettleWeb";

					his.replaceState(void 0, "", url);
				}

				gameCode.textContent = "<embed type=\"text/plain\" width=\"1280\" height=\"720\" src=\"" + furl + "?hidegui=1\" />";
				gameShare.onclick = () => {
					navigator.clipboard.writeText(furl).then(() => {
						gameShare.innerHTML = "Link copied!";
					}).catch((err) => {
						error("Failed to copy link to clipboard. Message: " + String(err));
					});
				};
			}

			currentGame = [gid, type, file];

			gameEdit.innerHTML = "Edit Game Info";
			gameEdit.disabled = false;
			gameEdit.onclick = () => {
				if (user == null) {
					accnBtn.click();
					return;
				}

				eName.value = name;
				eTags.value = tags;
				eDesc.value = desc;

				editor.style.display = "block";
				gameEdit.style.display = "none";
			};

			submit.onclick = () => {
				if (user == null) {
					error("Invalid session. Please refresh this page and try again.");
					return;
				}

				const name = eName.value.replace(/\s+/g, " ").trim();
				if (name.length === 0) {
					error("Game name must not be empty.");
					return;
				}
				if (name.length > 256) {
					error("Game name must be less than 256 characters in length.");
					return;
				}

				const desc = eDesc.value.replace(/\s+/g, " ").trim();
				const tags = eTags.value.trim().toLowerCase().split(",").map((v) => {
					return v.replace(/\s+/g, " ").trim();
				}).join(",");

				if (tags.length > 300) {
					error("Game tags list must be less than 300 characters long in total.");
					return;
				}
				if (desc.length > 5000) {
					error("Game description text must be less than 5000 characters in length.");
					return;
				}

				submit.disabled = true;

				fetchSIO(SIOPath.editgameinfo, [user, date, name, tags, desc]).then(() => {
					gameEdit.disabled = true;
					gameEdit.innerHTML = "Requested. Pending review...";
					editor.style.display = "none";
					gameEdit.style.display = "block";
				}).catch((err) => {
					error("Failed to submit request. Message: " + err);
				}).finally(() => {
					submit.disabled = false;
				});
			};

			post.onclick = () => {
				if (user == null) {
					accnBtn.click();
					return;
				}

				const value = comm.value.trim();
				if (value.length < 1) {
					error("Comments cannot be empty.");
					return;
				}
				if (value.length > 1000) {
					error("Comments cannot be longer than 1000 characters.");
					return;
				}

				post.disabled = true;

				fetchSIO(SIOPath.postcomment, [user, date, value]).then(() => {
					comm.value = "";
				}).catch((err) => {
					error("Failed to post comment. Message: " + err);
				}).finally(() => {
					post.disabled = false;
				});
			};

			for (const game of shuffle(gameList.filter((e) => !e.file.startsWith("https://"))).slice(3, 9)) {
				if (game.date !== date && sGames.childElementCount < 5)
					sGames.appendChild(createGameElement(game));
			}

			{
				const info = await fetchSIO(SIOPath.gameinfo, date);

				{
					const e = mkElem("img");
					e.src = proxyURL(info.icon);
					e.alt = "Avatar";
					e.width = 32;
					e.height = 32;
					e.loading = "eager";
					e.decoding = "sync";
					e.draggable = false;
					gameUser.appendChild(e);
				}

				{
					const e = mkElem("div");
					e.className = "user";
					e.textContent = info.id;

					switch (info.vip) {
						case 3:
							e.setAttribute("data-vip", "gold");
							break;
						case 4:
							e.setAttribute("data-vip", "diamond");
							break;
						default:
							break;
					}
					gameUser.appendChild(e);
				}

				gameUser.onclick = () => {
					openProfile(info.uid).catch((err) => {
						error("Failed to open user profile. Message: " + err);
					});
				};

				gameLike.textContent = String(info.likes);
				if (likes.indexOf(date) >= 0)
					gameLike.setAttribute("data-given", "");
				else
					gameLike.removeAttribute("data-given");

				gameLike.onclick = () => {
					if (user == null) {
						accnBtn.click();
						return;
					}

					gameLike.disabled = true;

					fetchSIO(SIOPath.like, [user, date]).then(() => {
						const i = likes.indexOf(date);
						if (i >= 0) {
							likes.splice(i, 1);
							gameLike.removeAttribute("data-given");
							gameLike.textContent = String(--info.likes);
						} else {
							likes.push(date);
							gameLike.setAttribute("data-given", "");
							gameLike.textContent = String(++info.likes);
						}
					}).catch((err) => {
						error("Failed to give a like. Message: " + err);
					}).finally(() => {
						gameLike.disabled = false;
					});
				};
			}

			{
				const list = await fetchSIO(SIOPath.getcomments, [date]);
				if (list.length === 20) {
					let last: number = list[list.length - 1].id;

					loadmore.style.display = "block";
					loadmore.onclick = () => {
						loadmore.style.display = "none";

						fetchSIO(SIOPath.getcomments, [date, last]).then((list) => {
							if (list.length === 20) {
								last = list[list.length - 1].id;
								loadmore.style.display = "block";
							}

							for (const it of list)
								gameComments.appendChild(createCommentElement(it, date));
						}).catch((err) => {
							error("Failed to fetch comments. Message: " + err);
						});
					};
				}

				for (const it of list)
					gameComments.appendChild(createCommentElement(it, date));
			}

			onCommentCreate = (id, msg) => {
				if (date === id)
					gameComments.prepend(createCommentElement(msg, date));
			};
			onCommentUpdate = (id, msg, text) => {
				if (date === id) {
					for (const elem of gameComments.children) {
						if (elem.getAttribute("id") === msg) {
							const e = elem.querySelector("div>span");
							if (e != null)
								e.textContent = text;
							else
								error("Failed to update comment: " + msg);
							break;
						}
					}
				}
			};
		};

		initGameList = () => {
			if (gameList != null)
				return Promise.resolve();
			if (gameListInitLock != null)
				return gameListInitLock;

			return gameListInitLock = fetchSIO(SIOPath.gamelist).then((res) => {
				gameList = res;
				gameListInitLock = null;
			});
		};

		gnavBack.onclick = () => {
			currentPage--;
			updatePageList();

			gameContainer.scrollIntoView({
				behavior: "instant",
				inline: "start",
				block: "start"
			});
		};
		gnavForward.onclick = () => {
			currentPage++;
			updatePageList();

			gameContainer.scrollIntoView({
				behavior: "instant",
				inline: "start",
				block: "start"
			});
		};
		gnavPageNo.onblur = () => {
			const value = parseInt(gnavPageNo.value.trim(), 10) || 0;
			if ((currentPage + 1) !== value) {
				if (value < 1 || value > pages.length) {
					gnavPageNo.value = "1";
					currentPage = 0;
				} else currentPage = value - 1;

				updatePageList();
				gameContainer.scrollIntoView({
					behavior: "instant",
					inline: "start",
					block: "start"
				});
			}
		};
		gnavPageNo.onchange = () => {
			gnavPageNo.blur();
		};

		lock.onclick = () => {
			if (lock.title === "Disable scroll lock") {
				lock.style.backgroundImage = "url(\"res/lock-open-w.svg\")";
				lock.title = "Enable scroll lock";
				content.style.overflow = "";
			} else {
				lock.style.backgroundImage = "url(\"res/lock-w.svg\")";
				lock.title = "Disable scroll lock";
				content.style.overflow = "hidden";
				gamePlayer.scrollIntoView({
					block: "start",
					inline: "start",
					behavior: "instant"
				});
			}
		};
		comm.onfocus = () => {
			if (user == null)
				accnBtn.click();
		};

		$("hide").onclick = () => {
			controller.style.display = "none";
		};
		$("e-canc").onclick = () => {
			editor.style.display = "none";
			gameEdit.style.display = "block";
		};
		$("newtab").onclick = () => {
			if (currentGame != null) {
				const win = createNewWindow();
				if (win == null) {
					error("Please allow popups in your browser settings and try again.");
					return;
				}

				gamePlayer.firstElementChild?.remove();
				openInNewWindow(createGameFrame(currentGame[1], createGameURL(currentGame[2], currentGame[0]), win), win);
				gamePlayer.innerHTML = "Notice: This frame has been closed automatically for saving memory. Please refresh the tab to re-launch the game.";
			}
		};
		$("fullscreen").onclick = () => {
			if (doc.fullscreenEnabled) {
				const elem = gamePlayer.firstElementChild;
				if (elem != null) {
					elem.requestFullscreen({ navigationUI: "hide" }).catch((err) => {
						error("Failed to enter fullscreen mode. Message: " + String(err));
					});
				} else error("Cannot enter fullscreen mode when game frame is closed.");
			} else error("Fullscreen mode is not supported in the current browsing context.");
		};

		gameBtn.onclick = gameBtn2.onclick = openGamePage = () => {
			if (unblEndSes != null)
				unblEndSes();
			for (const elem of curElems)
				elem.removeAttribute("data-current");

			content.scrollTo({
				top: 0,
				left: 0,
				behavior: "instant"
			});
			sideMenu.checked = false;
			gameBtn.setAttribute("data-current", "");
			gamesPage.setAttribute("data-current", "");

			if (!mirror) {
				if (!cloaking)
					doc.title = "NettleWeb Games"

				unblEndSes = restoreRootPath;
				his.replaceState(void 0, "", "#/games");
			}

			if (gameContainer.childElementCount === 0) {
				gameBtn.disabled = true;
				gameBtn2.disabled = true;

				initGameList().then(() => {
					updateGameList();
				}).catch((err) => {
					error("Failed to fetch the game index. Message: " + String(err));
				}).finally(() => {
					gameBtn.disabled = false;
					gameBtn2.disabled = false;
				});
			}
		};
	}

	{
		const searchInput = q("#yt-search>input") as HTMLInputElement;
		const searchBtn = q("#yt-search>button") as HTMLButtonElement;
		const ploadmore = $("p-load-more");
		const loadmore = $("yt-load-more");
		const strmBtn2 = $("goto-video") as HTMLButtonElement;
		const strmPage = $("videos-page");
		const strmBtn = $("strm-btn") as HTMLButtonElement;
		const results = $("yt-results");
		const service = $("service") as HTMLSelectElement;

		const video = $("video");
		const sVideos = $("s-videos");
		const pVideos = $("p-videos");
		const videoPage = $("video-page");
		const playlistPage = $("playlist-page");

		const filterBar = $("yt-filter-bar");
		const sortFilters = $("sort-filters");
		const contentFilters = $("content-filters");

		const vidName = $("vname");
		const vidTags = $("vtags");
		const vidDate = $("vdate");
		const vidDesc = $("vdesc");
		const vidLikes = $("vlike");
		const vidViews = $("vview");
		const vidOrigin = $("origin");
		const vidPrivacy = $("privacy");
		const vidLicense = $("license");
		const vidCategory = $("category");
		const vidUploader = $("uploader");

		const pName = $("pname");
		const pPrev = $("pprev") as HTMLImageElement;
		const pOrigin = $("porigin");
		const pStreams = $("streams");
		const pUploader = $("puploader");
		const pSubchannel = $("psubchannel");

		const sortFilterMap: Record<string, YTFilterGroup[]> = Object.create(null);
		const contentFilterMap: Record<string, YTFilterGroup[]> = Object.create(null);
		const activeSortFilters: string[] = [];
		const activeContentFilters: string[] = [];

		const hlsOptions = Object.freeze(Object.setPrototypeOf({
			debug: false,
			workerPath: "/lib/hls/hls.worker.js",
			enableWorker: true,
			lowLatencyMode: true,
		}, null));

		let syncTimer: number = 0;
		let resultsServiceId: string = "0";

		function parseVideoID(url: URL): string | null {
			switch (url.protocol) {
				case "http:":
				case "https:":
					break;
				default:
					return null;
			}

			const path = url.pathname;
			if (path.length < 4)
				return null;

			switch (url.hostname) {
				case "piped.video":
				case "youtube.com":
				case "www.youtube.com":
				case "youtube-nocookie.com":
				case "www.youtube-nocookie.com":
					if (path === "/watch")
						return url.searchParams.get("v") || null;
					if (path.slice(0, 7) === "/embed/")
						return path.slice(7) || null;

					return null;
				case "youtu.be":
					return path.slice(1) || null;
				default:
					return null;
			}
		}

		function formatVideoTime(time: number): string {
			const hrs = Math.floor(time / 3600).toString(10);
			const mins = Math.floor((time % 3600) / 60).toString(10);
			const secs = Math.floor(time % 60).toString(10);

			return (hrs.length === 1 ? "0" + hrs : hrs) + ":" +
				(mins.length === 1 ? "0" + mins : mins) + ":" +
				(secs.length === 1 ? "0" + secs : secs);
		}

		function createResultElement(item: any): Element {
			const elem = mkElem("div");
			const { url, type } = item;

			{
				const e = mkElem("img");
				e.alt = "Preview";
				e.width = 160;
				e.height = 90;
				e.loading = "lazy";
				e.decoding = "async";
				e.draggable = false;
				elem.appendChild(e);

				const prev = item.thumbnail || "";
				if (prev.length > 0)
					e.src = proxyURL(prev);
				else
					e.src = "/res/preview.svg";
			}

			{
				const el = mkElem("div");

				{
					const e = mkElem("div");
					e.className = "title";
					e.textContent = item.name;
					el.appendChild(e);
				}
				{
					const e = mkElem("div");
					e.className = "desc";
					e.textContent = item.description || "";
					el.appendChild(e);
				}
				{
					let info: string = "";

					switch (type) {
						case "stream":
							{
								const { uploadDate: date, duration, uploader } = item;
								if (date != null && date.length > 0)
									info += date + "; ";
								if (duration > 0)
									info += formatVideoTime(duration) + "; ";

								info += "Views: " + item.viewCount + "; Uploader: " + (uploader.name || "Unknown");
								if (uploader.verified)
									info += " \u2713";
							}
							break;
						case "channel":
							info = item.streams + " videos; Subscribers: " + item.subscribers;
							if (item.verified)
								info += " \u2713";
							break;
						case "playlist":
							info = item.streams + " videos; Uploader: " + (item.uploader || "Unknown") + "; Playlist: " + item.playlist;
							break;
						default:
							info = "No information available for this item."
							break;
					}

					if (resultsServiceId === "0")
						info += "; Source: YouTube";

					const e = mkElem("div");
					e.className = "time";
					e.textContent = info;
					el.appendChild(e);
				}

				elem.appendChild(el);
			}

			elem.onclick = () => {
				switch (type) {
					case "stream":
						_openVideo(url);
						break;
					case "playlist":
						openPlaylist(url);
						break;
					default:
						consoleLog(type);
						error("Function not implemented!");
						break;
				}
			};

			return elem;
		}

		function loadKiosk(pageToken: string) {
			service.disabled = true;
			searchBtn.disabled = true;
			searchInput.disabled = true;
			loadmore.style.display = "none";

			fetchSIO(SIOPath.yttrending, [pageToken, resultsServiceId]).then((res) => {
				const items = res.results;
				if (pageToken === "") {
					if (items.length === 0) {
						results.innerHTML = "No suggestions are available at this moment.";
						return;
					}
					results.innerHTML = "";
				}

				for (const item of items)
					results.appendChild(createResultElement(item));

				if ((pageToken = res.nextPageToken) != null) {
					loadmore.style.display = "block";
					loadmore.onclick = () => {
						loadKiosk(pageToken);
					};
				}
			}).catch((err) => {
				error("Failed to fetch video list. Message: " + String(err));
			}).finally(() => {
				service.disabled = false;
				searchBtn.disabled = false;
				searchInput.disabled = false;
			});
		}

		function runSearch(pageToken: string, query: string) {
			service.disabled = true;
			searchBtn.disabled = true;
			searchInput.disabled = true;
			loadmore.style.display = "none";

			fetchSIO(SIOPath.ytsearch, [query, pageToken, activeSortFilters.join(","), activeContentFilters.join(","), resultsServiceId]).then((res) => {
				const items = res.results;
				if (pageToken === "" && items.length === 0) {
					results.innerHTML = "No matching results found :(";
					return;
				}

				for (const item of items)
					results.appendChild(createResultElement(item));

				if ((pageToken = res.nextPageToken) != null) {
					loadmore.style.display = "block";
					loadmore.onclick = () => {
						runSearch(pageToken, query);
					};
				}
			}).catch((err) => {
				error("Failed to fetch search results. Message: " + String(err));
			}).finally(() => {
				service.disabled = false;
				searchBtn.disabled = false;
				searchInput.disabled = false;
			});
		}

		function syncStream(audio: HTMLAudioElement, { currentTime: time }: HTMLVideoElement) {
			if (Math.abs(time - audio.currentTime) > 0.1)
				audio.currentTime = time;
		}

		function loadVideo(elem: HTMLVideoElement, vsrc: string, asrc: string) {
			const requireHls = resultsServiceId === "1" || resultsServiceId === "6";
			(requireHls && !("Hls" in win) ? new Promise<void>((resolve, reject) => {
				const e = mkElem("script");
				e.src = "/lib/hls/hls.min.js";
				e.type = "text/javascript";
				e.async = true;
				e.defer = true;
				e.onload = () => {
					e.onload = e.onerror = null;
					resolve();
				};
				e.onerror = () => {
					e.onload = e.onerror = null;
					reject("Failed to load the Hls library.");
				};
				docBody.appendChild(e);
			}) : Promise.resolve()).then(() => {
				if (requireHls) {
					const hls = new win.Hls(hlsOptions);
					hls.loadSource(vsrc);
					hls.attachMedia(elem);
				} else elem.src = vsrc;

				if (asrc !== "") {
					const e = mkElem("audio");
					e.volume = 0.8;
					e.preload = "none";

					if (requireHls) {
						const hls = new win.Hls(hlsOptions);
						hls.loadSource(asrc);
						hls.attachMedia(e);
					} else e.src = asrc;

					elem.onpause = () => {
						e.pause();
						syncStream(e, elem);
						clearInterval(syncTimer);
					};
					elem.onended = () => {
						e.pause();
						e.currentTime = 0;
						clearInterval(syncTimer);
					};
					elem.onseeked = () => {
						syncStream(e, elem);
					};
					elem.onwaiting = () => {
						e.pause();
						clearInterval(syncTimer);
					};
					elem.onplaying = () => {
						clearInterval(syncTimer);
						e.play().then(() => {
							syncStream(e, elem);
							syncTimer = setInterval(syncStream, 1000, e, elem);
						});
					};
				}
			});
		}

		function _openVideo(url: string) {
			fetchSIO(SIOPath.ytstream, [url, resultsServiceId]).then((info) => {
				if (info == null || typeof info !== "object") {
					error("Error: API server returned invalid response.");
					return;
				}

				if (unblEndSes != null)
					unblEndSes();
				for (const elem of curElems)
					elem.removeAttribute("data-current");

				content.scrollTo({
					top: 0,
					left: 0,
					behavior: "instant"
				});
				sVideos.innerHTML = "";
				sideMenu.checked = false;
				videoPage.setAttribute("data-current", "");

				if (!mirror) {
					if (!cloaking)
						doc.title = "NettleWeb Videos";

					his.replaceState(void 0, "", "#/videos/" + resultsServiceId + ";" + encodeURIComponent(Base64.encode(UTF_8.encode(url))));
				}

				unblEndSes = () => {
					if (!cloaking)
						doc.title = "NettleWeb";

					unblEndSes = null;
					video.innerHTML = "";
					clearInterval(syncTimer);
					his.replaceState(void 0, "", "/");
				};

				vidName.textContent = info.name;
				vidTags.textContent = info.tags.join(", ").trim() || "None";
				vidDate.textContent = dateToStr(Date.parse(info.uploadDate));
				vidDesc.textContent = info.description.replace(/\<br\>/g, "\n").replace(/<[^>]*>/g, "").trim() || "No information provided by the uploader.";
				vidLikes.textContent = info.likeCount;
				vidViews.textContent = info.viewCount;
				vidOrigin.textContent = url;
				vidPrivacy.textContent = info.privacy;
				vidLicense.textContent = info.license || "Unknown";
				vidCategory.textContent = info.category || "Unknown";

				{
					const { url, name, avatar, verified, subscribers } = info.uploader;
					vidUploader.innerHTML = "";

					{
						const e = mkElem("img");
						e.alt = "Avatar";
						e.width = 32;
						e.height = 32;
						e.loading = "lazy";
						e.decoding = "async";
						e.draggable = false;

						if (avatar != null && avatar.length > 4)
							e.src = proxyURL(avatar);
						else
							e.src = "/res/user.svg";

						vidUploader.appendChild(e);
					}
					{
						const elem = mkElem("div");

						{
							const e = mkElem("div");
							e.textContent = (name || "Unknown") + (verified ? " \u2713" : "");
							elem.appendChild(e);
						}

						if (subscribers > 0) {
							const e = mkElem("span");
							e.textContent = subscribers + " subscribers";
							elem.appendChild(e);
						}

						vidUploader.appendChild(elem);
					}

					vidUploader.onclick = () => {
						openPopupWindow(url);
					};
				}

				{
					const related = info.relatedItems;
					if (related.length > 0) {
						for (const item of related)
							sVideos.appendChild(createResultElement(item));
					} else sVideos.innerHTML = "No suggestions are available for this video.";
				}

				const { audioStreams: [astream], thumbnail } = info;
				const stream = info.videoStreams[0] || astream;
				if (stream == null) {
					error("No streams are available for this content.");
					return;
				}

				const elem = mkElem("video");
				elem.width = 800;
				elem.height = 600;
				elem.volume = 0.8;
				elem.autoplay = true;
				elem.controls = true;

				if (thumbnail.length > 0)
					elem.poster = proxyURL(thumbnail);

				elem.onerror = () => {
					error("Failed to decode the video stream. Please refresh this page and try again.");
				};
				elem.oncanplay = () => {
					elem.onerror = null;
					elem.oncanplay = null;
				};

				video.appendChild(elem);
				loadVideo(elem, proxyURL(stream.url), astream != null && stream.videoOnly ? proxyURL(astream.url) : "");
			}).catch((err) => {
				error("Failed to fetch video stream information. Message: " + err);
				if (resultsServiceId === "0")
					createFrame("https://www.youtube-nocookie.com/embed/" + parseVideoID(new URL(url)));
			});
		}

		function openPlaylist(url: string) {
			fetchSIO(SIOPath.ytplaylist, [url, "", resultsServiceId]).then((info) => {
				if (info == null || typeof info !== "object") {
					error("Error: API server returned invalid response.");
					return;
				}

				if (unblEndSes != null)
					unblEndSes();
				for (const elem of curElems)
					elem.removeAttribute("data-current");

				content.scrollTo({
					top: 0,
					left: 0,
					behavior: "instant"
				});
				pVideos.innerHTML = "";
				sideMenu.checked = false;
				ploadmore.style.display = "none";
				playlistPage.setAttribute("data-current", "");

				pName.textContent = info.name;
				pOrigin.textContent = url;
				pStreams.textContent = info.streams;
				pUploader.innerHTML = "";
				pSubchannel.innerHTML = "";

				initializePUploader(pUploader, info.uploader);
				initializePUploader(pSubchannel, info.subchannel);

				{
					const banner = info.banner || "";
					if (banner.length > 0)
						pPrev.src = proxyURL(banner);
					else
						pPrev.src = "/res/preview.svg";
				}

				{
					const results = info.results;
					if (results.length > 0) {
						for (const item of results)
							pVideos.appendChild(createResultElement(item));

						let pageToken = info.nextPageToken;
						if (pageToken != null) {
							ploadmore.style.display = "block";
							ploadmore.onclick = () => {
								ploadmore.style.display = "none";

								fetchSIO(SIOPath.ytplaylist, [url, pageToken, resultsServiceId]).then((info) => {
									if (info == null || typeof info !== "object") {
										error("Error: API server returned invalid response.");
										return;
									}

									for (const item of info.results)
										pVideos.appendChild(createResultElement(item));

									if ((pageToken = info.nextPageToken) != null)
										ploadmore.style.display = "block";
								});
							};
						}
					} else sVideos.innerHTML = "No streams are found within this playlist.";
				}
			}).catch((err) => {
				error("Failed to fetch playlist information. Message: " + err);
			});
		}

		function initializePUploader(container: HTMLElement, { url, name, avatar }: YTUploader) {
			container.innerHTML = "";

			if ((url ||= "").length > 4) {
				{
					const e = mkElem("img");
					e.alt = "Avatar";
					e.width = 32;
					e.height = 32;
					e.loading = "lazy";
					e.decoding = "async";
					e.draggable = false;

					if ((avatar ||= "").length > 4)
						e.src = proxyURL(avatar);
					else
						e.src = "/res/user.svg";

					container.appendChild(e);
				}

				{
					const e = mkElem("div");
					e.textContent = name || "Unknown";
					container.appendChild(e);
				}

				container.onclick = () => {
					openPopupWindow(url);
				};
			}
		}

		function initializeFilterMap(container: Element, groups: YTFilterGroup[], activeSet: string[]) {
			container.innerHTML = "";

			for (const it of groups) {
				const elem = mkElem("div");
				const opts = elem.children;
				const idStr = it.id + ":";
				const single = it.single;

				elem.textContent = it.name || "";

				for (const { id, name } of it.items) {
					const e = mkElem("button");
					e.type = "button";
					e.textContent = name;

					const fullId = idStr + id;
					e.onclick = () => {
						if (!e.hasAttribute("data-selected")) {
							if (single) {
								for (let i = 0; i < activeSet.length; i++) {
									if (activeSet[i].startsWith(idStr))
										activeSet.splice(i, 1);
								}
								for (const e of opts)
									e.removeAttribute("data-selected");
							}

							e.setAttribute("data-selected", "");
							activeSet.push(fullId);
						} else {
							for (let i = 0; i < activeSet.length; i++) {
								if (activeSet[i] === fullId) {
									activeSet.splice(i, 1);
									break;
								}
							}
							e.removeAttribute("data-selected");
						}
					};
					elem.appendChild(e);
				}

				container.appendChild(elem);
			}
		}

		service.onchange = () => {
			error(null);
			results.innerHTML = "";
			activeSortFilters.length = 0;
			activeContentFilters.length = 0;
			resultsServiceId = service.value;
			storage.setItem("__yt_service", service.value);

			initializeFilterMap(sortFilters, sortFilterMap[resultsServiceId], activeSortFilters);
			initializeFilterMap(contentFilters, contentFilterMap[resultsServiceId], activeContentFilters);

			const input = searchInput.value.trim();
			if (input.length > 0)
				runSearch("", input)
			else
				loadKiosk("");
		};
		$("yt-search").onsubmit = (e) => {
			e.preventDefault();
			e.stopPropagation();

			error(null);
			results.innerHTML = "";
			resultsServiceId = service.value;

			const input = searchInput.value.trim();
			const url = optURL(input);

			if (url != null) {
				const id = parseVideoID(url);
				if (id != null)
					_openVideo("https://www.youtube.com/watch?v=" + id);
				else
					error("Error: Failed to parse video ID from the provided URL.");
			} else runSearch("", input);
		};
		$("toggle-filter").onclick = () => {
			if (filterBar.hasAttribute("style")) {
				activeSortFilters.length = 0;
				activeContentFilters.length = 0;

				for (const e of sortFilters.querySelectorAll("button[data-selected]"))
					e.removeAttribute("data-selected");
				for (const e of contentFilters.querySelectorAll("button[data-selected]"))
					e.removeAttribute("data-selected");

				filterBar.removeAttribute("style");
			} else filterBar.style.display = "block";
		};
		strmBtn.onclick = strmBtn2.onclick = openStrmPage = () => {
			if (unblEndSes != null)
				unblEndSes();
			for (const elem of curElems)
				elem.removeAttribute("data-current");

			content.scrollTo({
				top: 0,
				left: 0,
				behavior: "instant"
			});
			sideMenu.checked = false;
			strmBtn.setAttribute("data-current", "");
			strmPage.setAttribute("data-current", "");

			if (!mirror) {
				if (!cloaking)
					doc.title = "NettleWeb Videos";

				unblEndSes = restoreRootPath;
				his.replaceState(void 0, "", "#/videos");
			}

			if (service.childElementCount === 0) {
				strmBtn.disabled = true;
				strmBtn2.disabled = true;

				fetchSIO(SIOPath.ytservices).then((services: YTService[]) => {
					for (const it of services) {
						const elem = mkElem("option");
						const id = String(it.id);
						elem.value = id;
						elem.text = it.name;
						service.appendChild(elem);
						sortFilterMap[id] = it.sorts;
						contentFilterMap[id] = it.filters;
					}

					resultsServiceId = service.value = storage.getItem("__yt_service") || "0";
					initializeFilterMap(sortFilters, sortFilterMap[resultsServiceId], activeSortFilters);
					initializeFilterMap(contentFilters, contentFilterMap[resultsServiceId], activeContentFilters);
					loadKiosk("");
				}).catch((err) => {
					error("Failed to get available services list. Message: " + String(err));
				}).finally(() => {
					strmBtn.disabled = false;
					strmBtn2.disabled = false;
				});
			}
		};

		openVideo = (vid: string) => {
			const [svc, id] = vid.split(";", 2);
			resultsServiceId = svc;
			_openVideo(UTF_8.decode(Base64.decode(decodeURIComponent(id))));
		};
	}

	{
		const addr = $("addr") as HTMLInputElement;
		const mode = $("ub-mode") as HTMLSelectElement;

		mode.value = storage.getItem("__unbl_mode_") || "raw-embed-v2";
		mode.onchange = () => {
			storage.setItem("__unbl_mode_", mode.value);
		};

		addr.onkeydown = (e) => {
			if (e.key === "Enter") {
				e.preventDefault();
				e.stopPropagation();

				const input = addr.value.trim();
				if (input.length > 0)
					openFrame(rewriteURL(input, "https://www.google.com/search?igu=1&q="));
			}
		};

		// $("ub-google").onclick = () => {
		// 	openFrame("https://www.google.com/webhp?igu=1");
		// };
		// $("ub-discord").onclick = () => {
		// 	openFrame("https://discord.com/");
		// };
		// $("ub-facebook").onclick = () => {
		// 	openFrame("https://www.facebook.com/");
		// };
		// $("ub-instagram").onclick = () => {
		// 	openFrame("https://www.instagram.com/");
		// };

		function openFrame(url: string) {
			switch (mode.value) {
				case "raw-embed":
					createFrame(url);
					break;
				case "prq-embed":
					createPRQEmbed(url);
					break;
				case "puppeteer":
					fetchSIO(SIOPath.tunnel, [url, 20]).then((url) => {
						createFrame(url);
					}).catch((err) => {
						error("Failed to create new session. Message: " + err);
					});
					break;
				default:
					fetchSIO(SIOPath.tunnel, [url, 10]).then((url) => {
						createFrame(url);
					}).catch((err) => {
						error("Failed to create new session. Message: " + err);
					});
					break;
			}
		}

		function rewriteURL(value: string, search: string) {
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
					return "https://" + value;
			} else {
				if (isHostname(value) && value.includes("."))
					return "https://" + value;
			}

			return search + encodeURIComponent(value);
		}

		function isHostname(str: string) {
			str = str.toLowerCase();
			for (let i = 0; i < str.length; i++) {
				const ch = str.charCodeAt(i);
				if ((ch < 48 || ch > 57) && (ch < 97 || ch > 122) && ch !== 45 && ch !== 46) {
					return false;
				}
			}
			return true;
		}
	}

	{
		const emu = $("emulator") as HTMLSelectElement;
		const core = $("core") as HTMLSelectElement;
		const bios = $("bios") as HTMLInputElement;
		const gameRom = $("game-rom") as HTMLInputElement;

		emu.onchange = () => {
			switch (emu.value) {
				case "ps2":
					core.value = "ps2";
					core.disabled = true;
					bios.disabled = true;
					gameRom.accept = ".bin, .iso, application/octet-stream";
					break;
				case "swf":
					core.value = "swf";
					core.disabled = true;
					bios.disabled = true;
					gameRom.accept = ".swf";
					break;
				case "dos":
					core.value = "dos";
					core.disabled = true;
					bios.disabled = true;
					gameRom.accept = ".jsdos, .zip";
					break;
				default:
					core.value = "nes";
					core.disabled = false;
					bios.disabled = false;
					gameRom.removeAttribute("accept");
					break;
			}
		};

		$("startemu").onclick = () => {
			const file = gameRom.files?.item(0);
			if (file == null) {
				error("Please choose a valid game ROM file.");
				return;
			}

			const type = emu.value;
			if (type === "emu") {
				const biosFile = bios.files?.item(0);
				frame.appendChild(createGameFrame(type, [URL.createObjectURL(file), biosFile == null ? "" : URL.createObjectURL(biosFile), core.value]));
			} else frame.appendChild(createGameFrame(type, URL.createObjectURL(file)));

			frameView.style.display = "block";
		};
	}

	{
		const message = $("upload-message");
		const gameName = $("game-name") as HTMLInputElement;
		const gameType = $("game-type") as HTMLSelectElement;
		const gameFile = $("game-file") as HTMLInputElement;
		const gameTags = $("game-tags") as HTMLInputElement;
		const gameDesc = $("game-desc") as HTMLTextAreaElement;
		const testArea = $("upload-test");
		const testFrame = $("test-frame");
		const uploadBtn = $("upload") as HTMLButtonElement;

		let gameTested: boolean = false;

		message.onclick = () => {
			message.innerHTML = "";
			message.style.display = "none";
		};
		gameFile.onchange = () => {
			gameTested = false;
			testFrame.innerHTML = "";
			testArea.style.display = "none";
		};
		gameType.onchange = () => {
			switch (gameType.value) {
				case "html5":
					gameFile.accept = ".zip";
					break;
				case "flash":
					gameFile.accept = ".swf";
					break;
				case "dos":
					gameFile.accept = ".jsdos";
					break;
				default:
					gameFile.removeAttribute("accept");
					break;
			}
		};
		uploadBtn.onclick = () => {
			if (user == null) {
				error("Invalid session. Please refresh this page and try again.");
				return;
			}

			const name = gameName.value.replace(/\s+/g, " ").trim();
			if (name.length === 0) {
				error("Game name must not be empty.");
				return;
			}
			if (name.length > 256) {
				error("Game name must be less than 256 characters in length.");
				return;
			}

			const file = gameFile.files?.item(0);
			if (file == null) {
				error("Please choose a valid game file.");
				return;
			}

			const size = file.size;
			if (size === 0) {
				error("Uploading empty game files is not allowed.");
				return;
			}
			if (size > 125829120) {
				error("Uploading files larger than 120MB is not supported currently.");
				return;
			}

			const type = gameType.value;
			const desc = gameDesc.value.replace(/\s+/g, " ").trim();
			const tags = gameTags.value.trim().toLowerCase().split(",").map((v) => {
				return v.replace(/\s+/g, " ").trim();
			}).join(",");

			if (tags.length > 300) {
				error("Game tags list must be less than 300 characters long in total.");
				return;
			}
			if (desc.length > 5000) {
				error("Game description text must be less than 5000 characters in length.");
				return;
			}

			switch (type) {
				case "dos":
				case "flash":
					if (!gameTested) {
						testFrame.appendChild(createGameFrame(type, URL.createObjectURL(file)));
						testArea.style.display = "block";
						gameTested = true;
						return;
					}
					break;
				case "html5":
					break;
				default:
					error("Please select a valid game type.");
					return;
			}

			uploadBtn.disabled = true;

			message.innerHTML = "Processing...";
			message.style.color = "#808080";
			message.style.display = "block";

			(async () => {
				const sid = await fetchSIO(SIOPath.uploadgame, [user, name, type, tags, desc]);
				for (let i = 0; i < size;) {
					const start = i;
					const end = i += 10485760;

					if (end >= size) {
						const blob = file.slice(start, size, "application/octet-stream");
						await postUploadBuffer(sid, await blob.arrayBuffer(), true);
					} else {
						const blob = file.slice(start, end, "application/octet-stream");
						await postUploadBuffer(sid, await blob.arrayBuffer(), false);
					}
				}
			})().then(() => {
				message.innerHTML = "\u2713Success!";
				message.style.color = "#008000";
				message.style.display = "block";

				gameTested = false;
				testFrame.innerHTML = "";
				testArea.style.display = "none";

				gameName.value = "";
				gameFile.value = "";
				gameTags.value = "";
				gameDesc.value = "";
				uploadBtn.disabled = false;
			}).catch((err) => {
				error("Failed to upload the selected game file. Message: " + String(err));
				message.innerHTML = "\u2715Error";
				message.style.color = "#ff0000";
				message.style.display = "block";
				uploadBtn.disabled = false;
			});
		};

		async function postUploadBuffer(sid: string, buf: ArrayBuffer, end: boolean): Promise<void> {
			if (user == null)
				throw new Error("Invalid user context");

			let msg: any;

			for (let i = 0; i < 10; i++) {
				try {
					await fetchSIO(SIOPath.uploadgame2, [user, sid, buf, end]);
					return;
				} catch (err) {
					msg = err;
				}
			}

			throw new Error("Too many unsuccessful attempts. Message from the last attempt: " + String(msg));
		}
	}

	{
		const picker = $("picker");
		const msglist = $("msglist");
		const history = $("history");
		const channels = $("channels");
		const ufileBtn = $("ufile") as HTMLInputElement;
		const messages = $("messages");
		const msgElems = messages.children;
		const chnlname = $("chname");
		const chnlinfo = $("chinfo") as HTMLButtonElement;
		const inputElem = $("sendmsg") as HTMLInputElement;

		const global = $("global") as HTMLButtonElement;
		const friends = $("friends") as HTMLButtonElement;
		const chatgpt = $("chatgpt") as HTMLButtonElement;
		const starter = $("starter");

		{
			const chat = $("chat");
			const menu = $("sidemenu");
			const toggle = $("toggle");

			toggle.onclick = () => {
				if (toggle.title === "Close") {
					toggle.title = "Menu";
					chat.style.width = "100%";
					menu.style.display = "none";
				} else {
					toggle.title = "Close";
					chat.removeAttribute("style");
					menu.removeAttribute("style");
				}
			};
			if (docBody.clientWidth < 800) {
				toggle.title = "Menu";
				chat.style.width = "100%";
				menu.style.display = "none";
			}
		}

		{
			const dmUn = $("dm-un") as HTMLInputElement;
			const dmBtn = $("dm-btn") as HTMLButtonElement;

			dmBtn.onclick = async () => {
				const value = dmUn.value.trim().toLowerCase();
				if (value.length < 4 || value.length > 20 || !/^[\-a-z0-9]+$/.test(value)) {
					error("Please provide a valid username.");
					return;
				}

				dmBtn.disabled = true;

				try {
					await openChat(await fetchSIO(SIOPath.userinfo, "@" + value));
				} catch (err) {
					error("Failed to started new chat. Message: " + err);
				}

				dmUn.value = "";
				dmBtn.disabled = false;
			};
		}

		{
			const chatBtn = $("chat-btn") as HTMLButtonElement;
			const chatBtn2 = $("goto-chat") as HTMLButtonElement;
			const chatPage = $("community-page");
			const channelElems = channels.children;
			const msglistElems = msglist.children;

			const groupId = $("grid");
			const groupPage = $("group-page");
			const groupEdit = $("gredit")
			const groupName = $("grname");
			const groupCode = $("grcode");
			const groupLink = $("grlink");
			const groupUsers = $("grusers");

			let tmpChIcon: string | undefined;
			let tmpChName: string | undefined;
			let tmpChVip: number | undefined;
			let fetching: boolean = false;
			let privChnl: boolean = false;
			let channel: string | undefined;
			let oldest: string | undefined;

			function createMemberElement({ id, uid, vip, icon }: UserInfo, owner: boolean): HTMLElement {
				const elem = mkElem("div");

				const img = mkElem("img");
				img.src = proxyURL(icon);
				img.alt = "Avatar";
				img.width = 48;
				img.height = 48;
				img.loading = "lazy";
				img.decoding = "async";
				img.draggable = false;
				elem.appendChild(img);

				{
					const e = mkElem("div");
					e.className = "user";
					e.textContent = id;

					switch (vip) {
						case 3:
							e.setAttribute("data-vip", "gold");
							break;
						case 4:
							e.setAttribute("data-vip", "diamond");
							break;
						default:
							break;
					}

					img.onclick = e.onclick = () => {
						openProfile(uid).catch((err) => {
							error("Failed to open user profile. Message: " + err);
						});
					};

					elem.appendChild(e);
				}

				if (owner) {
					const e = mkElem("span");
					e.innerHTML = "Owner";
					elem.appendChild(e);
				}

				if (channel != null && privChnl) {
					const e = mkElem("button");
					e.type = "button";
					e.title = "Kick user";
					e.className = "cross";
					e.onclick = () => {
						fetchSIO(SIOPath.kickgroupuser, [user, channel, uid]).then(() => {
							elem.remove();
						}).catch((err) => {
							error("Failed to kick this user. Message: " + err);
						});
					};
					elem.appendChild(e);
				}

				return elem;
			}

			function createMessageElement({ id, msg, uid, vip, user: _user, icon, files }: Message): HTMLElement {
				const elem = mkElem("div");
				elem.setAttribute("id", id);

				const usr = mkElem("div");
				usr.className = "user";
				usr.textContent = _user;

				switch (vip) {
					case 3:
						usr.setAttribute("data-vip", "gold");
						break;
					case 4:
						usr.setAttribute("data-vip", "diamond");
						break;
					default:
						break;
				}

				{
					const img = mkElem("img");
					img.src = proxyURL(icon);
					img.alt = "Avatar";
					img.width = 32;
					img.height = 32;
					img.loading = "lazy";
					img.decoding = "async";
					img.draggable = false;

					if (uid != null) {
						img.style.cursor = usr.style.cursor = "pointer";
						img.onclick = usr.onclick = () => {
							openProfile(uid).catch((err) => {
								error("Failed to open user profile. Message: " + err);
							});
						};
					}

					elem.appendChild(img);
				}

				const wid = mkElem("div");
				wid.appendChild(usr);

				if (msg.length > 0) {
					const el = mkElem("span");
					el.textContent = msg;
					wid.appendChild(el);

					if (myuid != null && (privChnl || uid === myuid)) {
						{
							const e = mkElem("button");
							e.type = "button";
							e.title = "Edit";
							e.className = "edit";

							e.onclick = () => {
								const elem = mkElem("div");

								const input = mkElem("input");
								input.type = "text";
								input.value = msg;
								input.required = true;
								input.minLength = 1;
								input.maxLength = 1000;
								input.placeholder = "Message";
								input.autocomplete = "off";
								elem.appendChild(input);

								const tick = mkElem("button");
								tick.type = "button";
								tick.title = "Save";
								tick.className = "tick";
								elem.appendChild(tick);

								const cross = mkElem("button");
								cross.type = "button";
								cross.title = "Cancel";
								cross.className = "cross";
								elem.appendChild(cross);

								tick.onclick = () => {
									const value = input.value.trim();
									if (value.length < 1) {
										error("Messages cannot be empty.");
										return;
									}
									if (value.length > 1000) {
										error("Messages cannot be longer than 1000 characters.");
										return;
									}
									if (user == null || channel == null) {
										error("Invalid context. Please refresh this page.");
										return;
									}

									fetchSIO(SIOPath.editmessage, [user, id, channel, value]).then(() => {
										msg = value;
										elem.remove();
										e.disabled = false;
									}).catch((err) => {
										error("Failed to update message. Reason: " + err);
									});
								};
								cross.onclick = () => {
									elem.remove();
									e.disabled = false;
									el.innerHTML = msg;
								};

								e.disabled = true;
								el.innerHTML = "";
								el.appendChild(elem);
							};

							elem.appendChild(e);
						}
						{
							const e = mkElem("button");
							e.type = "button";
							e.title = "Delete";
							e.className = "delete";

							e.onclick = () => {
								if (user == null || channel == null) {
									error("Invalid context. Please refresh this page.");
									return;
								}

								e.disabled = true;

								fetchSIO(SIOPath.editmessage, [user, id, channel, ""]).catch((err) => {
									error("Failed to delete message. Reason: " + err);
								});
							};

							elem.appendChild(e);
						}
					}
				}

				for (const { name, type, url } of files) {
					const purl = proxyURL(url);

					{
						const e = mkElem("a");
						e.rel = "noopener nofollow"
						e.href = purl;
						e.target = "_blank";
						e.download = name;
						e.textContent = name || "file";
						wid.appendChild(e);
					}

					switch (type.split("/", 2)[0]) {
						case "image":
							{
								const e = mkElem("img");
								e.src = purl;
								e.alt = "Attachment";
								e.width = 500;
								e.height = 500;
								e.loading = "lazy";
								e.decoding = "async";
								e.draggable = false;
								wid.appendChild(e);
							}
							break;
						case "audio":
							{
								const e = mkElem("audio");
								e.src = purl;
								e.volume = 0.8;
								e.preload = "metadata"
								e.controls = true;
								wid.appendChild(e);
							}
							break;
						case "video":
							{
								const e = mkElem("video");
								e.src = purl;
								e.muted = true;
								e.width = 500;
								e.height = 500;
								e.volume = 0.8;
								e.autoplay = true;
								e.controls = true;
								wid.appendChild(e);
							}
							break;
					}
				}

				elem.appendChild(wid);

				return elem;
			}

			function createChannelElement(id: string, name: string, code: string, users: string[], unread: boolean = false): HTMLElement {
				const elem = mkElem("div");
				elem.setAttribute("id", id);

				if (unread)
					elem.setAttribute("data-unread", "");

				{
					const e = mkElem("img");
					e.src = "/res/group.svg";
					e.alt = "Group";
					e.width = 32;
					e.height = 32;
					e.loading = "lazy";
					e.decoding = "async";
					e.draggable = false;
					elem.appendChild(e);
				}

				{
					const e = mkElem("div");
					e.textContent = name;
					elem.appendChild(e);
				}

				elem.onclick = () => {
					if (!fetching) {
						fetching = true;
						elem.removeAttribute("data-unread");
						messages.innerHTML = "<div>Loading...</div>";
						privChnl = myuid != null && users[0] === myuid;

						fetchSIO(SIOPath.getmessages, [user, channel = id]).then((msgs: Message[]) => {
							oldest = msgs[msgs.length - 1]?.id;
							messages.innerHTML = "";

							for (const msg of msgs)
								messages.prepend(createMessageElement(msg));

							messages.scrollTo({
								behavior: "instant",
								left: 0,
								top: messages.scrollHeight
							});

							for (const e of msglistElems)
								e.removeAttribute("data-current");

							chnlinfo.setAttribute("data-op", "grinfo");
							chnlinfo.title = "View channel info";
							chnlinfo.onclick = () => {
								if (unblEndSes != null)
									unblEndSes();
								for (const elem of curElems)
									elem.removeAttribute("data-current");

								groupPage.setAttribute("data-current", "");
								sideMenu.checked = false;
								content.scrollTo({
									top: 0,
									left: 0,
									behavior: "instant"
								});

								groupId.textContent = id;
								groupName.textContent = name;
								groupCode.textContent = code;
								groupLink.textContent = Constants.origin + "/join/" + code;
								groupEdit.style.display = privChnl ? "block" : "none";

								fetchSIO(SIOPath.getgroupusers, [user, id, 0]).then((list: any[]) => {
									groupUsers.innerHTML = "";

									if (list.length > 0) {
										let index: number = 0;

										groupUsers.appendChild(createMemberElement(list.shift(), true));
										for (const it of list)
											groupUsers.appendChild(createMemberElement(it, false));

										groupUsers.onscrollend = () => {
											if (groupUsers.scrollTop >= (groupUsers.scrollHeight - groupUsers.clientHeight) && index >= 0) {
												fetchSIO(SIOPath.getgroupusers, [user, id, index += 10]).then((list: any[]) => {
													if (list.length < 10)
														index = -1;

													for (const it of list)
														groupUsers.appendChild(createMemberElement(it, false));
												});
											}
										};
									}
								}).catch((err) => {
									error("Failed to fetch the list. Message: " + err);
								});
							};

							elem.setAttribute("data-current", "");
							starter.style.display = "none";
							chnlname.textContent = name;
							fetching = false;
						}).catch((err) => {
							error("Failed to initialize channel. Message: " + err);
							fetching = false;
						});
					}
				};

				return elem;
			}

			function createDMChannelElement(id: string, uid: string, vip: number | nul, name: string, icon: string, unread: boolean = false): HTMLElement {
				const elem = mkElem("div");
				elem.setAttribute("id", id);
				elem.setAttribute("data-user", uid);

				if (unread)
					elem.setAttribute("data-unread", "");

				{
					const e = mkElem("img");
					e.src = proxyURL(icon);
					e.alt = "Avatar";
					e.width = 32;
					e.height = 32;
					e.loading = "lazy";
					e.decoding = "async";
					e.draggable = false;
					elem.appendChild(e);
				}

				{
					const e = mkElem("div");
					e.className = "user";
					e.textContent = name;

					switch (vip) {
						case 3:
							e.setAttribute("data-vip", "gold");
							break;
						case 4:
							e.setAttribute("data-vip", "diamond");
							break;
						default:
							break;
					}

					elem.appendChild(e);
				}

				elem.onclick = () => {
					if (!fetching) {
						fetching = true;
						privChnl = false; // always
						elem.removeAttribute("data-unread");
						messages.innerHTML = "<div>Loading...</div>";

						fetchSIO(SIOPath.getmessages, [user, channel = id]).then((msgs: Message[]) => {
							oldest = msgs[msgs.length - 1]?.id;
							messages.innerHTML = "";

							for (const msg of msgs)
								messages.prepend(createMessageElement(msg));

							messages.scrollTo({
								behavior: "instant",
								left: 0,
								top: messages.scrollHeight
							});

							for (const e of msglistElems)
								e.removeAttribute("data-current");

							chnlinfo.setAttribute("data-op", "profile");
							chnlinfo.title = "View user profile";
							chnlinfo.onclick = () => {
								openProfile(uid).catch((err) => {
									error("Failed to open user profile. Message: " + err);
								});
							};

							elem.setAttribute("data-current", "");
							starter.style.display = "none";
							chnlname.textContent = name;
							fetching = false;
						}).catch((err) => {
							error("Failed to initialize channel. Message: " + err);
							fetching = false;
						});
					}
				};

				return elem;
			}

			function handleMessageCreate(chnl: string, msg: Message) {
				if (channel === chnl) {
					const pos = messages.scrollTop; // side effects - do not inline
					const top = messages.scrollHeight - messages.clientHeight;

					messages.appendChild(createMessageElement(msg));

					if (pos >= top - 100) {
						messages.scrollTo({
							behavior: "instant",
							left: 0,
							top: messages.scrollHeight
						});
					}
				}
			}

			function handleMessageDelete(chnl: string, msgId: string) {
				if (channel === chnl) {
					for (const elem of msgElems) {
						if (elem.getAttribute("id") === msgId) {
							elem.remove();
							break;
						}
					}
				}
			}

			function handleMessageUpdate(chnl: string, msgId: string, text: string) {
				if (channel === chnl) {
					for (const elem of msgElems) {
						if (elem.getAttribute("id") === msgId) {
							const e = elem.querySelector("div>span");
							if (e != null)
								e.textContent = text;
							else
								error("Failed to update message: " + msgId);
							break;
						}
					}
				}
			}

			async function openGlobalChat(chId?: string | nul) {
				global.disabled = true;
				friends.disabled = true;
				chatgpt.disabled = true;
				chatBtn.disabled = true;
				chatBtn2.disabled = true;
				ufileBtn.disabled = true;
				inputElem.disabled = true;

				if (channelElems.length === 0) {
					try {
						const list: string[] = await fetchSIO(SIOPath.requestchannels);
						for (const it of list) {
							if (it[0] === "#") {
								const elem = mkElem("span");
								elem.textContent = it.slice(1);
								channels.appendChild(elem);
							} else {
								const [name, id, attr] = it.split(":", 3);
								const elem = mkElem("div");
								elem.setAttribute("id", id);
								elem.textContent = name;
								elem.onclick = () => {
									if (!fetching) {
										fetching = true;
										privChnl = false; // always
										messages.innerHTML = "<div>Loading...</div>";

										fetchSIO(SIOPath.requestmessages, [channel = id]).then((msgs: Message[]) => {
											oldest = msgs[msgs.length - 1]?.id;
											messages.innerHTML = "";

											for (const msg of msgs)
												messages.prepend(createMessageElement(msg));

											messages.scrollTo({
												behavior: "instant",
												left: 0,
												top: messages.scrollHeight
											});

											for (const e of channelElems)
												e.removeAttribute("data-current");

											ufileBtn.style.display = attr === "f" ? "block" : "none";
											elem.setAttribute("data-current", "");
											chnlname.textContent = name;
											fetching = false;
										}).catch((err) => {
											error("Failed to initialize channel. Message: " + err);
											fetching = false;
										});
									}
								};
								channels.appendChild(elem);
							}
						}
					} catch (err) {
						error("Failed to load channel list. Message: " + err);
						return;
					}
				}

				channel = void 0;
				messages.innerHTML = "";
				chnlname.innerHTML = "Server";
				starter.style.display = "none";

				chnlinfo.setAttribute("data-op", "discord");
				chnlinfo.title = "Open chat in Discord";
				chnlinfo.onclick = () => {
					optGetText("https://discord.com/api/guilds/998658232207814667/widget.json", "no-cache").then((data) => {
						if (data != null)
							data = JSON.parse(data).instant_invite;

						openPopupWindow(data || "https://discord.gg/djdH3kVd4v");
					}); // no catch here as it never throws
				};

				if (channelElems.length > 0) {
					messages.onscrollend = () => {
						if (!fetching && channel != null && messages.scrollTop < 100) {
							fetching = true;

							fetchSIO(SIOPath.requestmessages, [channel, oldest]).then((msgs: Message[]) => {
								if (msgs.length > 0) {
									const height = messages.scrollHeight;
									oldest = msgs[msgs.length - 1].id;

									for (const msg of msgs)
										messages.prepend(createMessageElement(msg));

									messages.scrollTo({
										behavior: "instant",
										left: 0,
										top: messages.scrollHeight - height
									});
								}
							}).catch((err) => {
								error("Failed to fetch messages. Reason: " + err);
							}).finally(() => {
								fetching = false;
							});
						}
					};
					inputElem.onkeydown = (e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							e.stopPropagation();

							if (user == null) {
								accnBtn.click();
								return;
							}

							const msg = inputElem.value.trim();
							if (msg.length < 1) {
								error("Messages cannot be empty.");
								return;
							}
							if (msg.length > 1000) {
								error("Messages cannot be longer than 1000 characters.");
								return;
							}

							if (channel == null) {
								error("Please select a valid channel for posting messages.");
								return;
							}

							inputElem.value = "";
							inputElem.disabled = true;

							fetchSIO(SIOPath.postmessage, [user, channel, msg]).then(() => {
								inputElem.disabled = false;
							}).catch((err) => {
								error("Failed to post text message. Message: " + err);
								inputElem.disabled = false;
							});
						}
					};

					onMessageCreate = handleMessageCreate;
					onMessageDelete = handleMessageDelete;
					onMessageUpdate = handleMessageUpdate;

					if (chId != null) {
						for (const e of channelElems) {
							if (e.getAttribute("id") === chId) {
								(e as HTMLElement).click();
								break;
							}
						}
					} else channels.querySelector("div")!.click();
				} else {
					channels.innerHTML = "No public channels are available at this moment.";
					inputElem.onkeydown = messages.onscrollend = onMessageCreate = onMessageDelete = onMessageUpdate = null;
				}

				inputElem.onfocus = (e) => {
					e.preventDefault();
					e.stopPropagation();

					if (user == null)
						accnBtn.click();
				};

				friends.removeAttribute("data-current");
				chatgpt.removeAttribute("data-current");
				global.setAttribute("data-current", "");

				msglist.removeAttribute("style");
				history.removeAttribute("style");
				channels.style.display = "block";

				global.disabled = false;
				friends.disabled = false;
				chatgpt.disabled = false;
				chatBtn.disabled = false;
				chatBtn2.disabled = false;
				ufileBtn.disabled = false;
				inputElem.disabled = false;
			}

			async function openPrivateChat() {
				if (user == null || myuid == null) {
					accnBtn.click();
					return;
				}

				global.disabled = true;
				friends.disabled = true;
				chatgpt.disabled = true;
				chatBtn.disabled = true;
				chatBtn2.disabled = true;
				ufileBtn.disabled = true;
				inputElem.disabled = true;

				// since the message list is dynamic, we always re-fetch the list regardlessly
				channel = void 0;
				msglist.innerHTML = "";
				messages.innerHTML = "";
				chnlname.innerHTML = "Messages";
				starter.style.display = "block";
				chnlinfo.removeAttribute("data-op");

				try {
					for (const { id, name, mode, code, users, unread } of await fetchSIO(SIOPath.getchannels, user)) {
						if (mode === "0") {
							const { id: user, uid, vip, icon } = await fetchSIO(SIOPath.userinfo, users[0]);
							msglist.appendChild(createDMChannelElement(id, uid, vip, user, icon, unread));
						} else msglist.appendChild(createChannelElement(id, name, code, users, unread));
					}
				} catch (err) {
					error("Failed to load friends list. Message: " + err);
					return;
				}

				onMessageCreate = handleMessageCreate;
				onMessageDelete = handleMessageDelete;
				onMessageUpdate = handleMessageUpdate;

				messages.onscrollend = () => {
					if (!fetching && channel != null && messages.scrollTop < 100) {
						fetching = true;

						fetchSIO(SIOPath.getmessages, [user, channel, oldest]).then((msgs: Message[]) => {
							if (msgs.length > 0) {
								const height = messages.scrollHeight;
								oldest = msgs[msgs.length - 1].id;

								for (const msg of msgs)
									messages.prepend(createMessageElement(msg));

								messages.scrollTo({
									behavior: "instant",
									left: 0,
									top: messages.scrollHeight - height
								});
							}
						}).catch((err) => {
							error("Failed to fetch messages. Reason: " + err);
						}).finally(() => {
							fetching = false;
						});
					}
				};
				inputElem.onkeydown = (e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						e.stopPropagation();

						const msg = inputElem.value.trim();
						if (msg.length < 1) {
							error("Messages cannot be empty.");
							return;
						}
						if (msg.length > 1000) {
							error("Messages cannot be longer than 1000 characters.");
							return;
						}

						if (channel == null) {
							error("Please select a valid channel before posting messages.");
							return;
						}

						inputElem.value = "";
						inputElem.disabled = true;

						(async () => {
							if (channel.startsWith("tmp$")) {
								const uid = channel.slice(4);

								try {
									const e = createDMChannelElement(channel = await fetchSIO(SIOPath.newdmchannel, [user, uid]),
										uid, tmpChVip, tmpChName || "", tmpChIcon || "/res/user.svg");

									e.setAttribute("data-current", "");
									msglist.appendChild(e);
								} catch (err) {
									error("Failed to create new channel. Message: " + err);
									return;
								}

								messages.innerHTML = "";
							}

							try {
								await fetchSIO(SIOPath.postmessage, [user, channel, msg]);
							} catch (err) {
								error("Failed to post text message. Reason: " + err);
							}
						})().then(() => {
							inputElem.disabled = false;
						});
					}
				};

				global.removeAttribute("data-current");
				chatgpt.removeAttribute("data-current");
				friends.setAttribute("data-current", "1");

				history.removeAttribute("style");
				channels.removeAttribute("style");
				msglist.style.display = "block";
				ufileBtn.style.display = "block";

				global.disabled = false;
				friends.disabled = false;
				chatgpt.disabled = false;
				chatBtn.disabled = false;
				chatBtn2.disabled = false;
				ufileBtn.disabled = false;
				inputElem.disabled = false;
			}

			{
				const grName = $("gr-name") as HTMLInputElement;
				const grCode = $("gr-code") as HTMLInputElement;
				const grJoin = $("gr-join") as HTMLButtonElement;
				const grCreate = $("gr-create") as HTMLButtonElement;

				grName.onblur = () => {
					const value = grName.value.trim();
					if (value.length > 0)
						grName.value = value;
				};
				grCode.onblur = () => {
					const value = grCode.value.trim();
					if (value.length > 0)
						grCode.value = value;
				};

				grJoin.onclick = () => {
					const value = grCode.value.trim();
					if (value.length !== 12) {
						error("The invite code must have exactly 12 characters.");
						return;
					}

					grJoin.disabled = true;

					fetchSIO(SIOPath.joingroupchat, [user, value]).then(({ id, name, users }) => {
						{
							const e = createChannelElement(channel = id, name, value, users);
							e.setAttribute("data-current", "");
							msglist.appendChild(e);
							e.click();
						}

						starter.style.display = "none";
					}).catch((err) => {
						error("Failed to join group chat. Message: " + err);
					}).finally(() => {
						grJoin.disabled = false;
					});
				};
				grCreate.onclick = () => {
					const value = grName.value.trim();
					if (value.length < 2) {
						error("Group name must contain at least 2 characters.");
						return;
					}
					if (value.length > 30) {
						error("Group name cannot be longer than 30 characters.");
						return;
					}
					if (value.indexOf(",", 0) >= 0 || value.indexOf(";", 0) >= 0) {
						error("Group names are not allowed to include commas and semicolons.")
						return;
					}

					grCreate.disabled = true;

					fetchSIO(SIOPath.newgroupchat, [user, value]).then(({ id, name, code, users }) => {
						{
							const e = createChannelElement(channel = id, name, code, users);
							e.setAttribute("data-current", "");
							msglist.appendChild(e);
							e.click();
						}

						starter.style.display = "none";
					}).catch((err) => {
						error("Failed to create new group. Message: " + err);
					}).finally(() => {
						grCreate.disabled = false;
					});
				};
			}

			{
				const elem = mkElem("input");
				elem.type = "file";
				elem.multiple = true;
				elem.onchange = async () => {
					if (channel == null) {
						error("Please select a valid channel before uploading files.");
						return;
					}

					const list = elem.files;
					if (list != null && list.length > 0) {
						if (list.length > 10) {
							error("Uploading more than 10 files at once is not supported.");
							return;
						}

						ufileBtn.disabled = true;
						inputElem.disabled = true;

						try {
							const files: any[] = [];
							let tSize: number = 0;

							for (const it of list) {
								const size = it.size;
								if (size < 1)
									throw new Error("Empty files are not allowed.");
								if (size > 10000000)
									throw new Error("Files larger than 10MB are not supported.");
								if ((tSize += size) > 12000000)
									throw new Error("The total size of a single upload cannot exceed 12MB.");

								files.push({
									name: it.name,
									attachment: await it.arrayBuffer()
								});
							}

							await fetchSIO(SIOPath.postFileMessage, [user, channel, files]);
						} catch (err) {
							error("Failed to upload file. Message: " + err);
						}

						elem.value = ""; // remove selected files to free memory
						ufileBtn.disabled = false;
						inputElem.disabled = false;
					}
				};

				ufileBtn.onclick = () => {
					elem.click();
				};
			}

			$("grleave").onclick = () => {
				if (channel == null || channel[0] !== "m") {
					error("The selected channel is not valid.");
					return;
				}

				fetchSIO(SIOPath.leavegroupchat, [user, channel]).then(() => {
					if (unblEndSes != null)
						unblEndSes();
					for (const elem of curElems)
						elem.removeAttribute("data-current");

					sideMenu.checked = false;
					chatPage.setAttribute("data-current", "");
					chatBtn.setAttribute("data-current", "");
					content.scrollTo({
						top: 0,
						left: 0,
						behavior: "instant"
					});

					openPrivateChat();
				}).catch((err) => {
					error("Failed to leave the group. Message: " + err);
				});
			};
			groupEdit.onclick = () => {
				const elem = mkElem("div");

				const input = mkElem("input");
				input.type = "text";
				input.value = groupName.innerHTML;
				input.required = true;
				input.minLength = 2;
				input.maxLength = 30;
				input.placeholder = "Group Name";
				input.autocomplete = "off";
				elem.appendChild(input);

				const tick = mkElem("button");
				tick.type = "button";
				tick.title = "Save";
				tick.className = "tick";
				elem.appendChild(tick);

				const cross = mkElem("button");
				cross.type = "button";
				cross.title = "Cancel";
				cross.className = "cross";
				elem.appendChild(cross);

				input.onblur = () => {
					const value = input.value.trim();
					if (value.length > 0)
						input.value = value;
				};
				tick.onclick = () => {
					if (channel == null || channel[0] !== "m" || !privChnl) {
						error("The selected channel is not valid.");
						return;
					}

					const value = input.value.trim();
					if (value.length < 2) {
						error("Group name must contain at least 2 characters.");
						return;
					}
					if (value.length > 30) {
						error("Group name cannot be longer than 30 characters.");
						return;
					}
					if (value.indexOf(",", 0) >= 0 || value.indexOf(";", 0) >= 0) {
						error("Group names are not allowed to include commas and semicolons.")
						return;
					}

					fetchSIO(SIOPath.changegroupname, [user, channel, value]).then(() => {
						elem.replaceWith(groupEdit);
						groupName.textContent = value;
					}).catch((err) => {
						error("Failed to update group name. Message: " + err);
					});
				};
				cross.onclick = () => {
					elem.replaceWith(groupEdit);
				};

				groupEdit.replaceWith(elem);
				input.select();
			};
			chatBtn.onclick = chatBtn2.onclick = openChatPage = () => {
				if (unblEndSes != null)
					unblEndSes();
				for (const elem of curElems)
					elem.removeAttribute("data-current");

				sideMenu.checked = false;
				chatPage.setAttribute("data-current", "");
				chatBtn.setAttribute("data-current", "");
				content.scrollTo({
					top: 0,
					left: 0,
					behavior: "instant"
				});

				if (channel == null)
					openGlobalChat();

				if (!mirror) {
					if (!cloaking)
						doc.title = "NettleWeb Chat";

					unblEndSes = restoreRootPath;
					his.replaceState(void 0, "", "#/chat");
				}
			};
			friends.onclick = () => {
				openPrivateChat();
			};
			global.onclick = () => {
				openGlobalChat();
			};

			openChat = async ({ id, uid, vip, icon }: UserInfo) => {
				await openPrivateChat();
				starter.style.display = "none";

				if (unblEndSes != null)
					unblEndSes();
				for (const elem of curElems)
					elem.removeAttribute("data-current");

				sideMenu.checked = false;
				chatPage.setAttribute("data-current", "");
				chatBtn.setAttribute("data-current", "");
				content.scrollTo({
					top: 0,
					left: 0,
					behavior: "instant"
				});

				for (const elem of msglistElems) {
					if (elem.getAttribute("data-user") === uid) {
						(elem as HTMLElement).click();
						return;
					}
				}

				channel = "tmp$" + uid;
				tmpChVip = vip || void 0;
				tmpChIcon = icon;
				chnlname.innerHTML = tmpChName = id;
				messages.innerHTML = "<div>Send a message to start a new chat with " + id + ".</div>";

				for (const e of msglistElems)
					e.removeAttribute("data-current");
			};

			openChannel = async (chId: string) => {
				if (chId[0] === "m") {
					await openPrivateChat();
					starter.style.display = "none";

					for (const e of msglistElems) {
						if (e.getAttribute("id") === chId) {
							(e as HTMLElement).click();
							break;
						}
					}
				} else await openGlobalChat(chId);

				if (unblEndSes != null)
					unblEndSes();
				for (const elem of curElems)
					elem.removeAttribute("data-current");

				sideMenu.checked = false;
				chatPage.setAttribute("data-current", "");
				chatBtn.setAttribute("data-current", "");
				content.scrollTo({
					top: 0,
					left: 0,
					behavior: "instant"
				});
			};
		}

		{
			const historyElems = history.children;

			let gptmsgs: GPTMessage[] | null = null;
			const chats: GPTChat[] = JSON.parse(storage.getItem("__chats") || "[]");

			function initMsg({ role, text }: GPTMessage): HTMLElement {
				const elem = mkElem("div");

				{
					const e = mkElem("img");
					e.width = 32;
					e.height = 32;
					e.loading = "lazy";
					e.decoding = "async";
					e.draggable = false;

					if (role === "u") {
						e.src = "res/user.svg";
						e.alt = "User";
					} else {
						e.src = "res/bot.svg";
						e.alt = "Assistant";
					}

					elem.appendChild(e);
				}

				{
					const e = mkElem("div");
					e.textContent = text;
					elem.appendChild(e);
				}

				messages.appendChild(elem);
				return elem;
			}

			function initChat(chat: GPTChat): HTMLElement {
				const title = chat.title;
				if (typeof title !== "string")
					throw new Error("Invalid chat object");

				const elem = mkElem("div");
				elem.onclick = () => {
					for (const e of historyElems)
						e.removeAttribute("data-current");

					elem.setAttribute("data-current", "1");
					messages.innerHTML = "";
					chnlname.textContent = title;

					for (const msg of (gptmsgs = chat.msgs))
						initMsg(msg);

					messages.scrollTo({
						behavior: "instant",
						left: 0,
						top: messages.scrollHeight
					});
				};

				{
					const e = mkElem("div");
					e.textContent = title;
					elem.appendChild(e);
				}

				{
					const e = mkElem("button");
					e.type = "button";
					e.title = "Delete";
					e.onclick = (e) => {
						e.preventDefault();
						e.stopPropagation();

						const i = chats.indexOf(chat, 0);
						if (i >= 0) {
							gptmsgs = null;
							elem.remove();
							chats.splice(i, 1);
							messages.innerHTML = "";
							storage.setItem("__chats", JSON.stringify(chats, void 0, 0));
						}
					};
					elem.appendChild(e);
				}

				history.insertBefore(elem, historyElems[1]);
				return elem;
			}

			$("newchat").onclick = () => {
				for (const e of historyElems)
					e.removeAttribute("data-current");

				gptmsgs = null;
				messages.innerHTML = "";
				chnlname.innerHTML = "New chat";
			};

			chatgpt.onclick = () => {
				for (const e of historyElems)
					e.removeAttribute("data-current");

				gptmsgs = null;
				messages.innerHTML = "";
				chnlname.innerHTML = "New chat";
				starter.style.display = "none";
				chnlinfo.removeAttribute("data-op");

				// remove message handlers and event listeners
				inputElem.onfocus = messages.onscrollend = onMessageCreate = onMessageDelete = onMessageUpdate = null;

				if (historyElems.length < 2) {
					for (const chat of chats)
						initChat(chat);
				}

				inputElem.onkeydown = (e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						e.stopPropagation();

						const msg = inputElem.value.trim();
						if (msg.length < 1) {
							error("Messages cannot be empty.");
							return;
						}
						if (msg.length > 8000) {
							error("Messages cannot be longer than 8000 characters.");
							return;
						}

						inputElem.value = "";
						inputElem.disabled = true;

						if (gptmsgs == null) {
							const chat: GPTChat = {
								title: msg.slice(0, 100),
								msgs: gptmsgs = []
							};
							chats.push(chat);
							initChat(chat).setAttribute("data-current", "1");
						}

						const message: GPTMessage = {
							role: "u",
							text: msg,
						};

						initMsg(message);
						gptmsgs.push(message);

						const resMsg: GPTMessage = {
							role: "a",
							text: "Processing..."
						};

						const outElem = initMsg(resMsg);
						const msgElem = outElem.lastElementChild!;

						onGPTResponse = (msg) => {
							if (msg.length > 0) {
								const pos = messages.scrollTop; // side effects - do not inline
								const top = messages.scrollHeight - messages.clientHeight;

								msgElem.textContent = resMsg.text = msg;

								if (pos >= top - 100) {
									messages.scrollTo({
										behavior: "instant",
										left: 0,
										top: messages.scrollHeight
									});
								}
							} else { // the response has ended
								gptmsgs!.push(resMsg);
								inputElem.disabled = false;
								onGPTResponse = onGPTResError = null;
								storage.setItem("__chats", JSON.stringify(chats, void 0, 0));
							}
						};
						onGPTResError = (err) => {
							gptmsgs!.pop();
							outElem.remove();
							inputElem.disabled = false;
							onGPTResponse = onGPTResError = null;
							error("Failed to process the request. Message: " + err);
						};

						socket.send(UTF_8.encode("\x02" + JSON.stringify(gptmsgs, void 0, 0)), { compress: true });
					}
				};

				global.removeAttribute("data-current");
				friends.removeAttribute("data-current");
				chatgpt.setAttribute("data-current", "1");

				msglist.removeAttribute("style");
				channels.removeAttribute("style");
				history.style.display = "block";
				ufileBtn.style.display = "none";

				global.disabled = false;
				friends.disabled = false;
				chatgpt.disabled = false;
				ufileBtn.disabled = true;
				inputElem.disabled = false;
			};
		}

		$("emoji").onclick = () => {
			if (picker.style.display === "block") {
				picker.style.display = "none";
				return;
			}

			if (picker.firstElementChild == null) {
				const elem = new Picker({
					locale: "POSIX",
					emojiVersion: 1000
				});
				elem.addEventListener("emoji-click", (e) => {
					e.preventDefault();
					e.stopPropagation();

					const code = e.detail.unicode;
					if (code != null)
						inputElem.setRangeText(code, inputElem.selectionStart || 0, inputElem.selectionEnd || 0, "end");
				});
				picker.appendChild(elem);
			}

			picker.style.display = "block";
		};
	}

	{
		const widget = $("nwidget");
		const clearBtn = $("nclear") as HTMLButtonElement;
		const container = $("notif");

		nmsgBtn.onclick = () => {
			if (user == null) {
				accnBtn.click();
				return;
			}

			if (widget.hasAttribute("data-current")) {
				widget.removeAttribute("data-current");
				nmsgBtn.removeAttribute("data-current");
				return;
			}

			nmsgBtn.disabled = true;
			container.innerHTML = "";

			fetchSIO(SIOPath.getnotifications, user).then((list: NotifList) => {
				if (list.length > 0) {
					for (const it of list) {
						const elem = mkElem("div");

						{
							const e = mkElem("div");
							switch (it.type) {
								case NotifType.rawtext:
									e.textContent = it.text;
									break;
								case NotifType.message:
									e.innerHTML = "<b>" + it.user + "</b> sent a direct message to you.";
									elem.onclick = () => {
										fetchSIO(SIOPath.userinfo, it.fuid).then((info) => {
											openChat(info).catch((err) => {
												error("Failed to open chat channel. Message: " + err);
											});
										}).catch((err) => {
											error("Failed to load user info. Message: " + err);
										});
									};
									break;
								case NotifType.mention:
									e.innerHTML = "<b>" + it.user + "</b> mentioned you in a chat channel.";
									elem.onclick = () => {
										openChannel(it.chId).catch((err) => {
											error("Failed to open chat channel. Message: " + err);
										});
									};
									break;
								case NotifType.mentionc:
									e.innerHTML = "<b>" + it.user + "</b> mentioned you in a game comment.";
									elem.onclick = () => {
										initGameList().then(() => {
											const game = it.game;

											for (const e of gameList) {
												if (e.date === game) {
													playGame(e).catch((err) => {
														error("Failed to launch game. Message: " + err);
													});
													break;
												}
											}
										}).catch((err) => {
											error("Failed to get game information. Message: " + err);
										});
									};
									break;
								case NotifType.addfriend:
									e.innerHTML = "<b>" + it.user + "</b> requested to be friend with you.";
									elem.onclick = () => {
										accnBtn.click();
									};
									break
								default:
									e.innerHTML = "Error: Failed to parse message.";
									break;
							}
							elem.appendChild(e);
						}

						{
							const e = mkElem("span");
							e.textContent = dateToStr(it.date);
							elem.appendChild(e);
						}

						container.appendChild(elem);
					}

					clearBtn.disabled = false;
					nmsgBtn.removeAttribute("data-unread");
				} else {
					clearBtn.disabled = true;
					container.innerHTML = "<div>You don't have any notifications yet.</div>";
				}
			}).catch((err) => {
				error("Failed to fetch notifications. Message: " + err);
			}).finally(() => {
				nmsgBtn.disabled = false;
				widget.setAttribute("data-current", "");
				nmsgBtn.setAttribute("data-current", "");
			});
		};
		clearBtn.onclick = () => {
			clearBtn.disabled = true;

			fetchSIO(SIOPath.clearnotifications, user).then(() => {
				container.innerHTML = "<div>Notifications cleared!</div>";
			}).catch((err) => {
				error("Failed to clear notifications. Message: " + err);
			}).finally(() => {
				clearBtn.disabled = false;
			});
		};
	}

	{
		const id = $("id");
		const bio = $("bio");
		const afBtn = $("af") as HTMLButtonElement;
		const dmBtn = $("dm");
		const games = $("pf-games");
		const avatar = $("avatar") as HTMLImageElement;
		const profPage = $("profile-page");

		openProfile = async (uid: string) => {
			const info: UserInfo = await fetchSIO(SIOPath.userinfo, uid);

			if (unblEndSes != null)
				unblEndSes();
			for (const e of curElems)
				e.removeAttribute("data-current");

			content.scrollTo({
				top: 0,
				left: 0,
				behavior: "instant"
			});
			sideMenu.checked = false;
			profPage.setAttribute("data-current", "1");

			afBtn.disabled = false;
			afBtn.innerHTML = "Add Friend";
			avatar.src = proxyURL(info.icon);
			bio.textContent = info.bio || "NettleWeb User";

			games.innerHTML = "";
			games.onscrollend = null;
			games.removeAttribute("style");

			{
				const user = id.textContent = info.id;

				if (!mirror) {
					unblEndSes = restoreRootPath;
					his.replaceState(void 0, "", "#/@" + user);
				}
			}

			switch (info.vip) {
				case 3:
					id.setAttribute("data-vip", "gold");
					break;
				case 4:
					id.setAttribute("data-vip", "diamond");
					break;
				default:
					id.removeAttribute("data-vip");
					break;
			}

			afBtn.onclick = () => {
				if (user == null) {
					accnBtn.click();
					return;
				}

				fetchSIO(SIOPath.addfriend, [user, uid]).then(() => {
					afBtn.disabled = true;
					afBtn.innerHTML = "Requested";
				}).catch((err) => {
					error("Failed to send friend request. Message: " + err);
				});
			};
			dmBtn.onclick = () => {
				if (user == null) {
					accnBtn.click();
					return;
				}

				openChat(info).catch((err) => {
					error("Failed to open chat channel. Message: " + err);
				});
			};

			// ensure game list initialized
			await initGameList();

			{
				const list = gameList.filter((e) => e.user === uid);
				if (list.length > 0) {
					let index: number = 25;
					for (const game of list.slice(0, 25))
						games.appendChild(createGameElement(game));

					games.onscrollend = () => {
						if (games.scrollTop >= (games.scrollHeight - games.clientHeight)) {
							const end = index + 25;
							if (end >= list.length)
								games.onscrollend = null;
							for (const game of list.slice(index, index = end))
								games.appendChild(createGameElement(game));
						}
					};
				} else {
					games.style.overflow = "unset";
					games.innerHTML = "This user has not uploaded any games yet.";
				}
			}
		};
	}

	const chatProf = $("chat-profile");
	const curElems = doc.querySelectorAll<HTMLElement>("header>nav>ul>li>button, #content>div, #nmsg-btn, #accn-btn, #nwidget");

	{
		const addFriendBtn = $("ff") as HTMLButtonElement;
		const accnPage = $("accountinfo-page");
		const friends = $("ac-friends");

		function renderFriend(elem: HTMLElement, info: FriendInfo) {
			const uid: string = info.uid;
			if (typeof uid !== "string")
				throw new Error("Internal Error");

			const img = mkElem("img");
			img.src = proxyURL(info.icon);
			img.alt = "Avatar";
			img.width = 48;
			img.height = 48;
			img.loading = "lazy";
			img.decoding = "async";
			img.draggable = false;
			elem.appendChild(img);

			{
				const e = mkElem("div");
				e.className = "user";
				e.textContent = info.id;

				switch (info.vip) {
					case 3:
						e.setAttribute("data-vip", "gold");
						break;
					case 4:
						e.setAttribute("data-vip", "diamond");
						break;
					default:
						break;
				}

				img.onclick = e.onclick = () => {
					openProfile(uid).catch((err) => {
						error("Failed to open user profile. Message: " + err);
					});
				};

				elem.appendChild(e);
			}

			switch (info.state) {
				case 1:
					{
						const e = mkElem("button");
						e.type = "button";
						e.title = "Cancel request";
						e.className = "cross";
						e.onclick = () => {
							fetchSIO(SIOPath.delfriend, [user, uid]).then(() => {
								elem.remove();
							}).catch((err) => {
								error("Failed to cancel friend request. Message: " + err);
							});
						};
						elem.appendChild(e);
					}
					{
						const e = mkElem("span");
						e.innerHTML = "Requested";
						elem.appendChild(e);
					}
					break;
				case 2:
					{
						const e = mkElem("button");
						e.type = "button";
						e.title = "Accept";
						e.className = "tick";
						e.onclick = () => {
							fetchSIO(SIOPath.addfriend, [user, uid]).then(() => {
								info.state = 0;
								elem.innerHTML = "";
								renderFriend(elem, info);
							}).catch((err) => {
								error("Failed to accept friend request. Message: " + err);
							});
						};
						elem.appendChild(e);
					}
					{
						const e = mkElem("button");
						e.type = "button";
						e.title = "Reject";
						e.className = "cross";
						e.onclick = () => {
							fetchSIO(SIOPath.delfriend, [user, uid]).then(() => {
								elem.remove();
							}).catch((err) => {
								error("Failed to reject friend request. Message: " + err);
							});
						};
						elem.appendChild(e);
					}
					{
						const e = mkElem("span");
						e.innerHTML = "Accept friend request?";
						elem.appendChild(e);
					}
					break;
				default:
					{
						const e = mkElem("button");
						e.type = "button";
						e.title = "Remove friend";
						e.className = "cross";
						e.onclick = () => {
							fetchSIO(SIOPath.delfriend, [user, uid]).then(() => {
								elem.remove();
							}).catch((err) => {
								error("Failed to remove friend. Message: " + err);
							});
						};
						elem.appendChild(e);
					}
					{
						const e = mkElem("button");
						e.type = "button";
						e.title = "Message";
						e.className = "message";
						e.onclick = () => {
							openChat(info).catch((err) => {
								error("Failed to open chat channel. Message: " + err);
							});
						};
						elem.appendChild(e);
					}
					break;
			}
		}

		loadAccnInfo = () => {
			fetchSIO(SIOPath.getfriends, [user, 0]).then((list) => {
				friends.innerHTML = "";

				if (Array.isArray(list) && list.length > 0) {
					let index: number = 0;

					for (const it of list) {
						const e = mkElem("div");
						renderFriend(e, it);
						friends.appendChild(e);
					}

					friends.onscrollend = () => {
						if (friends.scrollTop >= (friends.scrollHeight - friends.clientHeight) && index >= 0) {
							fetchSIO(SIOPath.getfriends, [user, index += 10]).then((list: any[]) => {
								if (list.length < 10)
									index = -1;

								for (const it of list) {
									const e = mkElem("div");
									renderFriend(e, it);
									friends.appendChild(e);
								}
							});
						}
					};
				}
			}).catch((err) => {
				error("Failed to fetch the list. Message: " + err);
			});
		};

		$("chat-login").onclick = chatProf.onclick = accnBtn.onclick = () => {
			if (unblEndSes != null)
				unblEndSes();
			for (const e of curElems)
				e.removeAttribute("data-current");

			friends.innerHTML = "Loading...";
			content.scrollTo({
				top: 0,
				left: 0,
				behavior: "instant"
			});
			accnBtn.setAttribute("data-current", "1");
			accnPage.setAttribute("data-current", "1");
			sideMenu.checked = false;

			if (typeof user === "string")
				loadAccnInfo();
		};

		addFriendBtn.onclick = () => {
			const elem = mkElem("div");

			const input = mkElem("input");
			input.type = "text";
			input.minLength = 2;
			input.maxLength = 30;
			input.spellcheck = false;
			input.placeholder = "Username";
			input.autocomplete = "off";
			elem.appendChild(input);

			const tick = mkElem("button");
			tick.type = "button";
			tick.title = "Add";
			tick.className = "tick";
			elem.appendChild(tick);

			const cross = mkElem("button");
			cross.type = "button";
			cross.title = "Cancel";
			cross.className = "cross";
			elem.appendChild(cross);

			input.onblur = () => {
				const value = input.value.trim().toLowerCase();
				if (value.length > 0)
					input.value = value;
			};
			tick.onclick = () => {
				const value = input.value.trim().toLowerCase();
				if (value.length < 4 || value.length > 20 || !/^[\-a-z0-9]+$/.test(value)) {
					error("Please provide a valid username.");
					return;
				}

				fetchSIO(SIOPath.userinfo, "@" + value).then((info) => {
					fetchSIO(SIOPath.addfriend, [user, info.uid]).then(() => {
						const e = mkElem("div");
						info.state = 1;
						renderFriend(e, info);
						friends.appendChild(e);
						elem.replaceWith(addFriendBtn);
					}).catch((err) => {
						error("Failed to send friend request. Message: " + err);
					});
				}).catch((err) => {
					error("Failed to retrieve user information. Message: " + err);
				});
			};
			cross.onclick = () => {
				elem.replaceWith(addFriendBtn);
			};

			addFriendBtn.replaceWith(elem);
		};
	}

	{
		const homeBtn = $("home-btn");
		const appsBtn = $("apps-btn");
		const infoBtn = $("info-btn");

		const homePage = $("home-page");
		const gemuPage = $("gamemu-page");
		const calcPage = $("desmos-page");
		const wemuPage = $("webemu-page");
		const consPage = $("console-page");
		const unblPage = $("unbl0ck-page");
		const appsPage = $("services-page");
		const infoPage = $("mirrorlink-page");
		const upldPage = $("uploadgames-page");
		const settPage = $("settings-page");

		$("logo").onclick = homeBtn.onclick = openHomePage = () => {
			if (unblEndSes != null)
				unblEndSes();
			for (const elem of curElems)
				elem.removeAttribute("data-current");

			sideMenu.checked = false;
			homePage.setAttribute("data-current", "");
			homeBtn.setAttribute("data-current", "");
			content.scrollTo({
				top: 0,
				left: 0,
				behavior: "instant"
			});
		};
		$("goto-apps").onclick = appsBtn.onclick = openAppsPage = () => {
			if (unblEndSes != null)
				unblEndSes();
			for (const elem of curElems)
				elem.removeAttribute("data-current");

			content.scrollTo({
				top: 0,
				left: 0,
				behavior: "instant"
			});
			sideMenu.checked = false;
			appsBtn.setAttribute("data-current", "");
			appsPage.setAttribute("data-current", "");

			if (!mirror) {
				if (!cloaking)
					doc.title = "NettleWeb Apps";

				unblEndSes = restoreRootPath;
				his.replaceState(void 0, "", "#/apps");
			}
		};
		infoBtn.onclick = openInfoPage = () => {
			if (unblEndSes != null)
				unblEndSes();
			for (const elem of curElems)
				elem.removeAttribute("data-current");

			content.scrollTo({
				top: 0,
				left: 0,
				behavior: "instant"
			});
			sideMenu.checked = false;
			infoBtn.setAttribute("data-current", "");
			infoPage.setAttribute("data-current", "");

			if (!mirror) {
				if (!cloaking)
					doc.title = "About NettleWeb";

				unblEndSes = restoreRootPath;
				his.replaceState(void 0, "", "#/about");
			}
		};
		$("u").onclick = () => {
			if (unblEndSes != null)
				unblEndSes();
			for (const e of curElems)
				e.removeAttribute("data-current");

			unblPage.setAttribute("data-current", "");
			sideMenu.checked = false;
			content.scrollTo({
				top: 0,
				left: 0,
				behavior: "instant"
			});
		};
		$("e").onclick = () => {
			if (unblEndSes != null)
				unblEndSes();
			for (const e of curElems)
				e.removeAttribute("data-current");

			gemuPage.setAttribute("data-current", "");
			sideMenu.checked = false;
			content.scrollTo({
				top: 0,
				left: 0,
				behavior: "instant"
			});
		};
		$("p").onclick = () => {
			if (unblEndSes != null)
				unblEndSes();
			for (const e of curElems)
				e.removeAttribute("data-current");

			wemuPage.setAttribute("data-current", "");
			sideMenu.checked = false;
			content.scrollTo({
				top: 0,
				left: 0,
				behavior: "instant"
			});
		};
		$("c").onclick = () => {
			if (unblEndSes != null)
				unblEndSes();
			for (const e of curElems)
				e.removeAttribute("data-current");

			consPage.setAttribute("data-current", "");
			sideMenu.checked = false;
			content.scrollTo({
				top: 0,
				left: 0,
				behavior: "instant"
			});
		};
		$("d").onclick = () => {
			if (unblEndSes != null)
				unblEndSes();
			for (const e of curElems)
				e.removeAttribute("data-current");

			calcPage.setAttribute("data-current", "");
			sideMenu.checked = false;
			content.scrollTo({
				top: 0,
				left: 0,
				behavior: "instant"
			});
		};
		$("ug").onclick = () => {
			if (unblEndSes != null)
				unblEndSes();
			for (const e of curElems)
				e.removeAttribute("data-current");

			upldPage.setAttribute("data-current", "");
			sideMenu.checked = false;
			content.scrollTo({
				top: 0,
				left: 0,
				behavior: "instant"
			});
		};
		$("settings").onclick = () => {
			const open = settPage.hasAttribute("data-current");

			if (unblEndSes != null)
				unblEndSes();
			for (const e of curElems)
				e.removeAttribute("data-current");

			if (open) {
				homeBtn.setAttribute("data-current", "1");
				homePage.setAttribute("data-current", "1");
			} else settPage.setAttribute("data-current", "1");

			sideMenu.checked = false;
			content.scrollTo({
				top: 0,
				left: 0,
				behavior: "instant"
			});
		};
	}

	{
		const path = loc.hash;
		const search = new URLSearchParams(path.split("?", 2)[1] || "");

		his.scrollRestoration = "manual";
		his.replaceState(void 0, "", "/");

		await (openURL = async (path: string) => {
			switch (path) {
				case "":
				case "#":
				case "#/":
					openHomePage();
					break;
				case "#/apps":
				case "#/apps/":
					openAppsPage();
					break;
				case "#/chat":
				case "#/chat/":
					openChatPage();
					break;
				case "#/games":
				case "#/games/":
					openGamePage();
					break;
				case "#/videos":
				case "#/videos/":
					openStrmPage();
					break;
				case "#/about":
				case "#/about/":
					openInfoPage();
					break;
				default:
					if (path.slice(0, 3) === "#/@") {
						const user = path.slice(2);
						if (user.length <= 50) {
							try {
								await openProfile(user);
							} catch (err) {
								error("Failed to open user profile. Message: " + err);
							}
						}
					} else if (path.slice(0, 7) === "#/join/") {
						const code = path.slice(7);
						if (code.length === 12) {
							try {
								const info = await fetchSIO(SIOPath.getgroupinfo, code);

								$("igrcode").textContent = code;
								$("igrname").textContent = info.name;
								$("gr-users").textContent = info.users;
								$("gr-accept").onclick = () => {
									if (user == null) {
										accnBtn.click();
										return;
									}

									fetchSIO(SIOPath.joingroupchat, [user, code]).then(({ id }) => {
										openChannel(id).catch((err) => {
											error("Failed to open chat channel. Message: " + err);
										});
									}).catch((err) => {
										error("Failed to join group chat. Message: " + err);
									});
								};

								for (const e of curElems)
									e.removeAttribute("data-current");

								$("group-invite-page").setAttribute("data-current", "");
								sideMenu.checked = false;
								content.scrollTo({
									top: 0,
									left: 0,
									behavior: "instant"
								});
							} catch (err) {
								error("Failed to open invite link. Message: " + err);
							}
						}
					} else if (path.slice(0, 8) === "#/reset/") {
						const token = path.slice(8);
						if (token.length === 256) {
							const resetPage = $("account-reset-page");

							for (const e of curElems)
								e.removeAttribute("data-current");

							resetPage.setAttribute("data-current", "");
							sideMenu.checked = false;
							content.scrollTo({
								top: 0,
								left: 0,
								behavior: "instant"
							});

							const pass = $("np") as HTMLInputElement;
							const cPass = $("rp") as HTMLInputElement;

							$("reset").onclick = () => {
								const value = pass.value;
								if (value.length < 8 || value.length > 30) {
									error("The new password must have 8 to 30 characters.");
									return;
								}

								if (value !== cPass.value) {
									error("The confirm password does not match the new password.");
									return;
								}

								fetchSIO(SIOPath.resetpassword2, [token, value]).then(() => {
									resetPage.remove();
									accnBtn.click();
								}).catch((err) => {
									error("Failed to reset password. Message: " + err)
								});
							};
						}
					} else if (path.slice(0, 8) === "#/games/") {
						const id = parseInt(path.slice(8), 36);
						if (Number.isSafeInteger(id) && id > 0) {
							// ensure game list initialized before use
							await initGameList();

							for (const game of gameList!) {
								const gid = game.date;
								if (gid === id) {
									if (search.get("hidegui") === "1") {
										docBody.innerHTML = "";
										docBody.appendChild(createGameFrame(game.type, createGameURL(game.file, gid.toString(36))));
										injectAnchorFrame();
										return;
									}

									try {
										await playGame(game);
									} catch (err) {
										error("Failed to launch game. Message: " + err);
									}

									break;
								}
							}
						}
					} else if (path.slice(0, 9) === "#/videos/") {
						openVideo(path.slice(9));
					} else {
						error("Error: Page does not exist: " + path);
					}
					break;
			}
		})(path);

		$("loading").remove();
		content.setAttribute("data-x", "");
	}

	{
		const container = $("headlines");
		await initGameList();

		try {
			const articles = await fetchSIO(SIOPath.articles);
			if (articles.length < 1) {
				container.innerHTML = "No articles are available at this moment.";
				return;
			}

			container.innerHTML = "";

			for (const it of articles) {
				const elem = mkElem("div");
				const url = it.urlToImage || null;

				{
					const e = mkElem("img");
					e.src = url == null ? "/res/preview.svg" : proxyURL(url);
					e.alt = "Preview";
					e.width = 160;
					e.height = 90;
					e.loading = "lazy";
					e.decoding = "async";
					e.draggable = false;
					elem.appendChild(e);
				}

				{
					const el = mkElem("div");

					{
						const e = mkElem("div");
						e.className = "title";
						e.textContent = it.title;
						el.appendChild(e);
					}
					{
						const e = mkElem("div");
						e.className = "desc";
						e.textContent = it.description || "Description is not available for this article.";
						el.appendChild(e);
					}
					{
						const e = mkElem("div");
						e.className = "time";
						e.textContent = "Source: " + (it.source.name || "unknown") + "; Author: " + (it.author || "unknown") + "; Published at " + dateToStr(it.publishedAt);
						el.appendChild(e);
					}

					elem.appendChild(el);
				}

				elem.onclick = () => {
					openPopupWindow(it.url);
				};

				container.appendChild(elem);
			}
		} catch (err) {
			container.textContent = "Failed to fetch from the API server. Message: " + String(err);
		}
	}

	if (orig === Constants.origin) {
		fba = analytics.getAnalytics(firebase.initializeApp({
			appId: "1:176227430389:web:94270de43b7eb971c03abc",
			apiKey: "AIzaSyCPXTy7dt3fpcLd8kVTBtXy0xuBdeuhbFc",
			projectId: "whitespider",
			authDomain: "whitespider.firebaseapp.com",
			databaseURL: "https://whitespider-default-rtdb.firebaseio.com",
			storageBucket: "whitespider.firebasestorage.app",
			measurementId: "G-F72WBJT57S",
			messagingSenderId: "176227430389"
		}, "NettleWeb"));

		// const js1 = await optGetText("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7505521340110301");
		// if (js1 != null && js1.length > 0) {
		// 	{
		// 		const e = mkElem("ins");
		// 		e.className = "adsbygoogle";
		// 		e.setAttribute("data-ad-slot", "5345722600");
		// 		e.setAttribute("data-ad-client", "ca-pub-7505521340110301")
		// 		e.setAttribute("data-ad-format", "auto");
		// 		e.setAttribute("data-full-width-responsive", "true");
		// 		bottomWid.appendChild(e);
		// 	}

		// 	{
		// 		Object.defineProperty(doc, "createElement", {
		// 			value: (tag: string, opt: any) => {
		// 				const e = mkElem(tag, opt);
		// 				if (e.tagName.toLowerCase() === "iframe")
		// 					e.setAttribute("credentialless", "true");

		// 				return e;
		// 			},
		// 			writable: false,
		// 			enumerable: false,
		// 			configurable: false
		// 		});

		// 		const func = doc.createElementNS.bind(doc);
		// 		Object.defineProperty(doc, "createElementNS", {
		// 			value: (ns: string, tag: string, opt: any) => {
		// 				const e = func(ns, tag, opt);
		// 				if (e.tagName.toLowerCase() === "iframe")
		// 					e.setAttribute("credentialless", "true");

		// 				return e;
		// 			},
		// 			writable: false,
		// 			enumerable: false,
		// 			configurable: false
		// 		});
		// 	}

		// 	try {
		// 		new Function("arguments", "globalThis", "window", "frames", "self", "document", js1).apply(win, [void 0, win, win, win, win, doc]);
		// 	} catch (err) {
		// 		console.error("#Google Adense: ", err);
		// 	}

		// 	(win.adsbygoogle ||= []).push(1);
		// } else error("You are using an ad blocker. Please disable it to support this website's development.");
	} else injectAnchorFrame();

	{
		async function loginCb() {
			loadAccnInfo();
			accnBtn.title = "My Account";
			accnBtn.setAttribute("data-ac", "");

			$("ac-prof").style.display = "block";
			$("chat-login").remove();
			$("login-dialog").remove();

			const bio = $("ac-bio");
			const name = $("ac-name");
			const email = $("ac-email");
			const username = $("ac-un");

			const unEditBtn = $("ac-edit");
			const unLinkBtn = $("ac-link");
			const bioEditBtn = $("ac-bio-edit");
			const nameEditBtn = $("ac-name-edit");
			const emailEditBtn = $("ac-email-edit");
			const passwordEditBtn = $("cp");
			const revokeSecretsBtn = $("rs") as HTMLButtonElement;
			const enableTwoFactorBtn = $("tf");

			if (storage.getItem("__?2fa") === "1") {
				enableTwoFactorBtn.setAttribute("data-enabled", "");
				enableTwoFactorBtn.textContent = "Disable Two-Factor";
			}

			const chavatar = $("ch-avatar");
			const avatar = chavatar.firstElementChild as HTMLImageElement;

			const avatar2 = mkElem("img");
			avatar2.alt = "Avatar";
			avatar2.width = 40;
			avatar2.height = 40;
			avatar2.loading = "eager";
			avatar2.decoding = "sync";
			avatar2.draggable = false;
			chatProf.appendChild(avatar2);

			const username2 = mkElem("div");
			username2.className = "user";
			chatProf.appendChild(username2);
			chatProf.style.display = "block";

			const data = await fetchSIO(SIOPath.userdata, user);
			likes = data.likes;
			const id = data.id;
			const uid = data.uid;
			const rName = data.name

			if (fba != null) {
				analytics.setUserId(fba, uid, { global: true });
				analytics.setUserProperties(fba, { id, uid, name: rName }, { global: false });
			}
			if (typeof id !== "string" || id.length < 4 || typeof uid !== "string" || uid.length < 2) {
				error("Error: Server response parse error.");
				return;
			}

			bio.textContent = data.bio || "NettleWeb User";
			name.textContent = rName || "Not set";
			email.textContent = data.email || "Not set";
			avatar.src = avatar2.src = proxyURL(data.icon);
			username.textContent = id;
			username2.textContent = id;
			$("ac-uid").textContent = uid;

			if (data.unread)
				nmsgBtn.setAttribute("data-unread", "");

			switch (data.vip) {
				case 3:
					$("ac-membership").textContent = "Gold \ud83d\udc51";
					username.setAttribute("data-vip", "gold");
					username2.setAttribute("data-vip", "gold");
					break;
				case 4:
					$("ac-membership").textContent = "Diamond \ud83d\udc8e";
					username.setAttribute("data-vip", "diamond");
					username2.setAttribute("data-vip", "diamond");
					break;
				default:
					$("ac-membership").textContent = "None";
					break;
			}

			{
				const elem = $("ac-games");
				const list = gameList.filter((e) => e.user === uid);

				let index: number = 25;
				for (const game of list.slice(0, 25))
					elem.appendChild(createGameElement(game));

				elem.onscrollend = () => {
					if (index < list.length && elem.scrollTop >= (elem.scrollHeight - elem.clientHeight)) {
						for (const game of list.slice(index, index += 25))
							elem.appendChild(createGameElement(game));
					}
				};
			}

			chavatar.onclick = () => {
				const elem = mkElem("input");
				elem.type = "file";
				elem.accept = "image/*";
				elem.onchange = async () => {
					const file = elem.files?.item(0);
					if (file != null) {
						const blob = await resizeImage(file, 512, 512);
						if (blob == null) {
							error("Error: Failed to resize image.");
							return;
						}

						try {
							await fetchSIO(SIOPath.changeavatar, [user, await blob.arrayBuffer()]);
						} catch (err) {
							error("Failed to upload the image file. Message: " + err);
							return;
						}

						const url = URL.createObjectURL(blob);
						avatar.src = avatar2.src = url;
						await avatar.decode();
						await avatar2.decode();
						URL.revokeObjectURL(url);
					}
				};
				elem.click();
			};
			unEditBtn.onclick = () => {
				const elem = mkElem("div");

				const input = mkElem("input");
				input.type = "text";
				input.value = username.innerHTML;
				input.minLength = 4;
				input.maxLength = 20;
				input.spellcheck = false;
				input.placeholder = "Username";
				input.autocomplete = "off";
				elem.appendChild(input);

				const tick = mkElem("button");
				tick.type = "button";
				tick.title = "Save";
				tick.className = "tick";
				elem.appendChild(tick);

				const cross = mkElem("button");
				cross.type = "button";
				cross.title = "Cancel";
				cross.className = "cross";
				elem.appendChild(cross);

				input.onblur = () => {
					const value = input.value.trim().toLowerCase();
					if (value.length > 0)
						input.value = value;
				};
				tick.onclick = () => {
					const value = input.value.trim().toLowerCase();
					if (value.length < 4 || value.length > 20) {
						error("Username must be between 4 and 20 characters long.");
						return;
					}
					if (!/^[\-a-z0-9]+$/.test(value)) {
						error("Username must contain only hyphens, 0-9, lowercase a-z");
						return;
					}

					fetchSIO(SIOPath.changeid, [user, value]).then(() => {
						elem.replaceWith(username);
						username.textContent = value;
						username2.textContent = value;
						unEditBtn.removeAttribute("style");
					}).catch((err) => {
						error("Failed to change username. Message: " + err)
					});
				};
				cross.onclick = () => {
					elem.replaceWith(username);
					unEditBtn.removeAttribute("style");
				};

				unEditBtn.style.display = "none";
				username.replaceWith(elem);
				input.select();
			};
			unLinkBtn.onclick = () => {
				const url = Constants.root + "@" + id;
				const e = mkElem("span");

				e.textContent = url;
				unLinkBtn.replaceWith(e);
				navigator.clipboard.writeText(url).catch((err) => {
					error("Failed to copy link to clipboard. Message: " + String(err));
				});
			};
			bioEditBtn.onclick = () => {
				const elem = mkElem("div");

				const input = mkElem("input");
				input.type = "text";
				input.value = bio.innerHTML;
				input.minLength = 1;
				input.maxLength = 500;
				input.placeholder = "Bio";
				input.autocomplete = "off";
				elem.appendChild(input);

				const tick = mkElem("button");
				tick.type = "button";
				tick.title = "Save";
				tick.className = "tick";
				elem.appendChild(tick);

				const cross = mkElem("button");
				cross.type = "button";
				cross.title = "Cancel";
				cross.className = "cross";
				elem.appendChild(cross);

				input.onblur = () => {
					const value = input.value.trim();
					if (value.length > 0)
						input.value = value;
				};
				tick.onclick = () => {
					const value = input.value.trim();
					if (value.length > 500) {
						error("Bio cannot have more than 500 characters in length.");
						return;
					}

					fetchSIO(SIOPath.changebio, [user, value]).then(() => {
						elem.replaceWith(bio);
						bioEditBtn.removeAttribute("style");
						bio.textContent = value || "NettleWeb User";
					}).catch((err) => {
						error("Failed to update bio. Message: " + err);
					});
				};
				cross.onclick = () => {
					elem.replaceWith(bio);
					bioEditBtn.removeAttribute("style");
				};

				bioEditBtn.style.display = "none";
				bio.replaceWith(elem);
				input.select();
			};
			nameEditBtn.onclick = () => {
				const elem = mkElem("div");

				const input = mkElem("input");
				input.type = "text";
				input.value = name.innerHTML;
				input.minLength = 2;
				input.maxLength = 30;
				input.spellcheck = false;
				input.placeholder = "Name";
				input.autocomplete = "off";
				elem.appendChild(input);

				const tick = mkElem("button");
				tick.type = "button";
				tick.title = "Save";
				tick.className = "tick";
				elem.appendChild(tick);

				const cross = mkElem("button");
				cross.type = "button";
				cross.title = "Cancel";
				cross.className = "cross";
				elem.appendChild(cross);

				input.onblur = () => {
					const value = input.value.trim();
					if (value.length > 0)
						input.value = value;
				};
				tick.onclick = () => {
					const value = input.value.trim();
					if (value.length > 30) {
						error("Name cannot have more than 30 characters in length.");
						return;
					}

					fetchSIO(SIOPath.changename, [user, value]).then(() => {
						elem.replaceWith(name);
						name.textContent = value;
						nameEditBtn.removeAttribute("style");
					}).catch((err) => {
						error("Failed to update name. Message: " + err);
					});
				};
				cross.onclick = () => {
					elem.replaceWith(name);
					nameEditBtn.removeAttribute("style");
				};

				nameEditBtn.style.display = "none";
				name.replaceWith(elem);
				input.select();
			};
			emailEditBtn.onclick = () => {
				const elem = mkElem("div");

				const input = mkElem("input");
				input.type = "email";
				input.value = email.innerHTML;
				input.minLength = 6;
				input.maxLength = 320;
				input.spellcheck = false;
				input.placeholder = "Email";
				input.autocomplete = "off";
				elem.appendChild(input);

				const tick = mkElem("button");
				tick.type = "button";
				tick.title = "Save";
				tick.className = "tick";
				elem.appendChild(tick);

				const cross = mkElem("button");
				cross.type = "button";
				cross.title = "Cancel";
				cross.className = "cross";
				elem.appendChild(cross);

				input.onblur = () => {
					const value = input.value.trim().toLowerCase();
					if (value.length > 0)
						input.value = value;
				};
				tick.onclick = () => {
					const value = input.value.trim().toLowerCase();
					if (value.length < 6 || value.length > 320 || value.indexOf("@", 1) < 0) {
						error("Please provide a valid email address.");
						return;
					}

					fetchSIO(SIOPath.changeemail, [user, value]).then(() => {
						{
							const e = mkElem("div");
							e.textContent = "Please check your inbox and fill in the 6-digit verification code below to verify your email address.";
							elem.prepend(e);
						}

						input.type = "text";
						input.value = "";
						input.minLength = 6;
						input.maxLength = 6;
						input.placeholder = "6-digit verification code";

						input.onblur = () => {
							const value = input.value.trim();
							if (value.length > 0)
								input.value = value;
						};
						tick.onclick = () => {
							const code = input.value.trim();
							if (code.length !== 6 || !/^\d+$/.test(code)) {
								error("The code provided must have exactly 6 digits.");
								return;
							}

							fetchSIO(SIOPath.verifyemail2, [user, code]).then(() => {
								elem.replaceWith(email);
								email.textContent = value;
								emailEditBtn.removeAttribute("style");
							}).catch((err) => {
								error("Failed to verify your email. Message: " + err);
							});
						};
					}).catch((err) => {
						error("Failed to update your email address. Message: " + err);
					});
				};
				cross.onclick = () => {
					elem.replaceWith(email);
					emailEditBtn.removeAttribute("style");
				};

				emailEditBtn.style.display = "none";
				email.replaceWith(elem);
				input.select();
			};
			passwordEditBtn.onclick = () => {
				const elem = mkElem("div");

				{
					const e = mkElem("div");
					e.setAttribute("style", "position:relative;display:block;width:fit-content;height:fit-content;margin:10px 0px;padding:5px;line-height:18px;");
					e.innerHTML = "Notice: If your account was created with your Google account and does not have a password, set the current password field to 'CHANGEME!'. After changing your password, previously logged-in sessions will still have access to your account. To revoke the access, click the 'logout all sessions' button down below."
					elem.appendChild(e);
				}

				const i1 = mkElem("input");
				i1.type = "password";
				i1.minLength = 8;
				i1.maxLength = 30;
				i1.spellcheck = false;
				i1.placeholder = "Current password";
				i1.autocomplete = "off";
				elem.appendChild(i1);

				const i2 = mkElem("input");
				i2.type = "password";
				i2.minLength = 8;
				i2.maxLength = 30;
				i2.spellcheck = false;
				i2.placeholder = "New password";
				i2.autocomplete = "off";
				elem.appendChild(i2);

				const i3 = mkElem("input");
				i3.type = "password";
				i3.minLength = 8;
				i3.maxLength = 30;
				i3.spellcheck = false;
				i3.placeholder = "Confirm password";
				i3.autocomplete = "off";
				elem.appendChild(i3);

				const tick = mkElem("button");
				tick.type = "button";
				tick.title = "Change";
				tick.className = "tick";
				elem.appendChild(tick);

				const cross = mkElem("button");
				cross.type = "button";
				cross.title = "Cancel";
				cross.className = "cross";
				elem.appendChild(cross);

				tick.onclick = () => {
					const v1 = i1.value;
					if (v1.length < 8 || v1.length > 30) {
						error("The current password must have 8 to 30 characters.");
						return;
					}

					const v2 = i2.value;
					if (v2.length < 8 || v2.length > 30) {
						error("The new password must have 8 to 30 characters.");
						return;
					}

					if (v1 === v2) {
						error("The new password must be different from the current password.");
						return;
					}
					if (v2 !== i3.value) {
						error("The confirm password does not match the new password.");
						return;
					}

					fetchSIO(SIOPath.changePassword, [user, v1, v2]).then(() => {
						elem.replaceWith(passwordEditBtn);
					}).catch((err) => {
						error("Failed to change password. Message: " + err);
					});
				};
				cross.onclick = () => {
					elem.replaceWith(passwordEditBtn);
				};

				passwordEditBtn.replaceWith(elem);
			};
			revokeSecretsBtn.onclick = () => {
				fetchSIO(SIOPath.revokesecrets, user).then((token) => {
					if (typeof token === "string" && token.length === 2048) {
						socket.send(UTF_8.encode("\x01" + (user = token))); // login
						storage.setItem("__secrets_", token);
						revokeSecretsBtn.disabled = true;
					} else error("Error: Remote returned invalid token.");
				}).catch((err) => {
					error("Failed to revoke login tokens. Message: " + err);
				});
			};
			enableTwoFactorBtn.onclick = () => {
				const elem = mkElem("div");

				if (enableTwoFactorBtn.hasAttribute("data-enabled")) {
					const input = mkElem("input");
					input.type = "text";
					input.minLength = 6;
					input.maxLength = 6;
					input.spellcheck = false;
					input.placeholder = "6-digit verification code";
					input.autocomplete = "off";
					elem.appendChild(input);

					const tick = mkElem("button");
					tick.type = "button";
					tick.title = "Change";
					tick.className = "tick";
					elem.appendChild(tick);

					tick.onclick = () => {
						const code = input.value.trim();
						if (code.length !== 6 || !/^\d+$/.test(code)) {
							error("The code provided must have exactly 6 digits.");
							return;
						}

						fetchSIO(SIOPath.disabletwofactor, [user, code]).then(() => {
							storage.setItem("__?2fa", "0");
							elem.replaceWith(enableTwoFactorBtn);
							enableTwoFactorBtn.removeAttribute("data-enabled");
							enableTwoFactorBtn.textContent = "Enable Two-Factor";
						}).catch((err) => {
							error("Failed to enable two-factor authentication. Message: " + err);
						});
					};
				} else {
					{
						const e = mkElem("div");
						e.setAttribute("style", "position:relative;display:block;width:fit-content;height:fit-content;margin:15px 0px;line-height:18px;white-space:pre-wrap;");
						e.innerHTML = "In order to enable two-factor authentication (2FA), please follow the steps below:\n1. Install an <a href=\"https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2\" target=\"_blank\" rel=\"noopener\">authenticator app</a> if you don't have one already.\n2. Scan the QR code below or manually input the secret to save your account onto the authenticator.\n3. Input the 6-digit verification code generated below to verify.\n\nAfter enabling 2FA, you will be required to input the generated 6-digit verification code everytime as you login for enhanced account security.\n\nTo avoid being locked out, save the secret or a screenshot of the QR code across multiple devices, so that it could be restored back into the authenticator in case you lost your data.";
						elem.appendChild(e);
					}

					const key = Base32.encode(crypto.getRandomValues(new Uint8Array(new ArrayBuffer(32), 0, 32)));

					{
						const e = mkElem("img");
						e.alt = "QR Code";
						e.width = 147;
						e.height = 147;
						e.loading = "eager";
						e.decoding = "sync";
						e.draggable = false;

						{
							e.src = generate("otpauth://totp/NettleWeb:" + id + "?secret=" + key + "&issuer=NettleWeb&algorithm=SHA1").toDataURL({
								type: "image/png",
								scale: 3
							});
						}

						elem.appendChild(e);
					}

					{
						const e = mkElem("div");
						e.setAttribute("style", "position:relative;display:block;width:fit-content;height:fit-content;margin:15px 0px;line-height:18px;");
						e.textContent = "Secret: " + key;
						elem.appendChild(e);
					}

					const input = mkElem("input");
					input.type = "text";
					input.minLength = 6;
					input.maxLength = 6;
					input.spellcheck = false;
					input.placeholder = "6-digit verification code";
					input.autocomplete = "off";
					elem.appendChild(input);

					const tick = mkElem("button");
					tick.type = "button";
					tick.title = "Change";
					tick.className = "tick";
					elem.appendChild(tick);

					tick.onclick = () => {
						const code = input.value.trim();
						if (code.length !== 6 || !/^\d+$/.test(code)) {
							error("The code provided must have exactly 6 digits.");
							return;
						}

						fetchSIO(SIOPath.enabletwofactor, [user, key, code]).then(() => {
							storage.setItem("__?2fa", "1");
							elem.replaceWith(enableTwoFactorBtn);
							enableTwoFactorBtn.setAttribute("data-enabled", "");
							enableTwoFactorBtn.textContent = "Disable Two-Factor";
						}).catch((err) => {
							error("Failed to enable two-factor authentication. Message: " + err);
						});
					};
				}

				const cross = mkElem("button");
				cross.type = "button";
				cross.title = "Cancel";
				cross.className = "cross";
				elem.appendChild(cross);

				cross.onclick = () => {
					elem.replaceWith(enableTwoFactorBtn);
				};

				enableTwoFactorBtn.replaceWith(elem);
			};

			$("so").onclick = () => {
				storage.removeItem("__secrets_");
				setTimeout(() => loc.reload(), 200);
			};
			$("da").onclick = () => {
				error("Error: Operation not permitted.");
			};

			$("account-settings").style.display = "block";
		}

		if (user != null) {
			const err: string | null = await new Promise((resolve) => {
				onLogin = () => {
					onLogin = onLoginError = null;
					resolve(null);
				};
				onLoginError = (err) => {
					onLogin = onLoginError = null;
					resolve(err);
				};

				socket.send(UTF_8.encode("\x01" + user)); // login
			});

			if (err == null) {
				await loginCb();
				return;
			}

			error("Failed to validate login token. Please login again. Message: " + err);
			user = null;
			// Do not delete invalid token immediately as it could be caused
			// by a temporary network error
		}

		const dialog = $("login-dialog");

		let email: string | undefined;
		let username: string | undefined;
		let password: string | undefined;

		function login() {
			dialog.style.display = "none";
			dialog.innerHTML = "";

			{
				const e = mkElem("h3");
				e.textContent = "Login";
				dialog.appendChild(e);
			}

			const un = mkElem("input");
			un.type = "text";
			un.value = username || "";
			un.required = true;
			un.minLength = 4;
			un.maxLength = 320;
			un.spellcheck = false;
			un.placeholder = "Username/Email";
			un.autocomplete = "off";
			dialog.appendChild(un);

			const pass = mkElem("input");
			pass.type = "password";
			pass.value = password || "";
			pass.required = true;
			pass.minLength = 8;
			pass.maxLength = 30;
			pass.spellcheck = false;
			pass.placeholder = "Password";
			pass.autocomplete = "off";
			dialog.appendChild(pass);

			const log = mkElem("button");
			log.type = "button";
			log.className = "pri-button";
			log.textContent = "Login";
			dialog.appendChild(log);

			const reg = mkElem("div");
			reg.tabIndex = 0;
			reg.textContent = "Register";
			dialog.appendChild(reg);

			const res = mkElem("div");
			res.tabIndex = 0;
			res.textContent = "Forgot password";
			dialog.appendChild(res);

			const goo = mkElem("div");
			goo.tabIndex = 0;
			goo.textContent = "Sign in with Google";
			dialog.appendChild(goo);

			un.onblur = () => {
				const value = un.value.trim().toLowerCase();
				if (value.length > 0)
					username = un.value = value;
			};
			pass.onblur = () => {
				const value = pass.value;
				if (value.length > 0)
					password = value;
			};
			log.onclick = () => {
				const usr = username = un.value.trim().toLowerCase();
				if (usr.indexOf("@", 1) < 0) {
					if (usr.length < 4 || usr.length > 20) {
						error("Username must be between 4 and 20 characters long.");
						return;
					}
					if (!/^[\-a-z0-9]+$/.test(usr)) {
						error("Username must contain only hyphens, 0-9, lowercase a-z.");
						return;
					}
				} else {
					if (usr.length < 6 || usr.length > 320) {
						error("Invalid email address. (Usernames should not contain a '@' symbol)");
						return;
					}
				}

				const psw = password = pass.value;
				if (psw.length < 8 || psw.length > 30) {
					error("Password must be between 8 and 30 characters long.");
					return;
				}

				fetchSIO(SIOPath.login2, [usr, psw]).then((token) => {
					if (typeof token !== "string") {
						error("Error: Remote returned invalid token data.");
						return;
					}

					tokenCallback(token);
				}).catch((err) => {
					error("Failed to retrieve login token. Message: " + err);
				});
			};
			reg.onclick = register;
			res.onclick = resetPass;
			goo.onclick = loginGoogle;

			dialog.style.display = "block";
		}

		function register() {
			dialog.style.display = "none";
			dialog.innerHTML = "";

			{
				const e = mkElem("h3");
				e.textContent = "Register";
				dialog.appendChild(e);
			}

			const un = mkElem("input");
			un.type = "text";
			un.value = username || "";
			un.required = true;
			un.minLength = 4;
			un.maxLength = 20;
			un.spellcheck = false;
			un.placeholder = "Username";
			un.autocomplete = "off";
			dialog.appendChild(un);

			const em = mkElem("input");
			em.type = "email";
			em.value = email || "";
			em.required = true;
			em.minLength = 6;
			em.maxLength = 320;
			em.spellcheck = false;
			em.placeholder = "Email";
			em.autocomplete = "off";
			dialog.appendChild(em);

			const pass = mkElem("input");
			pass.type = "password";
			pass.value = password || "";
			pass.required = true;
			pass.minLength = 8;
			pass.maxLength = 30;
			pass.spellcheck = false;
			pass.placeholder = "Password";
			pass.autocomplete = "off";
			dialog.appendChild(pass);

			const cpass = mkElem("input");
			cpass.type = "password";
			cpass.value = "";
			cpass.required = true;
			cpass.minLength = 8;
			cpass.maxLength = 30;
			cpass.spellcheck = false;
			cpass.placeholder = "Confirm password"
			cpass.autocomplete = "off";
			dialog.appendChild(cpass);

			const tcheck = mkElem("input");
			tcheck.id = "tos-check";
			tcheck.type = "checkbox";
			tcheck.required = true;
			dialog.appendChild(tcheck);

			{
				const e = mkElem("label");
				e.htmlFor = "tos-check";
				e.innerHTML = "I have read and accepted NettleWeb's <a href=\"" + Constants.origin + "/terms.html\" target=\"blank\" rel=\"noopener\">Terms of Service</a>.";
				dialog.appendChild(e);
			}

			const reg = mkElem("button");
			reg.type = "button";
			reg.className = "pri-button";
			reg.innerHTML = "Register";
			dialog.appendChild(reg);

			const log = mkElem("div");
			log.tabIndex = 0;
			log.innerHTML = "Login";
			dialog.appendChild(log);

			const goo = mkElem("div");
			goo.tabIndex = 0;
			goo.innerHTML = "Sign in with Google";
			dialog.appendChild(goo);

			un.onblur = () => {
				const value = un.value.trim().toLowerCase();
				if (value.length > 0)
					username = un.value = value;
			};
			em.onblur = () => {
				const value = em.value.trim().toLowerCase();
				if (value.length > 0)
					email = em.value = value;
			};
			pass.onblur = () => {
				const value = pass.value;
				if (value.length > 0)
					password = value;
			};

			reg.onclick = () => {
				const usr = username = un.value.trim().toLowerCase();
				if (usr.length < 4 || usr.length > 20) {
					error("The username must be between 4 and 20 characters long.");
					return;
				}
				if (!/^[\-a-z0-9]+$/.test(usr)) {
					error("The username must contain only hyphens, lowercase a-z and 0-9.");
					return;
				}

				const eml = email = em.value.trim().toLowerCase();
				if (eml.length < 6 || eml.length > 320 || eml.indexOf("@", 1) < 0) {
					error("Please provide a valid email.");
					return;
				}

				const psw = password = pass.value;
				if (psw.length < 8 || psw.length > 30) {
					error("The password must be between 8 and 30 characters long.");
					return;
				}

				if (psw !== cpass.value) {
					error("The confirm password does not match.");
					return;
				}

				if (!tcheck.checked) {
					error("Please check the checkbox above to accept the Terms of Service.");
					return;
				}

				fetchSIO(SIOPath.register, [usr, psw, eml]).then(() => {
					dialog.style.display = "none";
					dialog.innerHTML = "";

					{
						const e = mkElem("h3");
						e.textContent = "Verify Email";
						dialog.appendChild(e);
					}
					{
						const e = mkElem("span");
						e.textContent = "Please check your inbox and fill in the 6-digit verification code below to verify your email address.";
						dialog.appendChild(e);
					}

					const code = mkElem("input");
					code.type = "text";
					code.value = "";
					code.required = true;
					code.minLength = 6;
					code.maxLength = 6;
					code.spellcheck = false;
					code.placeholder = "6-digit verification code";
					code.autocomplete = "off";
					dialog.appendChild(code);

					const btn = mkElem("button");
					btn.type = "button";
					btn.className = "pri-button";
					btn.textContent = "Verify";
					dialog.appendChild(btn);

					dialog.appendChild(goo);

					code.onblur = () => {
						const value = code.value.trim();
						if (value.length > 0)
							code.value = value;
					};
					btn.onclick = () => {
						const cd = code.value.trim();
						if (cd.length !== 6 || !/^\d+$/.test(cd)) {
							error("The code provided must have exactly 6 digits.");
							return;
						}

						fetchSIO(SIOPath.verifyemail, [usr, cd]).then((token) => {
							if (typeof token === "string" && token.length === 2048) {
								socket.send(UTF_8.encode("\x01" + (user = token))); // login
								storage.setItem("__secrets_", token);
								loginCb();
							} else error("Error: Remote returned invalid token data.");
						}).catch((err) => {
							error("Failed to verify your email address. Message: " + err);
						});
					};

					dialog.style.display = "block";
				}).catch((err) => {
					error("Failed to send request. Message: " + err);
				});

			};
			log.onclick = login;
			goo.onclick = loginGoogle;

			dialog.style.display = "block";
		}

		function resetPass() {
			dialog.style.display = "none";
			dialog.innerHTML = "";

			{
				const e = mkElem("h3");
				e.textContent = "Reset Password";
				dialog.appendChild(e);
			}

			const em = mkElem("input");
			em.type = "email";
			em.value = email || "";
			em.required = true;
			em.minLength = 6;
			em.maxLength = 320;
			em.spellcheck = false;
			em.placeholder = "Email";
			em.autocomplete = "off";
			dialog.appendChild(em);

			const con = mkElem("button");
			con.type = "button";
			con.className = "pri-button";
			con.textContent = "Continue";
			dialog.appendChild(con);

			const log = mkElem("div");
			log.tabIndex = 0;
			log.textContent = "Login";
			dialog.appendChild(log);

			const reg = mkElem("div");
			reg.tabIndex = 0;
			reg.textContent = "Register";
			dialog.appendChild(reg);

			const goo = mkElem("div");
			goo.tabIndex = 0;
			goo.textContent = "Sign in with Google";
			dialog.appendChild(goo);

			em.onblur = () => {
				const value = em.value.trim().toLowerCase();
				if (value.length > 0)
					email = em.value = value;
			};
			con.onclick = () => {
				const eml = email = em.value.trim().toLowerCase();
				if (eml.length < 6 || eml.length > 320 || eml.indexOf("@", 1) < 0) {
					error("Please provide a valid email.");
					return;
				}

				fetchSIO(SIOPath.resetpassword, eml).then(() => {
					dialog.style.display = "none";
					dialog.innerHTML = "";

					{
						const e = mkElem("h3");
						e.textContent = "Reset Password";
						dialog.appendChild(e);
					}
					{
						const e = mkElem("span");
						e.textContent = "Please check your inbox and follow the instructions on the email.";
						dialog.appendChild(e);
					}

					dialog.appendChild(log);
					dialog.appendChild(reg);
					dialog.appendChild(goo);
					dialog.style.display = "block";
				}).catch((err) => {
					error("Failed to send request. Message: " + err);
				});
			};

			log.onclick = login;
			reg.onclick = register;
			goo.onclick = loginGoogle;

			dialog.style.display = "block";
		}

		function tokenCallback(token: string) {
			if (token.length === 2048) {
				socket.send(UTF_8.encode("\x01" + (user = token))); // login
				storage.setItem("__secrets_", token);
				storage.setItem("__?2fa", "0");
				loginCb();
				return;
			}

			dialog.style.display = "none";
			dialog.innerHTML = "";

			{
				const e = mkElem("h3");
				e.textContent = "Two-Factor Authentication";
				dialog.appendChild(e);
			}
			{
				const e = mkElem("span");
				e.textContent = "Please open your authenticator app and fill in the generated 6-digit verification code below.";
				dialog.appendChild(e);
			}

			const code = mkElem("input");
			code.type = "text";
			code.value = "";
			code.minLength = 6;
			code.maxLength = 6;
			code.spellcheck = false;
			code.placeholder = "6-digit verification code";
			code.autocomplete = "off";
			dialog.appendChild(code);

			const btn = mkElem("button");
			btn.type = "button";
			btn.className = "pri-button";
			btn.textContent = "Verify";
			dialog.appendChild(btn);

			code.onblur = () => {
				const value = code.value.trim();
				if (value.length > 0)
					code.value = value;
			};
			btn.onclick = () => {
				const cd = code.value.trim();
				if (cd.length !== 6 || !/^\d+$/.test(cd)) {
					error("The code provided must have exactly 6 digits.");
					return;
				}

				fetchSIO(SIOPath.verifytwofactor, [token, cd]).then((token) => {
					if (typeof token === "string" && token.length === 2048) {
						socket.send(UTF_8.encode("\x01" + (user = token))); // login
						storage.setItem("__secrets_", token);
						storage.setItem("__?2fa", "1");
						loginCb();
					} else error("Error: Remote returned invalid token data.");
				}).catch((err) => {
					error("Failed to login with OTP. Message: " + err);
				});
			};

			dialog.style.display = "block";
		}

		function loginGoogle() {
			(winTop || win)[config.a].replace("https://accounts.google.com/o/oauth2/v2/auth?client_id=176227430389-qkdboctmfhe9jnvnk2vmarafc5p8amuf.apps.googleusercontent.com&redirect_uri=https://nettleweb.com/auth.html&response_type=token&state=12&scope=email%20profile&include_granted_scopes=true&enable_granular_consent=true");
		}

		{
			const tmpToken = storage.getItem("_cre_") || "";
			if (tmpToken.length > 0) {
				try {
					const token = await fetchSIO(SIOPath.login, tmpToken);
					if (typeof token !== "string") {
						error("Error: Remote returned invalid token data.");
						return;
					}

					accnBtn.click();
					tokenCallback(token);
				} catch (err) {
					error("Failed to retrieve login token. Message: " + err);
				}

				storage.removeItem("_cre_");
			} else login();
		}
	}
})();
