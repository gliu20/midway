//progressive enhancements





addAllShadows();


finishPreload();

function finishPreload () {
  setTimeout(function () {
    document.body.classList.remove("preload");
  },200);
}

function addShadow (shadow,scroll) {
  shadow.classList.remove("shadow");
  
  scroll.addEventListener("scroll",function () {
    if (scroll.scrollTop === 0) {
      shadow.classList.remove("shadow")
    }
    else {
      shadow.classList.add("shadow")
    }
  });
}

function addAllShadows () {
	var contents = document.querySelectorAll(".content");
	
	for (var i = 0; i < contents.length; i++) {
	
		addShadow(
			document.querySelector(".toolbar"),
			contents[i]
		);
	}
}
/*
//defer loading of css until page has almost fully loaded
//disabled for testing purposes
//TODO renable
//deferCSS("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic");
function deferCSS (url) {
  var ele = document.createElement("link");
  ele.rel = "stylesheet";
  ele.href = url;
  ele.type = "text/css";
  document.head.appendChild(ele);
}*/
