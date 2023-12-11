"use strict";

self.onmessage = (e) => {
	importScripts("../classes_server.js");
	self.eaglercraftServerOpts = e.data;
	main();
};
