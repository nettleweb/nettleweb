
(function() {
	var domready = function(win, fn) {
		var done = false, top = true,

		doc = win.document,
		root = doc.documentElement,
		modern = doc.addEventListener,

		add = modern ? 'addEventListener' : 'attachEvent',
		rem = modern ? 'removeEventListener' : 'detachEvent',
		pre = modern ? '' : 'on',

		init = function(e) {
			if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
			(e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
			if (!done && (done = true)) fn.call(win, e.type || e);
		},

		poll = function() {
			try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
			init('poll');
		};

		if (doc.readyState == 'complete') fn.call(win, 'lazy');
		else {
			if (!modern && root.doScroll) {
				try { top = !win.frameElement; } catch(e) { }
				if (top) poll();
			}
			doc[add](pre + 'DOMContentLoaded', init, false);
			doc[add](pre + 'readystatechange', init, false);
			win[add](pre + 'load', init, false);
		}
	};

	var raf = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function(cb) { setTimeout(cb, 16); }

	var css = [
  {
    "href": "bundle.css",
    "media": "all"
  }
];

	var hideSplash = function() {
		var splash = document.getElementById('splash');
		if (splash) splash.parentNode.removeChild(splash);
	};

	var bootstrapped = false;

	var bootstrap = function() {
		// only once, called 2nd time in setTimeout
		if (bootstrapped) return;
		bootstrapped = true;
		
		console.log('bootstrap');
		
		var head = document.getElementsByTagName('head')[ 0 ];
		var isAndroid = (/Android/g).test(navigator.userAgent) ? true : false;

		
		var loadJs = function() {
			var el = document.createElement("script");
			el.onload = hideSplash;

			el.src = 'bundle.js';
			head.appendChild(el);
		};

		// load css first
		var setScaleLoaded = function(data) {
			if(data.loaded) {
				return;
			}

			data.loaded = true;
			console.log('css loaded ' + data.href);

			var loaded = Object.keys(css).filter(function(key) {
				return !css[ key ].loaded;
			}).length === 0;

			if(!loaded) {
				return;
			}

			loadJs();
		};

		css.forEach(function(data) {
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.media = data.media;
			link.href = data.href;

			// on android 4.0 didnt work
			if (isAndroid || !("onload" in link)) {
				setTimeout(function() {
					setScaleLoaded(data)
				}, 100);
			}

			link.onload = function() {
				setScaleLoaded(data);
			};

			head.appendChild(link);
		});

		// no css files to load
		if (css.length === 0) loadJs();
	};

	if (typeof window !== undefined && !!window.cordova) {
		// wait for cordova
		document.addEventListener('deviceready', function() {
			console.info('index cordova deviceready');
			raf(bootstrap);
		}, false);
	} else {
		domready(window, function() {
			raf(bootstrap);
			
			
			setTimeout(bootstrap, 500);
		});
		
	}
})();
