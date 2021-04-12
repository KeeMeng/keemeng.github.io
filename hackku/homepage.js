var about = false;
function about_us() {
	about = !about;
	if (about) {
		document.getElementById("info").style.display = "block";
	}
	else {
		document.getElementById("info").style.display = "none";
	}
}

var input_count = 1;
function new_link() {
	input_count++;
	var inputhtml = `
		<div id="input${input_count}">
			<input id="link${input_count}" type="text" class="thing" placeholder="Link" style="width: 350px; display: inline; font-family: Futura; font-size: 16px; padding:5px; border-radius: 8px; border-color: transparent; margin-bottom: 8px; margin-left: 2px; margin-right: 4px">
			<button onclick="del(${input_count})" class="thing2" style="width: 35px; display: inline; font-family: Futura; font-size: 16px; padding:5px; border-radius: 8px; border-color: transparent; background-color: #ff8080; color: #800000; margin-right: -5px; margin-bottom: 8px; margin-right: 0px">X</button>
			<br>
		</div>
		`;
	document.getElementById("inputs").insertAdjacentHTML("beforeend", inputhtml);
	var elem = document.getElementById(`link${input_count}`);
	elem.onkeyup = function(e){
		if(e.keyCode == 9 || e.keyCode == 13){
			new_link();
		}
	}
}

function del(number) {
	if (number == 0) {
		for (var i = 1; i <= input_count; i++) {
			var element = document.getElementById("input" + String(i));
			element.style.display = "none";
		}
	}
	else {
		var element = document.getElementById("input" + String(number));
		element.style.display = "none";
	}
}

function save_links() {
	var links = [];
	for (var i = 1; i <= input_count; i++) {
		if (document.getElementById(`input${i}`).style.display != "none" && document.getElementById("link" + String(i)).value != "") {
			var url = document.getElementById("link" + String(i)).value;
			if (url.includes(" ")) {
				var splitted = url.split(" ");
				for (var j = 0; j < splitted.length; j++) {
				links.push(splitted[j]);
				}
			}
			else {
				links.push(document.getElementById("link" + String(i)).value);
			}
		}
	}
	// console.log(links);
	if (localStorage.getItem("urls") === null) {
		localStorage.setItem("urls", "");
	}
	localStorage.setItem("urls", links.toString());

	// console.log(localStorage.getItem("urls"))
}



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
		document.getElementById("wrapper").style.backgroundColor = "#102344";
		document.getElementById("info").style.backgroundColor = "#102344";
	}
	else if (dark == "light") {
		document.getElementById("mode").innerHTML = "Dark Mode";
		document.getElementById("wrapper").style.backgroundColor = "#e4f8ff";
		document.getElementById("info").style.backgroundColor = "#e4f8ff";
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
		document.getElementById("wrapper").style.backgroundColor = "#102344";
		document.getElementById("info").style.backgroundColor = "#102344";
	}
	else if (dark == "light") {
		document.body.classList.toggle("lightmode");
		document.getElementById("mode").innerHTML = "Dark Mode";
		document.getElementById("wrapper").style.backgroundColor = "#e4f8ff";
		document.getElementById("info").style.backgroundColor = "#e4f8ff";
	}
	setTimeout(add_transition,500);

	var elem = document.getElementById("link1");
	elem.onkeyup = function(e){
		if(e.keyCode == 9 || e.keyCode == 13){
			new_link();
		}
	}


	var urls = localStorage.getItem("urls").split(",");

	if (urls != "") {
		for (var i = 0; i < urls.length; i++) {
			// console.log(urls[i]);
			document.getElementById(`link${i+1}`).value = String(urls[i]);
			new_link();
		}
	}


}

function add_transition() {
	document.body.style.transitionDuration = "0.5s";
	document.getElementById("wrapper").style.transitionDuration = "0.5s";
}