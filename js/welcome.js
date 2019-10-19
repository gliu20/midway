// redirect to welcome page
if (window.location.hash === "") {
	var redirect = document.createElement("a");
	
	redirect.href = "#welcome";
	
	document.body.appendChild(redirect);
	redirect.click();
}


chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.type === "toPopup-invalidSchoolCode") {
			if (!request.hasSchoolCode || !request.isSignedIn) {
				// redirect to login page b/c either or both schoolCode
				// or account not available
				var redirect = document.createElement("a");
	
				redirect.href = "login.html";
	
				document.body.appendChild(redirect);
				redirect.click();
			}
		}
		else if (request.type === "toPopup-returnAuthStatus") {
			

			if (!request.hasSchoolCode || !request.isSignedIn) {
				// redirect to login page b/c either or both schoolCode
				// or account not available
				var redirect = document.createElement("a");
	
				redirect.href = "login.html";
	
				document.body.appendChild(redirect);
				redirect.click();
			}
		}
	}
);

chrome.runtime.sendMessage({ type: "toBackground-checkAuthStatus" })
