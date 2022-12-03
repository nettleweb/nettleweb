/*! webalert.js 1.0.0

Copyright (c) 2022 Ruochen Jia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

"use strict";
 /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/util.ts
const util_undefined = void 0;
function fallback(value, def) {
    if (value == null)
        return def;
    return value;
}
function parseDesc(options) {
    switch (typeof options) {
        case "boolean":
            options = {
                writable: options,
                enumerable: options,
                configurable: options
            };
            break;
        case "undefined":
            options = {};
            break;
        case "object":
            if (options == null)
                options = {};
            break;
        default:
            throw new TypeError("Invalid arguments");
    }
    return options;
}
function util_define(obj, key, value, options) {
    options = parseDesc(options);
    if (options.get == null && options.set == null) {
        if (!("value" in options)) {
            options.value = value;
        }
    }
    else {
        delete options.value;
        delete options.writable;
        delete options.enumerable;
    }
    Object.defineProperty(obj, key, options);
}
function descs(obj) {
    const descs = Object.getOwnPropertyDescriptors(obj);
    const descsRet = {};
    for (const key in descs) {
        descsRet[key] = descs[key];
    }
    return descsRet;
}
function keys(obj) {
    const descs = Object.getOwnPropertyDescriptors(obj);
    const keys = [];
    for (const key in descs) {
        keys.push(key);
    }
    return keys;
}
function util_assign(to, from) {
    const d = descs(from);
    for (const k in d) {
        util_define(to, k, void 0, d[k]);
    }
}
function clone(obj) {
    const cloned = {};
    util_assign(cloned, obj);
    return cloned;
}
class Null {
    constructor() {
        this.__defineGetter__ = void 0;
        this.__defineSetter__ = void 0;
        this.__lookupGetter__ = void 0;
        this.__lookupSetter__ = void 0;
        this.__proto__ = void 0;
        this.hasOwnProperty = void 0;
        this.isPrototypeOf = void 0;
        this.propertyIsEnumerable = void 0;
        this.toLocaleString = void 0;
        this.toString = void 0;
        this.valueOf = void 0;
        util_define(this, "constructor", void 0, { writable: false, enumerable: false, configurable: false });
    }
}
Null.instance = new Null();
class RawObject extends Null {
    constructor(initObj) {
        super();
        if (initObj != null) {
            util_assign(this, initObj);
        }
    }
}

;// CONCATENATED MODULE: ./inlined.ts
const dialogDoc = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\n	<head>\n		<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n		<meta http-equiv=\"Referrer-Policy\" content=\"no-referrer\" />\n		<meta name=\"referrer\" content=\"no-referrer\" />\n		<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,minimum-scale=1\" />\n		<meta name=\"robots\" content=\"noindex,nofollow\" />\n		<base href=\"https://webalert.pages.dev/\" />\n		<title>Dialog</title>\n		<style type=\"text/css\">\n@import url(\"res/ubuntu/ubuntu.css\");\n\n* {\n	margin: 0px;\n	padding: 0px;\n}\n\n*:hover, *:active {\n	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\n::selection {\n	color: #ffffff;\n	background-color: #006060;\n}\n\ninput, select, textarea {\n	font-size: inherit;\n	font-family: inherit;\n	font-weight: inherit;\n	font-style: inherit;\n	color: inherit;\n	background-color: rgba(0, 0, 0, 0);\n}\n\nbody {\n	position: absolute;\n	display: block;\n	width: 100%;\n	height: 100%;\n	font-size: 14px;\n	font-weight: 500;\n	font-family: \"Ubuntu\";\n	font-style: normal;\n	color: #323232;\n	accent-color: #006060;\n	background-color: rgba(0, 0, 0, 0.5);\n	overflow: hidden;\n}\n\n#dialog {\n	position: absolute;\n	display: block;\n	width: 250px;\n	height: fit-content;\n	padding: 20px;\n	max-height: 100%;\n	overflow-x: hidden;\n	overflow-y: auto;\n	border-style: solid;\n	border-width: 1px;\n	border-color: #000000;\n	border-radius: 10px;\n	background-color: #ffffff;\n	visibility: hidden;\n}\n\n#titlebar {\n	position: relative;\n	display: block;\n	width: 100%;\n	height: 30px;\n	color: #303030;\n	background-color: rgba(0, 0, 0, 0.1);\n}\n\n#titlebar-icon {\n	position: absolute;\n	display: block;\n	width: 20px;\n	height: 20px;\n	left: 5px;\n	top: 5px;\n}\n\n#titlebar-title {\n	position: absolute;\n	display: block;\n	width: calc(100% - 90px);\n	height: 20px;\n	left: 10px;\n	top: 5px;\n	cursor: default;\n	line-height: 20px;\n	text-align: start;\n	font-size: 16px;\n	text-overflow: ellipsis;\n	overflow: hidden;\n	overflow-wrap: break-word;\n}\n\n.titlebar-button {\n	position: absolute;\n	display: block;\n	width: 20px;\n	height: 20px;\n	top: 5px;\n	cursor: pointer;\n	font-size: 16px;\n	font-weight: 600;\n	line-height: 20px;\n	text-align: center;\n	-webkit-user-select: none;\n	user-select: none;\n	color: #000000;\n	background-color: #a0a0a0;\n	border-width: 1px;\n	border-style: solid;\n	border-top-color: #ffffff;\n	border-left-color: #ffffff;\n	border-right-color: #000000;\n	border-bottom-color: #000000;\n}\n\n.titlebar-button[disabled=\"true\"] {\n	color: #808080;	\n}\n\n.titlebar-button:active {\n	border-top-color: #000000;\n	border-left-color: #000000;\n	border-right-color: #ffffff;\n	border-bottom-color: #ffffff;\n}\n\n.titlebar-button[disabled=\"true\"]:active {\n	border-top-color: #ffffff;\n	border-left-color: #ffffff;\n	border-right-color: #000000;\n	border-bottom-color: #000000;\n}\n\n#titlebar-close-button {\n	right: 5px;\n}\n\n#titlebar-maximize-button {\n	right: 30px;\n}\n\n#titlebar-minimize-button {\n	right: 55px;\n}\n\n.frame {\n	position: relative;\n	display: block;\n	width: 100%;\n	height: calc(100% - 30px);\n	border: none;\n	overflow: hidden;\n}\n\n#element-container {\n	position: relative;\n	display: block;\n	width: 100%;\n	height: fit-content;\n	margin-bottom: 10px;\n}\n\n.title {\n	position: relative;\n	display: block;\n	width: 100%;\n	height: fit-content;\n	margin-top: 5px;\n	margin-bottom: 5px;\n	line-height: 24px;\n	font-size: 18px;\n	font-weight: 600;\n	text-align: center;\n}\n\n.message {\n	position: relative;\n	display: block;\n	width: 100%;\n	height: fit-content;\n	line-height: 20px;\n	text-align: start;\n	overflow-x: hidden;\n	overflow-wrap: break-word;\n}\n\n.input {\n	position: relative;\n	display: block;\n	width: calc(100% - 10px);\n	height: 16px;\n	line-height: 16px;\n	margin-top: 10px;\n	margin-bottom: 10px;\n	padding: 5px;\n	outline: none;\n	accent-color: #006060;\n	border-style: solid;\n	border-width: 1px;\n	border-color: #808080;\n	border-radius: 10px;\n}\n\n.input:focus {\n	border-color: #303030;\n}\n\n#button-bar {\n	position: relative;\n	display: flex;\n	width: fit-content;\n	height: fit-content;\n	margin: auto;\n	gap: 10px;\n	flex-direction: row;\n	flex-wrap: nowrap;\n}\n\n.button {\n	position: relative;\n	display: block;\n	width: fit-content;\n	height: fit-content;\n	padding: 10px;\n	color: #ffffff;\n	background-color: #006060;\n	cursor: pointer;\n	-webkit-user-select: none;\n	user-select: none;\n	border-width: 1px;\n	border-style: solid;\n	border-radius: 10px;\n	border-top-color: #ffffff;\n	border-left-color: #ffffff;\n	border-right-color: #000000;\n	border-bottom-color: #000000;\n}\n\n.button:active {\n	border-top-color: #000000;\n	border-left-color: #000000;\n	border-right-color: #ffffff;\n	border-bottom-color: #ffffff;\n}\n\n.button[disabled=true] {\n	background-color: #808080;\n}\n\n.button[disabled=true]:active {\n	border-top-color: #ffffff;\n	border-left-color: #ffffff;\n	border-right-color: #000000;\n	border-bottom-color: #000000;\n}\n		</style>\n	</head>\n	<body>\n		<div id=\"dialog\"></div>\n		<script type=\"text/javascript\">\n\"use strict\";\n\n// <![CDATA[\n(() => {\n\ndocument.oncontextmenu = (e) => {\n	e.preventDefault();\n	e.stopPropagation();\n};\n\ndocument.onkeydown = (e) => {\n	function checkKey() {\n		const ctrl = e.ctrlKey || e.metaKey;\n		const shift = e.shiftKey;\n		const code = e.keyCode;\n\n		if (ctrl) {\n			if (shift) {\n				switch (code) {\n					case 73: // ctrl+shift+i\n					case 74: // ctrl+shift+j\n						return true;\n				}\n			}\n\n			switch (code) {\n				case 83: // ctrl+s\n				case 85: // ctrl+u\n					return true;\n			}\n		}\n\n		switch (code) {\n			case 123: // f12\n				return true;\n			default:\n				return false;\n		}\n	}\n\n	if (checkKey()) {\n		e.preventDefault();\n		e.stopPropagation();\n		return false;\n	}\n\n	return true;\n};\n\n})();\n// ]]>\n		</script>\n	</body>\n</html>";
const shellDoc = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\n	<head>\n		<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n		<meta http-equiv=\"Referrer-Policy\" content=\"no-referrer\" />\n		<meta name=\"referrer\" content=\"no-referrer\" />\n		<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,minimum-scale=1\" />\n		<meta name=\"robots\" content=\"noindex,nofollow\" />\n		<base href=\"https://webalert.pages.dev/\" />\n		<title>Debug Shell</title>\n		<script type=\"text/javascript\" src=\"res/brython.js\"></script>\n		<script type=\"text/javascript\" src=\"res/brython_stdlib.js\"></script>\n		<style type=\"text/css\">\n@import url(\"res/ubuntu/ubuntu.css\");\n\n* {\n	margin: 0px;\n	padding: 0px;\n}\n\n*:hover, *:active {\n	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\ninput, select, textarea {\n	font-size: inherit;\n	font-family: inherit;\n	font-weight: inherit;\n	font-style: inherit;\n	color: inherit;\n	background-color: rgba(0, 0, 0, 0);\n}\n\nbody {\n	position: absolute;\n	display: block;\n	width: 100%;\n	height: 100%;\n	font-size: 14px;\n	font-weight: 500;\n	font-family: \"Ubuntu Mono\";\n	font-style: normal;\n	color: #323232;\n	background-color: #ffffff;\n	overflow: hidden;\n}\n\n#console {\n	position: absolute;\n	display: block;\n	width: calc(100% - 20px);\n	height: calc(100% - 20px);\n	padding: 10px;\n	border: none;\n	resize: none;\n	outline: none;\n}\n		</style>\n	</head>\n	<body>\n		<textarea id=\"console\" rows=\"20\" cols=\"80\" spellcheck=\"false\">Loading...</textarea>\n		<script type=\"text/python\">\nfrom interpreter import Interpreter;\n\nit = Interpreter(\"console\");\nit.feed(\"from browser import window as win; window = win.top; document = window.document; console = window.console;\");\n		</script>\n		<script type=\"text/javascript\">\n\"use strict\";\n\n// <![CDATA[\n(() => {\n\nconst brython = window.brython;\nif (typeof brython != \"function\") {\n	document.getElementById(\"console\").innerHTML = \"Error: Failed to load debug shell\";\n	return;\n}\n\nbrython(1);\n\n})();\n// ]]>\n		</script>\n	</body>\n</html>";

;// CONCATENATED MODULE: ./src/Dialog.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function waitForBody() {
    return new Promise(resolve => {
        const body = document.body;
        if (body == null) {
            document.addEventListener("DOMContentLoaded", () => {
                resolve(document.body);
            }, { once: true, passive: true });
        }
        else
            resolve(body);
    });
}
function createFrame() {
    const frame = document.createElement("iframe");
    frame.setAttribute("type", "text/plain");
    frame.setAttribute("width", "1024");
    frame.setAttribute("height", "768");
    frame.setAttribute("scrolling", "no");
    frame.setAttribute("loading", "eager");
    frame.setAttribute("allowfullscreen", "true");
    frame.setAttribute("allowtransparency", "true");
    frame.setAttribute("fetchpriority", "high");
    frame.setAttribute("style", "position:absolute;display:block;width:100%;height:100%;top:0px;left:0px;right:0px;bottom:0px;border:none;z-index:9999;");
    return frame;
}
const blobUrl = URL.createObjectURL(new Blob([dialogDoc], { type: "application/xhtml+xml", endings: "native" }));
function waitFor(element) {
    return new Promise(resolve => {
        element.addEventListener("load", resolve, { once: true, passive: true });
    });
}
class Dialog extends RawObject {
    constructor(init) {
        super(init);
        this.canceled = false;
    }
    loadDocument() {
        return __awaiter(this, void 0, void 0, function* () {
            const frame = createFrame();
            const body = yield waitForBody();
            frame.setAttribute("src", blobUrl);
            body.scrollTo(0, 0);
            body.style.overflow = "hidden";
            body.appendChild(frame);
            yield waitFor(frame);
            const win = frame.contentWindow;
            const doc = win.document;
            this.frameWindow = win;
            this.frameDocument = doc;
            this.currentFrame = frame;
            this.dialogElement = doc.getElementById("dialog");
        });
    }
    initializeDocument() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    draggableElement(elem, dragger = elem) {
        dragger.onmousedown = (e) => {
            e.preventDefault();
            let x1 = e.clientX;
            let y1 = e.clientY;
            elem.onmouseout = elem.onmouseup = (e) => {
                e.preventDefault();
                elem.onmouseup = null;
                elem.onmousemove = null;
            };
            elem.onmousemove = (e) => {
                e.preventDefault();
                const x = e.clientX;
                const y = e.clientY;
                let x2 = x1 - x;
                let y2 = y1 - y;
                x1 = x;
                y1 = y;
                elem.style.top = Math.round(elem.offsetTop - y2) + "px";
                elem.style.left = Math.round(elem.offsetLeft - x2) + "px";
            };
        };
    }
    initializeDraggable() {
    }
    measureDocument() {
        return __awaiter(this, void 0, void 0, function* () {
            const dialog = this.dialogElement;
            const frame = this.currentFrame;
            const width = this.width;
            if (width != null)
                dialog.style.width = width + "px";
            const height = this.height;
            if (height != null)
                dialog.style.height = height + "px";
            const paddingX = this.paddingX;
            if (paddingX != null) {
                dialog.style.paddingLeft = paddingX + "px";
                dialog.style.paddingRight = paddingX + "px";
            }
            const paddingY = this.paddingY;
            if (paddingY != null) {
                dialog.style.paddingTop = paddingY + "px";
                dialog.style.paddingBottom = paddingY + "px";
            }
            if (fallback(this.centered, true)) {
                const resize = () => __awaiter(this, void 0, void 0, function* () {
                    const dw = dialog.clientWidth + 2; // includes borders
                    const dh = dialog.clientHeight + 2;
                    dialog.style.left = Math.floor((frame.clientWidth - dw) / 2) + "px";
                    dialog.style.top = Math.floor((frame.clientHeight - dh) / 2) + "px";
                });
                yield resize();
                dialog.addEventListener("resize", resize, true);
                window.addEventListener("resize", resize, true);
            }
            else {
                const x = this.x;
                if (x != null)
                    dialog.style.left = x + "px";
                const y = this.y;
                if (y != null)
                    dialog.style.top = y + "px";
                if (fallback(this.draggable, false)) {
                    this.initializeDraggable();
                }
            }
            if (fallback(this.resizable, false)) {
                dialog.style.resize = "both";
                dialog.style.overflow = "auto";
            }
            dialog.style.visibility = "visible";
        });
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadDocument();
            yield this.initializeDocument();
            yield this.measureDocument();
        });
    }
    dismiss() {
        if (this.currentFrame != null) {
            // unlock scrolling
            document.body.style.overflow = "";
            this.currentFrame.remove();
            this.currentFrame = null;
        }
    }
    cancel() {
        this.dismiss();
        util_define(this, "canceled", true);
    }
    close() {
        this.dismiss();
    }
}

;// CONCATENATED MODULE: ./src/AlertDialog.ts
var AlertDialog_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function initButton(config, element) {
    if (config != null) {
        element.innerHTML = fallback(config.text, "");
        if (fallback(config.disabled, false))
            element.setAttribute("disabled", "true");
        else
            element.onclick = config.onclick;
    }
    else
        element.remove();
}
class AlertDialog extends Dialog {
    constructor(init) {
        super(init);
    }
    /** @Override */
    initializeDocument() {
        return AlertDialog_awaiter(this, void 0, void 0, function* () {
            this.dialogElement.innerHTML = "<div id=\"element-container\"></div><div id=\"button-bar\"><div id=\"negative-button\" class=\"button\"></div><div id=\"neutral-button\" class=\"button\"></div><div id=\"positive-button\" class=\"button\"></div></div>";
            const doc = this.frameDocument;
            const ec = doc.getElementById("element-container");
            const title = this.title;
            if (title != null) {
                const elem = doc.createElement("div");
                elem.className = "title";
                elem.innerHTML = title;
                ec.appendChild(elem);
            }
            const message = this.message;
            if (message != null) {
                const elem = doc.createElement("div");
                elem.className = "message";
                elem.innerHTML = message;
                ec.appendChild(elem);
            }
            const elements = this.elements;
            if (elements != null) {
                for (let element of elements) {
                    if (element instanceof HTMLElement) {
                        ec.appendChild(element);
                    }
                    else {
                        const elem = doc.createElement(element.type);
                        elem.className = fallback(element.className, "");
                        elem.innerHTML = fallback(element.innerHTML, "");
                        const style = element.style;
                        if (style != null)
                            elem.setAttribute("style", style);
                        for (let attr of fallback(element.attributes, []))
                            elem.setAttribute(attr.name, attr.value);
                        ec.appendChild(elem);
                    }
                }
            }
            initButton(this.positiveButton, doc.getElementById("positive-button"));
            initButton(this.negativeButton, doc.getElementById("negative-button"));
            initButton(this.neutralButton, doc.getElementById("neutral-button"));
        });
    }
}

