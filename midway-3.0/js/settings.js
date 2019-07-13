let user;
updateViews();
function updateViews () {
	wakeUp();
	chrome.runtime.sendMessage({type:"getSchoolName"});
}
function setSchool (schoolName) {

	schoolName = schoolName || "none set";
	var eles = document.querySelectorAll(".school");
	
	for (var i = 0; i < eles.length; i++) {
		eles[i].innerText = schoolName;
	}
	
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

function dispNotLoggedIn () {
	document.getElementById("loggedIn").style="display:none";
	document.getElementById("loggedOut").style="padding-top:15px;";
}
function dispLoggedIn () {
	document.getElementById("loggedIn").style="";
	document.getElementById("loggedOut").style="display:none";
	
}

//////////////////////////////////////////////////////////////////////////////
// school code handling
/////////////////////////

document.getElementById("schoolCodeForm").addEventListener("submit",
		function (e) {
			e.preventDefault();
			authenticateSchoolCode(
				document.getElementById("schoolCode").value,true
			);
			chrome.runtime.sendMessage({type:"getSchoolCode"});
		}
	)

document.getElementById("signOut").addEventListener("click",function () {
	chrome.runtime.sendMessage({type:"signOut"});
	dispNotLoggedIn();
});

checkIfAuthenticated(function (auth) {
	user = auth.user;
	if (auth.status) {
		dispLoggedIn();
	}
	else {
		// no school code
		dispNotLoggedIn()
	}

})

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.type === "statusSchoolCode") {
			if (!request.status) {
				document.getElementById("schoolCodeError").innerText = "Invalid code.";
				document.getElementById("schoolCodeError").className = "";
				setTimeout(function () {
					document.getElementById("schoolCodeError").className = "blink";
				},200);
			}
			else {
				document.getElementById("schoolCodeError").innerText = "";
			}
			updateViews();
		}
		else if (request.type === "returnSchoolCode") {
			authenticateSchoolCode(request.schoolCode,false);
		}
		else if (request.type === "returnSchoolName") {
			setSchool(request.data);
		}
	}
);
