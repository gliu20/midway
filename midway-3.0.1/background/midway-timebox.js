let timebox = {};

timebox.x = "0px";
timebox.y = "0px";

timebox.isVisible = true;

timebox.sendMessageToAll = function (mesgObj) {
	chrome.tabs.query({}, function(tabs) {
		for (var tab of tabs) {
  			chrome.tabs.sendMessage(tab.id, mesgObj);
		}
	});
}

timebox.updatePosition = function (x,y) {
	timebox.sendMessageToAll({ type: "toContentScript-updatePosition",x,y });
}

timebox.show = function () {
	timebox.sendMessageToAll({ type: "toContentScript-showTimebox" });
}

timebox.hide = function () {
	timebox.sendMessageToAll({ type: "toContentScript-hideTimebox" });
}

timebox.display = function (line1,line2,line3) {
	timebox.sendMessageToAll({
		type: "toContentScript-displayCurrentPeriodInfo",
		line1,line2,line3
	});
}

timebox.updateDisplay = async function () {
	
	var scheduleObj = await midway.rest.getSchedule() || {patch:[]};
	var currPeriod;
	var currPeriodMinsUntil;
	var currPeriodMinsLeft;
	
	scheduleObj = scheduleObj.patch;
	
	currPeriod = schedule.findCurrentPeriod(scheduleObj)
	
	if (currPeriod) {
		currPeriodMinsUntil = schedule.timeToMins(
			currPeriod.periodTime[0]) - schedule.currTimeInMins();
			
		currPeriodMinsLeft = schedule.timeToMins(
			currPeriod.periodTime[1]) - schedule.currTimeInMins();
			
		if (currPeriodMinsUntil > 0) {
			currPeriod.minsLeft = currPeriodMinsUntil + " mins until start";
		}
		else {
			currPeriod.minsLeft = currPeriodMinsLeft + " mins left";
		}
		
		// make sure timebox is visible if it should be
		if (timebox.isVisible) {
			timebox.show();
		}
		
		timebox.display(
			currPeriod.periodTime.join(" - "),
			(currPeriod.periodName || "") + ", " + currPeriod.minsLeft
		);
	}
	else {
		timebox.hide();
	}
}

// how timebox comm works
// 1. new timebox made
// 2. asks what is my position and visibility
// 3. bg returns position and visibility
// 4. timebox gets moved telling bg its position and visibility
// 5. bg broadcasts movement of timebox and visibility

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.type === "toBackground-storePosition") {
			timebox.x = request.x;
			timebox.y = request.y;
			
			timebox.updatePosition(request.x,request.y);
		}
		else if (request.type === "toBackground-returnPosition") {
			timebox.updatePosition(timebox.x,timebox.y);
			
			if (timebox.isVisible) {
				timebox.show();
			}
			else {
				timebox.hide();
			}
		}
		else if (request.type === "toBackground-returnCurrentPeriodInfo") {
			timebox.updateDisplay();
		}
		else if (request.type === "toBackground-hideTimebox") {
			timebox.hide();
			timebox.isVisible = false;
		}
		else if (request.type === "toBackground-showTimebox") {
			timebox.show();
			timebox.isVisible = true;
		}
		else if (request.type === "toBackground-toggleTimebox") {
			timebox.isVisible = !timebox.isVisible;
			
			if (timebox.isVisible) {
				timebox.show();
			}
			else {
				timebox.hide();
			}
		}
		else if (request.type === "toBackground-resetPosition") {
			timebox.updatePosition(timebox.x = "0px",timebox.y = "0px");
		}
	}
);

// offset the clock so it runs perfectly each minute
setTimeout(function () {
	timebox.updateDisplay()
	setInterval(function () {
		timebox.updateDisplay()
	}, 60000)
},schedule.nextMinute() - Date.now() + 20)