;// CONCATENATED MODULE: ./src/WindowDialog.ts
var WindowDialog_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class WindowDialog extends Dialog {
    constructor(init) {
        const config = fallback(init, {});
        super(Object.assign(Object.assign({}, config), { centered: fallback(config.centered, false), draggable: fallback(config.draggable, true), width: fallback(config.width, 1024), height: fallback(config.height, 768), 
            // paddings are always 0 in window dialog
            paddingX: void 0, paddingY: void 0 }));
        this.maximized = false;
        this.minimized = false;
    }
    minimize() {
        // currently minimize a dialog is not supported
        // dismiss it instead
        this.dismiss();
        util_define(this, "minimized", true);
    }
    maximize() {
        const dialog = this.dialogElement;
        if (!this.maximized) {
            dialog.style.width = "100%";
            dialog.style.height = "100%";
            dialog.style.left = "0px";
            dialog.style.top = "0px";
            util_define(this, "maximized", true);
        }
        else {
            const width = this.width;
            const height = this.height;
            dialog.style.width = width != null ? width + "px" : "";
            dialog.style.height = height != null ? height + "px" : "";
            dialog.style.left = "";
            dialog.style.top = "";
            util_define(this, "maximized", false);
        }
    }
    initializeDraggable() {
        this.draggableElement(this.dialogElement, this.frameDocument.getElementById("titlebar"));
    }
    initializeDocument() {
        return WindowDialog_awaiter(this, void 0, void 0, function* () {
            const dialog = this.dialogElement;
            dialog.style.padding = "0px";
            let title = fallback(this.title, "");
            if (typeof title == "string")
                title = { title };
            const titlebarElem = document.createElement("div");
            titlebarElem.id = "titlebar";
            dialog.appendChild(titlebarElem);
            const icon = title.icon;
            if (icon != null) {
                if (icon instanceof HTMLImageElement) {
                    icon.id = "titlebar-icon";
                    icon.width = 20;
                    icon.height = 20;
                    titlebarElem.appendChild(icon);
                    return;
                }
                const elem = document.createElement("img");
                elem.id = "titlebar-icon";
                elem.width = 20;
                elem.height = 20;
                let src;
                if (typeof icon == "string")
                    src = icon;
                else if (icon instanceof URL)
                    src = icon.href;
                else {
                    const ar = new Uint8Array(icon);
                    src = URL.createObjectURL(new Blob([ar.buffer], { type: "image", endings: "native" }));
                }
                elem.src = src;
                titlebarElem.appendChild(elem);
            }
            const titleText = title.title;
            if (titleText != null) {
                const elem = document.createElement("div");
                elem.id = "titlebar-title";
                elem.innerHTML = titleText;
                titlebarElem.appendChild(elem);
            }
            let closeButton = fallback(title.closeButton, true);
            if (typeof closeButton == "boolean")
                closeButton = { visible: closeButton };
            if (fallback(closeButton.visible, true)) {
                const elem = document.createElement("div");
                elem.id = "titlebar-close-button";
                elem.className = "titlebar-button";
                elem.innerHTML = "\u00d7";
                if (fallback(closeButton.disabled, false))
                    elem.setAttribute("disabled", "true");
                else
                    elem.onclick = () => this.close();
                titlebarElem.appendChild(elem);
            }
            let maximizeButton = fallback(title.maximizeButton, true);
            if (typeof maximizeButton == "boolean")
                maximizeButton = { visible: maximizeButton };
            if (fallback(maximizeButton.visible, true)) {
                const elem = document.createElement("div");
                elem.id = "titlebar-maximize-button";
                elem.className = "titlebar-button";
                elem.innerHTML = "\u25a1";
                if (fallback(maximizeButton.disabled, false))
                    elem.setAttribute("disabled", "true");
                else
                    elem.onclick = () => this.maximize();
                titlebarElem.appendChild(elem);
            }
            let minimizeButton = fallback(title.minimizeButton, true);
            if (typeof minimizeButton == "boolean")
                minimizeButton = { visible: minimizeButton };
            if (fallback(minimizeButton.visible, true)) {
                const elem = document.createElement("div");
                elem.id = "titlebar-minimize-button";
                elem.className = "titlebar-button";
                elem.innerHTML = "\u2013";
                if (fallback(minimizeButton.disabled, false))
                    elem.setAttribute("disabled", "true");
                else
                    elem.onclick = () => this.minimize();
                titlebarElem.appendChild(elem);
            }
            const frame = fallback(this.frame, "");
            if (frame instanceof HTMLElement) {
                frame.className = "frame";
                dialog.appendChild(frame);
                return;
            }
            let src;
            if (typeof frame == "string")
                src = frame;
            else if (frame instanceof URL)
                src = frame.href;
            else {
                const ar = new Uint8Array(frame);
                src = URL.createObjectURL(new Blob([ar.buffer], { type: "text/html", endings: "native" }));
            }
            const frameElem = document.createElement("embed");
            frameElem.type = "text/plain";
            frameElem.width = "1024";
            frameElem.height = "768";
            frameElem.src = src;
            frameElem.className = "frame";
            dialog.appendChild(frameElem);
        });
    }
}

