var data1 = JSON.parse(cv);
data2 = data1.sort((a, b) => Date.parse(b["date"]) - Date.parse(a["date"]));
var data = [];
var exclude = [];
for (var i = 0; i < data2.length; i++) {
	if (data2[i]["ignore"] == false) {
		data.push(data2[i]);
	}
}

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
		<div id="row${i}" class="row">
			<span class="date">${date}</span>
			<span class="dot" id="dot${i}"></span>
			<span class="linea" id="line${i}a"></span>
			<span class="lineb" id="line${i}b"></span>
			<div id="card${i}" class="${data[i]["tags"]} card" onmouseenter="expand(${i})" onmouseleave="shrink(${i})" onclick="toggle(${i})">
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
			inputhtml += `<p class="hide">&#10140; <a href="${data[i]["organizer_link"]}">${data[i]["organizer_link_name"]}</a></p>`;
		}

		if (data[i]["organizer_link"] == "" && data[i]["link"] != "") {
			inputhtml += `<p class="hide">&#10140; <a href="${data[i]["link"]}">Repository</a></p>`;
		}

		if (data[i]["organizer_link"] != "" && data[i]["link"] != "") {
			inputhtml += `<p class="hide">&#10140; <a href="${data[i]["organizer_link"]}" style="margin-right: 15px">${data[i]["organizer_link_name"]}</a> &#10140; <a href="${data[i]["link"]}">Repository</a></p>`;
		}
		inputhtml += `<br class="extrabr">`
		inputhtml += `<p id="tag${i}" class="hide tags" onclick="solo('${data[i]["tags"]}', ${i})">#${data[i]["tags"]}</p>`;
		// inputhtml += `<img id="img${i}" class="hide image" onclick="window.location.href = '${data[i]["link"]}'">`;
		inputhtml += "</div></div>";

		document.getElementById("cards").insertAdjacentHTML("beforeend", inputhtml);
	}
	document.getElementById("line0a").style.display = "none";
	document.getElementById(`line${data.length - 1}b`).style.display = "none";
}

function filter() {
	var tags = [];
	exclude = [];
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
	if (document.getElementById("box_robotics").checked) {
		tags.push("robotics");
		all += 1;
	}
	if (document.getElementById("box_stem").checked) {
		tags.push("stem");
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
			if (data[i]["tags"].match(re) == null || ["art","music","others"].includes(data[i]["tags"].match(re))) {
				document.getElementById(`row${i}`).style.display = "none";
			}
			else {
				document.getElementById(`row${i}`).style.display = "flex";
			}
		}
	}
}


function solo(id, num) {
	exclude = [];
	toggle(num);
	document.getElementById("box_education").checked = false;
	document.getElementById("box_computer_science").checked = false;
	document.getElementById("box_robotics").checked = false;
	document.getElementById("box_stem").checked = false;
	var err = false;
	try {
		document.getElementById(`box_${id}`).checked = true;
	}
	catch(error) {
		document.getElementById("box_filter").checked = false;
		document.getElementById("cards").style.display = "block";
		for (var i = 0; i < data.length; i++) {
			if (data[i]["tags"] != id) {
				document.getElementById(`row${i}`).style.display = "none";
			}
			else {
				document.getElementById(`row${i}`).style.display = "flex";
			}
		}

		err = true;
	}
	if (!err) {
		filter()
	}
}

function filter_all() {
	exclude = [];
	if (document.getElementById("box_filter").checked) {
		document.getElementById("cards").style.display = "block";
		document.getElementById("box_education").checked = true;
		document.getElementById("box_computer_science").checked = true;
		document.getElementById("box_robotics").checked = true;
		document.getElementById("box_stem").checked = true;
		for (var i = 0; i < data.length; i++) {
			document.getElementById(`row${i}`).style.display = "flex";
		}
	}
	else {
		document.getElementById("cards").style.display = "none";
		document.getElementById("box_education").checked = false;
		document.getElementById("box_computer_science").checked = false;
		document.getElementById("box_robotics").checked = false;
		document.getElementById("box_stem").checked = false;
	}
}

var details = true;
function summary() {
	exclude = []
	var elements = document.getElementsByClassName("hide");
	if (details) {
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.display = "none";
		}
		for (var i = 0; i < data.length; i++) {
			document.getElementById(`card${i}`).style.padding = "12px";
			document.getElementById(`card${i}`).style.width = "calc(var(--width) - 72px)";
			document.getElementById(`tag${i}`).style.bottom = "12px";
			document.getElementById(`tag${i}`).style.right = "12px";
		}
		document.getElementById("view").innerHTML = "Expand"
	}
	else {
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.display = "block";
		}
		for (var i = 0; i < data.length; i++) {
			document.getElementById(`card${i}`).style.padding = "24px";
			document.getElementById(`card${i}`).style.width = "calc(var(--width) - 96px)";
			document.getElementById(`tag${i}`).style.bottom = "24px";
			document.getElementById(`tag${i}`).style.right = "24px";
		}
		document.getElementById("view").innerHTML = "Collapse"

	}
	details = !details;
}

