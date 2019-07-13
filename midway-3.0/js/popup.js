let user;
let updateThread;

// disabling unfinished feature
//////////////////////////////////////////////////////////////////////////
				hideSetupSchedule();
////////////////////////////////////////////////////////
function updateViews () {
	chrome.runtime.sendMessage({type:"getAnnouncements"});
	chrome.runtime.sendMessage({type:"getAbsentTeachers"});
	chrome.runtime.sendMessage({type:"getSchoolName"});
	chrome.runtime.sendMessage({
		type:"getSchedule",
		date: new Date()
	});
}

function wakeUp () {
	// make sure background is awake;
	chrome.runtime.sendMessage({type:"wakeUp"});
}

function authenticateSchoolCode (schoolCode,isFirstTime) {
	chrome.runtime.sendMessage({
		type: "authSchoolCode",
		schoolCode: schoolCode,
		isFirstTime:isFirstTime
	});
}

function checkIfAuthenticated (callback) {
	wakeUp();
	chrome.runtime.sendMessage({
		type: "isAuthenticated"
	}, function(response) {
  		callback(response);
	});
}

function checkForSchoolCode (schoolCode) {
	wakeUp();
	chrome.runtime.sendMessage({
		type: "getSchoolCode"
	});
}

function dispWithoutSchoolCode (auth) {
	
	// no school code
	document.getElementById("schoolCodeWrapper").style = "";
	document.getElementById("signInWithGoogle").innerHTML = `<img class="Icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20px"></img><span>Sign in with another account</span>`;
	document.getElementById("loginInformation").innerText = `Your email address ${user.email} is not associated with any schools. Sign in with another account or enter a school code.`;
			
	showWithoutSchoolCodeView();
}

//////////////////////////////////////////////////////////////////////////////
// sign in handling
/////////////////////////

document.getElementById("signInWithGoogle").addEventListener("click",function () {
	chrome.runtime.sendMessage({type: "authUser"})
})

document.getElementById("toggleTimeBox").addEventListener("click",function () {
	chrome.runtime.sendMessage({type: "cs-plzToggleTimeBox"})
})

document.getElementById("rePositionTimeBox").addEventListener("click",function () {
	chrome.runtime.sendMessage({type: "cs-plzRePositionTimeBox"})
})



checkIfAuthenticated(function (auth) {
	user = auth.user;
	if (auth.status) {
		checkForSchoolCode();
	}
	else {
		// no school code
		showWithoutSchoolCodeView()
	}

})

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.type === "statusSchoolCode") {
			if (request.status) {showWithSchoolCodeView();}
			else {
				dispWithoutSchoolCode();
				document.getElementById("schoolCodeError").innerText = "Your account is not associated with any school codes or you submitted an invalid code.";
				document.getElementById("schoolCodeError").className = "";
				setTimeout(function () {
					document.getElementById("schoolCodeError").className = "blink";
				},200);
			}
		}
		else if (request.type === "returnSchoolCode") {
			authenticateSchoolCode(request.schoolCode,false);
		}
		else if (request.type === "authUserStatus") {
			user = request.user;
			if (request.status) {
				checkForSchoolCode();
			}
			else {
				// no school code
				showWithoutSchoolCodeView()
			}
		}
		else if (request.type === "returnSchedule") {
			if (request.userSchedule && request.patch) {
				hideSetupSchedule();
				
				const schedule = getNthDaySchedule(
					JSON.parse(request.userSchedule),
					request.patch.patch,
					request.patch.variant
				);
				
				setTodaySchedule(schedule,false,request.scheduleVariants[request.patch.variant])
				
				
				
				clearInterval(updateThread);
				updateThread = setInterval(function () {
					const currPeriod = findCurrentPeriod(
						schedule
					);
					setCurrPeriodInfo(currPeriod)
				},200)
				
				
			}
			else if (request.patch) {
				setTodaySchedule(request.patch.patch,false,request.scheduleVariants[request.patch.variant]);
				
				clearInterval(updateThread);
				updateThread = setInterval(function () {
					const currPeriod = findCurrentPeriod(
						request.patch.patch
					);
					setCurrPeriodInfo(currPeriod)
				},200);
			}
			else {
				setTodaySchedule([{
    				"subject":"No schedule"
  				}])
  				
  				setCurrPeriodInfo({})
			}
			// no schedule found... oh well.
		}
		else if (request.type === "returnSchoolName") {
			setSchool(request.data || "Unknown school");
		}
		else if (request.type === "returnAnnouncements") {
			setAnnouncements(request.data || "No announcements");
		}
		else if (request.type === "returnAbsentTeachers") {
			setAbsentTeachers(request.data || ["No absent teachers"]);
		}
	}
);