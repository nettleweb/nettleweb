/*!
Copyright 2022 Ruochen Jia

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
