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
