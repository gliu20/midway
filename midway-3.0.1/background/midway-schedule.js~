// this is just test code
/*var sch = [

{"periodName":"Period 1","periodTime":["8:00","8:50"]},
{"periodName":"Period 2","periodTime":["8:55","9:45"]},
{"periodName":"Common Tutorial","periodTime":["9:50","9:55"]},
{"periodName":"Period 3","periodTime":["10:00","10:50"]},
{"periodName":"Period 4","periodTime":["10:55","11:45"]},
{"periodName":"Period 5 Early Lunch","periodTime":["11:50","12:15pm"]},
{"periodName":"Period 5 Early Class","periodTime":["11:50","12:40pm"]},
{"periodName":"Period 5 Late Class","periodTime":["12:20pm","1:10pm"]},
{"periodName":"Period 5 Late Lunch","periodTime":["12:45pm","1:10pm"]},
{"periodName":"Period 6","periodTime":["1:15pm","2:05pm"]},
{"periodName":"Period 7","periodTime":["2:10pm","3:00pm"]}

];*/
var schedule = {};


////////////////////////////////////////////////////////////////////////////////
// below is code to apply patches. However, this is unnecessary for now
// as user schedules are unsupported
/*
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
}*/
////////////////////////////////////////////////////////////////////////////////



schedule.sortBy = function (sortType) {
	if (sortType === "periodEndTime") {	sortType = 1; }
	else if (sortType === "periodStartTime") { sortType = 0; }
	
	return (a,b) => {
		return schedule.timeToMins(a.periodTime[sortType]) - 
			schedule.timeToMins(b.periodTime[sortType]);
	}
}

schedule.findCurrentPeriod = function (scheduleObj) {
	var currMins = schedule.currTimeInMins();
	var currPeriodEndTime;
	
	// both are necessary; first one is to ensure that if a period ends with
	// the same time, the period with the later start time is checked first
	scheduleObj.sort(schedule.sortBy("periodStartTime"));
	scheduleObj.reverse();
	scheduleObj.sort(schedule.sortBy("periodEndTime"));
	
	// TODO is this loop even necessary? Won't the loop below cover the same
	// cases and more?
	for (var i = 0; i < scheduleObj.length; i++) {
		currPeriodStartTime = schedule.timeToMins(scheduleObj[i].periodTime[0]);
		currPeriodEndTime = schedule.timeToMins(scheduleObj[i].periodTime[1]);

		// check to make sure period hasn't ended yet and has already started
		// or, at the very least, just started
		if (currPeriodEndTime > currMins &&
			currPeriodStartTime <= currMins) {
			return scheduleObj[i];
		}
	}
	
	// by this point, we have gone through the entire schedule; and it seems
	// we were too picky; we are not alerting the user _b/w_ periods;
	// now let's display something between periods
	for (var i = 0; i < scheduleObj.length; i++) {
		currPeriodStartTime = schedule.timeToMins(scheduleObj[i].periodTime[0]);
		currPeriodEndTime = schedule.timeToMins(scheduleObj[i].periodTime[1]);

		// check to make sure period hasn't ended yet
		if (currPeriodEndTime > currMins) {
			return scheduleObj[i];
		}
	}
}

schedule.shortHand = function (periodName) {
	if (periodName.toLowerCase().indexOf("early lunch") !== -1) {
		return "EL";
	}
	else if (periodName.toLowerCase().indexOf("late lunch") !== -1) {
		return "LL";
	}
	else if (periodName.toLowerCase().indexOf("lunch") !== -1) {
		return "L";
	}
	else if (periodName.toLowerCase().indexOf("homeroom") !== -1) {
		return "H";
	}
	else {
		return (periodName.match(/(?:period)\s+(\d+)/i) || ["","&#x2605;"])[1];
	}
}

schedule.currTimeInMins = function () {
	const date = new Date();
	var isPM = "";
	
	if (date.getHours() >= 12) {
		isPM = "pm";
	}
	
	return schedule.timeToMins(
		date.getHours() + ":" + date.getMinutes() + isPM
	);
}

// returns current date snapped to the current time but forward a minute later
schedule.nextMinute = function () {
	return Math.ceil(Date.now() / 60000) * 60000;
}

schedule.timeToMins = function (time) {
	const isPM = time.toLowerCase().indexOf("pm") !== -1;
	
	// TODO fix improper error safing
	time = time.match(/(\d+)(?:\s*):(?:\s*)(\d+)/) || ["0","0"];
	
	time[1] = Number(time[1]) % 12;
	time[2] = Number(time[2]);
	
	if (isPM) {
		time[1] += 12;
	}
	
	return time[1] * 60 + time[2];
}
