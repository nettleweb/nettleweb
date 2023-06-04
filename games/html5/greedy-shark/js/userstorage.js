
function setCookie(key, value, exdays = 30) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 86400000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = key + "=" + value + ";" + expires + ";path=/";
}

function getCookie(key) {
	let name = key + "=";
	let ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ')
			c = c.substring(1);
		if (c.indexOf(name) == 0)
			return c.substring(name.length, c.length);
	}
	return null;
}

function optCookie(key, defVal) {
	let c = getCookie(key);
	if (c == null) {
		setCookie(key, defVal);
		return defVal;
	} else return c;
}

let userData = getCookie("user_data");
if (userData == null) {
	userData = {
		name: "",
		email: "",
		id: 0,
		level: 0,
		money: 0,
		presets: {
			classic: {
				name: "classic",
				speedMultiple: 1,
				spiders: 3,
				coins: 3,
				timeLimit: -1,
				breakPoint: 3000,
				bestScore: 0,
				bestDistance: 0
			},
			arcade: {
				name: "arcade",
				speedMultiple: 1.5,
				spiders: 0,
				coins: 5,
				timeLimit: 60,
				breakPoint: 5000,
				bestScore: 0,
				bestDistance: 0
			}
		},
		preferences: {
			videoQuality: "high",
			soundsEnabled: false,
			musicEnabled: false
		},
	};
} else userData = JSON.parse(userData);

function updateUserData() {
	let ud = JSON.stringify(userData);
	setCookie("user_data", ud);
}