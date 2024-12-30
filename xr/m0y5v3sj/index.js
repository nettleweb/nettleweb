"use strict"; (async ({ window: win, document: doc }) => {
	if (doc.readyState !== "complete") {
		await new Promise((resolve) => {
			const callback = () => {
				if (doc.readyState === "complete") {
					doc.removeEventListener("readystatechange", callback);
					setTimeout(resolve, 500, null);
				}
			};
			doc.addEventListener("readystatechange", callback, { passive: true });
		});
	}

	const body = doc.body;
	win.stop();
	win.focus();
	body.id = "game_frame";
	body.innerHTML = "Loading...";

	win.onclick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		win.focus();
	};
	win.eaglercraftXOpts = {
		demoMode: false,
		worldsDB: "worlds0o0o00o",
		container: "game_frame",
		assetsURI: "assets.epk",
		localesURI: "lang/",
		logInvalidCerts: true,
		crashOnUncaughtExceptions: true,
		relays: [
			{ addr: "wss://relay.deev.is/", comment: "lax1dude relay #1", primary: true },
			{ addr: "wss://relay.lax1dude.net/", comment: "lax1dude relay #2", primary: false },
			{ addr: "wss://relay.shhnowisnottheti.me/", comment: "ayunami relay #1", primary: false }
		],
		servers: []
	};

	const e = doc.createElement("script");
	e.type = "text/javascript";
	e.src = "game.js";
	e.async = true;
	e.defer = true;

	e.addEventListener("load", () => {
		win.main();
	}, { passive: true, once: true });

	body.appendChild(e);
})(window);
