var color_scheme = window.matchMedia('(prefers-color-scheme: dark)');
var dark_mode = color_scheme.matches;

function toggle_css() {
	if (dark_mode) {
		document.getElementById("mode").innerHTML = "Light Mode";
		document.querySelector("meta[name=theme-color]").setAttribute("content", "#000000");
	} else {
		document.getElementById("mode").innerHTML = "Dark Mode";
		document.querySelector("meta[name=theme-color]").setAttribute("content", "#FFFFFF");
	}
}

function toggle_mode() {
	dark_mode = !dark_mode;
	sessionStorage.setItem("dark_mode", String(dark_mode));
	
	toggle_css();
	document.body.classList.toggle("dark-theme");
	document.body.classList.toggle("light-theme");
}

function load() {
	document.body.style.transitionDuration = "0s";

	color_scheme.onchange = (event) => {
		if (dark_mode == event.matches) {
			document.body.classList.toggle("dark-theme");
			document.body.classList.toggle("light-theme");
		}
		else {
			dark_mode = event.matches
			sessionStorage.setItem("dark_mode", String(dark_mode));
		}
		toggle_css();
	}

	if (sessionStorage.getItem("dark_mode") === null) {
		sessionStorage.setItem("dark_mode", String(dark_mode));
	} else {
		dark_mode = sessionStorage.getItem("dark_mode") === "true";
	}

	if (dark_mode != color_scheme.matches) {
		dark_mode = !dark_mode;
		toggle_mode()
	}

	toggle_css();

	setTimeout(() => {document.body.style.transitionDuration = "0.5s";}, 500);
}
