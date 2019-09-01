document.getElementById("signOut").addEventListener("click",function () {
	chrome.runtime.sendMessage({ type:"toBackground-signOut" });
	
	// show ui for signed out people
	document.getElementById("loggedOut").style.display = "";
	document.getElementById("loggedIn").style.display = "none";
})


document.getElementById("schoolCodeForm").addEventListener("submit",function (e) {
	e.preventDefault();
	
	chrome.runtime.sendMessage({
		type: "toBackground-checkSchoolCode",
		schoolCode:document.getElementById("schoolCode").value,
		needUpload:true
	})
})


function invalidSchoolCode () {

	document.querySelector(".school").innerText = "none set";
	document.getElementById("schoolCodeWrapper").style.display = "";
	document.getElementById("schoolCodeError").innerText = "Please submit a valid school code.";
			
	// blink error
	document.getElementById("schoolCodeError").className = "";
	setTimeout(function () {
		document.getElementById("schoolCodeError").className = "blink";
	},200);
}


chrome.runtime.onMessage.addListener(
	async function (request, sender, sendResponse) {
		if (request.type === "toSettings-returnAuthStatus") {
			if (request.isSignedIn) {
				document.getElementById("loggedOut").style.display = "none";
				document.getElementById("loggedIn").style.display = "";
			}
			else {
				document.getElementById("loggedOut").style.display = "";
				document.getElementById("loggedIn").style.display = "none";
			}
			
			if (request.hasSchoolCode) {
				document.getElementById("schoolCodeError").innerText = "";
				chrome.runtime.sendMessage({ type:"toBackground-getSchoolName" });
			}
			else {
				invalidSchoolCode();
			}
		}
		// backward compatability for old code
		else if (request.type === "toSettings-invalidCode") {
			invalidSchoolCode();
		}
		else if (request.type === "toSettings-invalidSchoolCode") {
			invalidSchoolCode();
		}
		else if (request.type === "toSettings-returnSchoolName") {
			document.querySelector(".school").innerText = request.data || "none set";
		}
	}
)

chrome.runtime.sendMessage({ type:"toBackground-checkAuthStatus"  });
