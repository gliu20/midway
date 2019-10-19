let isFirstInstall = false;
chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason === "install" || details.reason === "update") {
		isFirstInstall = true;
	}
})


firebase.auth().onAuthStateChanged(function(user) {
	checkAuthStatus();
	if (!user && isFirstInstall) {
		chrome.tabs.create({
			url:"../login.html"
		})
	}
});
