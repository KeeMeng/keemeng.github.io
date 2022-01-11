if (localStorage.getItem("mode") === null) {
	localStorage.setItem("mode", "light");
}

if (localStorage.getItem("view") === null) {
	localStorage.setItem("view", "grid");
}

var grid_view = localStorage.getItem("view");

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
	log(`View: ${dark}`);
	if (dark == "dark") {
		document.getElementById("mode").innerHTML = "Light Mode";
		var projects = document.getElementsByClassName("projects");
		var texts = document.getElementsByClassName("hovertext");
		for (var i = 0; i < projects.length; i++) {
			setTimeout(function(i) {
				var projects = document.getElementsByClassName("projects");
				projects[i].style.transitionDuration = "0.5s";
				projects[i].style.backgroundColor = "#102344";
				if (grid_view == "grid") {
					texts[i].style.textShadow = "0 0 25px #102344, 0 0 25px #102344, 0 0 25px #102344";
				}
				else if (grid_view == "list") {
					texts[i].style.textShadow = "none";
				}
				texts[i].style.color = "white";
			}, 25*i, i);
		}
		setTimeout(add_transition2, 500);
		document.querySelector("meta[name=theme-color]").setAttribute("content", "#000000");
	}
	else if (dark == "light") {
		document.getElementById("mode").innerHTML = "Dark Mode";
		var projects = document.getElementsByClassName("projects");
		var texts = document.getElementsByClassName("hovertext");
		for (var i = 0; i < projects.length; i++) {
			setTimeout(function(i) {
				var projects = document.getElementsByClassName("projects");
				projects[i].style.transitionDuration = "0.5s";
				projects[i].style.backgroundColor = "#e4f8ff";
				if (grid_view == "grid") {
					texts[i].style.textShadow = "0 0 25px #e4f8ff, 0 0 25px #e4f8ff, 0 0 25px #e4f8ff";
				}
				else if (grid_view == "list") {
					texts[i].style.textShadow = "none";
				}
				texts[i].style.color = "black";
			}, 25*i, i);
		}
		setTimeout(add_transition2, 500);
		document.querySelector("meta[name=theme-color]").setAttribute("content", "#FFFFFF");
	}
	document.body.classList.toggle("darkmode");
	document.body.classList.toggle("lightmode");
}

function set_images() {
	var images = document.getElementsByTagName('img'); 
	for(var i = 0; i < images.length; i++) {
		images[i].src = `images/${images[i].id}.png`;
	} 
}

function change_title(title=undefined, ignore=false) {
	if (title == undefined) {
		title = prompt("Please enter title");
	}
	if (title != "" && title !== null) {
	
		var output_title = "";
		for (var i = 0; i < title.length; i++) {
			if (title[i] == title[i].toLowerCase()) {
				output_title += title[i].toUpperCase();
			} else {
				output_title += title[i].toLowerCase();
			}
		}

		document.getElementById("title").innerHTML = output_title;
		if (!ignore) {
			log(`Title: ${output_title}`);
		}
	}
}

