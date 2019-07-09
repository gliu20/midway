function authenticateUser(request) {
	console.warn("Authentication is currently unavailable.");
}



chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.type === "authSchoolCode") {
			
		}
		else {
			console.error(`Invalid request type: 'request.type'`);
		}
	}
);
