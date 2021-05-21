var oauth = "";
var id = "";
var image = "";
var song = "";
var album = "";
var artist = "";
var popularity = "";



function audio_features() {
	var request = new XMLHttpRequest();
	// request.open("GET", `https://api.spotify.com/v1/audio-analysis/${id}`, false);
	request.open("GET", `https://api.spotify.com/v1/audio-features/${id}`, false);
	request.setRequestHeader('Accept', 'application/json');
	request.setRequestHeader('Content-type', 'application/json');
	request.setRequestHeader('Authorization', `Bearer ${oauth}`);
	request.send(null);
	var features = JSON.parse(request.responseText);
	console.log(features);
	// document.getElementById("log").innerHTML = request.responseText;
	// console.log(document.getElementById("log").innerHTML)
	document.getElementById("danceability").innerHTML = features.danceability;
	document.getElementById("energy").innerHTML = features.energy;
	document.getElementById("key").innerHTML = features.key;
	document.getElementById("loudness").innerHTML = features.loudness;
	document.getElementById("speechiness").innerHTML = features.speechiness;
	document.getElementById("acousticness").innerHTML = features.acousticness;
	document.getElementById("instrumentalness").innerHTML = features.instrumentalness;
	document.getElementById("liveness").innerHTML = features.liveness;
	document.getElementById("valence").innerHTML = features.valence;
	document.getElementById("tempo").innerHTML = features.tempo;
	document.getElementById("duration_ms").innerHTML = features.duration_ms;
	document.getElementById("time_signature").innerHTML = features.time_signature;
}


function current_song() {
	var request = new XMLHttpRequest();
	// request.open("GET", `https://api.spotify.com/v1/audio-analysis/${id}`, false);
	request.open("GET", "https://api.spotify.com/v1/me/player/currently-playing/", false);
	request.setRequestHeader('Accept', 'application/json');
	request.setRequestHeader('Content-type', 'application/json');
	request.setRequestHeader('Authorization', `Bearer ${oauth}`);
	request.send(null);
	var response = JSON.parse(request.responseText);
	console.log(response);
	if (id != response.item.id) {
		id = response.item.id;
		image = response.item.album.images[0].url
		song = response.item.name;
		album = response.item.album.name;
		artist = response.item.artists[0].name;
		popularity = response.item.popularity;
		document.getElementById("image").src = image;
		document.getElementById("image").alt = song;
		document.getElementById("image").style.width = "400px";
		document.getElementById("image").style.height = "400px";
		document.getElementById("image").style.borderRadius = "20px";
		document.getElementById("song").innerHTML = song;
		document.getElementById("album").innerHTML = album;
		document.getElementById("artist").innerHTML = artist;
		document.getElementById("popularity").innerHTML = popularity;
		audio_features();
	}
}


function start() {
	if (document.getElementById("oauth_id").value != "" && document.getElementById("oauth_id").value != "2) Paste Oauth Token Here") {
		oauth = document.getElementById("oauth_id").value;
		current_song();
		var repeat = setInterval(current_song, 5000);
		document.getElementById("wrapper1").style.display = "inline-block";
		document.getElementById("wrapper2").style.display = "inline-block";
		document.getElementById("starter").style.display = "none";
	}
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
		$("#light_video").fadeOut(500);
		$("#dark_video").fadeIn(500);
		document.getElementById("wrapper1").style.backgroundColor = "#102344";
		document.getElementById("wrapper2").style.backgroundColor = "#102344";
	}
	else if (dark == "light") {
		document.getElementById("mode").innerHTML = "Dark Mode";
		$("#dark_video").fadeOut(500);
		$("#light_video").fadeIn(500);
		document.getElementById("wrapper1").style.backgroundColor = "#e4f8ff";
		document.getElementById("wrapper2").style.backgroundColor = "#e4f8ff";
	}
	document.body.classList.toggle("darkmode");
	document.body.classList.toggle("lightmode");
}

function load() {
	document.body.style.transitionDuration = "0s";
	document.getElementById("wrapper1").style.transitionDuration = "0s";
	document.getElementById("wrapper2").style.transitionDuration = "0s";
	if (dark == "dark") {
		document.body.classList.toggle("darkmode");
		document.getElementById("mode").innerHTML = "Light Mode";
		$("#light_video").fadeOut(0);
		document.getElementById("wrapper1").style.backgroundColor = "#102344";
		document.getElementById("wrapper2").style.backgroundColor = "#102344";
	}
	else if (dark == "light") {
		document.body.classList.toggle("lightmode");
		document.getElementById("mode").innerHTML = "Dark Mode";
		$("#dark_video").fadeOut(0);
		document.getElementById("wrapper1").style.backgroundColor = "#e4f8ff";
		document.getElementById("wrapper2").style.backgroundColor = "#e4f8ff";
	}
	setTimeout(add_transition,500);
}

function add_transition() {
	document.body.style.transitionDuration = "0.5s";
	document.getElementById("wrapper1").style.transitionDuration = "0.5s";
	document.getElementById("wrapper2").style.transitionDuration = "0.5s";
}