let x = "",
	y = "";
let willShowTimebox = false;

function updatePosition (x,y) {
	chrome.tabs.query({}, function(tabs) {
		for (var tab of tabs) {
  			chrome.tabs.sendMessage(tab.id, {
				type: "cs-updatePosition",
				x,
				y
			});
		}
	});
}

function hideTimeBox () {
	chrome.tabs.query({}, function(tabs) {
		for (var tab of tabs) {
  			chrome.tabs.sendMessage(tab.id, {
				type: "cs-hideTimeBox"
			});
		}
	});
}

function showTimeBox () {
	chrome.tabs.query({}, function(tabs) {
		for (var tab of tabs) {
  			chrome.tabs.sendMessage(tab.id, {
				type: "cs-showTimeBox"
			});
		}
	});
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.type === "cs-heresMyPos") {
			x = request.x;
			y = request.y;
			updatePosition(request.x,request.y);
		}
		else if (request.type === "cs-plzHideTimeBox") {
			hideTimeBox();
			willShowTimebox = false;
		}
		else if (request.type === "cs-plzTellMePos") {
			updatePosition(x,y);
			
			if (willShowTimebox) {
				showTimeBox();
			}
			else {
				hideTimeBox();
			}
		}
		else if (request.type === "cs-plzShowTimeBox") {
			showTimeBox();
			willShowTimebox = true;
		}
		else if (request.type === "cs-plzToggleTimeBox") {
			willShowTimebox = !willShowTimebox;
			
			if (willShowTimebox) {
				showTimeBox();
			}
			else {
				hideTimeBox();
			}
		}
		else if (request.type === "cs-plzRePositionTimeBox") {
			updatePosition(x = "0px",y = "0px");
		}
	}
);


	

