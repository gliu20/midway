chrome.runtime.onInstalled.addListener(function(details){
	if (details.reason == "install"){
		chrome.tabs.create({//TODO research exact specs
			url:"../welcome.html#welcome"
        })
	}
	else if (details.reason == "update"){
		//call a function to handle an update
	}
});
