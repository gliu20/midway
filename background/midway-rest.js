var midway = {};

midway.cache = {};

midway.handleError = function (errCode,errMesg) {
	console.warn(errCode,errMesg);
	
	/*errMesg = (errMesg || "")
		.replace(/The user/g,"You")
		.replace(/the user/g,"you")
		.replace(/User/g,"You")
		.replace(/user/g,"you");
	
	if (errMesg) {
		//alert(errCode + ": " + errMesg);
	}*/
}

// rest api for handling data //////////////////////////////////////////////////
midway.rest = {};

midway.rest.fetch = function (path,token,options,request) {
	return new Promise (function (resolve,reject) {
		
		var url = firebaseConfig.databaseURL;
		
		url += "/" + path;
		url += ".json?auth=" + token;
		url += options ? "&" + options : "";
		
		fetch(url,request).then(function(response) {
			if (response.ok) {
				resolve(response);
			}
			else {
				midway.handleError(response.status,response.statusText);
				reject();
			}
		}).catch(function(error) {
			midway.handleError("fetch/error",error);
			reject();
		})
	});
}


// TODO re-factor for DRY (don't repear yourself) code... getAbsentTeachers, 
// announcements, etc... all seem to be the same code copy pasted with
// different url
midway.rest.getAbsentTeachers = async function () {

	if (midway.cache.absentTeachers &&
		Date.now() - midway.cache.lastUpdated < midway.cache.updateInterval) {
		
		// looks like the cached result was null; so we will return null
		if (midway.cache.absentTeachers === true) {
			return null;
		}
		
		return midway.cache.absentTeachers;
	}

	var token = await midway.auth.getToken();

	if (!midway.auth.schoolCode) {
		// we are signed in which is good bc we can try obtaining school code
		// by initiating sign in process
		if (midway.auth.isSignedIn() && await midway.auth.initiateSignIn()) {
			// it worked; nothing to do here
		}
		else {
			// didn't work; we need user to input school code or sign in
			// if they didn't sign in
			midway.handleError("auth/invalid-school-code","Invalid or missing school code")
		
			return;
		}
	}
	
	var absentTeacherUrl = "schools/" + midway.auth.schoolCode + "/absentTeachers";
	var response = await midway.rest.fetch(absentTeacherUrl,token);
	
	var absentTeachers = await response.json();
	
	midway.cache.absentTeachers = absentTeachers;
	midway.cache.lastUpdated = Date.now();
	
	// we must make sure that if absentTeachers is null, we note that in the cache
	// that way we won't be always looking for it
	if (absentTeachers === null) {
		midway.cache.absentTeachers = true;
	}
	
	return absentTeachers;
}

midway.rest.getAnnouncements = async function () {
	
	if (midway.cache.announcements &&
		Date.now() - midway.cache.lastUpdated < midway.cache.updateInterval) {
		
		// looks like the cached result was null; so we will return null
		if (midway.cache.announcements === true) {
			return null;
		}
		
		return midway.cache.announcements;
	}

	var token = await midway.auth.getToken();

	if (!midway.auth.schoolCode) {
		// we are signed in which is good bc we can try obtaining school code
		// by initiating sign in process
		if (midway.auth.isSignedIn() && await midway.auth.initiateSignIn()) {
			// it worked; nothing to do here
		}
		else {
			// didn't work; we need user to input school code or sign in
			// if they didn't sign in
			midway.handleError("auth/invalid-school-code","Invalid or missing school code")
		
			return;
		}
	}
	
	var announcementsUrl = "schools/" + midway.auth.schoolCode + "/announcements";
	var response = await midway.rest.fetch(announcementsUrl,token);
	
	var announcements = await response.json();
	
	midway.cache.announcements = announcements;
	midway.cache.lastUpdated = Date.now();
	
	// we must make sure that if announcements is null, we note that in the cache
	// that way we won't be always looking for it
	if (announcements === null) {
		midway.cache.announcements = true;
	}
	
	return announcements;
}

