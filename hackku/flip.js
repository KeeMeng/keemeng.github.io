var count = 0;
var urls = localStorage.getItem("urls").split(",");
function change() {
	document.getElementById("image").src = urls[count];
	document.getElementById("image").height = screen.height;
	count++;
	if (count >= urls.length) {
		count = 0;
	}
}

setInterval(change, 8000);