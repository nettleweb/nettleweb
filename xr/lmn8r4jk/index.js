"use strict"; (() => {
	const player = RufflePlayer.newest().createPlayer();
	document.body.appendChild(player);
	player.load({
		url: "pvz_9_15.swf",
		scale: "showAll",
		quality: "best",
		autoplay: "auto",
		logLevel: "warn",
		letterbox: "on",
		openUrlMode: "confirm",
		upgradeToHttps: true,
		// backgroundColor: "#000000"
	});
})();
