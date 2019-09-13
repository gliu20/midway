let schTab = document.getElementById("schTab");
let absTab = document.getElementById("absTab");

var p1 = document.querySelector(".page1");
var p2 = document.querySelector(".page2");

let defocus = function (pageTo) {
  
  
  return function (e) {

    let src = e.target || e.srcElement;

  	schTab.blur();
  	absTab.blur();
	
  	schTab.classList.remove("title--active");
  	absTab.classList.remove("title--active");
  	
  	src.classList.add("title--active");
	  
	  clearPage()
	  
	  window[pageTo].classList.add("currPage");
	  
	  if (window[pageTo].scrollTop === 0) {
	    document.querySelector(".toolbar").classList.remove("shadow");
	  }
	  else {
	    document.querySelector(".toolbar").classList.add("shadow");
	  }
	  
  }
}

let clearPage = function () {
  p1.classList.remove("currPage");
	p2.classList.remove("currPage");
}

schTab.addEventListener("click",defocus("p1"));
absTab.addEventListener("click",defocus("p2"));
