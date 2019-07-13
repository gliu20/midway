function openAdminDash() {
	document.getElementById("buttonCheckSchedule").addEventListener("click",function () {
		showSchedules(extractSchedules(document.getElementById("addSchedules").value))
	});

	function saniztize (input) {
		return input.replace(/</g,"&lt;").replace(/>/g,"&gt;")
	}
	
	function showSchedule (schedule) {
		
		let scheduleDomCache = "";
		const scheduleVariant = schedule.scheduleName;
		schedule = schedule.scheduleExtract;
		
		scheduleDomCache += `<h2 class="card-title">${saniztize(scheduleVariant)}</h2>`;
		
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
		
		
		
		
		
		return scheduleDomCache;
		
	    
	    
	}
	
	function showSchedules (schedules) {
		let scheduleDomCache = `<h2 class="card-title">What we see...</h2>`;
		for (var i = 0; i < schedules.length; i++) {
			scheduleDomCache += showSchedule(schedules[i]); 
		}
		
		document.getElementById("checkSchedules").innerHTML = scheduleDomCache;
	}














}
