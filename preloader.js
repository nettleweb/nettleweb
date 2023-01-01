"use strict";

(async () => {

await new Promise(r => {
	const t = setInterval(() => {
		if (document.readyState == "complete") {
			clearInterval(t);
			r();
		}
	}, 50);
});

const script = document.createElement("script");
script.type = "module";
script.async = true;
script.textContent = "import{status,locker}from\"./main.js\";status[0]||locker.lock()||window._$$0Oc();";
document.body.appendChild(script);

})();