midway.rest.getSchedule = async function () {
	
	// make sure updateInterval is available so we can do proper checking
	await midway.rest.getUpdateInterval();
	
	if (midway.cache.schedule &&
		Date.now() - midway.cache.lastUpdated < midway.cache.updateInterval) {
		
		// looks like the cached result was null; so we will return null
		if (midway.cache.schedule === true) {
			return null;
		}
		
		return midway.cache.schedule;
	}
	
	if (!midway.auth.isSignedIn()) {
		midway.handleError("auth/not-signed-in","User not signed in")
		
		return;
	}
	
	var token = await midway.auth.getToken();
		
	if (!midway.auth.schoolCode) {
		// we are signed in which is good bc we can try obtaining school code
		// by initiating sign in process
		if (midway.auth.isSignedIn() && await midway.auth.initiateSignIn()) {
			// all good
		}
		else {
			// didn't work; we need user to input school code or sign in
			// if they didn't sign in
			midway.handleError("auth/invalid-school-code","Invalid or missing school code")
		
			return;
		}
	}
	
	var scheduleUrl = "schools/" + midway.auth.schoolCode + "/patches/";
		
	scheduleUrl += (new Date()).toDateString();
	
	var response = await midway.rest.fetch(scheduleUrl,token);
	var schedule = await response.json();
	
	midway.cache.schedule = schedule;
	midway.cache.lastUpdated = Date.now();
	
	// we must make sure that if schedule is null, we note that in the cache
	// that way we won't be always looking for it
	if (schedule === null) {
		midway.cache.schedule = true;
	}
	
	return schedule;
}

midway.rest.getUpdateInterval = async function () {
	// if already checked for updateInterval, don't check it again
	if (midway.cache.updateInterval) {
		return midway.cache.updateInterval;
	}
	
	// prevent prompting of sign in
	if (!midway.auth.isSignedIn()) {
		midway.handleError("auth/not-signed-in","User not signed in")
		
		return;
	}
	
	var token = await midway.auth.getToken();
	
	var updateIntervalUrl = "updateInterval";
	
	var response = await midway.rest.fetch(updateIntervalUrl,token);
	var updateInterval = await response.json();
	
	return midway.cache.updateInterval = updateInterval;
}
////////////////////////////////////////////////////////////////////////////////

// auth ////////////////////////////////////////////////////////////////////////
midway.auth = {};

midway.auth.authUser = function () {
	var provider = new firebase.auth.GoogleAuthProvider();
	
	return new Promise(function (resolve,reject) {
		firebase.auth().signInWithPopup(provider).then(function(result) {
  			var token = result.credential.accessToken;
  			var user = result.user;
  			
  			resolve();
		}).catch(function(error) {
  			var errorCode = error.code;
  			var errorMessage = error.message;
  			
  			midway.handleError(error.code,error.message);
  			reject();
		});
	});
}

midway.auth.isSignedIn = function () {
	return !!firebase.auth().currentUser;
}

midway.auth.hasSchoolCode = function () {
	return !!midway.auth.schoolCode;
}

midway.auth.getCurrentUser = async function () {
	var user = firebase.auth().currentUser;

	if (!midway.auth.isSignedIn()) {
		await midway.auth.authUser();
		user = firebase.auth().currentUser;
	}
	
	return user;
}

midway.auth.signOut = function () {
	firebase.auth().signOut();
}

midway.auth.getToken = async function () {
	var user = await midway.auth.getCurrentUser();
	
	// id tokens are NOT access tokens generated by the OAuth2 system.
	// Instead, they are used by firebase and expire after 1 hour
	// TODO figure out way to use REST api without tokens expiring after
	// 1 hour to limit overhead on server
	return await user.getIdToken();
}

midway.auth.getSchoolCode = async function () {
	// getCurrentUser automatically signs in user if necessary. getToken will
	// return the firebase token id which expires after an hour
	var user = await midway.auth.getCurrentUser();
	var token = await midway.auth.getToken();
	
	var schoolCodeUrl = "users/" + user.uid + "/schoolCode";
	var response = await midway.rest.fetch(schoolCodeUrl,token);
	
	return await response.json();
}

midway.auth.getSchoolCodeFromEmail = async function () {
	// getCurrentUser automatically signs in user if necessary. getToken will
	// return the firebase token id which expires after an hour
	var user = await midway.auth.getCurrentUser();
	var domain = user.email.split("@")[1].replace(/\./g,"%25");
	var token = await midway.auth.getToken();
	
	var schoolCodeUrl = "emailLookup/" + domain + "/0";
	var response = await midway.rest.fetch(schoolCodeUrl,token);
	
	return await response.json();
}


