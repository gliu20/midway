var snoozeTime = 60000;
/**
 * Calculates the number of minutes to the time from now
 * @param {Number} time mins from start of day
 */
var minsBefore = function (time) {
    var now = new Date();
    var minsFromStartDay = now.getMinutes() + now.getHours() * 60;
    
    if (time) {
      return time - minsFromStartDay;
    }
    else {
      return minsFromStartDay
    }
}

var fixedLength = function (str, length) {
    str = str.toString();
    while (str.length < length) {
        str = "0" + str;
    }
    return str;
}

var localeTime = function (time) {
    return Math.floor(time / 60) % 12 + ":" + fixedLength(time % 60, 2)
}

/**
 * Displays the time in the form of a notification
 * @param {Object} period
 * @param {String} period.name
 * @param {Number} period.startTime
 * @param {Number} period.endTime
 */
var displayPeriod = function (period) {
    
    var periodName;
    var startTime;
    var endTime;
    var periodLength;

    var timeLeft;

    var localeNowTime;
    var localeStartTime;
    var localeEndTime;
    
    var progress;
    var notificationId = (Date.now() + Math.random() * 1e17).toString();


    var thread;

    function calcPeriodStats () {
      periodName = period["name"];
      startTime = period["startTime"];
      endTime = period["endTime"];
      periodLength = endTime - startTime;

      timeLeft = minsBefore(endTime);
  
      localeNowTime = localeTime(minsBefore(0));
      localeStartTime = localeTime(startTime);
      localeEndTime = localeTime(endTime);
    
      progress = (periodLength - timeLeft) / periodLength;
    };
    
    
    function calcClockOffset () {
    
      var date = new Date();
      var seconds = date.getSeconds();
      var millis = date.getMilliseconds();
      
      millis += seconds * 1000;
      
      return 60000 - millis;
      
    };
    
    function notifiyObj () {
      return {
        type:"progress",
        progress: Math.ceil(progress * 100),
        title: localeStartTime + " - " + localeEndTime,
        message: periodName + ", " + timeLeft + "mins left",
        requireInteraction: true, /* requires chrome 50+ */
        iconUrl: chrome.runtime.getURL("img/midway-icon.svg"),
        buttons: [
            {
                title: "Remind me later",
                iconUrl: chrome.runtime.getURL("img/snooze.svg")
            },
            {
                title: "Notification settings",
                iconUrl: chrome.runtime.getURL("img/settings-gray.svg")
            }
        ]
      };
    }
    
    function updatePeriod () {
      calcPeriodStats();
      
      if (timeLeft <= 0 || progress < 0) {
        stop();
        return;
      }
      
      chrome.notifications.update(notificationId, notifiyObj());
    };
    
    
    function stop () {
      clearInterval(thread);
      chrome.notifications.clear(notificationId);
    }
    
    function init () {
    
      calcPeriodStats();
    
      if (timeLeft <= 0 || progress < 0) {
        console.error("timeLeft or progress is negative", "\n\ttimeLeft: " + timeLeft, "\n\tprogress: " + progress, "\naborting...")
        return;
      }
          
      chrome.notifications.create(notificationId, notifiyObj());
      


      setTimeout(function () {
        updatePeriod();
        thread = setInterval(function () {
          updatePeriod();
        },60000)
      }, calcClockOffset());
    }
    
    init();
    // this is put here because handlers must not be set multiple times, even if
    // notification is deleted and reinstated since they get left behind after
    // notification is deleted
    chrome.notifications.onButtonClicked.addListener(function (notification, button) {
      if (notification == notificationId) {
        if (button === 0) {
          
          stop();
            
          setTimeout(function () {
            init()
          },snoozeTime)
        }
        else if (button === 1) {
          chrome.tabs.create({//TODO research exact specs
	          url:"index.html"
          })
        }
      }
    });
}








