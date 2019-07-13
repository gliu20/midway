let updateThread;
















function indexBy(arr,name) {
  var index = {};
   
  for (var i = 0; i < arr.length; i++) {
      
    // check to make sure that index propeties are valid; if invalid,
    // exclude from the index
    if (arr[i][name] !== undefined) {
      // arr[i][name] is the term used to search for index
      // i is the index of where to find the item in the array whose property,
      // name, is equal to arr[i][name]
      index[arr[i][name]] = i;
    }
  }
  
  return index;
}

function deepCopy(o) {//from outside sources
   var output, v, key;
   output = Array.isArray(o) ? [] : {};
   for (key in o) {
       v = o[key];
       output[key] = (typeof v === "object") ? deepCopy(v) : v;
   }
   return output;
}

function getNthDaySchedule (timeTable,patch,day) {
  
  var indexByPeriodId = indexBy(patch,"periodId");
      
  var period;
  var periods;
  var scheduleIndex;
  var finalSchedule = [];
      
  schedule = deepCopy(patch);//we need deep copy
  
  for (var subject in timeTable) {
      
    periods = timeTable[subject][day]
      
    for (var i = 0; i < periods.length; i++) {
          
      // indexByPeriodId[period] is the index that points to the item
      // in patch with periodId of period. since schedule is a copy
      // of patch, the indices are the same
      period = periods[i];
      scheduleIndex = indexByPeriodId[period];
      
      // give period subject name
      if (scheduleIndex !== undefined) {
        schedule[scheduleIndex]["subject"] = subject;
      }
          
    }
  }
  
      
  return schedule;
}


function findCurrentPeriod (schedule) {
	const currMins = currTimeInMins();
	
	for (var i = 0; i < schedule.length; i++) {
		if (timeToMins(schedule[i].periodTime[1]) >= currMins && timeToMins(schedule[0].periodTime[0]) <= currMins) {
			break;
		}
	}
	
	return schedule[i] || {};
	
}

function currTimeInMins () {
	const date = new Date();
	var isPM = "";
	
	if (date.getHours() >= 12) {
		isPM = "pm";
	}
	
	return timeToMins(date.getHours() + ":" + date.getMinutes() + isPM);
}

function timeToMins (time) {
	const isPM = time.toLowerCase().indexOf("pm") !== -1;
	
	time = time.match(/(\d+)(?:\s*):(?:\s*)(\d+)/) || ["0","0"];
	
	time[1] = Number(time[1]) % 12;
	time[2] = Number(time[2]);
	
	if (isPM) {
		time[1] += 12;
	}
	
	return time[1] * 60 + time[2];
}


function calcClockOffset () {
    
    var date = new Date();
    var seconds = date.getSeconds();
    var millis = date.getMilliseconds();
      
    millis += seconds * 1000;
      
    return 60000 - millis;
      
};

function addTimeBox () {

	
	var e = document.createElement("div");
	e.style.display = "none";
	e.style.position = "fixed";
	e.style.zIndex = "999999999999999";
	e.style.bottom = "0";
	e.style.left = "0";
	e.id = "midway-timebox";
	e.innerHTML = `<style>
#midway-override-all-styles {
	all:initial;
}
#midway-override-all-styles * {
	all:initial;
}
#midway-override-all-styles.midway {
	user-select:none;
	display:flex;
	align-items:center;
	padding:15px;
	background:#0f5bff;
	color:#fff;
	font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	font-size:16px;
	transition: all 0.3s ease;
	opacity: 0.7;
	border-radius:4px;
	box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
}

#midway-override-all-styles.midway * {
	color:#fff;
	font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#midway-override-all-styles.midway:hover {
	opacity: 1;
    box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
}
#midway-override-all-styles .midway-primary * {margin:0;white-space: nowrap;}
#midway-override-all-styles .midway-line-1 {
	display:block;
	font-size:24px;
	line-height:1.15;
	font-weight:700;
}
#midway-override-all-styles .midway-line-2 {
	display:block;
	font-size:12px;
	line-height:1.15;
	font-weight:500;
}
#midway-override-all-styles .midway-line-3 {
	display:block;
	font-size:12px;
	line-height:1.15;
	font-weight:normal;
}

#midway-override-all-styles .midway-close {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABAUlEQVR42u2YsQ3CMBAAKSgZICOwEWVKCgqLCRggBWIOxmAIRmCMxwiQrAhCkv/C/9xJbi3fJbLyWSwAAAAAAAAAAABAi4g0ebWG++3yWnmSv8qTZLDf8bXXpfoIPXnRRijkxUWEfLhOPpMM5N9sag6wzOusjTAgnzzcAaoIruW1EULIz40QSn5qhJDyYyOElh8ZIbb8jAjx5CdEiCtfRDj9bYCBCy9+hJHyMSMMyO8tZgev8slygHIpbz1FupQPGWHu522ICNpve9cR8gEPFgf/EaGtOcA6r5vFU/sS4fHDtan9LSgjJOVeZYT65XsRtoYDVOdGHgAAAAAAAAAAoG7uX3K+/0BRgn0AAAAASUVORK5CYII=);
    background-size: 32px;
    margin: 8px;
    margin-right: 0;
    height: 32px;
    width: 32px;
    border: none;
    border-radius: 999px;
    background-color: rgba(0,0,0,0);
    color: #fff;
}
#midway-override-all-styles .midway-close:focus {	
    outline: 0;
}
#midway-override-all-styles .midway-close:hover {
    background-color: rgba(0,0,0,0.08);
    color: rgb(225,225,225);
}
#midway-override-all-styles .midway-close:active {
    background-color: rgba(0,0,0,0.16);
    color: rgb(200,200,200);
}
</style>

<div class="midway" id="midway-override-all-styles">
	<div class="midway-primary">
		<h1 class="midway-line-1" id="midway-line-1">Loading...</h1>
		<h2 class="midway-line-2" id="midway-line-2"></h2>
		<p class="midway-line-3" id="midway-line-3"></p>
	</div>
	<div class="midway-secondary">
		<button class="midway-close"></button>
	</div>
</div>
`;
	document.body.appendChild(e);
}


