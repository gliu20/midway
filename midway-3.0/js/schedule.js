var timeTable = {
  "Math"   : [[2],[ ],[1],[2],[4]],
  "Science": [[6],[5],[6],[6,7],[5]],
  "English": [[2],[1],[4],[4],[]],
  "French" : [[ ],[6],[5],[5],[6]],
  "History": [[4],[2],[ ],[2],[1]],
  "Gym"    : [[ ],[ ],[2],[1],[ ]]
}

var patch = [

  {
    "subject":"Free",
    "periodId":1,
    "periodName":"Period 1",
    "periodTime":["8:00","8:51"]
  },
  {
    "subject":"Free",
    "periodId":2,
    "periodName":"Period 2",
    "periodTime":["8:56","9:47"]
  },
  {
    "periodId":3,
    "periodName":"Homeroom",
    "periodTime":["9:52","9:57"]
  },
  {
    "subject":"Please report to auditorium",
    "periodName":"added courses",
    "periodTime":["10:02","10:53"]
  }

];


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
      
  schedule = deepCopy(patch);//we need deep copy
    
  for (var subject in timeTable) {
      
    periods = timeTable[subject][day]
      
    for (var i = 0; i < periods.length; i++) {
          
      // indexByPeriodId[period] is the index that points to the item
      // in patch with periodId of period. since schedule is a copy
      // of patch, the indices are the same
      period = periods[i];
      scheduleIndex = indexByPeriodId[period];
          
      // delete period if period is not part of patch
      if (scheduleIndex !== undefined) {
        schedule[scheduleIndex]["subject"] = subject;
      }
          
    }
  }
      
  return schedule;
}
