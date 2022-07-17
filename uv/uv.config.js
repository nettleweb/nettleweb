"use strict";

self.__uv$config = {
    prefix: "/OOO0O00/",
    bare: "https://incog.dev/bare/",
    encodeUrl: (str) => {
        return encodeURIComponent(str.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
    },
    decodeUrl: (str) => {
        let [input, ...search] = str.split('?');
        return decodeURIComponent(input).split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char).join('') + (search.length ? '?' + search.join('?') : '');
    },
    config: "/uv/uv.config.js",
    handler: "/uv/uv.handler.js",
    bundle: "/uv/uv.bundle.js",
    sw: "/uv/uv.sw.js"
};
