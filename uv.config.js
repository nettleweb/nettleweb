"use strict";

self.__uv$config = {
    prefix: "/OOO0O00/",
    bare: "https://incog.dev/bare/",
    encodeUrl: (url) => encodeURIComponent(url),
    decodeUrl: (url) => decodeURIComponent(url),
    handler: "/uv.handler.js",
    bundle: "/uv.bundle.js",
    sw: "/uv.sw.js"
};
