document.getElementById("schoolCodeForm").addEventListener("submit",function (e) {
	e.preventDefault();
	
	chrome.runtime.sendMessage({
		type: "toBackground-checkSchoolCode",
		schoolCode:document.getElementById("schoolCode").value,
		needUpload:true
	})
})

document.getElementById("signInWithGoogle").addEventListener("click",function () {
	chrome.runtime.sendMessage({type: "toBackground-forceSignIn"})
})


function invalidSchoolCode () {

	document.getElementById("loginInformation").innerText = `Your email address is not associated with any schools. Sign in with another account or enter a school code.`;
	document.getElementById("signInWithGoogle").innerHTML = `<img class="Icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20px"></img><span>Sign in with another account</span>`;

	document.getElementById("schoolCodeWrapper").style.display = "";
	document.getElementById("schoolCodeError").innerText = "Please submit a valid school code.";
			
	// blink error
	document.getElementById("schoolCodeError").className = "";
	setTimeout(function () {
		document.getElementById("schoolCodeError").className = "blink";
	},200);
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.type === "toPopup-invalidSchoolCode") {
			invalidSchoolCode();
		}
		else if (request.type === "toPopup-returnAuthStatus") {
			
			if (request.isSignedIn && request.hasSchoolCode) {
				document.getElementById("withSchoolCodeView").style.display = "";
				document.getElementById("withoutSchoolCodeView").style.display = "none";
				
				populateViews();
			}
			else {
				document.getElementById("withSchoolCodeView").style.display = "none";
				document.getElementById("withoutSchoolCodeView").style.display = "";
			}
			
			// if signed in but don't have school code
			if (!request.hasSchoolCode && request.isSignedIn) {
				invalidSchoolCode();
			}
		}
	}
);

chrome.runtime.sendMessage({ type: "toBackground-checkAuthStatus" })
