if (localStorage.getItem("mode") === null) {
	localStorage.setItem("mode", "light");
}

function flip_images() {
	var previews = document.getElementsByClassName("projects");
	if (localStorage.getItem("mode") == "light") {
		for (var i = 0; i < previews.length; i++) {
			$(`#${previews[i].id}_dark`).fadeOut(500);
			$(`#${previews[i].id}_light`).fadeIn(500);
		}
	}
	else if (localStorage.getItem("mode") == "dark") {
		for (var i = 0; i < previews.length; i++) {
			$(`#${previews[i].id}_light`).fadeOut(500);
			$(`#${previews[i].id}_dark`).fadeIn(500);
		}
	}
}


function setup() {
	var previews = document.getElementsByClassName("projects");
	if (localStorage.getItem("mode") == "light") {
		for (var i = 0; i < previews.length; i++) {
			$(`#${previews[i].id}_dark`).fadeOut(0);
		}
	}
	else if (localStorage.getItem("mode") == "dark") {
		for (var i = 0; i < previews.length; i++) {
			$(`#${previews[i].id}_light`).fadeOut(0);
		}
	}
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
		var projects = document.getElementsByClassName("projects");
		for (var i = 0; i < projects.length; i++) {
			projects[i].style.backgroundColor = "#102344";
		}
	}
	else if (dark == "light") {
		document.getElementById("mode").innerHTML = "Dark Mode";
		var projects = document.getElementsByClassName("projects");
		for (var i = 0; i < projects.length; i++) {
			projects[i].style.backgroundColor = "#e4f8ff";
		}
	}
	document.body.classList.toggle("darkmode");
	document.body.classList.toggle("lightmode");
}

function load() {
	// $("#wrapper").fadeOut(100);
	document.body.style.transitionDuration = "0s";
	document.getElementById("wrapper").style.transitionDuration = "0s";
	if (dark == "dark") {
		document.body.classList.toggle("darkmode");
		document.getElementById("mode").innerHTML = "Light Mode";
		var projects = document.getElementsByClassName("projects");
		for (var i = 0; i < projects.length; i++) {
			projects[i].style.backgroundColor = "#102344";
		}
	}
	else if (dark == "light") {
		document.body.classList.toggle("lightmode");
		document.getElementById("mode").innerHTML = "Dark Mode";
		var projects = document.getElementsByClassName("projects");
		for (var i = 0; i < projects.length; i++) {
			projects[i].style.backgroundColor = "#e4f8ff";
		}
	}
	setTimeout(function() {$("#wrapper").fadeTo(600, 1);},100,"linear");
	setTimeout(add_transition,500);
}

function add_transition() {
	document.body.style.transitionDuration = "0.5s";
	document.getElementById("wrapper").style.transitionDuration = "0.5s";
	// document.getElementById("wrapper").style.display = "block";
}