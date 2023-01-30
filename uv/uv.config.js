"use strict";

(() => {
	const encode=o=>{let e=Array.from(o).map(((o,e)=>e%2?String.fromCharCode(127^o.charCodeAt(0)):o)).join("");return encodeURIComponent(e)},decode=o=>{let[e,...r]=o.split("?");return e=decodeURIComponent(e),Array.from(e).map(((o,e)=>e%2?String.fromCodePoint(127^o.charCodeAt(0)):o)).join("")+(r.length?"?"+r.join("?"):"")};

	self.__uv$config = {
		prefix: "/g0/",
		bare: "https://chromehack.com/bare/",
		encodeUrl: encode,
		decodeUrl: decode,
		bundle: "/uv/uv.bundle.js",
		client: "/uv/uv.client.js",
		config: "/uv/uv.config.js",
		handler: "/uv/uv.handler.js",
		sw: "/uv/uv.sw.js"
	};
})();
