import Router from "next/router";
import NProgress from "nprogress";

let timer: NodeJS.Timeout;
let state: "stop" | "loading";
const delay = 250;

function load() {
	if (state === "loading") {
		return;
	}

	state = "loading";

	timer = setTimeout(function () {
		const start = Math.random();
		const clamp = (num: number, min: number, max: number) =>
			Math.min(Math.max(num, min), max);

		NProgress.configure({
			minimum: clamp(Math.round(start * 100) / 100, 0.1, 0.4),
		});
		NProgress.start();
	}, delay); // only show progress bar if it takes longer than the delay
}

function stop() {
	state = "stop";

	clearTimeout(timer);
	NProgress.done();
}

Router.events.on("routeChangeStart", load);
Router.events.on("routeChangeComplete", stop);
Router.events.on("routeChangeError", stop);

export default function TopProgressBar() {
	return null;
}
