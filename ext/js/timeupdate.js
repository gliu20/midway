function timeUpdate () {
  
  function distNum (a,b) {
    return Math.abs(b - a)
  }
  
  var currTime = new Date();
  var day = currTime.getDay() - 1;
  var hrs = currTime.getHours();
  var min = currTime.getMinutes();
  var minsFromDayStart = hrs * 60 + min;
  
  var timeTable = [
    {
      "531":"Period 1",
      "587":"Period 2",
      "643":"Period 3",
      "699":"Period 4",
      "750":"1st Lunch",
      "801":"Period 5A",
      "852":"2nd Lunch",
      "903":"Period 5B",
      "954":"Period 7"
    },
    {
      "531":"Period 1",
      "587":"Period 2",
      "597":"Homeroom",
      "653":"Period 3",
      "709":"Period 4",
      "760":"1st Lunch",
      "811":"Period 5A",
      "862":"2nd Lunch",
      "913":"Period 5B",
      "964":"Period 7"
    },
    {
      "531":"Period 1",
      "587":"Period 2",
      "643":"Period 3",
      "699":"Period 4",
      "750":"1st Lunch",
      "801":"Period 5A",
      "852":"2nd Lunch",
      "903":"Period 5B",
      "954":"Period 7"
    },
    {
      "531":"Period 1",
      "587":"Period 2",
      "597":"Homeroom",
      "653":"Period 3",
      "709":"Period 4",
      "760":"1st Lunch",
      "811":"Period 5A",
      "862":"2nd Lunch",
      "913":"Period 5B",
      "964":"Period 7"
    },
    {
      "531":"Period 1",
      "587":"Period 2",
      "643":"Period 3",
      "699":"Period 4",
      "750":"1st Lunch",
      "801":"Period 5A",
      "852":"2nd Lunch",
      "903":"Period 5B",
      "954":"Period 7"
    },
  ]
  
  if (!!timeTable[day]) {//check to make sure it is school day
    var currentSmallestDist = 1000000000000000000000000000000;
    var ans = 1000000000000000000000000000000;
    for (var timeInMins in timeTable[day]) {
      if (distNum(Number(timeInMins), minsFromDayStart) < currentSmallestDist) {
        ans = timeInMins;
        currentSmallestDist = distNum(Number(timeInMins), minsFromDayStart);
      }
    }
    console.log(ans)
  }
}
