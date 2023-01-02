import puppeteer from "puppeteer";
import fs from "fs";
import contents from "../../contents.js";

const chrome = await puppeteer.launch({
	headless: false,
	defaultViewport: {
		width: 800,
		height: 600,
		hasTouch: false,
		isLandscape: true,
		isMobile: false,
		deviceScaleFactor: 1
	},
	args: [
		"--disable-gpu",
		"--window-size=800,600",
		"--window-position=0,0"
	],
	pipe: true,
	product: "chrome",
	dumpio: true,
	timeout: 10000
});

/**
 * @param {string} out 
 * @param {string | undefined} path 
 * @param {string | undefined} url 
 */
async function screenshot(out, path, url) {
	const context = await chrome.createIncognitoBrowserContext({ });
	const page = await context.newPage();
	await page.setCacheEnabled(true);
	await page.setJavaScriptEnabled(true);
	await page.setGeolocation({
		accuracy: 0,
		latitude: 0,
		longitude: 0
	});
	await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/109.0", {
		architecture: "",
		bitness: "",
		brands: [],
		fullVersion: "",
		fullVersionList: [],
		mobile: false,
		model: "",
		platform: "",
		platformVersion: "",
		wow64: false
	});

	await page.goto(new URL(path == null ? url : path, "https://whitespider.gq").href, {
		referer: "",
		timeout: 10000,
		waitUntil: "domcontentloaded"
	});
	
	await new Promise(r => setTimeout(r, 15000));

	await page.screenshot({
		type: "jpeg",
		encoding: "binary",
		fromSurface: true,
		fullPage: false,
		omitBackground: true,
		quality: 50,
		path: out
	});
	await page.close({ runBeforeUnload: false });
	await context.close();
}

for (const game of [
	...contents.dosGames,
	...contents.flashGames,
	...contents.html5Games
]) {
	const out = `../../preview/${game.name}.jpg`;
	if (!fs.existsSync(out)) {
		await screenshot(out, game.path, game.url);
	}
}

await chrome.close();
