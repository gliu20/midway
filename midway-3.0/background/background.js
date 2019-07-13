let schoolCode;
let schedule;
let lastUpdated = Date.now();

function authenticateUser() {
	var provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider).then(function(result) {
  		var token = result.credential.accessToken;
  		var user = result.user;
  		
  		chrome.runtime.sendMessage({type: "authUserStatus",status:true,user});
	}).catch(function(error) {
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		
  		console.error(error.code,error.message)
  		chrome.runtime.sendMessage({type: "authUserStatus",status:false});
	});
}

function authenticateSchoolCode (request) {
	const code = request.schoolCode;

	var database = firebase.database();
	var user = firebase.auth().currentUser;
	
	
	if (request.isFirstTime) {
		database.ref("users/"+user.uid).set({
			schoolCode: code 
		}, function (error) {
			if (error) {
				console.error(error);
				updateSchoolCodeStatus(false);
			}
			else {
				checkSchoolCode(code);
			}
		});
	}
	else {
		checkSchoolCode(code);
	}
}

function updateSchoolCodeStatus (doesCodeWork) {
	chrome.runtime.sendMessage({
		type: "statusSchoolCode",
		status: doesCodeWork
	})
}

function returnSchoolCode (code) {
	chrome.runtime.sendMessage({
		type: "returnSchoolCode",
		schoolCode: code
	});
	
	schoolCode = code;
}

function checkSchoolCode (code) {

	var database = firebase.database();
	
	database.ref("schools/"+code+"/schoolName").once("value")
		.then(function (snapshot) {
			
			if (snapshot.val()) {
				updateSchoolCodeStatus(true);
			}
			else {
				updateSchoolCodeStatus(false);
			}
		})
		.catch(function (error) {
			console.error(error);
			updateSchoolCodeStatus(false);
		});
	
	schoolCode = code;
}

function getSchoolCode () {
	var database = firebase.database();
	var user = firebase.auth().currentUser;
	
	database.ref("users/"+user.uid+"/schoolCode").once("value")
		.then(function (snapshot) {
			
			const code = snapshot.val();
			
			if (code) {
				returnSchoolCode(code);
			}
			else {
				getSchoolCodeFromEmail();
			}
		})
		.catch(function (error) {
			console.error(error);
			getSchoolCodeFromEmail();
		});
}

function getSchoolCodeFromEmail () {
	var database = firebase.database();
	var user = firebase.auth().currentUser;
	var domain = user.email.split("@")[1].replace(/\./,"-");
	
	
	database.ref("emailLookup/"+domain).once("value")
		.then(function (snapshot) {
			
			const code = snapshot.val();
			
			if (code) {
				authenticateSchoolCode({
					schoolCode:code[0],
					isFirstTime:true
				});
			}
			else {
				updateSchoolCodeStatus(false);
			}
		})
		.catch(function (error) {
			console.error(error);
			updateSchoolCodeStatus(false);
		});
}

function checkIfAuthenticated () {
	const user = firebase.auth().currentUser;
	return {
		status:!!(user),
		user:user
	};
}


//////////////////////////////////////////////////////
// update everything with info
///////////////////////////////////////////////////////////////////////////////




function returnSchedule (patch,userSchedule,scheduleVariants) {
	schedule = {
		type: "returnSchedule",
		patch,
		userSchedule,
		scheduleVariants
	}
	chrome.runtime.sendMessage(schedule);
}

function csReturnSchedule (patch,userSchedule) {
	
	
	chrome.tabs.query({}, function(tabs) {
		for (var tab of tabs) {
  			chrome.tabs.sendMessage(tab.id, {
				type: "cs-returnSchedule",
				patch,
				userSchedule
			});
		}
	});
}

function returnSchoolName (data) {
	chrome.runtime.sendMessage({
		type: "returnSchoolName",
		data
	});
}

function returnAnnouncements (data) {
	chrome.runtime.sendMessage({
		type: "returnAnnouncements",
		data
	});
}

function returnAbsentTeachers (data) {
	chrome.runtime.sendMessage({
		type: "returnAbsentTeachers",
		data
	});
}

