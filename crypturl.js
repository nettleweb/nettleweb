"use strict";

(() => {

function Coder() {
	/**
	 * @param {string | URL} url 
	 */
	function validateUrl(url) {
		if (url instanceof URL) {
			return url.href;
		}

		try {
			return new URL(url).href;
		} catch(err) {
			throw TypeError("Invalid URL: " + url);
		}
	}

	/**
	 * @param {string | URL} url 
	 */
	this.encode = (url) => {
		let str = validateUrl(url);
		let str1 = "";

		for (let i = 0; i < str.length; i++) {
			str1 += String.fromCharCode(str.charCodeAt(i) + 0x1000);
		}

		return encodeURIComponent(str1);
	};

	/**
	 * @param {string} url 
	 */
	this.decode = (url) => {
		let str = decodeURIComponent(url);
		let str1 = "";

		for (let i = 0; i < str.length; i++) {
			str1 += String.fromCharCode(str.charCodeAt(i) - 0x1000);
		}

		return str1;
	};
}

const coder = new Coder();

Object.defineProperty(globalThis, "coder", {
	writable: false,
	configurable: false,
	enumerable: false,
	value: coder
});

})();
