/* 
  TEST ONLY
*/

"use strict";import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";let app = initializeApp({apiKey: "AIzaSyBqQGSeJZUdI0itB4t-UW21-DOv3Ae1cAk",authDomain: "invertible-fin-279111.firebaseapp.com",databaseURL: "https://invertible-fin-279111-default-rtdb.firebaseio.com",projectId: "invertible-fin-279111",storageBucket: "invertible-fin-279111.appspot.com",messagingSenderId: "677364250175",appId: "1:677364250175:web:cbb6e68cec099d3f2a2a8a"});let database = getDatabase(app);

let TestGameDB = {};
TestGameDB.prototype = {};
TestGameDB.load = async () => {
	let _this = TestGameDB;
	let ss = await get(ref(database, "gamedata"))
	if (!ss.exists()) {
		console.warn("Failed to load data");
		_this.data = [];
		return;
	}
	_this.data = ss.val().data;
};
TestGameDB.save = () => {
	let _this = TestGameDB;
	if (_this.data == null) {
		_this.load().then(() => {
			_this.save();
		});
		return;
	}

	set(ref(database, "gamedata"), {
		data: _this.data
	});
};
TestGameDB.append = (item) => {
	let _this = TestGameDB;
	if (_this.data == null) {
		_this.load().then(() => {
			_this.append(item);
		});
		return;
	}

	_this.data.push(item);
	_this.save();
};

export { TestGameDB }

