"use strict"; (async ({ window: win, document: doc }) => {
	if (doc.readyState !== "complete") {
		await new Promise((resolve) => {
			const callback = () => {
				if (doc.readyState === "complete") {
					doc.removeEventListener("readystatechange", callback);
					setTimeout(resolve, 500, null);
				}
			};
			doc.addEventListener("readystatechange", callback, { passive: true });
		});
	}

	const body = doc.body;

	win.stop();
	win.focus();
	body.innerHTML = "<div id=\"ww_6ea29cf8d5e36\" v=\"1.3\" loc=\"auto\" a=\'{\"t\":\"responsive\",\"lang\":\"en\",\"sl_lpl\":1,\"ids\":[],\"font\":\"Arial\",\"sl_ics\":\"one\",\"sl_sot\":\"celsius\",\"cl_bkg\":\"image\",\"cl_font\":\"#FFFFFF\",\"cl_cloud\":\"#FFFFFF\",\"cl_persp\":\"#81D4FA\",\"cl_sun\":\"#FFC107\",\"cl_moon\":\"#FFC107\",\"cl_thund\":\"#FF5722\",\"sl_tof\":\"7\"}\'>More forecasts: <a href=\"https://oneweather.org/melbourne/30_days/\" id=\"ww_6ea29cf8d5e36_u\" target=\"_blank\" rel=\"noopener\">Melbourne weather 30 days</a></div>";

	const e = doc.createElement("script");
	e.type = "text/javascript";
	e.src = "https://app3.weatherwidget.org/js/?id=ww_6ea29cf8d5e36";
	e.async = true;
	e.defer = true;
	body.appendChild(e);
})(window);