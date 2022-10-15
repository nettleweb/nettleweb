"use strict";

class ExFrame extends HTMLElement {
	/**
	 * @type {string}
	 */
	loading;

	/**
	 * @type {boolean}
	 */
	allowfullscreen;

	/**
	 * @type {string}
	 */
	sandbox;

	/**
	 * @type {string}
	 */
	allow;

	/**
	 * @type {string}
	 */
	type;

	/**
	 * @type {string}
	 */
	src;

	/**
	 * @type {boolean}
	 */
	resizetocontent = false;

	/**
	 * @param {number} newWidth 
	 * @param {number} newHeight 
	 */
	resize = (newWidth, newHeight) => {
		// prevent horizontal overflow
		this.style.width =  newWidth > document.documentElement.clientWidth ? "100%" : newWidth + "px";
		this.style.height = newHeight + "px";
	};

	/**
	 * @type {() => void}
	 */
	resizeToContent = () => {};

	/**
	 * @param {((baseFrame: HTMLElement) => void) | undefined} callback 
	 */
	constructor(callback) {
		super();
		let shadow = this.attachShadow({ mode: "closed" });
		let base = document.createElement(window == window.top ? "iframe" : "embed");
		base.style.position = "absolute";
		base.style.display = "block";
		base.style.width = "100%";
		base.style.height = "100%";
		base.style.border = "none";
		base.width = "1024";
		base.height = "768";
		shadow.appendChild(base);

		if (callback != null)
			callback(base);

		function nullstr(str) {
			return str == null ? "" : str;
		}

		Object.defineProperty(this, "loading", {
			get() {
				return nullstr(base.getAttribute("loading"));
			},
			set(value) {
				base.setAttribute("loading", value);
			}
		});
		Object.defineProperty(this, "allowfullscreen", {
			get() {
				return base.hasAttribute("allowfullscreen");
			},
			set(value) {
				if (value)
					base.setAttribute("allowfullscreen", "true");
				else base.removeAttribute("allowfullscreen");
			}
		});
		Object.defineProperty(this, "sandbox", {
			get() {
				return nullstr(base.getAttribute("sandbox"));
			},
			set(value) {
				base.setAttribute("sandbox", value);
			}
		});
		Object.defineProperty(this, "allow", {
			get() {
				return nullstr(base.getAttribute("allow"));
			},
			set(value) {
				base.setAttribute("allow", value);
			}
		});
		Object.defineProperty(this, "type", {
			get() {
				return nullstr(base.getAttribute("type"));
			},
			set(value) {
				base.setAttribute("type", value);
			}
		});
		Object.defineProperty(this, "src", {
			get() {
				return nullstr(base.getAttribute("src"));
			},
			set(value) {
				base.setAttribute("src", value);
			}
		});

		base.onload = () => {
			if (base instanceof HTMLIFrameElement) {
				try {
					let win = base.contentWindow;
					let doc = win.document;
					this.resizeToContent = () => {
						if (this.resizetocontent) {
							this.resize(doc.documentElement.scrollWidth, doc.documentElement.scrollHeight);
						}
					};
	
					doc.documentElement.onresize = () => {
						this.resizeToContent();
					};
				} catch (err) {
					// ignore - this is usually caused by cross-origin frames
				}
			}
		};

		let _;

		if ((_ = this.getAttribute("loading")) != null)
			this.loading = _;
		if (this.hasAttribute("allowfullscreen"))
			this.allowfullscreen = true;
		if ((_ = this.getAttribute("sandbox")) != null)
			this.sandbox = _;
		if ((_ = this.getAttribute("allow")) != null)
			this.allow = _;
		if ((_ = this.getAttribute("type")) != null)
			this.type = _;
		if ((_ = this.getAttribute("src")) != null)
			this.src = _;
		if (this.hasAttribute("resizetocontent"))
			this.resizetocontent = true;
	}
}

class ContentFrame extends HTMLElement {
	/**
	 * @type {string}
	 */
	src;

	/**
	 * @type {string}
	 */
	path;

	/**
	 * @type {boolean}
	 */
	proxy = true;

	/**
	 * @type {() => void}
	 */
	inNewTab;

	/**
	 * @type {() => void}
	 */
	inNewWindow;

	constructor() {
		super();
		let shadow = this.attachShadow({ mode: "closed" });
		shadow.innerHTML = `<style type="text/css">
* {
	margin: 0px;
	padding: 0px;
}

x-frame {
	position: absolute;
	display: block;
	width: 100%;
	height: 100%;
}

#toolbar {
	position: absolute;
	display: block;
	width: calc(100% - 10px);
	height: 30px;
	padding: 5px;
	bottom: 0px;
	color: #ffffff;
	background-color: rgba(0, 0, 0, 0.5);
}

#fullscreen-button {
	position: absolute;
	display: block;
	width: 30px;
	height: 30px;
	right: 5px;
	cursor: pointer;
	background-image: url("res/fullscreen.svg");
	background-size: contain;
	background-repeat: no-repeat;
}

</style>
<div id="toolbar">
	<div id="fullscreen-button"></div>
</div>`;

		let baseUrl = window.location.origin;
		let _baseFr;
		let _this = this;
		let baseFrame = new ExFrame(f => _baseFr = f);
		baseFrame.type = "text/plain";
		baseFrame.loading = "lazy";
		baseFrame.allowfullscreen = "true";
		baseFrame.sandbox = "allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-popups";
		baseFrame.allow = "cross-origin-isolated";
		shadow.prepend(baseFrame);

		Object.defineProperty(this, "src", {
			get() {
				return baseFrame.src;
			},
			set(value) {
				if (_this.proxy) {
					baseFrame.src = baseUrl + "/service.html?url=" + encodeURIComponent(value);
				} else {
					// set src attribute directly as service workers are not supported
					baseFrame.src = value;
				}
			}
		});

		Object.defineProperty(this, "path", {
			get() {
				return "";
			},
			set(value) {
				baseFrame.src = value;
			}
		});

		let newTabOrWindow = (sw) => {
			if (sw)
				return window.open("", "_blank", "height=" + screen.availHeight + ", width=" + screen.availWidth);
			else {
				let win = window.open("", "_blank");
				win.focus();
				return win;
			}
		};

		let inNewTabOrWindow = (newWindow) => {
			let win = newTabOrWindow(newWindow);
			let doc = win.document;

			doc.documentElement.innerHTML = `<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<base href="${baseUrl}/" />
		<title>_</title>
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
	<body></body>`;
			doc.body.appendChild(_baseFr.cloneNode(true));
		};

		shadow.getElementById("fullscreen-button").onclick = () => {
			baseFrame.focus({ preventScroll: true });
			if (document.fullscreenEnabled)
				baseFrame.requestFullscreen({ navigationUI: "hide" });
			else inNewTabOrWindow(true);
		};

		this.inNewTab = () => inNewTabOrWindow(false);
		this.inNewWindow = () => inNewTabOrWindow(true);
	}
}

customElements.define("x-frame", ExFrame, {});
customElements.define("content-frame", ContentFrame, {});
