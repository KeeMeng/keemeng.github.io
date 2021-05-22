var oauth = "";
var id = "";
var image = "";
var song = "";
var album = "";
var artist = "";
var popularity = "";


function time(millisececonds) {
	var seconds = (millisececonds / 1000).toFixed(0);
	var minutes = Math.floor(seconds / 60);
	var hours = "";
	if (minutes > 59) {
		hours = Math.floor(minutes / 60);
		hours = (hours >= 10) ? hours : "0" + hours;
		minutes = minutes - (hours * 60);
		minutes = (minutes >= 10) ? minutes : "0" + minutes;
	}

	seconds = Math.floor(seconds % 60);
	seconds = (seconds >= 10) ? seconds : "0" + seconds;
	if (hours != "") {
		return hours + ":" + minutes + ":" + seconds;
	}
	return minutes + ":" + seconds;
}

var pitch_list = ["C","C&#9839;, D&#9837;","D","D&#9839;, E&#9837;","E","F","F&#9839;, G&#9837;","G","G&#9839;, A&#9837;","A","A&#9839;, B&#9837;","B"];
var mode_list = ["Minor", "Major"]

function temponame(tempo) {
	if (tempo >= 0 && tempo <= 24) {
		return "Larghissimo"
	} else if (tempo >= 25 && tempo <= 45) {
		return "Grave"
	} else if (tempo >= 46 && tempo <= 55) {
		return "Largo"
	} else if (tempo >= 56 && tempo <= 67) {
		return "Larghetto"
	} else if (tempo >= 68 && tempo <= 72) {
		return "Adagio"
	} else if (tempo >= 73 && tempo <= 76) {
		return "Adagietto"
	} else if (tempo >= 77 && tempo <= 82) {
		return "Andante"
	} else if (tempo >= 83 && tempo <= 89) {
		return "Marcia moderato"
	} else if (tempo >= 90 && tempo <= 98) {
		return "Andante moderato"
	} else if (tempo >= 99 && tempo <= 102) {
		return "Moderato"
	} else if (tempo >= 103 && tempo <= 110) {
		return "Allegretto"
	} else if (tempo >= 111 && tempo <= 120) {
		return "Allegro Moderato"
	} else if (tempo >= 121 && tempo <= 156) {
		return "Allegro"
	} else if (tempo >= 157 && tempo <= 176) {
		return "Vivace"
	} else if (tempo >= 177 && tempo <= 200) {
		return "Presto"
	} else if (tempo >= 201 && tempo <= 1000) {
		return "Prestissimo"
	} 
}

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
	document.getElementById("acousticness").innerHTML = String((features.acousticness*100).toFixed(0))+"%";
	document.getElementById("danceability").innerHTML = String((features.danceability*100).toFixed(0))+"%";
	document.getElementById("duration_ms").innerHTML = time(features.duration_ms);
	document.getElementById("energy").innerHTML = String((features.energy*100).toFixed(0))+"%";
	document.getElementById("instrumentalness").innerHTML = String((features.instrumentalness*100).toFixed(0))+"%";
	document.getElementById("key").innerHTML = `${pitch_list[features.key]} ${mode_list[features.mode]}`;
	document.getElementById("liveness").innerHTML = String((features.liveness*100).toFixed(0))+"%";
	document.getElementById("loudness").innerHTML = features.loudness + "db";
	document.getElementById("speechiness").innerHTML = String((features.speechiness*100).toFixed(0))+"%";
	document.getElementById("tempo").innerHTML = `${features.tempo.toFixed(0)} (${temponame(features.tempo.toFixed(0))})`;
	document.getElementById("time_signature").innerHTML = features.time_signature;
	document.getElementById("valence").innerHTML = String((features.valence*100).toFixed(0))+"%";
}


function current_song() {
	var request = new XMLHttpRequest();
	request.open("GET", "https://api.spotify.com/v1/me/player/currently-playing/", false);
	request.setRequestHeader('Accept', 'application/json');
	request.setRequestHeader('Content-type', 'application/json');
	request.setRequestHeader('Authorization', `Bearer ${oauth}`);
	request.send(null);
	if (String(request) == "") {
		document.getElementById("error").innerHTML = "Try playing a song on spotify";
		document.getElementById("error").style.display = "block";
	}
	var response = JSON.parse(request.responseText);
	console.log(response);
	// console.log(response.status)
	if (response.status != undefined) {
		document.getElementById("error").innerHTML = response.error.message;
		document.getElementById("error").style.display = "block";
	}
	if (id != response.item.id) {
		id = response.item.id;
		image = response.item.album.images[0].url;
		song = response.item.name;
		album = response.item.album.name;
		track = response.item.track_number;
		artist = response.item.artists[0].name;
		popularity = response.item.popularity;
		document.getElementById("image").src = image;
		document.getElementById("image").alt = song;
		document.getElementById("image").style.width = "400px";
		document.getElementById("image").style.height = "400px";
		document.getElementById("image").style.borderRadius = "20px";
		document.getElementById("song").innerHTML = `${track} - ${song}`;
		document.getElementById("album").innerHTML = album;
		document.getElementById("artist").innerHTML = artist;
		document.getElementById("popularity").innerHTML = popularity+"%";
		audio_features();
	}
}


