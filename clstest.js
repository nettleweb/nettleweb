(() => {
"use strict";

let clsValue = 0;
let clsEntries = [];

let sessionValue = 0;
let sessionEntries = [];

new PerformanceObserver((entryList) => {
	for (const entry of entryList.getEntries()) {
		if (!entry.hadRecentInput) {
			const firstSessionEntry = sessionEntries[0];
			const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

			if (sessionValue &&
				entry.startTime - lastSessionEntry.startTime < 1000 &&
				entry.startTime - firstSessionEntry.startTime < 5000) {
				sessionValue += entry.value;
				sessionEntries.push(entry);
			} else {
				sessionValue = entry.value;
				sessionEntries = [entry];
			}

			if (sessionValue > clsValue) {
				clsValue = sessionValue;
				clsEntries = sessionEntries;
			}
		}
	}

	console.log("CLS Value: ", clsValue);
	console.log("Session Value: ", sessionValue);
}).observe({ type: 'layout-shift', buffered: true });

})();
