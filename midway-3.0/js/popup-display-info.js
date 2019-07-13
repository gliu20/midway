function saniztize (input) {
	return input.replace(/</g,"&lt;").replace(/>/g,"&gt;")
}
function setCurrPeriodInfo (periodObj) {
	const subject = periodObj.subject || "";
	const periodName = periodObj.periodName || "No ongoing periods currently";
	const periodTime = periodObj.periodTime || ["0:00","0:00"];
	
	minsLeft = timeToMins(periodTime[1]) - currTimeInMins();
	
	if (minsLeft < 0) {minsLeft = ""}
	else {minsLeft += " mins left"}
	
	document.getElementById("currPeriodInfo").innerHTML = `
        <section class="card-list-item-primary">
          <h2 class="card-title card-title--large">${saniztize(minsLeft)}</h2>
          <h3 class="card-subtitle card-subtitle--large">${saniztize(subject)}</h3>
          <p class="card-subtitle">${saniztize(periodName)}, ${saniztize(periodTime[0])} - ${saniztize(periodTime[1])}</p>
        </section>
    `;
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

function getDayOfWeek () {
	const weekLookup = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];
	
	return weekLookup[(new Date()).getDay()]
}

function setTodaySchedule (schedule,isSpecial,scheduleVariant) {
	
	let scheduleDomCache = "";
	const todayDate = (new Date()).toLocaleDateString();
	
	scheduleVariant = scheduleVariant || "";
	
	for (var i = 0; i < schedule.length; i++) {
		
		
		const subject = schedule[i].subject || "";
		const periodName = schedule[i].periodName || "Unknown period";
		const periodTime = schedule[i].periodTime || ["0:00","0:00"];
		const periodShortHand = shortHand(periodName);
		
		scheduleDomCache += `
	        <section class="card-list-item">
	          <span class="avatar">${saniztize(periodShortHand)}</span>
	          <section class="card-list-item-primary">
	            <h2 class="card-title">${saniztize(subject)}</h2>
	            <p class="card-subtitle">${saniztize(periodName)}, ${saniztize(periodTime[0])} - ${saniztize(periodTime[1])}</p>
	          </section>
	        </section>
        	<span class="separator"></span>
    	`;
	
	}
	
	
	
	document.getElementById("scheduleDetails").innerHTML = `
        <h2 class="card-title">${saniztize(scheduleVariant)}</h2>
        <p class="card-subtitle">${saniztize(todayDate)}${isSpecial ? " (Special)" : ""}</p>
	`;
	
	
	document.getElementById("schedulePeriods").innerHTML = scheduleDomCache;
	
    
    
}

function setSchool (schoolName) {
	var eles = document.querySelectorAll(".school");
	
	for (var i = 0; i < eles.length; i++) {
		eles[i].innerText = schoolName;
	}
	
}


function hideSetupSchedule () {
	var eles = document.querySelectorAll(".setup-schedule");
	
	for (var i = 0; i < eles.length; i++) {
		eles[i].style = "display:none;";
	}
}

function showWithSchoolCodeView () {
	document.getElementById("withSchoolCodeView").style = ""
	document.getElementById("withoutSchoolCodeView").style = "display:none;";
	
	updateViews();
}

function showWithoutSchoolCodeView () {
	document.getElementById("withSchoolCodeView").style = "display:none;"
	document.getElementById("withoutSchoolCodeView").style = "";
}

function setAnnouncements (announce) {
	document.getElementById("announcements").innerText = announce || "No announcements";
}

function setAbsentTeachers (teacherList) {
	var teacherDomCache = "";
	
	teacherList = teacherList || ["No absent teachers"];
	
	for (var i = 0; i < teacherList.length; i++) {
		teacherDomCache += `
			<li>${saniztize(teacherList[i])}</li>
		`;
	}

	document.getElementById("absentTeachers").innerHTML = teacherDomCache;
}


document.getElementById("schoolCodeForm").addEventListener("submit",
		function (e) {
			e.preventDefault();
			authenticateSchoolCode(
				document.getElementById("schoolCode").value,true
			);
			chrome.runtime.sendMessage({type:"getSchoolCode"});
		}
	)


////////////////////////////////////////////////////////////////////////////////
// tabs ui
////////////////////////////////////////////////////////////////////////////////
let schTab = document.getElementById("schTab");
let absTab = document.getElementById("absTab");

var p1 = document.querySelector(".page1");
var p2 = document.querySelector(".page2");

let defocus = function (pageTo) {
  
  
  return function (e) {

    let src = e.target || e.srcElement;

  	schTab.blur();
  	absTab.blur();
	
  	schTab.classList.remove("title--active");
  	absTab.classList.remove("title--active");
  	
  	src.classList.add("title--active");
	  
	  clearPage()
	  
	  window[pageTo].classList.add("currPage");
	  
	  if (window[pageTo].scrollTop === 0) {
	    document.querySelector(".toolbar").classList.remove("shadow");
	  }
	  else {
	    document.querySelector(".toolbar").classList.add("shadow");
	  }
	  
  }
}

let clearPage = function () {
  p1.classList.remove("currPage");
	p2.classList.remove("currPage");
}

schTab.addEventListener("click",defocus("p1"));
absTab.addEventListener("click",defocus("p2"));


