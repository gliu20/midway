// add version info
document.querySelectorAll(".version").forEach(function (item) {
	item.innerText = chrome.runtime.getManifest().version;
})
