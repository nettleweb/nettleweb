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
			shadow.prepend(frame);
			return frame;
		})();

		let setAttr = (key, value) => {
			switch(key) {
				case "src":
					if (window != window.top) {
						// set src attribute directly as service workers are not supported
						baseFrame.src = value;
					} else {
						let base = new URL(window.location.href);
						base.pathname = "/";
						baseFrame.src = base.href + "service.html?url=" + encodeURIComponent(value);
					}
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
				console.warn("Failed to enter fullscreen mode", err);
			});
		};
	}
}

customElements.define("content-frame", ContentFrame, {});

export { ContentFrame };
