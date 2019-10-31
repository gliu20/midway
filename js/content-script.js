
// prevent double runs
let runCode = (function () {

let timebox = {};

// the style.top / style.left values of the timebox
let timeboxOffsetX = 0;
	timeboxOffsetY = 0;

timebox.hasReceivedData = false;
timebox.shouldShow = false;
timebox.shouldConstrain = false;

timebox.add = function () {
	
	var dragShield = document.createElement("div");
	
	dragShield.style.display = "none";
	dragShield.style.position = "fixed";
	dragShield.style.zIndex = "2147483647";
	dragShield.style.width = "100%";
	dragShield.style.height = "100%";
	dragShield.style.top = "0px";
	dragShield.style.left = "0px";
	
	timebox.dragShield = dragShield;
	
	document.body.appendChild(dragShield);
	
	var e = document.createElement("div");
	
	// hide by default to prevent timebox blinking
	e.style.display = "none";
	
	//e.style.transition = "all 0.05s ease-out";
	e.style.position = "fixed";
	e.style.zIndex = "2147483647";
	e.id = "midway-timebox";
	
	// load in midway timebox
	// no need to sanitize here; this is hard-coded input (not user input)
	
	// shimmer is for those who take screenshot but don't realize it's
	// a screenshot (and thus not live)
	e.innerHTML = `<style>
		@keyframes shimmer {
			0% {
    			background-position-x: 0;
 			}
  			100% {
    			background-position-x: 999999px;
  			}
		}
		.midway-shimmer #midway-override-all-styles.midway {
			animation: shimmer 6000s infinite linear!important;
			background-image: linear-gradient(to right, #296dff 10%, #0f5bff 30%, #296dff 50%)!important;
		}
	</style>`;
		
	e.innerHTML += `<style>
		
		#midway-override-all-styles, #midway-override-all-styles * {
			all:initial;
		}
		#midway-override-all-styles.midway {
			user-select:none;
			display:flex;
			align-items:center;
			padding:15px;
			background:#0f5bff;
			font-size:16px;
			transition: all 0.3s ease;
			opacity: 0.7;
			border-radius:4px;
			box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
		}
		
		#midway-override-all-styles.midway, #midway-override-all-styles.midway * {
			color:#fff;
			font-family:Ubuntu, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		}

		#midway-override-all-styles.midway:hover {
			opacity: 1;
		    box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
		}
		#midway-override-all-styles .midway-primary * {margin:0;white-space: nowrap;}
		#midway-override-all-styles .midway-line-1 {
			display:block;
			font-size:24px;
			line-height:1.15;
			font-weight:700;
		}
		#midway-override-all-styles .midway-line-2 {
			display:block;
			font-size:12px;
			line-height:1.15;
			font-weight:500;
		}
		#midway-override-all-styles .midway-line-3 {
			display:block;
			font-size:12px;
			line-height:1.15;
			font-weight:normal;
		}

		#midway-override-all-styles .midway-close {
			background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABAUlEQVR42u2YsQ3CMBAAKSgZICOwEWVKCgqLCRggBWIOxmAIRmCMxwiQrAhCkv/C/9xJbi3fJbLyWSwAAAAAAAAAAABAi4g0ebWG++3yWnmSv8qTZLDf8bXXpfoIPXnRRijkxUWEfLhOPpMM5N9sag6wzOusjTAgnzzcAaoIruW1EULIz40QSn5qhJDyYyOElh8ZIbb8jAjx5CdEiCtfRDj9bYCBCy9+hJHyMSMMyO8tZgev8slygHIpbz1FupQPGWHu522ICNpve9cR8gEPFgf/EaGtOcA6r5vFU/sS4fHDtan9LSgjJOVeZYT65XsRtoYDVOdGHgAAAAAAAAAAoG7uX3K+/0BRgn0AAAAASUVORK5CYII=);
		    background-size: 32px;
		    margin: 8px;
		    margin-right: 0;
		    height: 32px;
		    width: 32px;
		    border: none;
		    border-radius: 999px;
		    background-color: rgba(0,0,0,0);
		    color: #fff;
		}
		#midway-override-all-styles .midway-close:focus {	
		    outline: 0;
		}
		#midway-override-all-styles .midway-close:hover {
		    background-color: rgba(0,0,0,0.08);
		    color: rgb(225,225,225);
		}
		#midway-override-all-styles .midway-close:active {
		    background-color: rgba(0,0,0,0.16);
		    color: rgb(200,200,200);
		}
		</style>
		<div class="midway" id="midway-override-all-styles">
			<div class="midway-primary">
				<h1 class="midway-line-1" id="midway-line-1">Loading...</h1>
				<h2 class="midway-line-2" id="midway-line-2"></h2>
				<p class="midway-line-3" id="midway-line-3"></p>
			</div>
			<div class="midway-secondary">
				<button class="midway-close" id="midway-close"></button>
			</div>
		</div>
	`.replace(/\;/g,"!important;");// make all rules important
	// to isolate styles from current page
	
	// append midway to the current page
	document.body.appendChild(e);
	
}

timebox.hide = function () {
	document.getElementById("midway-timebox").style.display = "none";
}

timebox.show = function () {
	document.getElementById("midway-timebox").style.display = "";
}

timebox.display = function (line1,line2,line3) {
	document.getElementById("midway-line-1").innerHTML = line1 || "";
	document.getElementById("midway-line-2").innerHTML = line2 || "";
	document.getElementById("midway-line-3").innerHTML = line3 || "";
}

timebox.makeDraggable = function () {
	let ele = document.querySelector("#midway-timebox");

let inDrag = false;

// position adjusted to coordinates in the timebox (w/ 0,0 being the to left
// corner of the timebox)
let posInTimeboxX = 0,
	posInTimeboxY = 0;

// mouse/touch position
let currX = 0,
	currY = 0;



let dragDebouncer = false,
	resizeDebouncer = false;

function debugDrag () {
	//console.log(`
	//	inDrag: ${inDrag}
	//	MouseX: ${currX}
	//	MouseY: ${currY}
	//	Adjusted MouseX: ${posInTimeboxX}
	//	Adjusted MouseY: ${posInTimeboxY}
	//`)
}

function constrainPos () {
	if (timeboxOffsetX < 0) { timeboxOffsetX = 0; }
	if (timeboxOffsetY < 0) { timeboxOffsetY = 0; }
	if (timeboxOffsetX > innerWidth - ele.offsetWidth) { 
		timeboxOffsetX = innerWidth - ele.offsetWidth; 
	}
	if (timeboxOffsetY > innerHeight - ele.offsetHeight) { 
		timeboxOffsetY = innerHeight - ele.offsetHeight; 
	}
}

function calculateTimeboxPos (ev) {
	// record mouse/touch position
	currX = ev.clientX || ev.touches && ev.touches[0] && ev.touches[0].clientX || 0;
	currY = ev.clientY || ev.touches && ev.touches[0] && ev.touches[0].clientY || 0;
	
	// limit mouse/touch position to only visible portion of screen
	if (currX < 0) { currX = 0; }
	if (currY < 0) { currY = 0; }
	
	if (currY > innerHeight) { currY = innerHeight; }
	if (currX > innerWidth) { currX = innerWidth; }
	
	// only record the change in mouse position in timebox if not dragging it
	// (you want the timebox to be in a location such that the posInTimeboxX 
	// and Y matches w/ when you first had mousedown)
	if (!inDrag) {
		posInTimeboxX = currX - ele.offsetLeft;
		posInTimeboxY = currY - ele.offsetTop;
	}
	else {
		timeboxOffsetX = currX - posInTimeboxX;
		timeboxOffsetY = currY - posInTimeboxY;
		
		if (timebox.shouldConstrain) {
			constrainPos();
		}
	}
}

function updateTimeboxPos () {// save move results
	// wait for browser to tell me to move instead of moving on my own
	// this means no race conditions
	ele.style.left = timeboxOffsetX + "px";
	ele.style.top = timeboxOffsetY + "px";
	chrome.runtime.sendMessage({
		type: "toBackground-storePosition",
		x: timeboxOffsetX +"px",
		y: timeboxOffsetY +"px"
	})
}

function handleDrag (ev) {

	if (dragDebouncer)
		return;
	
	dragDebouncer = true;
	
	// ensure it is not over running for performance
	requestAnimationFrame(function () {
		calculateTimeboxPos(ev);
		
		// only update position if dragging
		if (inDrag) {
			updateTimeboxPos();
			
			if (timebox.dragShield.style.display !== "") {
				timebox.dragShield.style.display = "";
			}
		}
		else {
			if (timebox.dragShield.style.display !== "none") {
				timebox.dragShield.style.display = "none";
			}
		}
		
		debugDrag();
		
		dragDebouncer = false;
	});
} 

function startDrag (ev) {
	ev.preventDefault();
	// first record cursor position info
	inDrag = false;
	calculateTimeboxPos(ev);
	
	// now let dragging do its thing
	inDrag = true;
	debugDrag();
}

function endDrag (ev) {
	inDrag = false;
	debugDrag();
}

function attachListeners () {
	document.addEventListener("mousemove",handleDrag);
	document.addEventListener("touchmove",handleDrag, { passive: true });

	ele.addEventListener("mousedown",startDrag);
	ele.addEventListener("touchstart",startDrag);

	document.addEventListener("mouseup",endDrag);
	document.addEventListener("touchend",endDrag, { passive: true });
	
	window.addEventListener('resize',function () {
		if (resizeDebouncer)
			return;
	
		resizeDebouncer = true;
		
		requestAnimationFrame(function () {
			if (timebox.shouldConstrain) {
				constrainPos();
				updateTimeboxPos();
			}
			resizeDebouncer = false;
		})
	})
}

attachListeners();
}

timebox.makeHideable = function () {
	var ele = document.getElementById("midway-close");
	
	// TODO DRY
	
	ele.addEventListener('click', function () {
		timebox.hide();
		chrome.runtime.sendMessage({ type:"toBackground-hideTimebox" });
	})
	
	// this is essentially click for touch events
	ele.addEventListener('touchend', function () {
		timebox.hide();
		chrome.runtime.sendMessage({ type:"toBackground-hideTimebox" });
	})
}

timebox.init = function () {
	if (window.location.host === "midway-application.firebaseapp.com" ||
		window.location.host === "midway-application.web.app" ||
		window.location.host === "accounts.google.com") {
		return;
	}

	timebox.add();
	timebox.makeDraggable();
	timebox.makeHideable();
	
	chrome.runtime.sendMessage({ type:"toBackground-returnCurrentPeriodInfo" });
	chrome.runtime.sendMessage({ type:"toBackground-returnPosition" });
	chrome.runtime.sendMessage({ type:"toBackground-returnConstrain" });
}

function pxToNum (px) {
		return Number(px.substr(0,px.length - 2));
	}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.type === "toContentScript-updatePosition") {
			var ele = document.getElementById("midway-timebox");
			
			
			timeboxOffsetX = pxToNum(request.x);
			timeboxOffsetY = pxToNum(request.y);
			
			ele.style.top = request.y;
			ele.style.left = request.x;
			
			// this will disconnect listeners in case we messed anything up
			// when we modified the location of the timebox
			// TODO actually this ele.onmouseup seems to be problematic
			// because it leads to early stopping of timebox dragging
			// making the timebox budge very little
			//ele.onmouseup(); 
		}
		else if (request.type === "toContentScript-updateConstrain") {
			timebox.shouldConstrain = request.shouldConstrain;
			
		}
		else if (request.type === "toContentScript-showTimebox") {
			// hide when no data is available;
			if (timebox.hasReceivedData) {
				timebox.show();
			}
			else {
				timebox.shouldShow = true;
				timebox.hide();
			}
		}
		else if (request.type === "toContentScript-hideTimebox") {
			timebox.hide();
			timebox.shouldShow = false;
		}
		else if (request.type === "toContentScript-displayCurrentPeriodInfo") {
			timebox.display(
				request.line1,
				request.line2,
				request.line3
			);
			
			timebox.hasReceivedData = true;
			
			// show timebox if needed
			if (timebox.shouldShow) {
				timebox.show();
			}
		}
		else if (request.type === "toContentScript-updateShimmer") {
			var ele = document.getElementById("midway-timebox");
			
			if (request.shimmer) {
				ele.className = "midway-shimmer";
			}
			else {
				ele.className = "";
			}
		}
	}
);

timebox.init();


})


if (document.readyState === "complete" || document.readyState === "interactive") {

	runCode();
}
else {
	window.addEventListener("load",function () {

		runCode();
	})
}