midway.auth.setSchoolCode = async function (schoolCode) {
	// getCurrentUser automatically signs in user if necessary. getToken will
	// return the firebase token id which expires after an hour
	var user = await midway.auth.getCurrentUser();
	var token = await midway.auth.getToken();
	
	var schoolCodeUrl = "users/" + user.uid + "/schoolCode";
	
	var response = await midway.rest.fetch(schoolCodeUrl,token,false,{
		method: "PUT",
		body: JSON.stringify(schoolCode)
	});
	
	return await response.json();
}

midway.auth.checkSchoolCode = async function (code,needUpload) {

	if (code === null || code === undefined) {
		return false;
	}

	// getCurrentUser automatically signs in user if necessary. getToken will
	// return the firebase token id which expires after an hour
	var user = await midway.auth.getCurrentUser();
	var token = await midway.auth.getToken();
	
	var schoolCodeCheckUrl = "schools/" + code + "/schoolName";
	var response,isValid,schoolName;
	
	if (needUpload) {
		// initate log in to school via school code
		await midway.auth.setSchoolCode(code);
	}
	
	try {
		response = await midway.rest.fetch(
			schoolCodeCheckUrl,
			token
		);
	
		schoolName = await response.json();
		
		isValid = true;
	}
	catch (error) {
		schoolName = undefined;
	
		isValid = false;
	}
	
	// even if firebase returns a response, the data might not actually exist
	// thus, we must check it
	if (schoolName === null || schoolName === undefined) {
		isValid = false;
	}
	
	midway.cache.schoolName = schoolName;
	
	return isValid;
}


// sign in flow
// 1. get schoolCode
// 2. if exists, check it... 
// 3. no work get it from email and check it...
// 4. fail otherwise
midway.auth.initiateSignIn = async function () {
	var schoolCode, isSchoolCodeValid;
	
	try {
		// (step 1 and 2) get school code and check if it works
		schoolCode = await midway.auth.getSchoolCode();
		isSchoolCodeValid = await midway.auth.checkSchoolCode(schoolCode);
	}
	catch (error) {
		// (step 3) assume school code is invalid
		isSchoolCodeValid = false;
	}
	
	if (isSchoolCodeValid) {
		midway.auth.schoolCode = schoolCode;
		
		return true;// indicate success
	}
	
	
	// (step 3 cont...) get school code from email
	try {
		// get schoolCodeFromEmail and check if valid
		schoolCode = await midway.auth.getSchoolCodeFromEmail();
		
		// check if valid
		isSchoolCodeValid = await midway.auth.checkSchoolCode(schoolCode,true);
	}
	catch (error) {
		// (step 4) assume school code is invalid
		isSchoolCodeValid = false;
	}
	
	if (isSchoolCodeValid) {
		midway.auth.schoolCode = schoolCode;
		
		return true;// indicate success
	}
	
	// At this point, one of the following happened:
	// A. cached schoolCode does not exist or work
	// B. or email domain based schoolCode does not exist or work
	return false;
}


// full sign in steps
// 1. midway.auth.getCurrentUser()
// 2. midway.auth.initiateSignIn()
// 3. if step 2 fails, ask for schoolCode 
//    aka midway.auth.checkSchoolCode(code,true)
////////////////////////////////////////////////////////////////////////////////


async function checkAuthStatus () {
	var isSignedIn = midway.auth.isSignedIn();
	var hasSchoolCode = midway.auth.hasSchoolCode();
			
	// TODO even if you have school code, should we check and remove cache?
	if (isSignedIn && !hasSchoolCode) {
		
		// clear cache
		//midway.cache = {};
		
		// check if you have schoolCode and if it works
		await midway.auth.initiateSignIn();
		hasSchoolCode = midway.auth.hasSchoolCode();
		
		
	}
	
	if (isSignedIn && hasSchoolCode) {
		// it is okay to get update interval now; anyway it won't check if
		// its result is cached
		await midway.rest.getUpdateInterval();
	}
		
	chrome.runtime.sendMessage({ 
		type:"toPopup-returnAuthStatus",
		isSignedIn: isSignedIn,
		hasSchoolCode: hasSchoolCode
	});
	
	chrome.runtime.sendMessage({ 
		type:"toSettings-returnAuthStatus",
		isSignedIn: isSignedIn,
		hasSchoolCode: hasSchoolCode
	});
}

