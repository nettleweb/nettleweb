"use strict"; ((win) => {
	const loc = win.location;
	const url = new URL(loc.href);
	const hash = url.hash;

	if (hash.length > 0) {
		const token = new URLSearchParams(hash).get("access_token");
		if (token != null && token.length > 0) {
			win.localStorage.setItem("_cre_", token);
			loc.replace("/");
		} else console.error("Error: Access token not specified");
	} else {
		const purl = url.searchParams.get("url");
		if (purl != null && purl.length > 0)
			loc.replace(purl);
		else
			loc.replace("/");
	}
})(window);