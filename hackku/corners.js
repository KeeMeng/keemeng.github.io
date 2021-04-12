var mousex = 0;
var mousey = 0;
function mouse_position(event) {
	if (event.clientY > 100) {
		mousex = event.clientX;
		mousey = event.clientY;
		// document.getElementById("debug").innerHTML = `${mousex}, ${mousey}`;
	}
}

document.addEventListener("click", mouse_position);

var count = 0;
var count2 = 0;
var urls = localStorage.getItem("urls").split(",");
console.log(urls);
function start() {

	let screen_width = window.innerWidth;
	let screen_height = window.innerHeight;
	let x = Math.floor(Math.random() * (screen_width - 400)) + 200;
	let y = Math.floor(Math.random() * (screen_height - 400)) + 200;
	// console.log([x,y]);
	let xspeed = (Math.round(Math.random()) * 2 - 1) * (Math.random() + Math.random() + Number(document.getElementById("speed").value) / 5);
	let yspeed = (Math.round(Math.random()) * 2 - 1) * (Math.random() + Math.random() + Number(document.getElementById("speed").value) / 5);
	let width = 100;
	let height = 100;
	let image = document.createElement("img");
	var oldx = mousex;
	var oldy = mousey;

	document.body.appendChild(image);
	image.id = `image_${count}`;
	image.src = urls[count2];
	image.width = "100";
	image.height = "100";
	image.style.display = "block";
	image.style.position = "absolute";
	image.style.left = `${x}px`;
	image.style.top = `${y}px`;
	count++;
	count2 ++;

	if (count2 >= urls.length) {
		count2 = 0;
	}

	function move() {
		if (x + width - 10 >= screen_width || x + 10 <= 0) {
			xspeed *= -1;
			// console.log([x,y]);
		}

		if (y + width - 10 >= screen_height || y + 10 <= 0) {
			yspeed *= -1;
			// console.log([x,y]);
		}

		x += xspeed;
		y += yspeed;

		image.style.left = `${x}px`;
		image.style.top = `${y}px`;

		if (oldx != mousex || oldy != mousey) {
			oldx = mousex;
			oldy = mousey;
			x = mousex;
			y = mousey;
			image.style.left = `${x}px`;
			image.style.top = `${y}px`;
		}

		// document.getElementById("debug").innerHTML = `${x}, ${y}`;
	}

	setInterval(move, 0);
}
