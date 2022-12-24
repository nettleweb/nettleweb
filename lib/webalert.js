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

;// CONCATENATED MODULE: ./inlined.js


const Base64 = (() => {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	const lookup = new Uint8Array(256);
	for (let i = 0; i < chars.length; i++)
		lookup[chars.charCodeAt(i)] = i;

	const encoder = new TextEncoder();
	const decoder = new TextDecoder();

	/**
	 * @param {ArrayBufferLike | ArrayLike<number>} buffer 
	 */
	function encode(buffer) {
		const array = new Uint8Array(buffer);
		const len = array.length;
		let base64 = "";

		for (let i = 0; i < len; i += 3) {
			base64 += chars[array[i] >> 2];
			base64 += chars[((array[i] & 3) << 4) | (array[i + 1] >> 4)];
			base64 += chars[((array[i + 1] & 15) << 2) | (array[i + 2] >> 6)];
			base64 += chars[array[i + 2] & 63];
		}

		if ((len % 3) === 2) {
			base64 = base64.substring(0, base64.length - 1) + "=";
		} else if (len % 3 === 1) {
			base64 = base64.substring(0, base64.length - 2) + "==";
		}

		return base64;
	}

	/**
	 * @param {string} base64 
	 */
	function decode(base64) {
		const len = base64.length;

		let bufLen = base64.length * 0.75;
		let p = 0;

		if (base64[len - 1] === "=") {
			bufLen--;
			if (base64[len - 2] === "=") {
				bufLen--;
			}
		}

		const array = new Uint8Array(bufLen);

		for (let i = 0; i < len; i += 4) {
			const b0 = lookup[base64.charCodeAt(i)];
			const b1 = lookup[base64.charCodeAt(i + 1)];
			const b2 = lookup[base64.charCodeAt(i + 2)];
			const b4 = lookup[base64.charCodeAt(i + 3)];

			array[p++] = (b0 << 2) | (b1 >> 4);
			array[p++] = ((b1 & 15) << 4) | (b2 >> 2);
			array[p++] = ((b2 & 3) << 6) | (b4 & 63);
		}

		return array.buffer;
	}

	/**
	 * @param {string} str 
	 */
	function btoa(str) {
		return encode(encoder.encode(str));
	}

	/**
	 * @param {string} str 
	 */
	function atob(str) {
		return decoder.decode(decode(str), { stream: true });
	}

	return { encode, decode, btoa, atob };
})();
Base64;
const dialogDoc = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\n	<head>\n		<meta charset=\"utf-8\" />\n		<meta name=\"referrer\" content=\"no-referrer\" />\n		<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,minimum-scale=1\" />\n		<meta name=\"robots\" content=\"noindex,nofollow\" />\n		<title>Dialog</title>\n	</head>\n	<body>\n		<div id=\"dialog\">\n			<div id=\"titlebar\"></div>\n			<div id=\"dialog-body\"></div>\n		</div>\n		<script type=\"text/javascript\">\n\"use strict\";\n\n// <![CDATA[\n(() => {\n\ndocument.oncontextmenu = (e) => {\n	e.preventDefault();\n	e.stopPropagation();\n};\n\ndocument.onkeydown = (e) => {\n	function checkKey() {\n		const ctrl = e.ctrlKey || e.metaKey;\n		const shift = e.shiftKey;\n		const code = e.keyCode;\n\n		if (ctrl) {\n			if (shift) {\n				switch (code) {\n					case 73: // ctrl+shift+i\n					case 74: // ctrl+shift+j\n						return true;\n				}\n			}\n\n			switch (code) {\n				case 83: // ctrl+s\n				case 85: // ctrl+u\n					return true;\n			}\n		}\n\n		switch (code) {\n			case 123: // f12\n				return true;\n			default:\n				return false;\n		}\n	}\n\n	if (checkKey()) {\n		e.preventDefault();\n		e.stopPropagation();\n		return false;\n	}\n\n	return true;\n};\n\n})();\n// ]]>\n		</script>\n	</body>\n</html>";
const shellDoc = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\n	<head>\n		<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n		<meta http-equiv=\"Referrer-Policy\" content=\"no-referrer\" />\n		<meta name=\"referrer\" content=\"no-referrer\" />\n		<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,minimum-scale=1\" />\n		<meta name=\"robots\" content=\"noindex,nofollow\" />\n		<base href=\"https://webalert.pages.dev/\" />\n		<title>Debug Shell</title>\n		<script type=\"text/javascript\" src=\"res/brython.js\"></script>\n		<script type=\"text/javascript\" src=\"res/brython_stdlib.js\"></script>\n		<style type=\"text/css\">\n@import url(\"res/ubuntu/ubuntu.css\");\n\n* {\n	margin: 0px;\n	padding: 0px;\n}\n\n*:hover, *:active {\n	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\ninput, select, textarea {\n	font-size: inherit;\n	font-family: inherit;\n	font-weight: inherit;\n	font-style: inherit;\n	color: inherit;\n	background-color: rgba(0, 0, 0, 0);\n}\n\nbody {\n	position: absolute;\n	display: block;\n	width: 100%;\n	height: 100%;\n	font-size: 14px;\n	font-weight: 500;\n	font-family: \"Ubuntu Mono\";\n	font-style: normal;\n	color: #323232;\n	background-color: #ffffff;\n	overflow: hidden;\n}\n\n#console {\n	position: absolute;\n	display: block;\n	width: calc(100% - 20px);\n	height: calc(100% - 20px);\n	padding: 10px;\n	border: none;\n	resize: none;\n	outline: none;\n}\n		</style>\n	</head>\n	<body>\n		<textarea id=\"console\" rows=\"20\" cols=\"80\" spellcheck=\"false\">Loading...</textarea>\n		<script type=\"text/python\">\nfrom interpreter import Interpreter;\n\nit = Interpreter(\"console\");\nit.feed(\"from browser import window as win; window = win.top; document = window.document; console = window.console;\");\n		</script>\n		<script type=\"text/javascript\">\n\"use strict\";\n\n// <![CDATA[\n(() => {\n\nconst brython = window.brython;\nif (typeof brython != \"function\") {\n	document.getElementById(\"console\").innerHTML = \"Error: Failed to load debug shell\";\n	return;\n}\n\nbrython(1);\n\n})();\n// ]]>\n		</script>\n	</body>\n</html>";
const dialogCss = "* {\n	margin: 0px;\n	padding: 0px;\n}\n\n*:hover, *:active {\n	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\n::selection {\n	color: #ffffff;\n	background: #006060;\n}\n\nbody {\n	position: absolute;\n	display: block;\n	width: 100%;\n	height: 100%;\n	font-size: 12px;\n	font-weight: 500;\n	font-family: Arial;\n	font-style: normal;\n	color: #222222;\n	accent-color: #006060;\n    background: rgba(0, 0, 0, 0);\n	-webkit-font-smoothing: none;\n}\n\ninput, select, option, textarea, button {\n	font-size: inherit;\n	font-family: inherit;\n	font-weight: inherit;\n	font-style: inherit;\n	color: inherit;\n	background: rgba(0, 0, 0, 0);\n	-webkit-font-smoothing: none;\n}\n\nbutton, label, input, textarea, select, option, #dialog, #titlebar {\n	font-family: \"ms-sans-serif\", Arial;\n	font-size: 11px;\n	-webkit-font-smoothing: none;\n}\n\nh1 { font-size: 5rem; }\nh2 { font-size: 2.5rem; }\nh3 { font-size: 2rem; }\nh4 { font-size: 1.5rem; }\nu { text-decoration: none; border-bottom: 0.5px solid #222222; }\n\nbutton, input[type=\"submit\"], input[type=\"reset\"] {\n	width: fit-content;\n	height: fit-content;\n	min-width: 75px;\n	min-height: 23px;\n	padding: 1px 12px;\n	border: none;\n	border-radius: 0px;\n	box-sizing: border-box;\n	background: #c0c0c0;\n	box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;\n}\n\nbutton:not(:disabled):active, input[type=\"submit\"]:not(:disabled):active, input[type=\"reset\"]:not(:disabled):active {\n	color: rgba(0, 0, 0, 0);\n	box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080;\n	text-shadow: 1px 1px #222222;\n}\n\n@media (not(hover)) {\n	button:not(:disabled):hover, input[type=\"submit\"]:not(:disabled):hover, input[type=\"reset\"]:not(:disabled):hover {\n		box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080;\n	}\n}\n\nbutton:focus, input[type=\"submit\"]:focus, input[type=\"reset\"]:focus {\n	outline: 1px dotted #000000;\n	outline-offset: -4px;\n}\n\nbutton::-moz-focus-inner, input[type=\"submit\"]::-moz-focus-inner, input[type=\"reset\"]::-moz-focus-inner {\n	border: 0;\n}\n\n:disabled, :disabled+label, input[readonly], input[readonly]+label {\n	color: #808080;\n}\n\nbutton:disabled, input[type=\"submit\"]:disabled, input[type=\"reset\"]:disabled, :disabled+label {\n	text-shadow: 1px 1px 0 #ffffff;\n}\n\nlabel {\n	display: inline-flex;\n	align-items: center;\n}\n\ninput[type=\"radio\"], input[type=\"checkbox\"] {\n	-webkit-appearance: none;\n	-moz-appearance: none;\n	appearance: none;\n	border: none;\n	position: fixed;\n	opacity: 0;\n}\n\ninput[type=\"radio\"]+label, input[type=\"checkbox\"]+label {\n	line-height: 13px;\n}\n\ninput[type=\"radio\"]+label {\n	position: relative;\n	margin-left: 18px;\n}\n\ninput[type=\"radio\"]+label::before {\n	position: absolute;\n	display: inline-block;\n	width: 12px;\n	height: 12px;\n	top: 0;\n	left: -18px;\n	margin-right: 6px;\n	content: \"\";\n	background: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04IDBINFYxSDJWMkgxVjRIMFY4SDFWMTBIMlY4SDFWNEgyVjJINFYxSDhWMkgxMFYxSDhWMFoiIGZpbGw9IiM4MDgwODAiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04IDFINFYySDJWM1Y0SDFWOEgyVjlIM1Y4SDJWNEgzVjNINFYySDhWM0gxMFYySDhWMVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOSAzSDEwVjRIOVYzWk0xMCA4VjRIMTFWOEgxMFpNOCAxMFY5SDlWOEgxMFY5VjEwSDhaTTQgMTBWMTFIOFYxMEg0Wk00IDEwVjlIMlYxMEg0WiIgZmlsbD0iI0RGREZERiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTExIDJIMTBWNEgxMVY4SDEwVjEwSDhWMTFINFYxMEgyVjExSDRWMTJIOFYxMUgxMFYxMEgxMVY4SDEyVjRIMTFWMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNCAySDhWM0g5VjRIMTBWOEg5VjlIOFYxMEg0VjlIM1Y4SDJWNEgzVjNINFYyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cgo=\");\n}\n\ninput[type=\"radio\"]:active+label::before {\n	background: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04IDBINFYxSDJWMkgxVjRIMFY4SDFWMTBIMlY4SDFWNEgyVjJINFYxSDhWMkgxMFYxSDhWMFoiIGZpbGw9IiM4MDgwODAiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04IDFINFYySDJWM1Y0SDFWOEgyVjlIM1Y4SDJWNEgzVjNINFYySDhWM0gxMFYySDhWMVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOSAzSDEwVjRIOVYzWk0xMCA4VjRIMTFWOEgxMFpNOCAxMFY5SDlWOEgxMFY5VjEwSDhaTTQgMTBWMTFIOFYxMEg0Wk00IDEwVjlIMlYxMEg0WiIgZmlsbD0iI0RGREZERiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTExIDJIMTBWNEgxMVY4SDEwVjEwSDhWMTFINFYxMEgyVjExSDRWMTJIOFYxMUgxMFYxMEgxMVY4SDEyVjRIMTFWMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNCAySDhWM0g5VjRIMTBWOEg5VjlIOFYxMEg0VjlIM1Y4SDJWNEgzVjNINFYyWiIgZmlsbD0iI0MwQzBDMCIvPgo8L3N2Zz4K\");\n}\n\ninput[type=\"radio\"]:checked+label::after {\n	position: absolute;\n	display: block;\n	width: 4px;\n	height: 4px;\n	top: 4px;\n	left: -14px;\n	content: \"\";\n	background: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB2aWV3Qm94PSIwIDAgNCA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMgMEgxVjFIMFYyVjNIMVY0SDNWM0g0VjJWMUgzVjBaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K\");\n}\n\ninput[type=\"radio\"]:focus+label, input[type=\"checkbox\"]:focus+label {\n	outline: 1px dotted #000000;\n}\n\ninput[type=\"radio\"][disabled]+label::before {\n	background: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04IDBINFYxSDJWMkgxVjRIMFY4SDFWMTBIMlY4SDFWNEgyVjJINFYxSDhWMkgxMFYxSDhWMFoiIGZpbGw9IiM4MDgwODAiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04IDFINFYySDJWM1Y0SDFWOEgyVjlIM1Y4SDJWNEgzVjNINFYySDhWM0gxMFYySDhWMVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOSAzSDEwVjRIOVYzWk0xMCA4VjRIMTFWOEgxMFpNOCAxMFY5SDlWOEgxMFY5VjEwSDhaTTQgMTBWMTFIOFYxMEg0Wk00IDEwVjlIMlYxMEg0WiIgZmlsbD0iI0RGREZERiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTExIDJIMTBWNEgxMVY4SDEwVjEwSDhWMTFINFYxMEgyVjExSDRWMTJIOFYxMUgxMFYxMEgxMVY4SDEyVjRIMTFWMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNCAySDhWM0g5VjRIMTBWOEg5VjlIOFYxMEg0VjlIM1Y4SDJWNEgzVjNINFYyWiIgZmlsbD0iI0MwQzBDMCIvPgo8L3N2Zz4K\");\n}\n\ninput[type=\"radio\"][disabled]:checked+label::after {\n	background: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB2aWV3Qm94PSIwIDAgNCA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMgMEgxVjFIMFYyVjNIMVY0SDNWM0g0VjJWMUgzVjBaIiBmaWxsPSIjODA4MDgwIi8+Cjwvc3ZnPgo=\");\n}\n\ninput[type=\"checkbox\"]+label {\n	position: relative;\n	margin-left: 19px;\n}\n\ninput[type=\"checkbox\"]+label::before {\n	position: absolute;\n	display: inline-block;\n	width: 13px;\n	height: 13px;\n	left: calc(-1 * (19px));\n	margin-right: 6px;\n	content: \"\";	\n	background: #ffffff;\n	box-shadow: inset -1px -1px #ffffff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;\n}\n\ninput[type=\"checkbox\"]:active+label::before {\n	background: #c0c0c0;\n}\n\ninput[type=\"checkbox\"]:checked+label::after {\n	position: absolute;\n	display: block;\n	width: 7px;\n	height: 7px;\n	top: 3px;\n	left: -16px;\n	content: \"\";\n	background: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNyIgaGVpZ2h0PSI3IiB2aWV3Qm94PSIwIDAgNyA3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTcgMEg2VjFINVYySDRWM0gzVjRIMlYzSDFWMkgwVjVIMVY2SDJWN0gzVjZINFY1SDVWNEg2VjNIN1YwWiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==\");\n}\n\ninput[type=\"checkbox\"][disabled]+label::before {\n	background: #c0c0c0;\n}\n\ninput[type=\"checkbox\"][disabled]:checked+label::after {\n	background: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNyIgaGVpZ2h0PSI3IiB2aWV3Qm94PSIwIDAgNyA3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTcgMEg2VjFINVYySDRWM0gzVjRIMlYzSDFWMkgwVjVIMVY2SDJWN0gzVjZINFY1SDVWNEg2VjNIN1YwWiIgZmlsbD0iIzgwODA4MCIvPgo8L3N2Zz4K\");\n}\n\ninput[type=\"text\"], input[type=\"password\"], input[type=\"email\"], input[type=\"number\"], select, textarea {\n	-webkit-appearance: none;\n	-moz-appearance: none;\n	appearance: none;\n	border: none;\n	border-radius: 0;\n	padding: 3px 4px;\n	box-sizing: border-box;	\n	box-shadow: inset -1px -1px #ffffff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;\n	background: #ffffff;\n}\n\ninput[type=\"text\"], input[type=\"password\"], input[type=\"email\"], select {\n	height: 21px;\n}\n\ninput[type=\"number\"] {\n	height: 22px;\n}\n\ninput[type=\"text\"], input[type=\"password\"], input[type=\"email\"], input[type=\"number\"] {\n	line-height: 2;\n}\n\ninput[type=\"email\"]:disabled, input[type=\"password\"]:disabled, input[type=\"text\"]:disabled, input[type=\"number\"]:disabled, input[type=\"email\"]:read-only, input[type=\"password\"]:read-only, input[type=\"text\"]:read-only, input[type=\"number\"]:read-only, textarea:disabled {\n	background: #c0c0c0;\n}\n\nselect {\n	-webkit-appearance: none;\n	-moz-appearance: none;\n	appearance: none;\n	border-radius: 0;\n	position: relative;\n	padding-right: 32px;\n	background-image: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNSAwSDBWMVYxNkgxVjFIMTVWMFoiIGZpbGw9IiNERkRGREYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yIDFIMVYxNUgyVjJIMTRWMUgyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNiAxN0gxNUgwVjE2SDE1VjBIMTZWMTdaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE1IDFIMTRWMTVIMVYxNkgxNEgxNVYxWiIgZmlsbD0iIzgwODA4MCIvPgo8cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iMTIiIGhlaWdodD0iMTMiIGZpbGw9IiNDMEMwQzAiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMSA2SDRWN0g1VjhINlY5SDdWMTBIOFY5SDlWOEgxMFY3SDExVjZaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K\");\n	background-position: top 2px right 2px;\n	background-repeat: no-repeat;\n}\n\nselect:focus, input[type=\"text\"]:focus, input[type=\"password\"]:focus, input[type=\"email\"]:focus, input[type=\"number\"]:focus, input[type=\"range\"]:focus, textarea:focus {\n	outline: none;\n}\n\ninput[type=\"range\"] {\n	-webkit-appearance: none;\n	width: 100%;\n	background: rgba(0, 0, 0, 0);\n}\n\ninput[type=\"range\"]::-webkit-slider-thumb {\n	-webkit-appearance: none;\n	height: 21px;\n	width: 11px;\n	background: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAxMSAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDBWMTZIMlYxOEg0VjIwSDVWMTlIM1YxN0gxVjFIMTBWMFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMSAxVjE2SDJWMTdIM1YxOEg0VjE5SDZWMThIN1YxN0g4VjE2SDlWMVoiIGZpbGw9IiNDMEM3QzgiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05IDFIMTBWMTZIOFYxOEg2VjIwSDVWMTlIN1YxN0g5WiIgZmlsbD0iIzg3ODg4RiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwIDBIMTFWMTZIOVYxOEg3VjIwSDVWMjFINlYxOUg4VjE3SDEwWiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==\");\n	transform: translateY(-8px);\n}\n\ninput[type=\"range\"].has-box-indicator::-webkit-slider-thumb {\n	background: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAxMSAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDBWMjBIMVYxSDEwVjBaIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIxIiB5PSIxIiB3aWR0aD0iOCIgaGVpZ2h0PSIxOCIgZmlsbD0iI0MwQzdDOCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTkgMUgxMFYyMEgxVjE5SDlaIiBmaWxsPSIjODc4ODhGIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTAgMEgxMVYyMUgwVjIwSDEwWiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==\");\n	transform: translateY(-10px);\n}\n\ninput[type=\"range\"]::-moz-range-thumb {\n	height: 21px;\n	width: 11px;\n	border: none;\n	border-radius: 0;\n	background: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAxMSAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDBWMTZIMlYxOEg0VjIwSDVWMTlIM1YxN0gxVjFIMTBWMFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMSAxVjE2SDJWMTdIM1YxOEg0VjE5SDZWMThIN1YxN0g4VjE2SDlWMVoiIGZpbGw9IiNDMEM3QzgiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05IDFIMTBWMTZIOFYxOEg2VjIwSDVWMTlIN1YxN0g5WiIgZmlsbD0iIzg3ODg4RiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwIDBIMTFWMTZIOVYxOEg3VjIwSDVWMjFINlYxOUg4VjE3SDEwWiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==\");\n	transform: translateY(2px);\n}\n\ninput[type=\"range\"].has-box-indicator::-moz-range-thumb {\n	background: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAxMSAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDBWMjBIMVYxSDEwVjBaIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIxIiB5PSIxIiB3aWR0aD0iOCIgaGVpZ2h0PSIxOCIgZmlsbD0iI0MwQzdDOCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTkgMUgxMFYyMEgxVjE5SDlaIiBmaWxsPSIjODc4ODhGIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTAgMEgxMVYyMUgwVjIwSDEwWiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==\");\n	transform: translateY(0px);\n}\n\ninput[type=\"range\"]::-webkit-slider-runnable-track {\n	width: 100%;\n	height: 2px;\n	box-sizing: border-box;\n	background: black;\n	border-right: 1px solid grey;\n	border-bottom: 1px solid grey;\n	box-shadow: 1px 0 0 white, 1px 1px 0 white, 0 1px 0 white, -1px 0 0 darkgrey, -1px -1px 0 darkgrey, 0 -1px 0 darkgrey, -1px 1px 0 white, 1px -1px darkgrey;\n}\n\ninput[type=\"range\"]::-moz-range-track {\n	width: 100%;\n	height: 2px;\n	box-sizing: border-box;\n	background: black;\n	border-right: 1px solid grey;\n	border-bottom: 1px solid grey;\n	box-shadow: 1px 0 0 white, 1px 1px 0 white, 0 1px 0 white, -1px 0 0 darkgrey, -1px -1px 0 darkgrey, 0 -1px 0 darkgrey, -1px 1px 0 white, 1px -1px darkgrey;\n}\n\nselect:focus {\n	color: #ffffff;\n	background: #000080;\n}\n\nselect:focus option {\n	color: #000000;\n	background: #ffffff;\n}\n\nselect:active {\n	background: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDBIMTVIMTZWMTdIMTVIMFYxNlYxVjBaTTEgMTZIMTVWMUgxVjE2WiIgZmlsbD0iIzgwODA4MCIvPgo8cmVjdCB4PSIxIiB5PSIxIiB3aWR0aD0iMTQiIGhlaWdodD0iMTUiIGZpbGw9IiNDMEMwQzAiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiA3SDVWOEg2VjlIN1YxMEg4VjExSDlWMTBIMTBWOUgxMVY4SDEyVjdaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K\");\n}\n\na {\n	color: #0000ff;\n}\n\na:focus {\n	outline: 1px dotted #0000ff;\n}\n\npre {\n	display: block;\n	background: #ffffff;\n	box-shadow: inset -1px -1px #ffffff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;\n	padding: 12px 8px;\n	margin: 0;\n}\n\nsummary:focus {\n	outline: 1px dotted #000000;\n}\n\n::-webkit-scrollbar {\n	width: 16px;\n}\n\n::-webkit-scrollbar:horizontal {\n	height: 17px;\n}\n\n::-webkit-scrollbar-corner {\n	background: #dfdfdf;\n}\n\n::-webkit-scrollbar-track {\n	background: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMiIgaGVpZ2h0PSIyIiB2aWV3Qm94PSIwIDAgMiAyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEgMEgwVjFIMVYySDJWMUgxVjBaIiBmaWxsPSIjQzBDMEMwIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMiAwSDFWMUgwVjJIMVYxSDJWMFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=\");\n}\n\n::-webkit-scrollbar-thumb {\n	background: #dfdfdf;\n	box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;\n}\n\n::-webkit-scrollbar-button:horizontal:start:decrement, ::-webkit-scrollbar-button:horizontal:end:increment, ::-webkit-scrollbar-button:vertical:start:decrement, ::-webkit-scrollbar-button:vertical:end:increment {\n	display: block;\n}\n\n::-webkit-scrollbar-button:vertical:start {\n	height: 17px;\n	background: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNSAwSDBWMVYxNkgxVjFIMTVWMFoiIGZpbGw9IiNERkRGREYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yIDFIMVYxNUgyVjJIMTRWMUgyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNiAxN0gxNUgwVjE2SDE1VjBIMTZWMTdaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE1IDFIMTRWMTVIMVYxNkgxNEgxNVYxWiIgZmlsbD0iIzgwODA4MCIvPgo8cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iMTIiIGhlaWdodD0iMTMiIGZpbGw9IiNDMEMwQzAiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04IDZIN1Y3SDZWOEg1VjlINFYxMEgxMVY5SDEwVjhIOVY3SDhWNloiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=\");\n}\n\n::-webkit-scrollbar-button:vertical:end {\n	height: 17px;\n	background: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNSAwSDBWMVYxNkgxVjFIMTVWMFoiIGZpbGw9IiNERkRGREYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yIDFIMVYxNUgyVjJIMTRWMUgyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNiAxN0gxNUgwVjE2SDE1VjBIMTZWMTdaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE1IDFIMTRWMTVIMVYxNkgxNEgxNVYxWiIgZmlsbD0iIzgwODA4MCIvPgo8cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iMTIiIGhlaWdodD0iMTMiIGZpbGw9IiNDMEMwQzAiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMSA2SDRWN0g1VjhINlY5SDdWMTBIOFY5SDlWOEgxMFY3SDExVjZaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K\");\n}\n\n::-webkit-scrollbar-button:horizontal:start {\n	width: 16px;\n	background: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNSAwSDBWMVYxNkgxVjFIMTVWMFoiIGZpbGw9IiNERkRGREYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yIDFIMVYxNUgyVjJIMTRWMUgyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNiAxN0gxNUgwVjE2SDE1VjBIMTZWMTdaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE1IDFIMTRWMTVIMVYxNkgxNEgxNVYxWiIgZmlsbD0iIzgwODA4MCIvPgo8cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iMTIiIGhlaWdodD0iMTMiIGZpbGw9IiNDMEMwQzAiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05IDRIOFY1SDdWNkg2VjdINVY4SDZWOUg3VjEwSDhWMTFIOVY0WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==\");\n}\n\n::-webkit-scrollbar-button:horizontal:end {\n	width: 16px;\n	background: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNSAwSDBWMVYxNkgxVjFIMTVWMFoiIGZpbGw9IiNERkRGREYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yIDFIMVYxNUgyVjJIMTRWMUgyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNiAxN0gxNUgwVjE2SDE1VjBIMTZWMTdaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE1IDFIMTRWMTVIMVYxNkgxNEgxNVYxWiIgZmlsbD0iIzgwODA4MCIvPgo8cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iMTIiIGhlaWdodD0iMTMiIGZpbGw9IiNDMEMwQzAiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik03IDRINlYxMUg3VjEwSDhWOUg5VjhIMTBWN0g5VjZIOFY1SDdWNFoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=\");\n}\n\n.row {\n	position: relative;\n	display: block;\n	width: 100%;\n	height: fit-content;\n	padding-top: 4px;\n	padding-bottom: 4px;\n	overflow-x: hidden;\n}\n\n.row-center {\n	position: relative;\n	display: flex;\n	width: fit-content;\n	height: fit-content;\n	padding-top: 4px;\n	padding-bottom: 4px;\n	margin: auto;\n	gap: 10px;\n	flex-direction: row;\n	flex-wrap: nowrap;\n}\n\n#dialog {\n	position: absolute;\n	display: block;\n	width: 250px;\n	height: fit-content;\n	padding: 3px;\n	max-height: 100%;\n	overflow: hidden;\n	visibility: hidden;\n	background: #c0c0c0;\n	box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff;\n}\n\n#titlebar {\n	position: relative;\n	display: block;\n	width: calc(100% - 5px);\n	height: 14px;\n	padding: 3px 2px 3px 3px;\n	background: linear-gradient(90deg,#000080,#1084d0);\n}\n\n#titlebar[inactive] {\n	background: linear-gradient(90deg, #808080, #b5b5b5);\n}\n\n#title {\n	position: absolute;\n	display: block;\n	width: calc(100% - 60px);\n	height: 14px;\n	cursor: default;\n	color: #ffffff;\n	line-height: 14px;\n	letter-spacing: 0px;\n	font-weight: 700;\n	text-align: start;\n	text-overflow: ellipsis;\n	overflow: hidden;\n	overflow-wrap: break-word;\n}\n\n#titlebar button {\n	position: absolute;\n	display: block;\n	width: 16px;\n	height: 14px;\n	padding: 0px;\n	min-width: unset;\n	min-height: unset;\n}\n\n#titlebar button:active {\n	padding: 0px;\n}\n\n#titlebar button:focus {\n	outline: none;\n}\n\n#close-button {\n	right: 2px;\n	background-image: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI3IiB2aWV3Qm94PSIwIDAgOCA3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMEgxSDJWMUgzVjJINEg1VjFINlYwSDdIOFYxSDdWMkg2VjNINVY0SDZWNUg3VjZIOFY3SDdINlY2SDVWNUg0SDNWNkgyVjdIMUgwVjZIMVY1SDJWNEgzVjNIMlYySDFWMUgwVjBaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K\");\n	background-repeat: no-repeat;\n	background-position: top 3px left 4px;\n}\n\n#help-button {\n	right: 20px;\n	background-image: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNiIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgNiA5IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB5PSIxIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSIxIiB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSI0IiB5PSIxIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSIyIiB5PSI0IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSIyIiB5PSI3IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K\");\n	background-repeat: no-repeat;\n	background-position: top 2px left 5px;\n}\n\n#maximize-button {\n	right: 20px;\n	background-image: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgOSA5IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTkgMEgwVjJWOFY5SDFIOEg5VjhWMlYwWk04IDJIMVY4SDhWMloiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=\");\n	background-repeat: no-repeat;\n	background-position: top 2px left 3px;\n}\n\n#maximize-button[restore] {\n	background-image: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgOCA5IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB4PSIyIiB3aWR0aD0iNiIgaGVpZ2h0PSIyIiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSI3IiB5PSIyIiB3aWR0aD0iMSIgaGVpZ2h0PSI0IiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSI2IiB5PSI1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPgo8cmVjdCB5PSIzIiB3aWR0aD0iNiIgaGVpZ2h0PSIyIiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iMSIgaGVpZ2h0PSI0IiBmaWxsPSJibGFjayIvPgo8cmVjdCB5PSI1IiB3aWR0aD0iMSIgaGVpZ2h0PSI0IiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSIxIiB5PSI4IiB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K\");\n	background-repeat: no-repeat;\n	background-position: top 2px left 3px;\n}\n\n#minimize-button {\n	right: 36px;\n	background-image: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNiIgaGVpZ2h0PSIyIiB2aWV3Qm94PSIwIDAgNiAyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSIyIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K\");\n	background-repeat: no-repeat;\n	background-position: bottom 3px left 4px;\n}\n\n#dialog-body {\n	position: relative;\n	display: block;\n	width: calc(100% - 16px);\n	height: fit-content;\n	padding: 8px;\n	overflow-x: hidden;\n	overflow-y: auto;\n}\n\n.frame {\n	position: relative;\n	display: block;\n	width: 100%;\n	height: calc(100% - 21px);\n	border: none;\n	overflow: hidden;\n}\n";
const msSansSerif = Base64.decode("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");
const msSansSerifBold = Base64.decode("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");
// DO NOT EDIT THIS FILE. This file is generated automatically, any changes will be overridden after a build command.

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


