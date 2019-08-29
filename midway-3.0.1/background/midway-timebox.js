let timebox = {};

timebox.x = "";
timebox.y = "";

timebox.isVisible = false;

timebox.sendMessageToAll = function (mesgObj) {
	chrome.tabs.query({}, function(tabs) {
		for (var tab of tabs) {
  			chrome.tabs.sendMessage(tab.id, mesgObj);
		}
	});
}

timebox.updatePosition = function (x,y) {
	timebox.sendMessageToAll({ type: "updatePosition",x,y });
}

timebox.showTimebox = function () {
	timebox.sendMessageToAll({ type: "showTimebox" });
}

timebox.hideTimebox = function () {
	timebox.sendMessageToAll({ type: "hideTimebox" });
}

// how timebox comm works
// 1. new timebox made
// 2. asks what is my position and visibility
// 3. bg returns position and visibility
// 4. timebox gets moved telling bg its position and visibility
// 5. bg broadcasts movement of timebox and visibility