function start() {
	document.getElementById("error").innerHTML = "";
	document.getElementById("error").style.display = "none";
	if (document.getElementById("oauth_id").value != "" && document.getElementById("oauth_id").value != "2) Paste Oauth Token Here") {
		oauth = document.getElementById("oauth_id").value;
		current_song();
		var repeat = setInterval(current_song, 5000);
		document.getElementById("wrapper1").style.display = "inline-block";
		document.getElementById("wrapper2").style.display = "inline-block";
		// document.getElementById("wrapper3").style.display = "block";
		document.getElementById("starter").style.display = "none";
	}
	else {
		document.getElementById("error").innerHTML = "Make sure to paste the token!";
		document.getElementById("error").style.display = "block";
	}
}

var info = [
["Acousticness","A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic."],
["Danceability","Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable."],
["Duration","Duration of the song in hours : minutes : seconds"],
["Energy","Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy."],
["Instrumentalness","Predicts whether a track contains no vocals. 'Ooh' and 'aah' sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly 'vocal'. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0."],
["Key","The key the track is in. Integers map to pitches using standard Pitch Class notation. Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0."],
["Liveness","Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live."],
["Loudness","The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db."],
["Popularity","The popularity of the track. The value will be between 0.0 and 1.0, with 1.0 being the most popular. The popularity of a track is a value between 0.0 and 1.0, with 1.0 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are. Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. Note that the popularity value may lag actual popularity by a few days: the value is not updated in real time."],
["Speechiness","Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks."],
["Tempo","The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration."],
["Time Signature","An estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure)."],
["Valence","A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."]]

function hover(number) {
	if (number == -1) {
		document.getElementById("wrapper3").style.display = "none";
		// $("#wrapper3").fadeOut(500);
		// document.getElementById("info_title").innerHTML = "";
		// document.getElementById("info").innerHTML = "";
	}
	else {
		document.getElementById("wrapper3").style.display = "block";
		// $("#wrapper3").fadeIn(500);
		document.getElementById("info_title").innerHTML = info[number][0];
		document.getElementById("info").innerHTML = info[number][1];
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

		document.getElementById("wrapper1").style.backgroundColor = "#102344";
		document.getElementById("wrapper2").style.backgroundColor = "#102344";
		document.getElementById("wrapper3").style.backgroundColor = "#102344";
	}
	else if (dark == "light") {
		document.getElementById("mode").innerHTML = "Dark Mode";
		document.getElementById("wrapper1").style.backgroundColor = "#e4f8ff";
		document.getElementById("wrapper2").style.backgroundColor = "#e4f8ff";
		document.getElementById("wrapper3").style.backgroundColor = "#e4f8ff";
	}
	document.body.classList.toggle("darkmode");
	document.body.classList.toggle("lightmode");
}

function load() {
	document.body.style.transitionDuration = "0s";
	document.getElementById("wrapper1").style.transitionDuration = "0s";
	document.getElementById("wrapper2").style.transitionDuration = "0s";
	document.getElementById("wrapper3").style.transitionDuration = "0s";
	if (dark == "dark") {
		document.body.classList.toggle("darkmode");
		document.getElementById("mode").innerHTML = "Light Mode";
		document.getElementById("wrapper1").style.backgroundColor = "#102344";
		document.getElementById("wrapper2").style.backgroundColor = "#102344";
		document.getElementById("wrapper3").style.backgroundColor = "#102344";
	}
	else if (dark == "light") {
		document.body.classList.toggle("lightmode");
		document.getElementById("mode").innerHTML = "Dark Mode";
		document.getElementById("wrapper1").style.backgroundColor = "#e4f8ff";
		document.getElementById("wrapper2").style.backgroundColor = "#e4f8ff";
		document.getElementById("wrapper3").style.backgroundColor = "#e4f8ff";
	}
	setTimeout(add_transition,500);

	const node = document.getElementById("oauth_id");
	node.addEventListener("keyup", function(event) {
		if (event.key === "Enter") {
			start();
		}
	});
}

function add_transition() {
	document.body.style.transitionDuration = "0.5s";
	document.getElementById("wrapper1").style.transitionDuration = "0.5s";
	document.getElementById("wrapper2").style.transitionDuration = "0.5s";
	document.getElementById("wrapper3").style.transitionDuration = "0.5s";
}