;// CONCATENATED MODULE: ./src/alert.ts
var alert_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const alert_alert = (message, title) => alert_awaiter(void 0, void 0, void 0, function* () {
    const dialog = new AlertDialog({
        message: message,
        title: title,
        positiveButton: {
            text: "OK",
            onclick: () => {
                dialog.dismiss();
            }
        }
    });
    yield dialog.show();
});
/* harmony default export */ const src_alert = (alert_alert);

;// CONCATENATED MODULE: ./src/confirm.ts

const confirm_confirm = (message, title) => {
    return new Promise(resolve => {
        const dialog = new AlertDialog({
            message: message,
            title: title,
            positiveButton: {
                text: "OK",
                onclick: () => {
                    dialog.dismiss();
                    resolve(true);
                }
            },
            negativeButton: {
                text: "Cancel",
                onclick: () => {
                    dialog.cancel();
                    resolve(false);
                }
            }
        });
        dialog.show();
    });
};
/* harmony default export */ const src_confirm = (confirm_confirm);

;// CONCATENATED MODULE: ./src/prompt.ts


const prompt_prompt = (message, defaultValue, title, placeholder) => {
    return new Promise(resolve => {
        const inputElem = document.createElement("input");
        inputElem.type = "text";
        inputElem.value = fallback(defaultValue, "");
        inputElem.placeholder = fallback(placeholder, "");
        inputElem.className = "input";
        const dialog = new AlertDialog({
            message: message,
            title: title,
            positiveButton: {
                text: "OK",
                onclick: () => {
                    dialog.dismiss();
                    resolve(inputElem.value);
                }
            },
            negativeButton: {
                text: "Cancel",
                onclick: () => {
                    dialog.cancel();
                    resolve(null);
                }
            },
            elements: [inputElem]
        });
        inputElem.onkeydown = (e) => {
            if (e.keyCode == 13) { // Enter
                e.preventDefault();
                dialog.positiveButton.onclick();
            }
        };
        dialog.show();
    });
};
/* harmony default export */ const src_prompt = (prompt_prompt);

