// CREDIT: awesome guy at: https://medium.com/hackernoon/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2

function handleFirstTab(e) {
	if (e.keyCode === 9) {
		// the "I am a keyboard user" key / TAB
		document.body.classList.add("user-is-tabbing");
		window.removeEventListener("keydown", handleFirstTab);
	}
}

window.addEventListener("keydown", handleFirstTab);