chrome.runtime.onMessage.addListener(
	async function (request, sender, sendResponse) {
		if (request.type === "toBackground-checkSchoolCode") {
			if (await midway.auth.checkSchoolCode(
				request.schoolCode,
				request.needUpload
			)) {
				await checkAuthStatus();
			}
			else {
				chrome.runtime.sendMessage({ type:"toPopup-invalidSchoolCode" });
				chrome.runtime.sendMessage({ type:"toSettings-invalidSchoolCode" });
			}
		}
		else if (request.type === "toBackground-checkAuthStatus") {
			await checkAuthStatus();
		}
		else if (request.type === "toBackground-forceSignIn") {
			await midway.auth.authUser();
			
			// broadcast that user sign in status changed
			await checkAuthStatus();
			
			await timebox.updateDisplay();
		}
		else if (request.type === "toBackground-signOut") {
			midway.auth.signOut();
			
			// make sure cache is cleared when signing out
			midway.auth.schoolCode = false;
			midway.cache = {};
		}
		else if (request.type === "toBackground-getAnnouncements") {
			chrome.runtime.sendMessage({
				type: "toPopup-returnAnnouncements",
				data: await midway.rest.getAnnouncements()
			});
		}
		else if (request.type === "toBackground-getAbsentTeachers") {
			chrome.runtime.sendMessage({
				type: "toPopup-returnAbsentTeachers",
				data: await midway.rest.getAbsentTeachers()
			});
		}
		else if (request.type === "toBackground-getSchedule") {
			var scheduleObj = await midway.rest.getSchedule() || {patch:[]};
			
			scheduleObj = scheduleObj.patch || [];
			
			scheduleObj.sort(schedule.sortBy("periodStartTime"));
			scheduleObj.sort(schedule.sortBy("periodEndTime"));
			
			scheduleObj.forEach(function (item) {
				item.periodShortHand = schedule.shortHand(item.periodName);
			});
			
			chrome.runtime.sendMessage({
				type: "toPopup-returnSchedule",
				data: scheduleObj
			});
		}
		else if (request.type === "toBackground-getCurrentPeriod") {
			var scheduleObj = await midway.rest.getSchedule() || {patch:[]};
			var currPeriod;
			var currPeriodMinsUntil;
			var currPeriodMinsLeft;
			
			scheduleObj = scheduleObj.patch || [];
			
			scheduleObj.sort(schedule.sortBy("periodStartTime"));
			scheduleObj.sort(schedule.sortBy("periodEndTime"));
	
			scheduleObj.forEach(function (item) {
				item.periodShortHand = schedule.shortHand(item.periodName);
			});
			
			currPeriod = schedule.findCurrentPeriod(scheduleObj)
			
			if (currPeriod) {
				currPeriodMinsUntil = schedule.timeToMins(
					currPeriod.periodTime[0]) - schedule.currTimeInMins();
					
				currPeriodMinsLeft = schedule.timeToMins(
					currPeriod.periodTime[1]) - schedule.currTimeInMins();
					
				if (currPeriodMinsUntil > 0) {
					currPeriod.minsLeft = currPeriodMinsUntil + " mins until start";
				}
				else {
					currPeriod.minsLeft = currPeriodMinsLeft + " mins left";
				}
			}
			
			chrome.runtime.sendMessage({
				type: "toPopup-returnCurrentPeriod",
				data: currPeriod
			});
			
			// popup updated... we might as well update the timebox as well...
			timebox.updateDisplay();
		}
		else if (request.type === "toBackground-getSchoolName") {
			chrome.runtime.sendMessage({
				type: "toPopup-returnSchoolName",
				data: midway.cache.schoolName
			});
			
			chrome.runtime.sendMessage({
				type: "toSettings-returnSchoolName",
				data: midway.cache.schoolName
			});
		}
		else if (request.type === "toBackground-clearCache") {
			midway.auth.schoolCode = false;
			midway.cache = {};
		}
	}
);