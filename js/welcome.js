// redirect to welcome page
if (window.location.hash === "") {
	var redirect = document.createElement("a");
	
	redirect.href = "#welcome";
	
	document.body.appendChild(redirect);
	redirect.click();
}
