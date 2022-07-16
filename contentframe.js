"use strict";

class ContentFrame extends HTMLElement {
	constructor() {
		super();
		let shadow = this.attachShadow({ mode: "closed" });
		shadow.innerHTML = `<style type="text/css">
* {
	margin: 0px;
	padding: 0px;
}

#base-frame {
	position: absolute;
	display: block;
	width: 100%;
	height: 100%;
	border: none;
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

		let baseFrame = (() => {
			let frame = document.createElement(window == window.top ? "iframe" : "embed");
			frame.id = "base-frame";
			frame.setAttribute("loading", "lazy");
			frame.setAttribute("allowfullscreen", "true");
			frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-popups");
			shadow.prepend(frame);
			return frame;
		})();

		let baseUrl = (() => {
			let base = new URL(window.location.href);
			base.pathname = "/";
			base.search = "";
			return base.href;
		})();

		let setAttr = (key, value = "") => {
			switch(key) {
				case "src":
					if (window != window.top) {
						// set src attribute directly as service workers are not supported
						baseFrame.src = value;
					} else baseFrame.src = baseUrl + "service.html?url=" + encodeURIComponent(value);
					break;
				case "path":
					baseFrame.src = value;
					break;
				default:
					baseFrame.setAttribute(key, value);
			}
		};


		let attr = this.attributes;
		for (let i = 0; i < attr.length; i++) {
			let it = attr.item(i);
			setAttr(it.nodeName, it.nodeValue);
		}

		this.setAttribute = (key, value) => {
			super.setAttribute(key, value);
			setAttr(key, value);
		};

		this.getAttribute = (key) => {
			let value = super.getAttribute(key);
			if (value == null)
				return baseFrame.getAttribute(key);
			return value;
		};

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
			let baseUrl = (() => {
				let base = new URL(window.location.href);
				base.pathname = "/";
				base.search = "";
				return base.href;
			})();

			doc.documentElement.innerHTML = `<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<base href="` + baseUrl + `" />
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

#base-frame {
	position: absolute;
	display: block;
	width: 100%;
	height: 100%;
	border: none;
}
		</style>
	</head>
	<body></body>`;
			doc.body.appendChild(baseFrame.cloneNode(true));
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

customElements.define("content-frame", ContentFrame, {});

export { ContentFrame };
