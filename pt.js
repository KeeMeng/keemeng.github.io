if (localStorage.getItem("mode") === null) {
	localStorage.setItem("mode", "light");
}

var dark = localStorage.getItem("mode");
function dark_mode() {
	if (dark == "light") {
		dark = "dark";
		localStorage.setItem("mode", "dark");
	}
	else if (dark == "dark") {
		dark = "light";
		localStorage.setItem("mode", "light");
	}
	if (dark == "dark") {
		document.getElementById("mode").innerHTML = "Light Mode";
		$("#light_video").fadeOut(500);
		$("#dark_video").fadeIn(500);
		document.getElementById("wrapper").style.backgroundColor = "#102344";
		document.querySelector("meta[name=theme-color]").setAttribute("content", "#000000");
	}
	else if (dark == "light") {
		document.getElementById("mode").innerHTML = "Dark Mode";
		$("#dark_video").fadeOut(500);
		$("#light_video").fadeIn(500);
		document.getElementById("wrapper").style.backgroundColor = "#e4f8ff";
		document.querySelector("meta[name=theme-color]").setAttribute("content", "#FFFFFF");
	}
	document.body.classList.toggle("darkmode");
	document.body.classList.toggle("lightmode");
}

function load() {
	document.body.style.transitionDuration = "0s";
	document.getElementById("wrapper").style.transitionDuration = "0s";
	if (dark == "dark") {
		document.body.classList.toggle("darkmode");
		document.getElementById("mode").innerHTML = "Light Mode";
		$("#light_video").fadeOut(0);
		document.getElementById("wrapper").style.backgroundColor = "#102344";
		document.querySelector("meta[name=theme-color]").setAttribute("content", "#000000");
	}
	else if (dark == "light") {
		document.body.classList.toggle("lightmode");
		document.getElementById("mode").innerHTML = "Dark Mode";
		$("#dark_video").fadeOut(0);
		document.getElementById("wrapper").style.backgroundColor = "#e4f8ff";
		document.querySelector("meta[name=theme-color]").setAttribute("content", "#FFFFFF");
	}
	document.getElementById("light_video").src = "/images/pt_light.mp4";
	document.getElementById("dark_video").src = "/images/pt_dark.mp4";
	setTimeout(add_transition,500);
}

function add_transition() {
	document.body.style.transitionDuration = "0.5s";
	document.getElementById("wrapper").style.transition = "background-color 0.5s";
}