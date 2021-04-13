var clicks = [100,500,1000,100,300,800];
var clicks2 = [100,500,1000,100,300,800];
var timer = 30;

function time() { 
	timer --;
	document.getElementById("timer").innerHTML = timer;
	if (timer <= 0) {
		clearInterval(repeat);
	}
}

var repeat = setInterval(time, 60000);
function change_time() {
	var x = prompt("Please enter timer (minutes)", timer);
	if (x > 0) {
		timer = x;
		document.getElementById("timer").innerHTML = timer;
	}
}

function change_title() {
	var title = prompt("Title:", "Computer Science Society")
	if (title !== "" && title !== null) {
		document.getElementById("title").innerHTML = title;
	}
}

var animate = true;
function animation() {
	animate = !animate;
}

function swap(number) {
	document.getElementById("checkbox1").checked = false;
	document.getElementById("checkbox2").checked = false;
	document.getElementById("checkbox3").checked = false;
	document.getElementById("checkbox4").checked = true;
	document.getElementById("checkbox5").checked = true;
	document.getElementById("checkbox6").checked = true;

	if (number == 1 || number == 2 || number == 3) {
		document.getElementById("restriction"+String(number)).style.display = "block";
		document.getElementById("checkbox"+String(number)).style.display = "none";
	}
	else if (number == 4 || number == 5 || number == 6) {
		document.getElementById("restriction"+String(number-3)).style.display = "none";
		document.getElementById("checkbox"+String(number-3)).style.display = "inline";
	}
}

function half(event, number) {
	clicks[number-1] = Math.floor(clicks[number-1]/2);
	if (event.shiftKey) {
		clicks2[number-1] = clicks[number-1];
		document.getElementById("clicks"+String(number)).innerHTML = clicks[number-1];
	}
}

function change() {
	if (animate) {
		for (var i = 0; i < 6; i++) {
			if (clicks2[i] > clicks[i]) {
				clicks2[i] --;
				document.getElementById("clicks"+String(i+1)).innerHTML = clicks2[i];
			}
			else if (clicks2[i] < clicks[i]) {
				clicks2[i] ++;
				document.getElementById("clicks"+String(i+1)).innerHTML = clicks2[i];
			}
		}
	}
	else {
		clicks2 = clicks.slice();
		document.getElementById("clicks1").innerHTML = 100;
		document.getElementById("clicks2").innerHTML = 500;
		document.getElementById("clicks3").innerHTML = 1000;
		document.getElementById("clicks4").innerHTML = 100;
		document.getElementById("clicks5").innerHTML = 300;
		document.getElementById("clicks6").innerHTML = 800;
	}
	if (clicks.join(",") != "100,500,1000,100,300,800" || clicks2.join(",") != "100,500,1000,100,300,800") {
		document.getElementById("resetbutton").style.display = "block";
	}
	else {
		document.getElementById("resetbutton").style.display = "none";
		document.getElementById("reset_tip").innerHTML = "Reset Points";
	}
}

setInterval(change,0);

function reset(event) {
	document.getElementById("reset_tip").innerHTML = "Reset Points";
	if (event.shiftKey) {
		clicks = [100,500,1000,100,300,800];
		document.getElementById("reset_tip").innerHTML = "Reset Points";
	}
	if (clicks2[0] < clicks[0] || clicks2[1] < clicks[1] || clicks2[2] < clicks[2] || clicks2[3] < clicks[3] || clicks2[4] < clicks[4] || clicks2[5] < clicks[5]) {
		clicks2 = [100,500,1000,100,300,800];
		document.getElementById("clicks1").innerHTML = 100;
		document.getElementById("clicks2").innerHTML = 500;
		document.getElementById("clicks3").innerHTML = 1000;
		document.getElementById("clicks4").innerHTML = 100;
		document.getElementById("clicks5").innerHTML = 300;
		document.getElementById("clicks6").innerHTML = 800;
		document.getElementById("reset_tip").innerHTML = "Reset Points";
		document.getElementById("resetbutton").style.display = "none";
	}
	else {
		document.getElementById("reset_tip").innerHTML = "Click again to quickly reset points";
		clicks = [100,500,1000,100,300,800];
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
		document.getElementById("wrapper").style.backgroundColor = "#102344";
	}
	else if (dark == "light") {
		document.getElementById("mode").innerHTML = "Dark Mode";
		document.getElementById("wrapper").style.backgroundColor = "#e4f8ff";
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
	}
	else if (dark == "light") {
		document.body.classList.toggle("lightmode");
		document.getElementById("mode").innerHTML = "Dark Mode";
		document.getElementById("wrapper").style.backgroundColor = "#e4f8ff";
	}
	setTimeout(add_transition,500);
}

function add_transition() {
	document.body.style.transitionDuration = "0.5s";
	document.getElementById("wrapper").style.transitionDuration = "0.5s";
}


var showhint = false;
function show_hint() {
	showhint = !showhint;
	if (showhint) {
		document.getElementById("hint_box").style.display = "block";
	}
	else {
		document.getElementById("hint_box").style.display = "none";
	}
}