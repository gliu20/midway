// STATUS:
// 1. timebox location and visibility persistence works
// 2. add code to request and display time info works

let timebox = {};

timebox.add = function () {

	var e = document.createElement("div");
	
	// by default, timebox will be out of view until the background
	// tells us where we are
	e.style.display = "none";
	
	e.style.position = "fixed";
	e.style.zIndex = "2147483647";
	e.id = "midway-timebox";
	
	// load in midway timebox
	// no need to sanitize here; this is hard-coded input (not user input)
	e.innerHTML = `<style>
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
	document.getElementById("midway-line-1").innerText = line1 || "";
	document.getElementById("midway-line-2").innerText = line2 || "";
	document.getElementById("midway-line-3").innerText = line3 || "";
}

timebox.makeDraggable = function () {
	var ele = document.getElementById("midway-timebox");

	let prevX = 0; 
	let prevY = 0; 
	
	ele.onmousedown = function (ev) {
		prevX = ev.clientX;
		prevY = ev.clientY;
		
		document.addEventListener('mousemove', whileMouseDown, false);
	};
	
	ele.onmouseup = function () {
		document.removeEventListener('mousemove', whileMouseDown, false);
	};
	
	function whileMouseDown (ev) {
		
		ele.style.top = ev.clientY - prevY + ele.offsetTop + "px";
		ele.style.left = ev.clientX - prevX + ele.offsetLeft + "px";
		
		chrome.runtime.sendMessage({
			type:"toBackground-storePosition",
			
			x: ele.style.left,
			y: ele.style.top
		});
		
		prevX = ev.clientX;
		prevY = ev.clientY;
	}
}

timebox.makeHideable = function () {
	var ele = document.getElementById("midway-close");
	
	ele.onclick = function () {
		timebox.hide();
		chrome.runtime.sendMessage({ type:"toBackground-hideTimebox" });
	}
}

timebox.init = function () {
	timebox.add();
	timebox.makeDraggable();
	timebox.makeHideable();
	
	chrome.runtime.sendMessage({ type:"toBackground-returnCurrentPeriodInfo" });
	chrome.runtime.sendMessage({ type:"toBackground-returnPosition" });
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.type === "toContentScript-updatePosition") {
			var ele = document.getElementById("midway-timebox");
			
			ele.style.top = request.y;
			ele.style.left = request.x;
			
			// this will disconnect listeners in case we messed anything up
			// when we modified the location of the timebox
			ele.onmouseup(); 
		}
		else if (request.type === "toContentScript-showTimebox") {
			timebox.show();
		}
		else if (request.type === "toContentScript-hideTimebox") {
			timebox.hide();
		}
		else if (request.type === "toContentScript-displayCurrentPeriodInfo") {
			timebox.display(
				request.line1,
				request.line2,
				request.line3
			);
		}
	}
);

timebox.init();






