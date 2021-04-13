var char_array = ["T", "G", "M", "k", "h", "da", "_", "d", "c", "m", "u", "n", "p"];
var power_array = [12,9,6,3,2,1,0,-1,-2,-3,-6,-9,-12];
var name_array = ["tera", "giga", "mega", "kilo", "hecto", "deca", "", "deci", "centi", "milli", "micro", "nano", "pico"];
function set_output() {
	let re = new RegExp("^(eg. )?([0-9]*) ?(T|G|M|k|h|da|_|d|c|m|u|n|p|)?([0-9])?([a-zA-Z ]*) (T|G|M|k|h|da|_|d|c|m|u|n|p|)([0-9])?");
	let match = document.getElementById("input_text").value.match(re);
	// document.getElementById("debug").innerHTML = match;
	if (match !== null && (match[3] == undefined || char_array.includes(match[3])) && (match[6] == undefined || char_array.includes(match[6])) && (match[4] == match[7] || match[4] == "" || match[7] !== "")) {
		if (match[3] == undefined) {
			x_power = 0;
			x_name = "";
		}
		else {
			x = match[3];
			x_power = power_array[char_array.indexOf(x)];
			x_name = name_array[char_array.indexOf(x)];
		}
		if (match[6] == undefined) {
			y_power = 0;
			y_name = "";
		}
		else {
			y = match[6];
			y_power = power_array[char_array.indexOf(y)];
			y_name = name_array[char_array.indexOf(y)];
		}
		if (match[2] == "") {
			num = 1;
		}
		else {
			num = match[2];
		}

		if (match[4] !== undefined || match[7] !== undefined) {
			if (match[7] !== undefined) {
				number = num * (10 ** ((x_power - y_power) * match[7]));
				extra = match[7];
			}
			else if (match[4] !== undefined) {
				number = num * (10 ** ((x_power - y_power) * match[4]));
				extra = match[4];
			}
			if (x_name == "") {
				document.getElementById("output").innerHTML = num + " = " + number + " " + y_name + "^" + extra;
			}
			else if (y_name == "") {
				document.getElementById("output").innerHTML = num + x_name + "^" + extra + " = " + number;
			}
			else {
				document.getElementById("output").innerHTML = num + x_name + "^" + extra + " = " + number + " " + y_name + "^" + extra;
			}
		}
		else {
			number = num * 10 ** (x_power - y_power);
			document.getElementById("output").innerHTML = num + " " + x_name + " = " + number + " " + y_name;
		}
		if (x_name !== "") {
			document.getElementById("xvalue").innerHTML = "Unit 1 (" + x_name + "): " + 10 ** x_power;
		}
		else {
			document.getElementById("xvalue").innerHTML = "Unit 1: " + 10 ** x_power;
		}
		if (y_name !== "") {
			document.getElementById("yvalue").innerHTML = "Unit 2 (" + y_name + "): " + 10 ** y_power;
		}
		else {
			document.getElementById("yvalue").innerHTML = "Unit 2: " + 10 ** y_power;
		}
	}
	else {
		document.getElementById("output").innerHTML = "";
		document.getElementById("xvalue").innerHTML = "";
		document.getElementById("yvalue").innerHTML = "";
	}
}
setInterval(set_output, 0);

var index = 0;
function example() {
	eg = ["eg. 1 to k","eg. M to _","eg. 5c d","eg. 1 d3","eg. d3 to _","eg. 4_ c2","eg. h m","eg. G T"]
	// index = Math.floor(Math.random() * Math.floor(7))
	document.getElementById("input_text").value = eg[index];
	index ++;
	if (index > 7) {
		index = 0;
	}
}