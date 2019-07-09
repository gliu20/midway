
function authenticateSchoolCode (schoolCode) {
	console.log(`Authenticate school code: ${schoolCode}`);
	chrome.runtime.sendMessage({
		type: "authSchoolCode",
		schoolCode: schoolCode
	}, function(response) {
  		console.log(`Attempt auth with school code. Received response: ${response}`);
	});
}

function checkForSchoolCode () {
	
}
