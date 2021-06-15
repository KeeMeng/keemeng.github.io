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
		<div id="card${i}" class="${data[i]["tags"]} events" onmouseenter="expand(${i})" onmouseleave="shrink(${i})">
			<span class="date">${date}</span>
			<span class="dot" id="dot${i}"></span>
			<span class="line" id="line${i}"></span>
			<p style="font-weight: bold">${data[i]["name"]}`

		if (data[i]["award"] != "") {
			inputhtml += ` - ${data[i]["award"]}`;
		}

		inputhtml += "</p>";

		if (data[i]["organizer"] != "") {
			inputhtml += `<p class="hide">${data[i]["organizer"]}</p>`;
		}

		inputhtml += `<p class="hide" style="font-style: italic;">${data[i]["details"]}</p>`;

		if (data[i]["organizer_link"] != "" && data[i]["link"] == "") {
			inputhtml += `<p class="hide"><a href="${data[i]["organizer_link"]}">(${data[i]["organizer_link_name"]})</a></p>`;
		}

		if (data[i]["organizer_link"] == "" && data[i]["link"] != "") {
			inputhtml += `<p class="hide"><a href="${data[i]["link"]}">(Repository link)</a></p>`;
		}

		if (data[i]["organizer_link"] != "" && data[i]["link"] != "") {
			inputhtml += `<p class="hide"><a href="${data[i]["organizer_link"]}">(${data[i]["organizer_link_name"]})</a> <a href="${data[i]["link"]}">(Repository link)</a></p>`;
		}

		inputhtml += `<p class="hide tags" onclick="solo('${data[i]["tags"]}')">#${data[i]["tags"]}</p>`;
		inputhtml += `<img id="img${i}" class="hide image" onclick="window.location.href = '${data[i]["link"]}'">`;
		inputhtml += "</div>";

		document.getElementById("cards").insertAdjacentHTML("beforeend", inputhtml);
	}
}

function filter() {
	var tags = [];
	document.getElementById("box_filter").checked = false;
	var all = 0;
	if (document.getElementById("box_education").checked) {
		tags.push("education");
		all += 1;
	}
	if (document.getElementById("box_computer_science").checked) {
		tags.push("computer_science");
		all += 1;
	}
	if (document.getElementById("box_stem").checked) {
		tags.push("stem");
		all += 1;
	}
	if (document.getElementById("box_robotics").checked) {
		tags.push("robotics");
		all += 1;
	}
	if (all == 4) {
		document.getElementById("box_filter").checked = true;
	}
	else {
		document.getElementById("box_filter").checked = false;
	}
	if (tags.join("|") == "") {
		document.getElementById("cards").style.display = "none";
	}
	else {
		document.getElementById("cards").style.display = "block";
		let re = new RegExp(tags.join("|"));
		for (var i = 0; i < data.length; i++) {
			if (data[i]["tags"].match(re) == null) {
				document.getElementById(`card${i}`).style.display = "none";
			}
			else {
				document.getElementById(`card${i}`).style.display = "inline-block";
			}
		}
	}
}


function solo(id) {
	document.getElementById("box_education").checked = false;
	document.getElementById("box_computer_science").checked = false;
	document.getElementById("box_stem").checked = false;
	document.getElementById("box_robotics").checked = false;
	document.getElementById(`box_${id}`).checked = true;
	filter()
}

function filter_all() {
	if (document.getElementById("box_filter").checked) {
		document.getElementById("cards").style.display = "inline-block";
		document.getElementById("box_education").checked = true;
		document.getElementById("box_computer_science").checked = true;
		document.getElementById("box_stem").checked = true;
		document.getElementById("box_robotics").checked = true;
		filter();
	}
	else {
		document.getElementById("cards").style.display = "none";
		document.getElementById("box_education").checked = false;
		document.getElementById("box_computer_science").checked = false;
		document.getElementById("box_stem").checked = false;
		document.getElementById("box_robotics").checked = false;
	}
}

var details = true;
function summary() {
	var elements = document.getElementsByClassName("hide");
	if (details) {
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.display = "none";
		}
		for (var i = 0; i < data.length; i++) {
			document.getElementById(`card${i}`).style.padding = "14px";
		}
	}
	else {
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.display = "block";
		}
		for (var i = 0; i < data.length; i++) {
			document.getElementById(`card${i}`).style.padding = "24px";
		}

	}
	details = !details;
}

function expand(id) {
	if (!details) {
		var div = document.getElementById(`card${id}`);
		var els = div.getElementsByTagName("*");
		for (var i = 0; i < els.length; i++) {
			els[i].style.display = "block";
		}
	}
}

function shrink(id) {
	if (!details) {
		var div = document.getElementById(`card${id}`);
		var els = div.getElementsByClassName("hide");
		for (var i = 0; i < els.length; i++) {
			els[i].style.display = "none";
		}
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
	document.getElementById("box_filter").checked = true;
	document.getElementById("box_education").checked = true;
	document.getElementById("box_computer_science").checked = true;
	document.getElementById("box_stem").checked = true;
	document.getElementById("box_robotics").checked = true;
}

function add_transition() {
	document.body.style.transitionDuration = "0.5s";
}