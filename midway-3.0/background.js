


function authenticateUser(request) {
	console.warn("Authentication is currently unavailable.");
}

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.type === "authUser") {
			authenticateUser(request);
		}
		else {
			console.error(`Invalid request type: 'request.type'`);
		}
	}
);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  }
 );
  
