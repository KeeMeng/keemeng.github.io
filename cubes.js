var cubex = -18;
var cubey = -45;
var cubez = 0;

var temp = Number(prompt("Cube Size"));
var n = 2;
if (temp > 0) {
	n = temp;
}

var matrix = [];
function set_matrix() {
	matrix = [];
	for(var i = 0; i < n; i++) {
		let layer = [];
		for(var j = 0; j < n; j++) {
			let line = [];
			for(var k = 0; k < n; k++) {
				let block = {
					"red": 0,
					"green": 0,
					"blue": 0,
					"alpha": 0,
					// "alpha": 255,
				};
				line.push(block);
			}
			layer.push(line);
		}
		matrix.push(layer);
	}
}

set_matrix();

function setblock([x,y,z],[r,g,b,a]) {
	matrix[x][y][z].red = r;
	matrix[x][y][z].green = g;
	matrix[x][y][z].blue = b;
	matrix[x][y][z].alpha = a;
}


for (var x = 0; x < n; x++) {
	for (var y = 0; y < n; y++) {
		for (var z = 0; z < n; z++) {
			var rgba = `rgba(${matrix[x][y][z].red}, ${matrix[x][y][z].green}, ${matrix[x][y][z].blue}, ${matrix[x][y][z].alpha})`;
			var cubeid = `${("000" + x).substr(-3)}_${("000" + y).substr(-3)}_${("000" + z).substr(-3)}`;
			var cubehtml = `
			<div class="cube" id="${cubeid}" style="transform: scale(${128/n}) rotateX(-18deg) rotateY(-45deg) rotateZ(0deg) translate3d(${String(0+2*(-Number(n/2)+x))}px,${String(0+2*(-Number(n/2)+y))}px,${String(1+2*(-Number(n/2)+z))}px)">
				<div class="side1" id="${cubeid}_1" style="transform: rotateX(90deg) translateZ(1px); background-color: ${rgba}"></div>
				<div class="side2" id="${cubeid}_2" style="transform: rotateY(-90deg) translateZ(1px); background-color: ${rgba}"></div>
				<div class="side3" id="${cubeid}_3" style="transform: rotateY(0deg) translateZ(1px); background-color: ${rgba}"></div>
				<div class="side4" id="${cubeid}_4" style="transform: rotateY(90deg) translateZ(1px); background-color: ${rgba}"></div>
				<div class="side5" id="${cubeid}_5" style="transform: rotateY(180deg) translateZ(1px); background-color: ${rgba}"></div>
				<div class="side6" id="${cubeid}_6" style="transform: rotateX(-90deg) translateZ(1px); background-color: ${rgba}"></div>
			</div>
			`;
			document.getElementById("wrapper").insertAdjacentHTML("beforeend", cubehtml);
			if (matrix[x][y][z].alpha == 0) {
				document.getElementById(cubeid).style.display = "none";
				// console.log(`${("000" + x).substr(-3)}_${("000" + y).substr(-3)}_${("000" + z).substr(-3)}`);
			}
			// console.log(`id="${("000" + x).substr(-3)}_${("000" + y).substr(-3)}_${("000" + z).substr(-3)}"`)
			// document.getElementById("wrapper").appendChild(cubehtml);
		}
	}
}


// var c = document.getElementsByClassName("canvas1")[0];

// // var c = $("#cube_000_000_000 cube.side.canvas1")[0];
// // var c = document.getElementById("canvas1").getElementsByClassName("cube_000_000_000");
// // var c = document.getElementById("cube_000_000_000").getElementsByClassName();
// var ctx = c.getContext("2d");
// var imgData = ctx.createImageData(n, n);
// var i = 0;
// for (var x = 0; x < n; x++) {
// 	for (var y = 0; y < n; y++) {
// 		for (var z = 0; z < n; z++) {
// 			imgData.data[i+0] = matrix[x][y][z].red;
// 			imgData.data[i+1] = matrix[x][y][z].green;
// 			imgData.data[i+2] = matrix[x][y][z].blue;
// 			imgData.data[i+3] = matrix[x][y][z].alpha;
// 			i += 4;
// 		}	
// 	}
// }

// // document.getElementById("side1").style.backgroundImage 
// ctx.putImageData(imgData, 0, 0);


var input_count = 0;
function add_input() {
	input_count++;
	var inputhtml = `
	<div>
		<input type="color" id="c${input_count}" value="#FFFFFF">
		<input type="text" id="x${input_count}" placeholder="x" style="width: 25px">
		<input type="text" id="y${input_count}" placeholder="y" style="width: 25px">
		<input type="text" id="z${input_count}" placeholder="z" style="width: 25px">
		<input type="text" id="a${input_count}" placeholder="alpha" style="width: 30px">
	</div>
	`;
	document.getElementById("inputs").insertAdjacentHTML("beforeend", inputhtml);
}

