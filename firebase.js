// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCSS1Sobpz5lVPYThH94x3Wh8zuR8ev0Fc",
	authDomain: "whitespider.firebaseapp.com",
	projectId: "whitespider",
	storageBucket: "whitespider.appspot.com",
	messagingSenderId: "176227430389",
	appId: "1:176227430389:web:b27756ab8399d702c03abc",
	measurementId: "G-K27ZH66XSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app, analytics };