const docUrl = URL.createObjectURL(new Blob([dialogDoc], { type: "application/xhtml+xml", endings: "native" }));
const cssUrl = URL.createObjectURL(new Blob([dialogCss], { type: "text/css", endings: "native" }));
const fontStyleSheet = `@font-face {
	font-family: "ms-sans-serif";
	font-style: normal;
	font-weight: normal;
	font-stretch: normal;
	src: url("${URL.createObjectURL(new Blob([msSansSerif], { type: "font/woff2", endings: "native" }))}") format("truetype");
}

@font-face {
	font-family: "ms-sans-serif";
	font-style: normal;
	font-weight: bold;
	font-stretch: normal;
	src: url("${URL.createObjectURL(new Blob([msSansSerifBold], { type: "font/woff2", endings: "native" }))}") format("truetype");
}`;
function waitForBody() {
    return new Promise(resolve => {
        const body = document.body;
        if (body != null) {
            resolve(body);
            return;
        }
        document.addEventListener("DOMContentLoaded", () => resolve(document.body), { once: true, passive: true });
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
class Dialog extends RawObject {
    constructor(init) {
        super(init);
        // current states
        this.canceled = false;
        this.maximized = false;
        this.minimized = false;
    }
    initializeHeader(header, win, doc) {
        return __awaiter(this, void 0, void 0, function* () {
            const title = this.title;
            if (title != null) {
                const elem = doc.createElement("div");
                elem.id = "title";
                elem.textContent = title;
                header.appendChild(elem);
            }
            const close = doc.createElement("button");
            close.id = "close-button";
            close.title = "Close";
            close.onclick = () => this.close();
            const help = doc.createElement("button");
            help.id = "help-button";
            help.title = "Help";
            help.onclick = () => { var _a; return (_a = this.help) === null || _a === void 0 ? void 0 : _a.apply(this, []); };
            const maximize = doc.createElement("button");
            maximize.id = "maximize-button";
            maximize.title = "Maximize";
            maximize.onclick = () => this.maximize();
            const minimize = doc.createElement("button");
            minimize.id = "minimize-button";
            minimize.title = "Minimize";
            minimize.onclick = () => this.minimize();
            switch (this.controls) {
                case "none":
                    break;
                case "close-only":
                    header.appendChild(close);
                    break;
                case "close-with-help":
                    header.appendChild(close);
                    header.appendChild(help);
                    break;
                default:
                    header.appendChild(close);
                    header.appendChild(maximize);
                    header.appendChild(minimize);
                    break;
            }
        });
    }
    initializeBody(body, win, doc) {
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
    measureDocument(dialog, header, frame) {
        return __awaiter(this, void 0, void 0, function* () {
            dialog.style.width = (this.width || 250) + "px";
            const height = this.height;
            if (height != null)
                dialog.style.height = height + "px";
            if (fallback(this.centered, true)) {
                const resize = () => {
                    const dw = dialog.clientWidth + 6; // includes border paddings
                    const dh = dialog.clientHeight + 6;
                    dialog.style.left = Math.floor((frame.clientWidth - dw) / 2) + "px";
                    dialog.style.top = Math.floor((frame.clientHeight - dh) / 2) + "px";
                };
                resize();
                dialog.addEventListener("resize", resize, { capture: false, passive: true });
                window.addEventListener("resize", resize, { capture: false, passive: true });
            }
            else {
                const x = this.x;
                if (x != null)
                    dialog.style.left = x + "px";
                const y = this.y;
                if (y != null)
                    dialog.style.top = y + "px";
            }
            if (fallback(this.draggable, true)) {
                this.draggableElement(dialog, header);
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
            const frame = createFrame();
            const body = yield waitForBody();
            frame.setAttribute("src", docUrl);
            body.scrollTo(0, 0);
            body.style.overflow = "hidden";
            body.appendChild(frame);
            yield new Promise(resolve => frame.addEventListener("load", resolve, { once: true, passive: true }));
            const win = frame.contentWindow;
            const doc = win.document;
            const head = doc.head;
            // load stylesheet
            const link = doc.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = cssUrl;
            head.appendChild(link);
            // set base url
            const base = doc.createElement("base");
            base.href = window.origin;
            head.appendChild(base);
            // load fonts
            const style = doc.createElement("style");
            style.type = "text/css";
            style.textContent = fontStyleSheet;
            head.appendChild(style);
            const dialog = doc.getElementById("dialog");
            const header = doc.getElementById("titlebar");
            this.frameWindow = win;
            this.frameDocument = doc;
            this.currentFrame = frame;
            this.dialogElement = dialog;
            yield this.initializeHeader(header, win, doc);
            yield this.initializeBody(doc.getElementById("dialog-body"), win, doc);
            yield this.measureDocument(dialog, header, frame);
            doc.body.onclick = (e) => {
                e.preventDefault();
                header.setAttribute("inactive", "true");
            };
            dialog.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                header.removeAttribute("inactive");
            };
        });
    }
    dismiss() {
        if (this.currentFrame != null) {
            document.body.style.overflow = "";
            this.currentFrame.remove();
            this.currentFrame = null;
        }
    }
    cancel() {
        this.dismiss();
        util_define(this, "canceled", true, false);
    }
    close() {
        var _a;
        this.dismiss();
        (_a = this.onclose) === null || _a === void 0 ? void 0 : _a.apply(void 0, []);
    }
    maximize() {
        var _a;
        const dialog = this.dialogElement;
        const button = (_a = this.frameDocument) === null || _a === void 0 ? void 0 : _a.getElementById("maximize-button");
        const width = this.width;
        const height = this.height;
        if (dialog != null) {
            if (this.maximized) {
                dialog.style.width = width != null ? width + "px" : "";
                dialog.style.height = height != null ? height + "px" : "";
                dialog.style.left = "";
                dialog.style.top = "";
                util_define(this, "maximized", false);
                if (button != null) {
                    button.removeAttribute("restore");
                    button.title = "Maximize";
                }
            }
            else {
                dialog.style.width = "100%";
                dialog.style.height = "100%";
                dialog.style.left = "-3px";
                dialog.style.top = "-3px";
                util_define(this, "maximized", true);
                if (button != null) {
                    button.setAttribute("restore", "true");
                    button.title = "Restore";
                }
            }
        }
    }
    minimize() {
        this.dismiss();
        util_define(this, "minimized", true, false);
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

function initElement(element) {
    if (element instanceof HTMLElement)
        return element;
    const elem = document.createElement(element.tagName || "div");
    elem.className = element.className || "row";
    const innerHTML = element.innerHTML;
    if (innerHTML != null)
        elem.innerHTML = innerHTML;
    const innerText = element.innerText;
    if (innerText != null)
        elem.textContent = innerText;
    const style = element.style;
    if (style != null)
        elem.setAttribute("style", style);
    const attrs = element.attributes;
    if (attrs != null) {
        for (let attr in attrs) {
            elem.setAttribute(attr, attrs[attr]);
        }
    }
    return elem;
}
class AlertDialog extends Dialog {
    constructor(init) {
        super(init);
    }
    /** @Override */
    initializeBody(body, win, doc) {
        return AlertDialog_awaiter(this, void 0, void 0, function* () {
            const message = this.message;
            if (message != null) {
                const elem = doc.createElement("div");
                elem.className = "row";
                elem.textContent = message;
                body.appendChild(elem);
            }
            for (let elem of (this.elements || [])) {
                body.appendChild(initElement(elem));
            }
            const buttons = this.buttons;
            if (buttons != null) {
                const row = doc.createElement("div");
                row.className = "row-center";
                for (let button of buttons) {
                    const elem = doc.createElement("button");
                    elem.textContent = button.text || "";
                    elem.disabled = button.disabled || false;
                    elem.onclick = button.click || null;
                    row.appendChild(elem);
                }
                body.appendChild(row);
            }
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


function getSourceString(init) {
    if (typeof init == "string")
        return init;
    else if (init instanceof URL)
        return init.href;
    else {
        const arr = new Uint8Array(init);
        return URL.createObjectURL(new Blob([arr.buffer], { type: "text/html", endings: "native" }));
    }
}
class WindowDialog extends Dialog {
    constructor(init) {
        const config = init || {};
        super(Object.assign(Object.assign({}, config), { centered: fallback(config.centered, false), draggable: fallback(config.draggable, true), width: config.width || 1024, height: config.height || 768 }));
    }
    initializeBody(body, win, doc) {
        return WindowDialog_awaiter(this, void 0, void 0, function* () {
            body.remove();
            const dialog = this.dialogElement;
            const frame = this.frame || "";
            if (frame instanceof HTMLElement) {
                frame.className = "frame";
                dialog.appendChild(frame);
                return;
            }
            const elem = document.createElement("embed");
            elem.type = "text/plain";
            elem.width = "1024";
            elem.height = "768";
            elem.src = getSourceString(frame);
            elem.className = "frame";
            dialog.appendChild(elem);
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
        controls: "close-only",
        buttons: [{
                text: "OK",
                click: () => {
                    dialog.dismiss();
                }
            }]
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
            controls: "close-only",
            buttons: [
                {
                    text: "Cancel",
                    click: () => {
                        dialog.cancel();
                        resolve(false);
                    }
                },
                {
                    text: "OK",
                    click: () => {
                        dialog.dismiss();
                        resolve(true);
                    }
                }
            ]
        });
        dialog.onclose = () => resolve(false);
        dialog.show();
    });
};
/* harmony default export */ const src_confirm = (confirm_confirm);

;// CONCATENATED MODULE: ./src/prompt.ts

const prompt_prompt = (message, defaultValue, title, placeholder) => {
    return new Promise(resolve => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = defaultValue || "";
        input.placeholder = placeholder || "";
        input.style.marginBottom = "4px";
        const dialog = new AlertDialog({
            message: message,
            title: title,
            controls: "close-only",
            elements: [input],
            buttons: [
                {
                    text: "Cancel",
                    click: () => {
                        dialog.cancel();
                        resolve(null);
                    }
                },
                {
                    text: "OK",
                    click: () => {
                        dialog.dismiss();
                        resolve(input.value);
                    }
                }
            ]
        });
        input.onkeydown = (e) => {
            if (e.keyCode == 13) { // Enter
                e.preventDefault();
                dialog.buttons[0].click();
            }
        };
        dialog.onclose = () => resolve(null);
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
        title: title,
        controls: "none"
    }).show();
});
/* harmony default export */ const src_block = (block);

;// CONCATENATED MODULE: ./src/form.ts


const form_form = (message, title, elementsInit) => {
    return new Promise(resolve => {
        const elements = elementsInit || {};
        const results = {};
        const htmlElements = [];
        for (let id in elements) {
            const element = elements[id];
            const elemId = "xnnxz-" + id; // add a prefix to avoid duplicates
            const row = document.createElement("div");
            row.className = "row";
            if ("element" in element) {
                const elem = initElement(element.element || { tagName: "div" });
                elem.setAttribute("id", elemId);
                const label = document.createElement("label");
                label.textContent = element.label || id;
                label.setAttribute("for", elemId);
                if (fallback(element.stack, true)) {
                    label.style.display = "block";
                }
                if (element.beforeLabel) {
                    row.appendChild(elem);
                    row.appendChild(label);
                }
                else {
                    row.appendChild(label);
                    row.appendChild(elem);
                }
                results[id] = elem;
            }
            else {
                const elem = initElement(element);
                elem.setAttribute("id", elemId);
                const label = document.createElement("label");
                label.textContent = id;
                label.setAttribute("for", elemId);
                row.appendChild(label);
                row.appendChild(elem);
                results[id] = elem;
            }
            htmlElements.push(row);
        }
        const dialog = new AlertDialog({
            message,
            title,
            elements: htmlElements,
            buttons: [
                {
                    text: "Cancel",
                    click: () => {
                        dialog.cancel();
                        resolve(null);
                    }
                },
                {
                    text: "OK",
                    click: () => {
                        dialog.dismiss();
                        resolve(results);
                    }
                }
            ]
        });
        dialog.onclose = () => resolve(null);
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


const blob = URL.createObjectURL(new Blob([shellDoc], { type: "text/html", endings: "native" }));
const inspect = () => inspect_awaiter(void 0, void 0, void 0, function* () {
    const frame = document.createElement("embed");
    frame.setAttribute("type", "text/plain");
    frame.setAttribute("width", "1024");
    frame.setAttribute("height", "768");
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
