"use strict";

(() => {
	const win = window.opener;
	const hash = window.location.hash;

	if (win != null) {
		win.postMessage(hash);
		win.focus();

		window.stop();
		window.close();
	} else {
		window.localStorage.setItem("_cre_", hash);
		window.location.replace("/");
	}
})();