function load() {
	set_images();

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

	document.body.style.transitionDuration = "0s";
	document.getElementById("wrapper").style.transitionDuration = "0s";
	document.getElementById("wrapper2").style.transitionDuration = "0s";
	if (dark == "dark") {
		document.body.classList.toggle("darkmode");
		document.getElementById("mode").innerHTML = "Light Mode";
		var projects = document.getElementsByClassName("projects");
		var texts = document.getElementsByClassName("hovertext");
		for (var i = 0; i < projects.length; i++) {
			projects[i].style.backgroundColor = "#102344";
			projects[i].style.display = "block";
			if (grid_view == "grid") {
				texts[i].style.textShadow = "0 0 25px #102344, 0 0 25px #102344, 0 0 25px #102344";
				texts[i].style.opacity = "";
				texts[i].style.left = "0px";
				texts[i].style.width = "310px";
				texts[i].style.height = "310px";
				texts[i].style.margin = "";
				projects[i].style.display = "inline-block";
				projects[i].style.width = "350px";
				projects[i].style.height = "350px";
			}
			else if (grid_view == "list") {
				texts[i].style.textShadow = "none";
				texts[i].style.opacity = "1";
				texts[i].style.left = "150px";
				texts[i].style.width = `${(window.innerWidth-250)/1.11}px`;
				texts[i].style.height = "150px";
				texts[i].style.margin = "0px";
				projects[i].style.display = "block";
				projects[i].style.width = "150px";
				projects[i].style.height = "150px";
			}
		}
		document.querySelector("meta[name=theme-color]").setAttribute("content", "#000000");
	}
	else if (dark == "light") {
		document.body.classList.toggle("lightmode");
		document.getElementById("mode").innerHTML = "Dark Mode";
		var projects = document.getElementsByClassName("projects");
		var texts = document.getElementsByClassName("hovertext");
		for (var i = 0; i < projects.length; i++) {
			projects[i].style.backgroundColor = "#e4f8ff";
			projects[i].style.display = "inline-block";
			if (grid_view == "grid") {
				texts[i].style.textShadow = "0 0 25px #e4f8ff, 0 0 25px #e4f8ff, 0 0 25px #e4f8ff";
				texts[i].style.opacity = "";
				texts[i].style.left = "0px";
				texts[i].style.width = "310px";
				texts[i].style.height = "310px";
				texts[i].style.margin = "";
				projects[i].style.display = "inline-block";
				projects[i].style.width = "350px";
				projects[i].style.height = "350px";
			}
			else if (grid_view == "list") {
				texts[i].style.textShadow = "none";
				texts[i].style.opacity = "1";
				texts[i].style.left = "150px";
				texts[i].style.width = `${(window.innerWidth-250)/1.11}px`;
				texts[i].style.height = "150px";
				texts[i].style.margin = "0px";
				projects[i].style.display = "block";
				projects[i].style.width = "150px";
				projects[i].style.height = "150px";
			}
		}
		document.querySelector("meta[name=theme-color]").setAttribute("content", "#FFFFFF");
	}
	
	document.getElementById("title").style.opacity = "0";
	change_title("KeeMeng's Gallery", true)

	var chart = `
		<br>
		<br>
		<center style="font-size: 32px">My Github Contribution Chart!</center>
		<br>
		<a href="https://github.com/KeeMeng" style="background-color: white; border-radius: 24px; display: inline-block; padding-left: 32px; padding-right: 32px">
			<img src="https://ghchart.rshah.org/FF00FF/KeeMeng" alt="KeeMeng's Github chart" style="height: 25vh; width: auto; max-width: 70vw" />
		</a>
		<br>
		<br>
	`;
	document.body.insertAdjacentHTML("beforeend", chart);

	setTimeout(function() {$("#wrapper").fadeTo(750, 1);}, 100, "linear");
	setTimeout(function() {$("#wrapper2").fadeTo(750, 1);}, 100, "linear");
	setTimeout(function() {$("#title").fadeTo(750, 1);}, 100, "linear");
	setTimeout(add_transition, 500);
}

function add_transition() {
	document.body.style.transitionDuration = "0.5s";
	document.getElementById("wrapper").style.transitionDuration = "0.5s";
	document.getElementById("wrapper2").style.transitionDuration = "0.5s";
}

function add_transition2() {
	var projects = document.getElementsByClassName("projects");
	for (var i = 0; i < projects.length; i++) {
		projects[i].style.transitionDuration = "0.2s"
	}
}

function show_text(id) {
	log(`Hovered: ${id}`);
	if (grid_view == "grid") {
		document.getElementById(`${id}_light`).style.filter = "blur(10px)";
		document.getElementById(`${id}_dark`).style.filter = "blur(10px)";
	}
}

function hide_text(id) {
	document.getElementById(`${id}_light`).style.filter = "none";
	document.getElementById(`${id}_dark`).style.filter = "none";
}

function view() {
	if (grid_view == "grid") {
		localStorage.setItem("view", "list");
	}
	else if (grid_view == "list") {
		localStorage.setItem("view", "grid");
	}
	grid_view = localStorage.getItem("view");
	if (grid_view == "grid") {
		document.getElementById("view").innerHTML = "List View";
		var texts = document.getElementsByClassName("hovertext");
		var projects = document.getElementsByClassName("projects");
		for (var i = 0; i < texts.length; i++) {
			texts[i].style.opacity = "";
			texts[i].style.left = "0px";
			texts[i].style.width = "310px";
			texts[i].style.height = "310px";
			texts[i].style.margin = "";
			projects[i].style.display = "inline-block";
			projects[i].style.width = "350px";
			projects[i].style.height = "350px";
			if (dark == "dark") {
				texts[i].style.textShadow = "0 0 25px #102344, 0 0 25px #102344, 0 0 25px #102344";
			}
			else if (dark == "light") {
				texts[i].style.textShadow = "0 0 25px #e4f8ff, 0 0 25px #e4f8ff, 0 0 25px #e4f8ff";
			}
		}
	}
	else if (grid_view == "list") {
		document.getElementById("view").innerHTML = "Grid View";
		var texts = document.getElementsByClassName("hovertext");
		var projects = document.getElementsByClassName("projects");
		for (var i = 0; i < texts.length; i++) {
			texts[i].style.opacity = "1";
			texts[i].style.left = "150px";
			texts[i].style.textShadow = "none";
			texts[i].style.width = `${(window.innerWidth-250)/1.11}px`;
			texts[i].style.height = "150px";
			texts[i].style.margin = "0px";
			projects[i].style.display = "block";
			projects[i].style.width = "150px";
			projects[i].style.height = "150px";
		}
	}
}

function fade_out() {
	$("#wrapper").fadeTo(750, 0);
	$("#wrapper2").fadeTo(1250, 0)
}
