/*var timeTable = {
  "Gym"   : [[2],[ ],[1],[2],[1]],
  "French"   : [[2],[ ],[1],[2],[2]],
  "History"   : [[2],[ ],[1],[2],[3]],
  "Math"   : [[2],[ ],[1],[2],[4]],
  "Physics"   : [[2],[ ],[1],[2],["5ec"]],
  "Lunch": [[2],[ ],[1],[2],["5ll"]],
  "English"   : [[2],[ ],[1],[2],[6]],
  "Sci Re"   : [[2],[ ],[1],[2],[7]],
}

var patch = [

  {
    "periodId":1,
    "periodName":"Period 1",
    "periodTime":["8:00","8:51"]
  },
  {
    "periodId":2,
    "periodName":"Period 2",
    "periodTime":["8:56","9:47"]
  },
  {
    "periodName":"Homeroom",
    "periodTime":["9:52","9:57"]
  },
  {
    "periodId":3,
    "periodName":"Period 3",
    "periodTime":["10:02","10:53"]
  },
  {
    "periodId":4,
    "periodName":"Period 4",
    "periodTime":["10:58","11:49"]
  },
  {
    "periodId":5,
    "periodName":"Period 5: Early Lunch",
    "periodTime":["11:53","12:19pm"]
  },
  {
    "periodId":"5ec",
    "periodName":"Period 5: Early Class",
    "periodTime":["11:53","12:44pm"]
  },
  {
    "periodId":"5ll",
    "periodName":"Period 5: Late Lunch",
    "periodTime":["12:48pm","1:14pm"]
  },
  {
    "periodId":5,
    "periodName":"Period 5: Late Class",
    "periodTime":["12:23pm","1:14pm"]
  },
  {
    "periodId":6,
    "periodName":"Period 6",
    "periodTime":["1:18pm","2:09pm"]
  },
  {
    "periodId":7,
    "periodName":"Period 7",
    "periodTime":["2:14pm","3:05pm"]
  }

];

  {
    "subject":"Please report to auditorium",
    "periodName":"added courses",
    "periodTime":["10:02","10:53"]
  },
  {
    "subject":"Afterschool fun",
    "periodName":"added courses",
    "periodTime":["17:10","17:53"]
  },
  {
    "subject":"Please report to auditorium",
    "periodName":"added courses",
    "periodTime":["17:59","18:53"]
  },
*/


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
		console.log()
		if (timeToMins(schedule[i].periodTime[1]) >= currMins && timeToMins(schedule[0].periodTime[0]) <= currMins) {
			break;
		}
	}
	
	console.log(i);
	
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

function shortHand (periodName) {
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
