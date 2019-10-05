// rename ids for buttons to be consistent with rest of naming scheme
// e.g. rename toggleTimeBox to toggleTimebox etc.

document.getElementById("toggleTimeBox").addEventListener("click",function () {
	chrome.runtime.sendMessage({ type:"toBackground-toggleTimebox" })
});

document.getElementById("rePositionTimeBox").addEventListener("click",function () {
	chrome.runtime.sendMessage({ type:"toBackground-resetPosition" })
});


