function sanitize (input) {
	return input.replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function populateViews () {
	chrome.runtime.sendMessage({ type: "toBackground-getAnnouncements" })
	chrome.runtime.sendMessage({ type: "toBackground-getAbsentTeachers" })
	chrome.runtime.sendMessage({ type: "toBackground-getSchedule" })
	chrome.runtime.sendMessage({ type: "toBackground-getCurrentPeriod" })
	chrome.runtime.sendMessage({ type: "toBackground-getSchoolName" })
}



function setTodaySchedule (schedule) {
	
	schedule = schedule || [{periodName: "No schedule"}];
	
	let scheduleDomCache = "";
	const todayDate = (new Date()).toLocaleDateString();
	
	
	for (var i = 0; i < schedule.length; i++) {
		
		
		//const subject = schedule[i].subject || "";
		const periodName = sanitize(schedule[i].periodName || "Unknown period");
		const periodTime = sanitize((schedule[i].periodTime ||
			["0:00","0:00"]).join(" - "));
		const periodShortHand = sanitize(schedule[i].periodShortHand || "");
		
		scheduleDomCache += `
	        <section class="card-list-item">
	          <span class="avatar">${periodShortHand}</span>
	          <section class="card-list-item-primary">
	            <h2 class="card-title">${periodName}</h2>
	            <p class="card-subtitle">${periodTime}</p>
	          </section>
	        </section>
        	<span class="separator"></span>
    	`;
	
	}
	
	
	
	document.getElementById("scheduleDetails").innerHTML = `
        <h2 class="card-title">${todayDate}</h2>
        <!--<p class="card-subtitle"></p>-->
	`;
	
	
	document.getElementById("schedulePeriods").innerHTML = scheduleDomCache;
	
    
    
}

chrome.runtime.onMessage.addListener(
	async function (request, sender, sendResponse) {
		if (request.type === "toPopup-returnAnnouncements") {
			// no need to sanitize; using innerText here
			document.getElementById("announcements").innerText = request.data ||
				"No announcements";
		}
		else if (request.type === "toPopup-returnAbsentTeachers") {
			if (request.data) {
				// clean up all the user inputs for malicious inputs
				request.data = request.data.map(sanitize);
				document.getElementById("absentTeachers").innerHTML = 
					 "<li>" + request.data.join("</li><li>") + "</li>";
			}
			else {
				document.getElementById("absentTeachers").innerHTML = 
					"<li>No absent teachers</li>";
			}
		}
		else if (request.type === "toPopup-returnCurrentPeriod") {
			if (request.data) {
				var periodName = sanitize(request.data.periodName);
				var periodTime = sanitize(request.data.periodTime.join(" - "));
				var minsLeft = sanitize(request.data.minsLeft);
				
				document.getElementById("currPeriodInfo").innerHTML = `
					<section class="card-list-item-primary">
						<h2 class="card-title card-title--large">${minsLeft}</h2>
						<!--<h3 class="card-subtitle card-subtitle--large">Subject</h3>-->
						<p class="card-subtitle">${periodName}, ${periodTime}</p>
					</section>
    			`;
			}
			else {
				document.getElementById("currPeriodInfo").innerHTML = `
					<section class="card-list-item-primary">
						<h2 class="card-title card-title--large">No ongoing periods</h2>
					</section>
    			`;
			}
			
			setTimeout(function () {
				chrome.runtime.sendMessage({ type: "toBackground-getCurrentPeriod" });
			},)
		}
		else if (request.type === "toPopup-returnSchedule") {
			setTodaySchedule(request.data)
		}
		else if (request.type === "toPopup-returnSchoolName") {
			document.querySelectorAll(".school").forEach(function (item) {
				item.innerText = request.data || "Unknown school";
			})
		}
	}
);
