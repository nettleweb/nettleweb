/* 
  TEST ONLY
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

const TestGameDB = {
	save,
	load,
	append,
	get data() {
		return data;
	}
};

export default TestGameDB;