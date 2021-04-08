var cubex = -18;
var cubey = -45;
var cubez = 0;

var matrix = [];
var n = 2;
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
			};
			line.push(block);
		}
		layer.push(line);
	}
	matrix.push(layer);
}


matrix[0][0][0].red = 255;
matrix[0][0][0].green = 0;
matrix[0][0][0].blue = 0;
matrix[0][0][0].alpha = 255;

matrix[0][0][1].red = 0;
matrix[0][0][1].green = 255;
matrix[0][0][1].blue = 0;
matrix[0][0][1].alpha = 255;

matrix[0][1][0].red = 0;
matrix[0][1][0].green = 0;
matrix[0][1][0].blue = 255;
matrix[0][1][0].alpha = 255;

matrix[0][1][1].red = 255;
matrix[0][1][1].green = 255;
matrix[0][1][1].blue = 0;
matrix[0][1][1].alpha = 255;

var c = document.getElementsByClassName("canvas1")[0];



// var c = $("#cube_000_000_000 cube.side.canvas1")[0];
// var c = document.getElementById("canvas1").getElementsByClassName("cube_000_000_000");
// var c = document.getElementById("cube_000_000_000").getElementsByClassName();
var ctx = c.getContext("2d");
var imgData = ctx.createImageData(n, n);
var i = 0;
for (var x = 0; x < n; x++) {
	for (var y = 0; y < n; y++) {
		for (var z = 0; z < n; z++) {
			imgData.data[i+0] = matrix[x][y][z].red;
			imgData.data[i+1] = matrix[x][y][z].green;
			imgData.data[i+2] = matrix[x][y][z].blue;
			imgData.data[i+3] = matrix[x][y][z].alpha;
			i += 4;
		}	
	}
}

// document.getElementById("side1").style.backgroundImage
ctx.putImageData(imgData, 0, 0);



function rotate(variableName, degrees) {
	window[variableName] = window[variableName] + degrees;
	rotCube(cubex, cubey, cubez);
}
function rotCube(degx, degy, degz){
	// document.getElementsByClassName("cube").css({"transform":segs});
	var allcubes = document.getElementsByClassName("cube");
	let re = new RegExp("[0-9][0-9][0-9]", "g");
	for (var i = 0; i < allcubes.length; i++) {
		c = String(allcubes[i].id).match(re);
		var string = "rotateX("+degx+"deg) rotateY("+degy+"deg) rotateZ("+degz+"deg)"+" translate3d("+String(2*(-64+Number(c[0])))+"px,"+String(2*(-64+Number(c[1])))+"px,"+String(2*(-64+Number(c[2])))+"px)";
		console.log(allcubes[i].style.transform);
		console.log(string);
		allcubes[i].style.transform = string;
	}
}
function turnRight() {
	rotate("cubey", 90);
}
function turnLeft() {
	rotate("cubey", -90);
}
function flipCube() {
	rotate("cubez", -180);
	// rotate("cubey", -90);
}