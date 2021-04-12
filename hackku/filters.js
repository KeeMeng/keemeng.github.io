function ran(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var min0 = 0;
var max0 = 0;
var min1 = 0;
var max1 = 0;
var min2 = 0;
var max2 = 0;
var min3 = 0;
var max3 = 0;
var min4 = 0;
var max4 = 0;
var min5 = 0;
var max5 = 0;
var min6 = 0;
var max6 = 0;
var values = [];
var oldvalues = [];
var mins = [];
var maxs = [];

function setup() {
	min0 = Number(document.getElementById("min0").value);
	max0 = Number(document.getElementById("max0").value);
	min1 = Number(document.getElementById("min1").value);
	max1 = Number(document.getElementById("max1").value);
	min2 = Number(document.getElementById("min2").value);
	max2 = Number(document.getElementById("max2").value);
	min3 = Number(document.getElementById("min3").value);
	max3 = Number(document.getElementById("max3").value);
	min4 = Number(document.getElementById("min4").value);
	max4 = Number(document.getElementById("max4").value);
	min5 = Number(document.getElementById("min5").value);
	max5 = Number(document.getElementById("max5").value);
	min6 = Number(document.getElementById("min6").value);
	max6 = Number(document.getElementById("max6").value);
	mins = [min0, min1, min2, min3, min4, min5, min6];
	maxs = [max0, max1, max2, max3, max4, max5, max6];
	// console.log([[min0,max0],[min1,max1],[min2,max2],[min3,max3],[min4,max4],[min5,max5],[min6,max6]]);
	values = [ran(min0, max0), ran(min1, max1), ran(min2, max2), ran(min3, max3), ran(min4, max4), ran(min5, max5), ran(min6, max6)];
	oldvalues = [ran(min0, max0), ran(min1, max1), ran(min2, max2), ran(min3, max3), ran(min4, max4), ran(min5, max5), ran(min6, max6)];
}

var string = "";
var image = null;
function filter() {
	image = document.getElementById("image");
	string = "";
	string += `brightness(${oldvalues[0]}%) `;
	document.getElementById("debug0").innerHTML = `Brightness: ${oldvalues[0]}`;
	string += `contrast(${oldvalues[1]}%) `;
	document.getElementById("debug1").innerHTML = `Contrast: ${oldvalues[1]}`;
	string += `grayscale(${oldvalues[2]}%) `;
	document.getElementById("debug2").innerHTML = `Grayscale: ${oldvalues[2]}`;
	string += `hue-rotate(${oldvalues[3]}deg) `;
	document.getElementById("debug3").innerHTML = `Hue-rotate: ${oldvalues[3]}`;
	string += `invert(${oldvalues[4]}%) `;
	document.getElementById("debug4").innerHTML = `Invert: ${oldvalues[4]}`;
	string += `saturate(${oldvalues[5]}%) `;
	document.getElementById("debug5").innerHTML = `Saturate: ${oldvalues[5]}`;
	string += `sepia(${oldvalues[6]}%) `;
	document.getElementById("debug6").innerHTML = `Sepia: ${oldvalues[6]}`;
	for (var i = 0; i < 7; i++) {
		if (values[i] < oldvalues[i]) {
			oldvalues[i]--;
		}
		else if (values[i] > oldvalues[i]) {
			oldvalues[i]++;
		}
		else if (values[i] == oldvalues[i]) {
			values[i] = ran(mins[i], maxs[i]);
		}
	}
	image.style.filter = string;
}

var started = false;
var repeat = null;
var delay = 0;
function start() {
	if (started) {
		document.getElementById("startbutton").innerHTML = "Start Filters";
		document.getElementById("reset").style.display = "inline-block";
		document.getElementById("delay").style.display = "inline-block";
		document.getElementById("minmax").style.display = "inline";
		document.getElementById("debug0").innerHTML = "Brightness: ";
		document.getElementById("debug1").innerHTML = "Contrast: ";
		document.getElementById("debug2").innerHTML = "Grayscale: ";
		document.getElementById("debug3").innerHTML = "Hue-rotate: ";
		document.getElementById("debug4").innerHTML = "Invert: ";
		document.getElementById("debug5").innerHTML = "Saturate: ";
		document.getElementById("debug6").innerHTML = "Sepia: ";
		clearInterval(repeat);
	}
	else {
		document.getElementById("startbutton").innerHTML = "Stop Filters";
		document.getElementById("delay").style.display = "none";
		document.getElementById("minmax").style.display = "none";
		document.getElementById("reset").style.display = "none";
		if (document.getElementById("delay").value != "") {
			delay = Number(document.getElementById("delay").value);
		}
		else {
			delay = 0;
		}
		repeat = setInterval(filter, delay);
	}
	started = !started;
}

function reset() {
	document.getElementById("min0").value = "100";
	document.getElementById("max0").value = "100";
	document.getElementById("min1").value = "100";
	document.getElementById("max1").value = "150";
	document.getElementById("min2").value = "0";
	document.getElementById("max2").value = "25";
	document.getElementById("min3").value = "0";
	document.getElementById("max3").value = "360";
	document.getElementById("min4").value = "0";
	document.getElementById("max4").value = "0";
	document.getElementById("min5").value = "75";
	document.getElementById("max5").value = "250";
	document.getElementById("min6").value = "0";
	document.getElementById("max6").value = "5";
	image.style.filter = "none";
}

var urls = localStorage.getItem("urls").split(",");
var count = 0;
function change_image() {
	// console.log(urls[count]);
	document.getElementById("image").src = urls[count];
	document.getElementById("image").height = screen.height/2;
	count++;
	if (count >= urls.length) {
		count = 0;
	}
}
