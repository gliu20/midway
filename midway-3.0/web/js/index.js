
document.getElementById("signInWithGoogle").addEventListener("click",function () {
		
	var provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider).then(function(result) {
  		var token = result.credential.accessToken;
  		var user = result.user;
  		
		displayConsole();
	}).catch(function(error) {
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		
  		console.error(error.code,error.message)
	});
})




function displayConsole () {
	document.querySelector(".content").innerHTML = `
	<section class="card" style="margin-top:15px;">
		<div class="card-list-item">
			<div class="card-list-item-primary">
				<h2 class="card-title card-title--large">Announcements</h2>
			</div>
		</div>
		<div class="card-list-item">
			<div class="card-list-item-primary">
				<textarea class="Input fluid" rows="10" placeholder="Add announcements"></textarea>
			</div>
		</div>
		<div class="card-list-item">
			<div class="card-list-item-primary">
				<button class="Button fluid">Save changes</button>
			</div>
		</div>
	</section>
	
	
	<section class="card" style="margin-top:15px;">
		<div class="card-list-item">
			<div class="card-list-item-primary">
				<h2 class="card-title card-title--large">Absent teacher board</h2>
				<p class="card-subtitle card-subtitle--large">Put each teacher name on a new line</p>
			</div>
		</div>
		<div class="card-list-item">
			<div class="card-list-item-primary">
				<textarea class="Input fluid" rows="5" placeholder="Add absent teachers"></textarea>
			</div>
		</div>
		<div class="card-list-item">
			<div class="card-list-item-primary">
				<button class="Button fluid">Save changes</button>
			</div>
		</div>
	</section>
	
	<section class="card" style="margin-top:15px;">
		<div class="card-list-item">
			<div class="card-list-item-primary">
				<h2 class="card-title card-title--large">Regular Schedule</h2>
				<p class="card-subtitle card-subtitle--large">Write the period name first. Put the period time below it or to the right. You must specify am or pm. To specify a schedule variant, add a "#" and a title. </p>
				<details>
					<summary style="padding:15px;">Click to see example</summary>
					<p class="card-subtitle user-content" style="max-height:500px;overflow:auto;"># Monday
Period 1
8:00am - 8:55am
Period 2
9:00am - 9:55am
Period 3
10:00am - 10:55am
Period 4
11:00am - 11:55am
Period 5: Early Lunch
12:00pm - 12:25pm
Period 5: Early Class
12:00pm - 12:55pm
Period 5: Late Lunch
1:00pm - 1:25pm
Period 5: Late Class
12:30pm - 1:25pm
Period 6
1:30pm - 2:25pm
Universal study hall
2:30pm - 2:55pm

# Tuesday
Period 1
8:00am - 8:55am

Period 2
9:00am - 9:55am

Homeroom/Study Hall
10:00am - 10:25am

Period 3
10:30 - 11:25am

Period 4
11:20pm - 12:25pm

Period 5: Early Lunch
12:30pm - 12:55pm

Period 5: Early Class
12:30pm - 1:25pm

Period 5: Late Lunch
1:30pm - 1:55pm

Period 5: Late Class
1:00pm - 1:55pm

Period 6
2:00pm - 2:55pm

# Wednesday


Period 1
8:00am - 8:55am

Period 2
9:00am - 9:55am

Period 3
10:00am - 10:55am

Period 4
11:00am - 11:55am

Period 5: Early Lunch
12:00pm - 12:25pm

Period 5: Early Class
12:00pm - 12:55pm

Period 5: Late Lunch
1:00pm - 1:25pm

Period 5: Late Class
12:30pm - 1:25pm

Period 6
1:30pm - 2:25pm

Universal study hall
2:30pm - 2:55pm

# Thursday
P1 8:00am - 8:55am
P2 9:00am - 9:55am
Homeroom/Study Hall 10:00am - 10:25am
P3 10:30 - 11:25am
P4 11:20pm - 12:25pm
P5 Early Lunch 12:30pm - 12:55pm
P5 Early Class 12:30pm - 1:25pm
P5 Late Lunch 1:30pm - 1:55pm
P5 Late Class 1:00pm - 1:55pm
P6 2:00pm - 2:55pm

# Friday
Period 1
8:00am - 8:55am
Period 2
9:00am - 9:55am
Period 3
10:00am - 10:55am
Period 4
11:00am - 11:55am
Period 5: Early Lunch
12:00pm - 12:25pm
Period 5: Early Class
12:00pm - 12:55pm
Period 5: Late Lunch
1:00pm - 1:25pm
Period 5: Late Class
12:30pm - 1:25pm
Period 6
1:30pm - 2:25pm
Universal study hall
2:30pm - 2:55pm

					</p>
				</details>
			</div>
		</div>
		<div class="card-list-item">
			<div class="card-list-item-primary">
				<textarea id="addSchedules" class="Input fluid" style="height:500px;" placeholder="Add schedule"></textarea>
			</div>
			<div id="checkSchedules" class="card-list-item-primary" style="height:500px;overflow:auto;">
				<h2 class="card-title">What we see...</h2>
			</div>
		</div>
		<div class="card-list-item">
			<div class="card-list-item-primary">
				<button class="Button fluid">Save changes</button>
				<button id="buttonCheckSchedule" class="Button Button--outline fluid">Check schedule</button>
			</div>
		</div>
	</section>
	
	
	<section class="card" style="margin-top:15px;">
		<div class="card-list-item">
			<div class="card-list-item-primary">
				<h2 class="card-title card-title--large">Scheduling Schedule Variants</h2>
				<p class="card-subtitle card-subtitle--large">Determine which days to use which version of your schedule</p>
			</div>
		</div>
		<div class="card-list-item">
				<input type=text placeholder="Starting variant (written exactly as your response in 'Regular Schedule'. e.g. Monday)" class="Input flex" style="min-width:0;">
		</div>
		<div class="card-list-item">
				<input type=text placeholder="Start date (mm/dd/yyyy)" class="Input flex" style="min-width:0;">
				<input type=text placeholder="End date (mm/dd/yyyy)" class="Input flex" style="min-width:0;">
		</div>
		<div class="card-list-item">
			<div class="column">
				<label>
					<input type=checkbox class="Input" style="height:18px;width:18px;">
					No school on Mondays
				</label>
				<label>
					<input type=checkbox class="Input" style="height:18px;width:18px;">
					No school on Tuesdays
				</label>
				<label>
					<input type=checkbox class="Input" style="height:18px;width:18px;">
					No school on Wednesdays
				</label>
				<label>
					<input type=checkbox class="Input" style="height:18px;width:18px;">
					No school on Thursdays
				</label>
				<label>
					<input type=checkbox class="Input" style="height:18px;width:18px;">
					No school on Fridays
				</label>
				<label>
					<input type=checkbox class="Input" style="height:18px;width:18px;">
					No school on Saturdays
				</label>
				<label>
					<input type=checkbox class="Input" style="height:18px;width:18px;">
					No school on Sundays
				</label>
			</div>
		</div>
		<div class="card-list-item">
			<button class="Button fluid" style="flex-shrink:0;">Save changes</button>
		</div>
	</section>
	
	<section class="card" style="margin-top:15px;">
		<div class="card-list-item">
			<div class="card-list-item-primary">
				<h2 class="card-title card-title--large">Exceptions to your regular schedule</h2>
				<p class="card-subtitle card-subtitle--large">Write the period name first. Put the period time below it or to the right. You must specify am or pm. To specify the date of the schedule exception, add a "#" and a date (mm/dd/yyyy). To delete a date (e.g. holidays, breaks, etc.), simply include a "#" and a date (mm/dd/yyyy) without adding a schedule.</p>
				<details>
					<summary style="padding:15px;">Click to see example</summary>
					<p class="card-subtitle user-content" style="max-height:500px;overflow:auto;"># 09/01/2019
Freshman orientation 7:30am - 8:00am
P1 8:00am - 8:15am
P2 8:20am - 8:35am
P3 8:40am - 8:55am
P4 9:00am - 9:15am
P5 9:20am - 9:35am
P6 9:40am - 9:55am

# 10/31/2019
Period 1
8:00am - 8:55am

Period 2
9:00am - 9:55am

Homeroom/Study Hall
10:00am - 10:25am

Period 3
10:30 - 11:25am

Period 4
11:20pm - 12:25pm

Costume party (w/ food)
12:30pm - 1:55pm

Period 6
2:00pm - 2:55pm

# 11/28/2019


Period 1
8:00am - 8:55am

Period 2
9:00am - 9:55am

Period 3
10:00am - 10:55am

Period 4
11:00am - 11:55am

Thanksgiving dinner (w/ food)
12:30pm - 1:55pm

Period 6
1:30pm - 2:25pm

Afterschool Thanksgiving festivities
2:30pm - 2:55pm

# 12/25/2019

# 01/01/2019

					</p>
				</details>
			</div>
		</div>
			</div>
		</div>
			
		<div class="card-list-item">
			<div class="card-list-item-primary">
				<textarea id="addSchedules" class="Input fluid" style="height:500px;" placeholder="Add schedule"></textarea>
			</div>
			<div id="checkSchedules" class="card-list-item-primary" style="height:500px;overflow:auto;">
				<h2 class="card-title">What we see...</h2>
			</div>
		</div>
		<div class="card-list-item">
			<div class="card-list-item-primary">
				<button class="Button fluid">Save changes</button>
				<button id="buttonCheckSchedule" class="Button Button--outline fluid">Check schedule</button>
			</div>
		</div>
	</section>
	
	<section class="card" style="margin-top:15px;">
		<div class="card-list-item">
			<div class="card-list-item-primary">
				<h2 class="card-title card-title--large">School name</h2>
			</div>
		</div>
		<div class="card-list-item">
			<input type=text placeholder="Enter a school name" class="Input fluid">
			<button class="Button" style="flex-shrink:0;">Save changes</button>
		</div>
	</section>
	
	<section class="card" style="margin-top:15px;">
		<div class="card-list-item">
			<div class="card-list-item-primary">
				<h2 class="card-title card-title--large">Email domain authentication</h2>
				<h3 class="card-subtitle card-subtitle--large">How it works</h3>
				<p class="card-subtitle" style="line-height:1.5">Those who sign in using an email address ending with your domain will be automatically entered into your school. If your district has multiple schools, make sure email domains are scoped to a specific school. E.g. ms.yourschool.org, elem.yourschool.org, etc.</p>
			</div>
		</div>
		<div class="card-list-item">
			<input type=text placeholder="Enter your domain or subdomain (e.g. elem.yourschool.org)" class="Input fluid">
			<button class="Button" style="flex-shrink:0;">Save changes</button>
		</div>
	</section>
	
	<section class="card" style="margin-top:15px;">
		<div class="card-list-item">
			<div class="card-list-item-primary">
				<h2 class="card-title card-title--large">School code</h2>
				<p class="card-subtitle card-subtitle--large">Your school code is <span id="schoolCode"></span></p>
				<p class="card-subtitle" style="line-height:1.5">Sharing your school code is <strong>strongly discouraged</strong>. <strong>Anyone with your school code</strong> can read your school data, including but not limited to schedules, absent teacher boards, and announcements. Instead, enable authentication by email domain.</p>
			</div>
		</div>
	</section>
	
	
	
	
</section>`;
	openAdminDash();
}