function hideTimeBox () {
	document.getElementById("midway-timebox").style.display = "none";
}

function showTimeBox() {
	document.getElementById("midway-timebox").style.display = "";
}

function displayTimeBox (periodObj) {

	if (!periodObj.periodName) {
		hideTimeBox();
		return;
	}
	
	const subject = periodObj.subject || "";
	const periodName = periodObj.periodName || "No ongoing periods currently";
	const periodTime = (periodObj.periodTime || ["0:00","0:00"]).slice(0);
	
	
	minsLeft = timeToMins(periodTime[1]) - currTimeInMins();
	
	if (minsLeft < 0) {minsLeft = ""}
	else {minsLeft += " mins left";minsLeft = ", " + minsLeft;}
	
	periodTime[0] = periodTime[0].replace(/[^\d:]+/,"");
	periodTime[1] = periodTime[1].replace(/[^\d:]+/,"");
	
	document.getElementById("midway-line-1").innerText = `${periodTime[0]} - ${periodTime[1]}`;
	document.getElementById("midway-line-2").innerText = `${periodName}${minsLeft}`;
	document.getElementById("midway-line-3").innerText = `${subject}`;
}

function makeDraggable (ele) {
	let prevX = 0;
	let prevY = 0;
	
	ele.style.position = "fixed";
	
	
	ele.onmousedown = function (e) {
		prevX = e.clientX;
		prevY = e.clientY;
		
		document.addEventListener('mousemove', whileMouseDown, false);
	};
	
	document.addEventListener("mouseup", function () {
		document.removeEventListener('mousemove', whileMouseDown, false);
	})
	
	function whileMouseDown (e) {
		
		ele.style.top = e.clientY - prevY + ele.offsetTop + "px";
		ele.style.left = e.clientX - prevX + ele.offsetLeft + "px";
		
		chrome.runtime.sendMessage({
			type:"cs-heresMyPos",
			x: ele.style.left,
			y: ele.style.top
		})
		
		prevX = e.clientX;
		prevY = e.clientY;
	}
	
	
}

function makeHideable () {
	document.getElementById("midway-timebox").querySelector(".midway-close").addEventListener("click",function () {
		hideTimeBox();
		chrome.runtime.sendMessage({
			type:"cs-plzHideTimeBox"
		})
		
	});
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "cs-returnSchedule") {
		if (request.userSchedule && request.patch) {
			const schedule = getNthDaySchedule(
				JSON.parse(request.userSchedule),
				request.patch.patch,
				request.patch.variant
			);
			
			clearInterval(updateThread);
			updateThread = setInterval(function () {
				const currPeriod = findCurrentPeriod(
					schedule
				);
				displayTimeBox(currPeriod)
			},1000);
		}
		else if (request.patch) {
			clearInterval(updateThread);
			updateThread = setInterval(function () {
				const currPeriod = findCurrentPeriod(
					request.patch.patch
				);
				displayTimeBox(currPeriod)
			},1000);
		}
		else {
			hideTimeBox();
		}
	}
	else if (request.type === "cs-updatePosition") {
		
		document.getElementById("midway-timebox").style.bottom = "";
		document.getElementById("midway-timebox").style.top = request.y;
		document.getElementById("midway-timebox").style.left = request.x;
	}
	else if (request.type === "cs-hideTimeBox") {
		hideTimeBox();
	}
	else if (request.type === "cs-showTimeBox") {
		showTimeBox();
	}
});


chrome.runtime.sendMessage({
	type:"cs-plzTellMePos"
});

chrome.runtime.sendMessage({
	type:"getSchoolCodeIfNecessary"
});

chrome.runtime.sendMessage({
	type:"cs-getSchedule",
	date: new Date()
});

addTimeBox();
makeDraggable(document.getElementById("midway-timebox"));
makeHideable();
