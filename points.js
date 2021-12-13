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
		if (document.getElementById("restriction"+String(number)).style.display == "block") {
			document.getElementById("restriction"+String(number)).style.display = "none";
		} else {
			document.getElementById("restriction"+String(number)).style.display = "block";
		}
}

function half(event, number) {
	clicks[number-1] = Math.floor(clicks[number-1]/2);
	if (event.shiftKey) {
		clicks2[number-1] = clicks[number-1];
		document.getElementById("clicks"+String(number)).innerHTML = clicks[number-1];
	}
	reorder();
}

function change() {
	if (animate) {
		for (var i = 0; i < 6; i++) {
			if (clicks2[i] > clicks[i]) {
				clicks2[i] --;
				document.getElementById("clicks"+String(i+1)).innerHTML = clicks2[i];
				document.getElementById("button"+String(i+1)).style.backgroundColor = "hsl(205,100%," + String(85-clicks2[i]/40) + "%)";
			}
			else if (clicks2[i] < clicks[i]) {
				clicks2[i] ++;
				document.getElementById("clicks"+String(i+1)).innerHTML = clicks2[i];
				document.getElementById("button"+String(i+1)).style.backgroundColor = "hsl(205,100%," + String(85-clicks2[i]/40) + "%)";
			}
		}

	}
	else {
		clicks2 = clicks.slice();
		document.getElementById("clicks1").innerHTML = clicks[0];
		document.getElementById("clicks2").innerHTML = clicks[1];
		document.getElementById("clicks3").innerHTML = clicks[2];
		document.getElementById("clicks4").innerHTML = clicks[3];
		document.getElementById("clicks5").innerHTML = clicks[4];
		document.getElementById("clicks6").innerHTML = clicks[5];
		for (var i = 0; i < 6; i++) {
			document.getElementById("button"+String(i+1)).style.backgroundColor = "hsl(205,100%," + String(85-clicks2[i]/40) + "%)";
		}
	}
	if (clicks.join(",") != "100,500,1000,100,300,800" || clicks2.join(",") != "100,500,1000,100,300,800") {
		document.getElementById("reset_button").style.display = "block";
	}
	else {
		document.getElementById("reset_button").style.display = "none";
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
		document.getElementById("reset_button").style.display = "none";
		for (var i = 0; i < 6; i++) {
			document.getElementById("button"+String(i+1)).style.backgroundColor = "hsl(205,100%," + String(85-clicks2[i]/40) + "%)";
		}
	}
	else {
		document.getElementById("reset_tip").innerHTML = "Click again to quickly reset points";
		clicks = [100,500,1000,100,300,800];
	}
	reorder();
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
		document.querySelector("meta[name=theme-color]").setAttribute("content", "#000000");
	}
	else if (dark == "light") {
		document.getElementById("mode").innerHTML = "Dark Mode";
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
		document.getElementById("wrapper").style.backgroundColor = "#102344";
		document.querySelector("meta[name=theme-color]").setAttribute("content", "#000000");
	}
	else if (dark == "light") {
		document.body.classList.toggle("lightmode");
		document.getElementById("mode").innerHTML = "Dark Mode";
		document.getElementById("wrapper").style.backgroundColor = "#e4f8ff";
		document.querySelector("meta[name=theme-color]").setAttribute("content", "#FFFFFF");
	}
	setTimeout(add_transition,500);
	for (var i = 0; i < 6; i++) {
		document.getElementById("button"+String(i+1)).style.backgroundColor = "hsl(205,100%," + String(85-clicks2[i]/40) + "%)";
	}
}

function add_transition() {
	document.body.style.transitionDuration = "0.5s";
	document.getElementById("wrapper").style.transition = "background-color 0.5s";
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

var reorder_bool = true;
function reordering() {
	reorder_bool = ! reorder_bool;
}

var current_order = [0,3,1,4,2,5];
function reorder() {
	if (!reorder_bool) {
		let children = document.querySelectorAll("#wrapper")[0].children;

		var order = [];
		var values = [];
		var values_copy = [];

		var current_order_copy = []
		for(let i=0;i<6;i++){
			current_order_copy.push(current_order[i]);
		}
		
		for(let i=0;i<6;i++){
			values.push(clicks[current_order[i]]);
			values_copy.push(clicks[current_order[i]]);
		}

		values.sort(function(a, b){return b-a});
		for(let i=0;i<6;i++){
			order.push(values_copy.indexOf(values[i]));
			values_copy[values_copy.indexOf(values[i])] = null;
		}

		var arr = [];
		for(let i=0;i<6;i++){
			arr.push(children[order[i]]);
		}

		for(let i=0;i<6;i++){
			wrapper.appendChild(arr[i]);
		}

		temp = [0,0,0,0,0,0];
		for(let i=0;i<6;i++){
			temp[i] = current_order_copy[order[i]];
		}

		current_order = [];

		for(let i=0;i<6;i++){
			current_order.push(temp[i])
		}
	}
}

function focus_mode() {
	if (document.getElementById("focus").style.display == "block") {
		document.getElementById("focus").style.display = "None"
		document.getElementById("focus_button").style.top = "10px"
	}
	else {
		document.getElementById("focus").style.display = "block"
		document.getElementById("focus_button").style.top = "90px"
	}
}