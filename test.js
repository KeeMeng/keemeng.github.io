function device() {
	var module = {
		options: [],
		header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
		dataos: [
			{ name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
			{ name: 'Windows', value: 'Win', version: 'NT' },
			{ name: 'iPhone', value: 'iPhone', version: 'OS' },
			{ name: 'iPad', value: 'iPad', version: 'OS' },
			{ name: 'Kindle', value: 'Silk', version: 'Silk' },
			{ name: 'Android', value: 'Android', version: 'Android' },
			{ name: 'PlayBook', value: 'PlayBook', version: 'OS' },
			{ name: 'BlackBerry', value: 'BlackBerry', version: '/' },
			{ name: 'Macintosh', value: 'Mac', version: 'OS X' },
			{ name: 'Linux', value: 'Linux', version: 'rv' },
			{ name: 'Palm', value: 'Palm', version: 'PalmOS' }
		],
		databrowser: [
			{ name: 'Chrome', value: 'Chrome', version: 'Chrome' },
			{ name: 'Firefox', value: 'Firefox', version: 'Firefox' },
			{ name: 'Safari', value: 'Safari', version: 'Version' },
			{ name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
			{ name: 'Opera', value: 'Opera', version: 'Opera' },
			{ name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
			{ name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
		],
		init: function () {
			var agent = this.header.join(' '),
				os = this.matchItem(agent, this.dataos),
				browser = this.matchItem(agent, this.databrowser);
			
			return { os: os, browser: browser };
		},
		matchItem: function (string, data) {
			var i = 0,
				j = 0,
				html = '',
				regex,
				regexv,
				match,
				matches,
				version;
			
			for (i = 0; i < data.length; i += 1) {
				regex = new RegExp(data[i].value, 'i');
				match = regex.test(string);
				if (match) {
					regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
					matches = string.match(regexv);
					version = '';
					if (matches) { if (matches[1]) { matches = matches[1]; } }
					if (matches) {
						matches = matches.split(/[._]+/);
						for (j = 0; j < matches.length; j += 1) {
							if (j === 0) {
								version += matches[j] + '.';
							} else {
								version += matches[j];
							}
						}
					} else {
						version = '0';
					}
					return {
						name: data[i].name,
						version: parseFloat(version)
					};
				}
			}
			return { name: 'unknown', version: 0 };
		}
	};
	
	var e = module.init(), debug = '';
	
	debug += 'os.name: ' + e.os.name + '\n';
	debug += 'os.version: ' + e.os.version + '\n';
	debug += 'browser.name: ' + e.browser.name + '\n';
	debug += 'browser.version: ' + e.browser.version + '\n';
	
	debug += '\n';
	debug += 'navigator.platform: ' + navigator.platform + '\n';
	debug += 'navigator.vendor: ' + navigator.vendor + '\n';
	debug += 'navigator.language: ' + navigator.language + '\n';
	debug += 'navigator.appCodeName: ' + navigator.appCodeName + '\n';
	debug += 'navigator.appName: ' + navigator.appName + '\n';
	debug += 'navigator.userAgent: ' + navigator.userAgent + '\n';
	debug += 'navigator.appVersion: ' + navigator.appVersion + '\n';
	debug += 'navigator.product: ' + navigator.product + '\n';

	debug += '\n';
	debug += 'screen.height: ' + screen.height + '\n';
	debug += 'screen.width: ' + screen.width + '\n';
	debug += 'screen.availHeight: ' + screen.availHeight + '\n';
	debug += 'screen.availWidth: ' + screen.availWidth + '\n';
	debug += 'window.innerHeight: ' + window.innerHeight + '\n';
	debug += 'window.innerWidth: ' + window.innerWidth + '\n';
	debug += 'screen.pixelDepth: ' + screen.pixelDepth + '\n';
	debug += 'screen.colorDepth: ' + screen.colorDepth + '\n';
	// debug += 'screen.orientation: ' + screen.orientation + '\n';

	if (matchMedia('(pointer:fine)').matches) {
	  debug += 'pointer: yes\n';
	}
	else {
		debug += 'pointer: no\n';
	}

	// document.getElementById('log').innerHTML = debug;
	return debug
};

var ip_address = "";
fetch("https://api.ipify.org")
.then(response => response.text())
.then((response) => {
	ip_address = response;
	if (ip_address == "221.127.45.3") {
		// device_info = "User: Kee Meng\n\n";
		// send_message();
	}
	else {
		send_message();
	}
})

function send_message() {
	var device_info = "";
	var request = new XMLHttpRequest();
	request.open("POST", "https://discord.com/api/webhooks/831949766698467338/U644U1woudzGB2s5bpaHIj_OYSyfTc8ENa9MAutiD1yD0mNUDz2kF_VnPAjCjiHB1z9n");

	request.setRequestHeader('Content-type', 'application/json');


	device_info += `ip address: ${ip_address}\n`;
	var timenow = new Date();
	device_info += `time received: ${timenow}\n\n`
	device_info += device();

	var info = [
		{
			title: "Info",
			description: `${device_info}`,
			// color: hexToDecimal("#ff0000")
		},
	]

	var params = {
		username: "Hello World",
		embeds: info
	}

	request.send(JSON.stringify(params));

}

function send_message2(string, link, details=false) {
	var device_info = "";
	var request = new XMLHttpRequest();
	request.open("POST", "https://discord.com/api/webhooks/831949766698467338/U644U1woudzGB2s5bpaHIj_OYSyfTc8ENa9MAutiD1yD0mNUDz2kF_VnPAjCjiHB1z9n", false);

	request.setRequestHeader('Content-type', 'application/json');

	device_info += `ip address: ${ip_address}\n`;
	if (details) {
		var timenow = new Date();
		device_info += `time received: ${timenow}\n\n`
		device_info += device();
	}

	var info = [
		{
			title: `Click: ${string}`,
			description: `${device_info}`
		}
	]

	var params = {
		username: "Hello World",
		embeds: info
	}
	if (ip_address != "221.127.45.3") {
		request.send(JSON.stringify(params));
	}

	// setTimeout(function(){window.location.href = link;},300);
	window.location.href = link;

}

function send_message2(string, link, details=false) {}