function expand(id) {
	if (!details && !exclude.includes(id)) {
		var div = document.getElementById(`card${id}`);
		var els = div.getElementsByTagName("*");
		for (var i = 0; i < els.length; i++) {
			els[i].style.display = "block";
		}
		var links = div.getElementsByTagName("a");
		for (var i = 0; i < links.length; i++) {
			links[i].style.display = "inline";
		}
	}
}

function shrink(id) {
	if (!details && !exclude.includes(id)) {
		var div = document.getElementById(`card${id}`);
		var els = div.getElementsByClassName("hide");
		for (var i = 0; i < els.length; i++) {
			els[i].style.display = "none";
		}
	}
}

function removeItem(array, item){
    for(var i in array){
        if(array[i]==item){
            array.splice(i,1);
            break;
        }
    }
}

function toggle(id) {
	if (!details) {
		if (exclude.includes(id)) {
			removeItem(exclude, id);
		}
		else {
			exclude.push(id);
		}
	}
	else {
		if (document.getElementById(`tag${id}`).style.display == "none") {
			var div = document.getElementById(`card${id}`);
			var els = div.getElementsByTagName("*");
			for (var i = 0; i < els.length; i++) {
				els[i].style.display = "block";
			}
			var links = div.getElementsByTagName("a");
			for (var i = 0; i < links.length; i++) {
				links[i].style.display = "inline";
			}
		}
		else {
			var div = document.getElementById(`card${id}`);
			var els = div.getElementsByClassName("hide");
			for (var i = 0; i < els.length; i++) {
				els[i].style.display = "none";
			}
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
			document.getElementById("filterbox").style.backgroundColor = "#222";
			document.getElementById("details").style.backgroundColor = "#222";
			document.getElementById("title").style.backgroundColor = "#000";
			document.getElementById(`dot${i}`).style.backgroundColor = "#EEE";
			document.getElementById(`line${i}a`).style.backgroundColor = "#EEE";
			document.getElementById(`line${i}b`).style.backgroundColor = "#EEE";
			// document.getElementById(`img${i}`).src = `${data[i]["image_dark"]}`;
			document.querySelector("meta[name=theme-color]").setAttribute("content", "#000000");
		}
	}
	else if (dark == "light") {
		document.getElementById("mode").innerHTML = "Dark Mode";
		for (var i = 0; i < data.length; i++) {
			document.getElementById(`card${i}`).style.backgroundColor = "#EEE";
			document.getElementById("filterbox").style.backgroundColor = "#EEE";
			document.getElementById("details").style.backgroundColor = "#EEE";
			document.getElementById("title").style.backgroundColor = "#FFF";
			document.getElementById(`dot${i}`).style.backgroundColor = "#222";
			document.getElementById(`line${i}a`).style.backgroundColor = "#222";
			document.getElementById(`line${i}b`).style.backgroundColor = "#222";
			// document.getElementById(`img${i}`).src = `${data[i]["image_light"]}`;
			document.querySelector("meta[name=theme-color]").setAttribute("content", "#FFFFFF");
		}
	}
	document.body.classList.toggle("darkmode");
	document.body.classList.toggle("lightmode");

}

function load() {
	json();
	if (dark == "dark") {
		document.body.classList.toggle("darkmode");
		document.getElementById("mode").innerHTML = "Light Mode";
		for (var i = 0; i < data.length; i++) {
			document.getElementById(`card${i}`).style.backgroundColor = "#222";
			document.getElementById("filterbox").style.backgroundColor = "#222";
			document.getElementById("title").style.backgroundColor = "#000";
			document.getElementById("details").style.backgroundColor = "#222";
			document.getElementById(`dot${i}`).style.backgroundColor = "#EEE";
			document.getElementById(`line${i}a`).style.backgroundColor = "#EEE";
			document.getElementById(`line${i}b`).style.backgroundColor = "#EEE";
			// document.getElementById(`img${i}`).src = `${data[i]["image_dark"]}`;
			document.querySelector("meta[name=theme-color]").setAttribute("content", "#000000");
		}
	}
	else if (dark == "light") {
		document.body.classList.toggle("lightmode");
		document.getElementById("mode").innerHTML = "Dark Mode";
		for (var i = 0; i < data.length; i++) {
			document.getElementById(`card${i}`).style.backgroundColor = "#EEE";
			document.getElementById("filterbox").style.backgroundColor = "#EEE";
			document.getElementById("details").style.backgroundColor = "#EEE";
			document.getElementById("title").style.backgroundColor = "#FFF";
			document.getElementById(`dot${i}`).style.backgroundColor = "#222";
			document.getElementById(`line${i}a`).style.backgroundColor = "#222";
			document.getElementById(`line${i}b`).style.backgroundColor = "#222";
			// document.getElementById(`img${i}`).src = `${data[i]["image_light"]}`;
			document.querySelector("meta[name=theme-color]").setAttribute("content", "#FFFFFF");
		}
	}
	document.getElementById("box_filter").checked = true;
	document.getElementById("box_education").checked = true;
	document.getElementById("box_computer_science").checked = true;
	document.getElementById("box_robotics").checked = true;
	document.getElementById("box_stem").checked = true;
}