;// CONCATENATED MODULE: ./src/block.ts
var block_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const block = (message, title) => block_awaiter(void 0, void 0, void 0, function* () {
    yield new AlertDialog({
        message: message,
        title: title
    }).show();
});
/* harmony default export */ const src_block = (block);

;// CONCATENATED MODULE: ./src/form.ts


const form_form = (message, title, elementsInit) => {
    return new Promise(resolve => {
        const elements = fallback(elementsInit, []);
        const htmlElements = [];
        for (let element of elements) {
            const inline = fallback(element.inline, false);
            const label = element.label;
            if (label != null) {
                const labelElem = document.createElement("div");
                labelElem.className = "message";
                labelElem.innerHTML = label;
                if (inline) {
                    labelElem.style.display = "inline-block";
                    labelElem.style.width = "fit-content";
                }
                htmlElements.push(labelElem);
            }
            let input = element.input;
            if (input != null) {
                if (typeof input == "string")
                    input = { type: input };
                const inputElem = document.createElement("input");
                inputElem.className = "input";
                inputElem.type = fallback(input.type, "text");
                inputElem.value = fallback(input.value, "");
                inputElem.placeholder = fallback(input.placeholder, "");
                inputElem.checked = fallback(input.checked, false);
                inputElem.disabled = fallback(input.disabled, false);
                for (let attr of fallback(input.attributes, []))
                    inputElem.setAttribute(attr.name, attr.value);
                if (inline) {
                    inputElem.style.display = "inline-block";
                    inputElem.style.width = "fit-content";
                }
                htmlElements.push(inputElem);
                element["\ud801"] = inputElem;
            }
        }
        const dialog = new AlertDialog({
            message: message,
            title: title,
            elements: htmlElements,
            positiveButton: {
                text: "OK",
                onclick: () => {
                    dialog.dismiss();
                    const result = [];
                    for (let element of elements) {
                        const inputElem = element["\ud801"];
                        const res = { label: element.label };
                        if (inputElem != null) {
                            const attr = [];
                            for (let i = 0; i < inputElem.attributes.length; i++) {
                                const it = inputElem.attributes.item(i);
                                attr.push({
                                    name: it.name,
                                    value: it.value
                                });
                            }
                            res.value = inputElem.value;
                            res.checked = inputElem.checked;
                            res.attributes = attr;
                        }
                        result.push(res);
                    }
                    resolve(result);
                }
            },
            negativeButton: {
                text: "Cancel",
                onclick: () => {
                    dialog.cancel();
                    resolve(null);
                }
            }
        });
        dialog.show();
    });
};
/* harmony default export */ const src_form = (form_form);

