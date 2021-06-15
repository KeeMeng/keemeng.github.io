var data = JSON.parse(cv);
data = data.sort((a, b) => Date.parse(b["date"]) - Date.parse(a["date"]));
function json() {
	for (var i = 0; i < data.length; i++) {
		
		var date = "";
		if (data[i]["date"].length == 4) {
			date = new Date(data[i]["date"]).toLocaleDateString("default", {year: 'numeric'} );
		}
		if (data[i]["date"].length == 7) {
			date = new Date(data[i]["date"]).toLocaleDateString("default", {year: 'numeric', month: 'long'} );
		}
		if (data[i]["date"].length == 10) {
			date = new Date(data[i]["date"]).toLocaleDateString("default", {year: 'numeric', month: 'long', day: 'numeric'} );
		}

		var inputhtml = `
		<div id="card${i}" class="${data[i]["tags"]} events">
			<span class="date">${date}</span>
			<span class="dot" id="dot${i}"></span>
			<span class="line" id="line${i}"></span>
			<p style="font-weight: bold">${data[i]["name"]}`

		if (data[i]["award"] != "") {
			inputhtml += ` - ${data[i]["award"]}`;
		}

		inputhtml += "</p>";

		if (data[i]["organizer"] != "") {
			inputhtml += `<p>${data[i]["organizer"]}</p>`;
		}

		inputhtml += `<p style="font-style: italic;">${data[i]["details"]}</p>`;

		if (data[i]["organizer_link"] != "" && data[i]["link"] == "") {
			inputhtml += `<p><a href="${data[i]["organizer_link"]}">(${data[i]["organizer_link_name"]})</a></p>`;
		}

		if (data[i]["organizer_link"] == "" && data[i]["link"] != "") {
			inputhtml += `<p><a href="${data[i]["link"]}">(Repository link)</a></p>`;
		}

		if (data[i]["organizer_link"] != "" && data[i]["link"] != "") {
			inputhtml += `<p><a href="${data[i]["organizer_link"]}">(${data[i]["organizer_link_name"]})</a> <a href="${data[i]["link"]}">(Repository link)</a></p>`;
		}

		inputhtml += `<img id="img${i}" class="image">`;
		inputhtml += "</div>";

		document.getElementById("cards").insertAdjacentHTML("beforeend", inputhtml);
	}
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
		for (var i = 0; i < data.length; i++) {
			document.getElementById(`card${i}`).style.backgroundColor = "#222";
			document.getElementById(`dot${i}`).style.backgroundColor = "#EEE";
			document.getElementById(`line${i}`).style.backgroundColor = "#EEE";
			document.getElementById(`img${i}`).src = `${data[i]["image_dark"]}`;
		}
	}
	else if (dark == "light") {
		document.getElementById("mode").innerHTML = "Dark Mode";
		for (var i = 0; i < data.length; i++) {
			document.getElementById(`card${i}`).style.backgroundColor = "#EEE";
			document.getElementById(`dot${i}`).style.backgroundColor = "#222";
			document.getElementById(`line${i}`).style.backgroundColor = "#222";
			document.getElementById(`img${i}`).src = `${data[i]["image_light"]}`;
		}
	}
	document.body.classList.toggle("darkmode");
	document.body.classList.toggle("lightmode");

}

function load() {
	json();
	document.body.style.transitionDuration = "0s";
	if (dark == "dark") {
		document.body.classList.toggle("darkmode");
		document.getElementById("mode").innerHTML = "Light Mode";
		for (var i = 0; i < data.length; i++) {
			document.getElementById(`card${i}`).style.backgroundColor = "#222";
			document.getElementById(`dot${i}`).style.backgroundColor = "#EEE";
			document.getElementById(`line${i}`).style.backgroundColor = "#EEE";
			document.getElementById(`img${i}`).src = `${data[i]["image_dark"]}`;
		}
	}
	else if (dark == "light") {
		document.body.classList.toggle("lightmode");
		document.getElementById("mode").innerHTML = "Dark Mode";
		for (var i = 0; i < data.length; i++) {
			document.getElementById(`card${i}`).style.backgroundColor = "#EEE";
			document.getElementById(`dot${i}`).style.backgroundColor = "#222";
			document.getElementById(`line${i}`).style.backgroundColor = "#222";
			document.getElementById(`img${i}`).src = `${data[i]["image_light"]}`;
		}
	}
	setTimeout(add_transition,500);
}

function add_transition() {
	document.body.style.transitionDuration = "0.5s";
}