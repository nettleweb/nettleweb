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
			let frame = document.createElement("iframe");
			frame.id = "base-frame";
			frame.setAttribute("loading", "lazy");
			frame.setAttribute("allowfullscreen", "true");
			frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-pointer-lock allow-forms");
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

		shadow.getElementById("fullscreen-button").onclick = () => {
			baseFrame.focus({ preventScroll: true });
			baseFrame.requestFullscreen().catch((err) => {
				// fullscreen is not supported here
				// so open a new window instead

				let win = window.open("", "_blank", "height=" + screen.availHeight + ", width=" + screen.availWidth);
				let doc = win.document;
				let baseUrl = (() => {
					let base = new URL(window.location.href);
					base.pathname = "/";
					base.search = "";
					return base.href;
				})();

				doc.documentElement.innerHTML = `<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
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
				doc.body.appendChild(baseFrame);
			});
		};
	}
}

customElements.define("content-frame", ContentFrame, {});

export { ContentFrame };
