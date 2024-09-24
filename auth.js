"use strict";

(() => {
	const { opener, location } = window;
	const { hash, search } = location;

	if (hash.length > 0) {
		if (opener != null) {
			opener.postMessage(hash);
			opener.focus();
			window.close();
		} else {
			localStorage.setItem("_cre_", hash);
			location.replace("/");
		}
	} else {
		const url = new URLSearchParams(search).get("url");
		if (url != null && url.length > 0)
			location.replace(url);
		else
			location.replace("/");
	}
})();
