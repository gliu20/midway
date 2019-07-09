// basically check public ip address
// schools force install extension... if ip address
// is the ip with which the target user connects, then the extension
// will display information for the school with the corresponding ip

function getIp (callback) {
	var ipAddressLookups = "https://api.ipify.org?format=json"
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			callback(JSON.parse(this.responseText)["ip"]);
		}
	};
	
	xhttp.open("GET", ipAddressLookups, true);
	xhttp.send();
}