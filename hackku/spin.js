function speed() {
	if (document.getElementById("speed").value == "") {
		document.getElementById("cube").style.animationDuration = "8s";
	}
	else {
		document.getElementById("cube").style.animationDuration = `${Number(document.getElementById("speed").value)}s`;
	}
}

var urls = localStorage.getItem("urls").split(",");
var count = 0;
function setup() {
	for (var i = 1; i <= 6; i++) {
		document.getElementById(`side${i}`).style.backgroundImage = `url('${urls[count]}')`;
		document.getElementById(`side${i}`).style.backgroundSize = "256px 256px";
		count ++;
		if (count >= urls.length) {
			count = 0;
		}
	}
	setInterval(speed,0);
}
