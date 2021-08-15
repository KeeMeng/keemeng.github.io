function start() {
	var text = document.getElementById("input").value;
	var output_text = "";
		for (var i = 0; i < text.length; i++) {
			if (text[i] == text[i].toLowerCase()) {
				output_text += text[i].toUpperCase();
			} else {
				output_text += text[i].toLowerCase();
			}
		}
	document.getElementById("output").innerHTML = output_text;
}
