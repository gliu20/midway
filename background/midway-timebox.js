let timebox = {};

timebox.x = localStorage.getItem('timebox-xpos') || "0px";
timebox.y = localStorage.getItem('timebox-ypos') || "0px";

timebox.type = localStorage.getItem('timebox-type') || "minsleft";
timebox.shouldConstrain = (localStorage.getItem('timebox-shouldConstrain') || "true") === "true";
timebox.shouldShimmer = (localStorage.getItem('timebox-shouldShimmer') || "true") === "true";
timebox.isVisible = true;

timebox.sendMessageToAll = function (mesgObj) {
	chrome.tabs.query({}, function(tabs) {
		for (var tab of tabs) {
  			chrome.tabs.sendMessage(tab.id, mesgObj);
		}
	});
}

timebox.updateConstrain = function () {
	timebox.sendMessageToAll({ type: "toContentScript-updateConstrain",
		shouldConstrain:timebox.shouldConstrain
	});
}

timebox.updatePosition = function (x,y) {
	timebox.sendMessageToAll({ type: "toContentScript-updatePosition",x,y });
	
	localStorage.setItem('timebox-xpos',x);
	localStorage.setItem('timebox-ypos',y);
}

timebox.show = function () {
	timebox.shimmerIfShould();
	timebox.sendMessageToAll({ type: "toContentScript-showTimebox" });
}

timebox.hide = function () {
	timebox.sendMessageToAll({ type: "toContentScript-hideTimebox" });
}

timebox.shimmerIfShould = function () {
	timebox.sendMessageToAll({ type:"toContentScript-updateShimmer", shimmer:timebox.shouldShimmer });
}



timebox.display = function (line1,line2,line3) {
	timebox.sendMessageToAll({
		type: "toContentScript-displayCurrentPeriodInfo",
		line1,line2,line3
	});
}

timebox.displayFormat = function (currPeriod) {
	var type = timebox.type;
	if (type === "minsleft") {
		timebox.display(
			currPeriod.minsLeft,
			(currPeriod.periodName || "") + ", " + currPeriod.periodTime.join(" - ")
		);
	}
	else if (type === "compact") {
		timebox.display(
			currPeriod.minsLeft.replace(/( |)(mins|min)/g,"m").replace(/until/g,"till"),
			(currPeriod.periodShortHand || "") + ", " + currPeriod.periodTime.join("-")
		);
	}
	else {
		// default
		timebox.display(
			currPeriod.periodTime.join(" - "),
			(currPeriod.periodName || "") + ", " + currPeriod.minsLeft
		);
	}
	
} 

timebox.updateDisplay = async function () {
	
	var scheduleObj = await midway.rest.getSchedule() || {patch:[]};
	var currPeriod;
	var currPeriodMinsUntil;
	var currPeriodMinsLeft;
	
	scheduleObj = scheduleObj.patch || [];
			
	scheduleObj.sort(schedule.sortBy("periodStartTime"));
	scheduleObj.sort(schedule.sortBy("periodEndTime"));
			
	scheduleObj.forEach(function (item) {
		item.periodShortHand = schedule.shortHand(item.periodName);
	});
	
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
		
		timebox.displayFormat(currPeriod)
		
		chrome.runtime.sendMessage({ type: "toPopup-enableTimebox" })
	}
	else {
		timebox.hide();
		chrome.runtime.sendMessage({ type: "toPopup-disableTimebox" })
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
			timebox.updateConstrain()
			
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
		else if (request.type === "toBackground-returnConstrain") {
			timebox.updateConstrain();
		}
		else if (request.type === "toBackground-returnShimmer") {
			chrome.runtime.sendMessage({ type:"toSettings-returnShimmer", 
				shimmer: timebox.shouldShimmer
			})
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
		else if (request.type === "toBackground-doConstrainPos") {
			timebox.shouldConstrain = true;
			localStorage.setItem('timebox-shouldConstrain',timebox.shouldConstrain);
			timebox.updateConstrain();
		}
		else if (request.type === "toBackground-dontConstrainPos") {
			timebox.shouldConstrain = false;
			localStorage.setItem('timebox-shouldConstrain',timebox.shouldConstrain);
			timebox.updateConstrain();
		}
		else if (request.type === "toBackground-enableShimmer") {
			timebox.shouldShimmer = true;
			localStorage.setItem('timebox-shouldShimmer',timebox.shouldShimmer);
			timebox.shimmerIfShould();
			
			chrome.runtime.sendMessage({ type:"toSettings-returnShimmer", 
				shimmer: timebox.shouldShimmer
			})
		}
		else if (request.type === "toBackground-disableShimmer") {
			timebox.shouldShimmer = false;
			localStorage.setItem('timebox-shouldShimmer',timebox.shouldShimmer);
			timebox.shimmerIfShould();
			
			
			chrome.runtime.sendMessage({ type:"toSettings-returnShimmer", 
				shimmer: timebox.shouldShimmer
			})
		}
		else if (request.type === "toBackground-storeTimeboxType") {
			timebox.type = request.format;
			localStorage.setItem('timebox-type',request.format)
			timebox.updateDisplay()
			
			// update settings just in case
			chrome.runtime.sendMessage({ type:"toSettings-returnTimeboxType",
				format:timebox.type 
			})
		}
		else if (request.type === "toBackground-returnTimeboxType") {
			chrome.runtime.sendMessage({ type:"toSettings-returnTimeboxType",
				format:timebox.type 
			})
		}
	}
);


timebox.updateDisplay()
setInterval(function () {
	timebox.updateDisplay()
}, 1000)


// push midway to all tabs (just in case)
chrome.tabs.query( {} ,function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.executeScript(tabs[i].id, {file: "js/content-script.js"});
    }
});
setInterval(function () {
	// push midway to all tabs (just in case)
	chrome.tabs.query( {} ,function (tabs) {
	    for (var i = 0; i < tabs.length; i++) {
	      chrome.tabs.executeScript(tabs[i].id, {file: "js/content-script.js"});
	    }
	});
},5000)