function getSchedule (request) {
	var database = firebase.database();
	var user = firebase.auth().currentUser;
	
	const date = (new Date(request.date)).toDateString();
	
	database.ref("/users/").child(user.uid).child("schedule").once('value').then(function(snapshot) {
  		const userSchedule = snapshot.val();
  		
  		database.ref("/schools/"+schoolCode).child("patches/"+date).once("value").then(function(snapshot) {
			const patch = snapshot.val();
  			
  			database.ref("/schools/"+schoolCode).child("scheduleVariants").once("value").then(function(snapshot) {
				const scheduleVariants = snapshot.val();
  			
  					schedule = {
						type: "returnSchedule",
						patch,
						userSchedule,
						scheduleVariants
					}
  					returnSchedule(patch,userSchedule,scheduleVariants);
  			
			});
  			
  			
		});
	});
}

function csGetSchedule (request) {
	// give cached schedule for 4 hours
	if (schedule && (Date.now() - lastUpdated < 1000 * 60 * 60 * 2)) {
		csReturnSchedule(schedule.patch,schedule.userSchedule);
	}
	else {
		var database = firebase.database();
		var user = firebase.auth().currentUser;
	
		const date = (new Date(request.date)).toDateString();
	
		database.ref("/users/").child(user.uid).child("schedule").once('value').then(function(snapshot) {
  			const userSchedule = snapshot.val();
  		
  			database.ref("/schools/"+schoolCode).child("patches/"+date).once("value").then(function(snapshot) {
				const patch = snapshot.val();
  				if (patch) {
  					schedule = {
						type: "returnSchedule",
						patch,
						userSchedule
					}
  					csReturnSchedule(patch,userSchedule);
  				}
  				else {
  					schedule = {
						type: "returnSchedule",
						patch,
						userSchedule
					}
  					csReturnSchedule(false,userSchedule);
  				}
			});
		});
	}
}

function getSchoolName () {
	var database = firebase.database();
	var user = firebase.auth().currentUser;
	
	database.ref("schools/"+schoolCode+"/schoolName").once("value")
		.then(function (snapshot) {
			const schoolName = snapshot.val();
				returnSchoolName(schoolName);
	})
}
function getAnnouncements () {
	var database = firebase.database();
	var user = firebase.auth().currentUser;
	
	database.ref("schools/"+schoolCode+"/announcements").once("value")
		.then(function (snapshot) {
			const announcements = snapshot.val();
				returnAnnouncements(announcements);
	})
}
function getAbsentTeachers () {
	var database = firebase.database();
	var user = firebase.auth().currentUser;
	
	database.ref("schools/"+schoolCode+"/absentTeachers").once("value")
		.then(function (snapshot) {
			const absentTeachers = snapshot.val();
				returnAbsentTeachers(absentTeachers);
	})
}

////////////////////////////////////////////////////////////
// message listener
//////////////////////////////////////////////////////////////

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.type === "wakeUp") {
			// make sure background page is alive so that firebase is loaded
			// this is here for forward compatibility; in case persistent
			// background pages are not allowed
			sendResponse({status:"I'm wide awake!"})
		}
		else if (request.type === "isAuthenticated") {
			sendResponse(checkIfAuthenticated());
		}
		else if (request.type === "authUser") {
			authenticateUser();
		}
		else if (request.type === "authSchoolCode") {
			authenticateSchoolCode(request);
		}
		else if (request.type === "getSchoolCode") {
			getSchoolCode();
		}
		else if (request.type === "getSchoolCodeIfNecessary") {
			if (!schoolCode) {
				getSchoolCode();
			}
		}
		else if (request.type === "getSchedule") {
			getSchedule(request);
		}
		else if (request.type === "cs-getSchedule") {
			csGetSchedule(request);
		}
		else if (request.type === "getSchoolName") {
			getSchoolName();
		}
		else if (request.type === "getAnnouncements") {
			getAnnouncements();
		}
		else if (request.type === "getAbsentTeachers") {
			getAbsentTeachers();
		}
		else if (request.type === "signOut") {
			firebase.auth().signOut();
		}
	}
);


chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        chrome.tabs.create({//TODO research exact specs
	          url:"../welcome.html"
          })
    }else if(details.reason == "update"){
        //call a function to handle an update
    }
});