;// CONCATENATED MODULE: ./src/popup.ts
var popup_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const popup = (src, title) => popup_awaiter(void 0, void 0, void 0, function* () {
    yield new WindowDialog({
        title,
        frame: src
    }).show();
});
/* harmony default export */ const src_popup = (popup);

;// CONCATENATED MODULE: ./src/inspect.ts
var inspect_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function inspect_createFrame() {
    const frame = document.createElement("embed");
    frame.setAttribute("type", "text/plain");
    frame.setAttribute("width", "1024");
    frame.setAttribute("height", "768");
    return frame;
}
const blob = URL.createObjectURL(new Blob([shellDoc], { type: "text/html", endings: "native" }));
const inspect = () => inspect_awaiter(void 0, void 0, void 0, function* () {
    const frame = inspect_createFrame();
    frame.setAttribute("src", blob);
    yield new WindowDialog({
        title: "Debug Shell",
        frame
    }).show();
});
/* harmony default export */ const src_inspect = (inspect);

;// CONCATENATED MODULE: ./src/webalert.internal.ts











const webAlert = {
    Dialog: Dialog,
    AlertDialog: AlertDialog,
    WindowDialog: WindowDialog,
    alert: src_alert,
    confirm: src_confirm,
    prompt: src_prompt,
    block: src_block,
    form: src_form,
    popup: src_popup,
    inspect: src_inspect
};
// unchecked global cast
const __global = window;
util_define(__global, "webAlert", webAlert, false);
delete __global.alert;
delete __global.confirm;
delete __global.prompt;
util_define(__global, "alert", src_alert, false);
util_define(__global, "confirm", src_confirm, false);
util_define(__global, "prompt", src_prompt, false);
util_define(__global, "block", src_block, false);
util_define(__global, "form", src_form, false);
util_define(__global, "popup", src_popup, false);
util_define(__global, "inspect", src_inspect, false);

/******/ })()
;
//# sourceMappingURL=webalert.js.map
