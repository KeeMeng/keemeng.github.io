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
	return debug
};

var ip_address = "";
fetch("https://api.ipify.org")
.then(response => response.text())
.then((response) => {
	ip_address = response;
	if (ip_address == "221.127.45.3" || ip_address == "223.18.122.33") {
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
	request.open("POST", "https://3e86042ccfb699208ee3460e8c255e43.m.pipedream.net");
	request.setRequestHeader('Content-type', 'text/plain');

	device_info += `ip address: ${ip_address}\nLink: ${window.location.href}\n`;
	var timenow = new Date();
	device_info += `time received: ${timenow}\n\n`
	device_info += device();
	request.send(device_info);

}

function send_message2(string, link) {
	$("#wrapper").fadeTo(750, 0)
	var device_info = "";
	var request = new XMLHttpRequest();
	request.open("POST", "https://3e86042ccfb699208ee3460e8c255e43.m.pipedream.net");
	request.setRequestHeader('Content-type', 'text/plain');

	device_info += `ip address: ${ip_address}\nLink: ${window.location.href}\nClicked: ${link}\n`;
	var timenow = new Date();
	device_info += `time received: ${timenow}\n\n`
	device_info += device();

	if (ip_address != "221.127.45.3" && ip_address != "223.18.122.33") {
		request.send(device_info);
	}
	setTimeout(function(){window.location.href = link;},1250);
	// window.location.href = link;

}