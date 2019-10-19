document.getElementById("signInWithGoogle").addEventListener("click",function () {
	chrome.runtime.sendMessage({type: "toBackground-forceSignIn"})
})

document.getElementById("signOut").addEventListener("click",function () {
	chrome.runtime.sendMessage({ type:"toBackground-signOut" });
	
	notSignedIn();
})


document.getElementById("resetSchoolCode").addEventListener("click",function () {
	chrome.runtime.sendMessage({ type: "toBackground-clearCache" })

	// this will delete schoolCode
	// TODO is there better way to upload schoolCode?
	chrome.runtime.sendMessage({
		type: "toBackground-checkSchoolCode",
		schoolCode:"",
		needUpload:true
	})

	// this will check if you have a school code by email
	// if it exists, you will be signed in
	// otherwise, nothing will happen
	chrome.runtime.sendMessage({ type: "toBackground-checkAuthStatus" });
})

document.getElementById("schoolCodeForm").addEventListener("submit",function (e) {
	e.preventDefault();
	chrome.runtime.sendMessage({ type: "toBackground-clearCache" })
	chrome.runtime.sendMessage({
		type: "toBackground-checkSchoolCode",
		schoolCode:document.getElementById("schoolCode").value,
		needUpload:true
	})
})


function notSignedIn () {
	document.getElementById("notSignedIn").style.display = "";
	document.getElementById("signedIn").style.display = "none";
}

function signedIn () {
	document.getElementById("notSignedIn").style.display = "none";
	document.getElementById("signedIn").style.display = "";
}

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
				signedIn();
			}
			else {
				// not good
				notSignedIn()
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



// check authstatus
setTimeout(function () {
	chrome.runtime.sendMessage({ type:"toBackground-checkAuthStatus"  });
},200)

