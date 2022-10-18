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
		url = validateUrl(url);
		
		let str = Array.from(url).map((ch, i) => {
			return i % 2 ? String.fromCharCode(ch.charCodeAt(0) ^ 0x7f) : ch;
		}).join("");

		return encodeURIComponent(str);
	};

	/**
	 * @param {string} url 
	 */
	this.decode = (url) => {
		let [ input, ...search ] = url.split('?');
		input = decodeURIComponent(input);

		let str = Array.from(input).map((ch, i) => {
			return i % 2 ? String.fromCodePoint(ch.charCodeAt(0) ^ 0x7f) : ch;
		}).join("");

		return str + (search.length ? '?' + search.join('?') : '');
	};
}

const coder = new Coder();

self.__uv$config = {
	prefix: "/O0O000O/",
	bare: "https://googlecom.gq/bare/",
	encodeUrl: coder.encode,
	decodeUrl: coder.decode,
	bundle: "/uv/uv.bundle.js",
	config: "/uv/uv.config.js",
	handler: "/uv/uv.handler.js",
	sw: "/uv/uv.sw.js"
};

})();
