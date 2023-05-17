chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('index-chrome.html', {
		'bounds': {
			'width': 1280,
			'height': 800
		},
		'minWidth': 240,
		'minHeight': 320
	});
});