function update() {
	set_matrix();
	for(var i = 1; i <= input_count; i++) {
		if ((document.getElementById("x"+String(i)).value != "") && (document.getElementById("y"+String(i)).value != "") && (document.getElementById("z"+String(i)).value != "")) {
			var hex = document.getElementById("c"+String(i)).value;
			let r = 0, g = 0, b = 0, a = 0.0, xpos = 0, ypos = 0, zpos = 0;
			r = parseInt(hex[1] + hex[2], 16);
			g = parseInt(hex[3] + hex[4], 16);
			b = parseInt(hex[5] + hex[6], 16);
			xpos = Number(document.getElementById("x"+String(i)).value);
			ypos = Number(document.getElementById("y"+String(i)).value);
			zpos = Number(document.getElementById("z"+String(i)).value);
			if (document.getElementById("a"+String(i)).value == "") {
				a = 1.0;
			}
			else {
				a = parseFloat(document.getElementById("a"+String(i)).value);
			}
			setblock([xpos,ypos,zpos], [r,g,b,a]);
		}
	}
	for (var x = 0; x < n; x++) {
		for (var y = 0; y < n; y++) {
			for (var z = 0; z < n; z++) {
				var cubeid = `${("000" + x).substr(-3)}_${("000" + y).substr(-3)}_${("000" + z).substr(-3)}`;
				if (matrix[x][y][z].alpha != 0) {
					var rgba = `rgba(${matrix[x][y][z].red}, ${matrix[x][y][z].green}, ${matrix[x][y][z].blue}, ${matrix[x][y][z].alpha})`;
					document.getElementById(cubeid).style.display = "block";
					document.getElementById(cubeid+"_1").style.backgroundColor = rgba;
					document.getElementById(cubeid+"_2").style.backgroundColor = rgba;
					document.getElementById(cubeid+"_3").style.backgroundColor = rgba;
					document.getElementById(cubeid+"_4").style.backgroundColor = rgba;
					document.getElementById(cubeid+"_5").style.backgroundColor = rgba;
					document.getElementById(cubeid+"_6").style.backgroundColor = rgba;
				}
				else {
					var rgba = "rgba(0, 0, 0, 0)";
					document.getElementById(cubeid).style.display = "none";
					document.getElementById(cubeid+"_1").style.backgroundColor = rgba;
					document.getElementById(cubeid+"_2").style.backgroundColor = rgba;
					document.getElementById(cubeid+"_3").style.backgroundColor = rgba;
					document.getElementById(cubeid+"_4").style.backgroundColor = rgba;
					document.getElementById(cubeid+"_5").style.backgroundColor = rgba;
					document.getElementById(cubeid+"_6").style.backgroundColor = rgba;
				}
			}
		}
	}
}

add_input();
add_input();
add_input();
add_input();

set_inputs(1, "#FF0000", 0, 0, 0, 0.75);
set_inputs(2, "#00FF00", 0, 0, 1, 0.75);
set_inputs(3, "#0000FF", 0, 1, 0, 0.75);
set_inputs(4, "#FFFF00", 0, 1, 1, 0.75);

update();

function set_inputs(number, color, x, y, z, a) {
	document.getElementById("c"+String(number)).value = color;
	document.getElementById("x"+String(number)).value = x;
	document.getElementById("y"+String(number)).value = y;
	document.getElementById("z"+String(number)).value = z;
	document.getElementById("a"+String(number)).value = a;
}

function rotate(varname, degrees) {
	window[varname] = window[varname] + degrees;
	rotate_cube(cubex, cubey, cubez);
}

function rotate_cube(degx, degy, degz){
	// document.getElementsByClassName("cube").css({"transform":segs});
	var allcubes = document.getElementsByClassName("cube");
	let re = new RegExp("[0-9][0-9][0-9]", "g");
	for (var i = 0; i < allcubes.length; i++) {
		var c = String(allcubes[i].id).match(re);
		var string = "scale("+String(128/n)+") rotateX("+degx+"deg) rotateY("+degy+"deg) rotateZ("+degz+"deg)"+" translate3d("+String(0+2*(-Number(n/2)+Number(c[0])))+"px,"+String(0+2*(-Number(n/2)+Number(c[1])))+"px,"+String(1+2*(-Number(n/2)+Number(c[2])))+"px)";
		// console.log(allcubes[i].style.transform);
		// console.log(string);
		allcubes[i].style.transform = string;
	}
}

function turn_left() {
	rotate("cubey", -90);
}
function turn_right() {
	rotate("cubey", 90);
}
function flip_up() {
	rotate("cubez", -90);
	// rotate("cubey", -90);
}
function flip_down() {
	rotate("cubez", 90);
	// rotate("cubey", -90);
}