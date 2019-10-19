

document.getElementById("timeboxConstrainPos").addEventListener("change",function (e) {
	if (document.getElementById("timeboxConstrainPos").checked) {
		chrome.runtime.sendMessage({ type:"toBackground-doConstrainPos" });
	}
	else {
		chrome.runtime.sendMessage({ type:"toBackground-dontConstrainPos" });
	}
	
})

document.getElementById("timeboxShimmer").addEventListener("change",function (e) {
	if (document.getElementById("timeboxShimmer").checked) {
		chrome.runtime.sendMessage({ type:"toBackground-enableShimmer" });
	}
	else {
		chrome.runtime.sendMessage({ type:"toBackground-disableShimmer" });
	}
	
})

document.querySelectorAll(".timebox-format").forEach(function (ele) {
	ele.addEventListener("click",function () {
		chrome.runtime.sendMessage({ type:"toBackground-storeTimeboxType",
			format: ele.getAttribute("data-type")
		});
		
		document.querySelectorAll(".timebox-format").forEach((ele) => {
			ele.classList.remove("active");
		})
		
		ele.classList.add("active");
	})
})



chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.type === "toContentScript-updateConstrain") {
			document.getElementById("timeboxConstrainPos").checked = request.shouldConstrain;
		}
		else if (request.type === "toSettings-returnTimeboxType") {
			document.querySelectorAll(".timebox-format").forEach(function (ele) {
				
				ele.classList.remove("active");
				
				if (ele.getAttribute("data-type") === request.format) {
					ele.classList.add("active");
				}
			})

		}
		else if (request.type === "toSettings-returnShimmer") {
			document.getElementById("timeboxShimmer").checked = request.shimmer;
			
		}
	}
);


chrome.runtime.sendMessage({ type:"toBackground-returnConstrain" });
chrome.runtime.sendMessage({ type:"toBackground-returnTimeboxType" });
chrome.runtime.sendMessage({ type:"toBackground-returnShimmer" });

setTimeout(function () {
	chrome.runtime.sendMessage({ type:"toBackground-returnConstrain" });
	chrome.runtime.sendMessage({ type:"toBackground-returnTimeboxType" });
	chrome.runtime.sendMessage({ type:"toBackground-returnShimmer" });
},200)
