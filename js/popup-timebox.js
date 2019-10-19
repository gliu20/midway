// rename ids for buttons to be consistent with rest of naming scheme
// e.g. rename toggleTimeBox to toggleTimebox etc.

var toggleTimeBoxEnabled = true;

document.getElementById("toggleTimeBox").addEventListener("click",function () {
	if (toggleTimeBoxEnabled) {
		chrome.runtime.sendMessage({ type:"toBackground-showTimebox" })
	}
});

document.getElementById("rePositionTimeBox").addEventListener("click",function () {
	chrome.runtime.sendMessage({ type:"toBackground-resetPosition" })
});

chrome.runtime.sendMessage({ type: "toBackground-returnCurrentPeriodInfo" });

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.type === "toPopup-enableTimebox") {
			toggleTimeBoxEnabled = true;
			document.getElementById("toggleTimeBox").classList.remove("disabled");
			document.getElementById("toggleTimeBox").querySelector("span").innerText = "Show timebox";
			document.getElementById("rePositionTimeBox").style.display = "inherit";
		}
		else if (request.type === "toPopup-disableTimebox") {
			toggleTimeBoxEnabled = false;
			document.getElementById("toggleTimeBox").classList.add("disabled");
			document.getElementById("toggleTimeBox").querySelector("span").innerText = "Controls disabled. No ongoing periods.";
			document.getElementById("rePositionTimeBox").style.display = "none";
		}
	}
)