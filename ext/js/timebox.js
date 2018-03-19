(function () {
	function addStyle (css) {
		var link = document.createElement('link');
		link.href = css;
		link.rel = "stylesheet";
		document.head.appendChild(link);
	}
	

	addStyle("https://fonts.googleapis.com/css?family=Ubuntu");

	class Midway extends HTMLElement {
		constructor() {
			super();
		        
			const close = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABAUlEQVR42u2YsQ3CMBAAKSgZICOwEWVKCgqLCRggBWIOxmAIRmCMxwiQrAhCkv/C/9xJbi3fJbLyWSwAAAAAAAAAAABAi4g0ebWG++3yWnmSv8qTZLDf8bXXpfoIPXnRRijkxUWEfLhOPpMM5N9sag6wzOusjTAgnzzcAaoIruW1EULIz40QSn5qhJDyYyOElh8ZIbb8jAjx5CdEiCtfRDj9bYCBCy9+hJHyMSMMyO8tZgev8slygHIpbz1FupQPGWHu522ICNpve9cR8gEPFgf/EaGtOcA6r5vFU/sS4fHDtan9LSgjJOVeZYT65XsRtoYDVOdGHgAAAAAAAAAAoG7uX3K+/0BRgn0AAAAASUVORK5CYII="
			const collapse = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAuElEQVR42u3SsQnCQBiGYQdwEIdwBwvHsHCQ7OACDuAAAVdxAEvB84oEQtAkJiDn3fPA36W49yOrFQAAAAAAwA+EEE7xqpLjW1XJ8WWNEEOP4b1nvH2p8a1HtiNMiM93hIH4a3P5jjAQX8dbN1dnOcJYfOe7/EaYGp/lCN/GZzXC3PgsRogPPCyJnzjCLuUBtvHuS+JHRrjF26T+F3RHmBX/YYT043sjXJbE90Y4/008AAAAAACQrBd0OKtJTk1kMgAAAABJRU5ErkJggg==";
			const expand = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAvklEQVR42u3X0QmCUBiGYS8cohHaqhEaoQG66LIhjGZwi0ZojNOBDEKMjp4IPT4P/Lfi+yFBVQUAAAAAAJAhhLCNd45X/+BZdbxjvM2S4u/hqckZoYtvumfdZj9CLz7kjNCLD4sYIb7cIQwbNcKH+Jfd3L+CU84IX+L3S/kdmDRCEfFTRygqfuwIRcanjlB0fMIIl+7KjU8Yofz4kSOUGZ84QtnxbyO0A/HXtf1jbFcb3xthnfEAAAAAAMDfPQAKfKtV2rZtjgAAAABJRU5ErkJggg==";
			const hide = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAS0lEQVR42u3UQQkAIBBEUVtvDCMYxWirBwOIsODhPZgC/zCtAQAAAAAAAAAAAFzIzNgbxYufA8ysNwUQ4N8A/USoXPe2AAAAAPBsAUz685jg456PAAAAAElFTkSuQmCC";
			
			let midway = this.attachShadow({mode:'open'});
			midway.innerHTML = '<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet"><style>h1 {display: block;font-size: 2em;-webkit-margin-before: 0.67em;-webkit-margin-after: 0.67em;-webkit-margin-start: 0px;-webkit-margin-end: 0px;font-weight: bold;}p {display: block;-webkit-margin-before: 1em;-webkit-margin-after: 1em;-webkit-margin-start: 0px;-webkit-margin-end: 0px;}.midway-OyOZQ5nBzEf3wxsbh1HS-top {-webkit-transition: opacity 0.3s ease;transition: all 0.3s ease;opacity:0.7;margin:0;padding:0;user-select:none;cursor:default;font-family:Ubuntu,"Ubuntu",Arial,sans-serif;font-size:13px;display:inline-block;box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);border-radius:2px;}.midway-OyOZQ5nBzEf3wxsbh1HS-top:hover {opacity:1;box-shadow:0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)}.midway-OyOZQ5nBzEf3wxsbh1HS-top h1,.midway-OyOZQ5nBzEf3wxsbh1HS-top p{margin:0}.midway-OyOZQ5nBzEf3wxsbh1HS-top button {-webkit-app-region: no-drag}.midway-OyOZQ5nBzEf3wxsbh1HS-window-header {height:32px;background:rgba(0,0,0,0.12)}.midway-OyOZQ5nBzEf3wxsbh1HS-window-header-button {float:right;height:32px;width:32px;border:none;background-color:rgba(0,0,0,0);color:#fff}.midway-OyOZQ5nBzEf3wxsbh1HS-window-header-button:focus {outline:0}.midway-OyOZQ5nBzEf3wxsbh1HS-window-header-button:hover {background-color:rgba(0,0,0,0.08);color:rgb(225,225,225)}.midway-OyOZQ5nBzEf3wxsbh1HS-window-header-button:active {background-color:rgba(0,0,0,0.16);color:rgb(200,200,200)}.midway-OyOZQ5nBzEf3wxsbh1HS-top {background:#5892dc;-webkit-app-region: drag}.midway-OyOZQ5nBzEf3wxsbh1HS-top-info-expand {margin:4.5px;margin-right:0;height:32px;width:32px;border:none;border-radius:999px;background-color:rgba(0,0,0,0);color:#fff}.midway-OyOZQ5nBzEf3wxsbh1HS-top-info-expand:focus {outline:0}.midway-OyOZQ5nBzEf3wxsbh1HS-top-info-expand:hover {background-color:rgba(0,0,0,0.08);color:rgb(225,225,225)}.midway-OyOZQ5nBzEf3wxsbh1HS-top-info-expand:active {background-color:rgba(0,0,0,0.16);color:rgb(200,200,200)}#midway-OyOZQ5nBzEf3wxsbh1HS-close {background-image:url('+close+');background-size:32px;}#midway-OyOZQ5nBzEf3wxsbh1HS-hide {background-image:url('+hide+');background-size:32px;}#midway-OyOZQ5nBzEf3wxsbh1HS-expand {background-image:url('+expand+');background-size:32px;}</style><div class="midway-OyOZQ5nBzEf3wxsbh1HS-top"><!--<header class="midway-OyOZQ5nBzEf3wxsbh1HS-window-header"><button id="midway-OyOZQ5nBzEf3wxsbh1HS-expand" class="midway-OyOZQ5nBzEf3wxsbh1HS-window-header-button"></button><button id="midway-OyOZQ5nBzEf3wxsbh1HS-hide" class="midway-OyOZQ5nBzEf3wxsbh1HS-window-header-button"></button></header>--><div style="padding:15px;color:#fff;display:flex;"><div style="display:inline-block;flex:999;"><h1 id="midway-time">0:00</h1><p id="midway-period">Loading...</p></div><div style="display:inline-block;flex:1;"><button id="midway-OyOZQ5nBzEf3wxsbh1HS-close" class="midway-OyOZQ5nBzEf3wxsbh1HS-top-info-expand"></button></div></div></div>'
			
		}
	}


	customElements.define('midway-time-box',Midway);

	var m = document.createElement('midway-time-box');
	m.style.position = "fixed";
	m.style.top = "0px";
	m.style.left = "0px";
	m.style.zIndex = "99999999";
	document.body.appendChild(m);
	
	//attach close events
	document.querySelector("midway-time-box").shadowRoot.querySelector("#midway-OyOZQ5nBzEf3wxsbh1HS-close").addEventListener("click",function () {document.querySelector("midway-time-box").shadowRoot.querySelector(".midway-OyOZQ5nBzEf3wxsbh1HS-top").remove()});
	
	//make drag
	(function(b){function c(e){e=e||window.event;a=d-e.clientX;f=g-e.clientY;d=e.clientX;g=e.clientY;b.style.top=b.offsetTop-f+"px";b.style.left=b.offsetLeft-a+"px"}function h(){document.onmouseup=null;document.onmousemove=null}var a=0,f=0,d=0,g=0;b.onmousedown=function(a){a=a||window.event;d=a.clientX;g=a.clientY;document.onmouseup=h;document.onmousemove=c}})(document.querySelector("midway-time-box"));

})();
(function () {
	var main = setInterval(function () {
		timeUpdate();
	},100);

	setTimeout(function () {
		clearInterval(main);
		main = setInterval(function () {
			timeUpdate();
		},5000);
	}, 5000)

	window.onblur = function () {
		clearInterval(main)
	}

	window.onfocus = function () {
		main = setInterval(function () {
			timeUpdate();
		},5000);
	}

	function timeUpdate () {
  
 	 function formatTime (mins) {
		 function addZero(num) {
			 num = num.toString();
			 if (num.length < 2) {
				 num = "0" + num;
			 }
			 if (num.length < 2) {
				 num = "0" + num;
			 }
			 return num;
		 }
		  return Math.floor(mins / 60) % 12 + ":" + addZero(mins % 60); 
 	 }
  
 	function distNum (a,b) {
  	  return Math.abs(b - a)
  	}
  
  	var currTime = new Date();
  	var day = currTime.getDay() - 1;
  	var hrs = currTime.getHours();
  	var min = currTime.getMinutes();
  	var minsFromDayStart = hrs * 60 + min;
  //[531, 587, 643, 699, 784, 839, 895];
//[531, 587, 597, 653, 709, 794, 849, 905]
  	//var timeTable = [
    	//{
     	//	"531":"Period 1",
      	//	"587":"Period 2",
     	// 	"643":"Period 3",
     	// 	"699":"Period 4",
    	//  	"729":"1st Lunch",
   	//  	"784":"Period 5A",
    	//  	"758":"2nd Lunch",
   	//   	"784":"Period 5B",
   	//	"895":"Period 7"
    	//},
   	  //   	{
     	////	"531":"Period 1",
      		//"587":"Period 2",
		//"597":"Homeroom",
     	// 	"653":"Period 3",
     	 ///	"709":"Period 4",
    	  //	"739":"1st Lunch",
   	   ///	"794":"Period 5A",
    	  	//"768":"2nd Lunch",
  /// 	   	"794":"Period 5B",
   //		"905":"Period 7"
    //	},
    //	{
     //		"531":"Period 1",
      //		"587":"Period 2",
     	// 	"643":"Period 3",
     	 //	"699":"Period 4",
    	  //	"729":"1st Lunch",
   	   ///	"784":"Period 5A",
    	  	//"758":"2nd Lunch",
//   	   	"784":"Period 5B",
  // 		"895":"Period 7"
    //	},
    //{
     //		"531":"Period 1",
      //		"587":"Period 2",
	//	"597":"Homeroom",
     	 ///	"653":"Period 3",
     	 //	"709":"Period 4",
    	  //	"739":"1st Lunch",
   	   //	"794":"Period 5A",
    	  //	"768":"2nd Lunch",
   	   //	"794":"Period 5B",
   		//"905":"Period 7"
//    	},
  //      	{
    // 		"531":"Period 1",
      //		"587":"Period 2",
     	// 	"643":"Period 3",
     	 //	"699":"Period 4",
    	  //	"729":"1st Lunch",
   	   //	"784":"Period 5A",
    	  //	"758":"2nd Lunch",
   	   //	"784":"Period 5B",
   		//"895":"Period 7"
    	//},
  //]
  
  //if (!!timeTable[day]) {//check to make sure it is school day
  //  var currentSmallestDist = 1000000000000000000000000000000;
  //  var ans = 1000000000000000000000000000000;
  //  for (var timeInMins in timeTable[day]) {
	    
 //     if (Number(timeInMins) < minsFromDayStart && distNum(Number(timeInMins), minsFromDayStart) < currentSmallestDist) {
//        ans = timeInMins;
   //     currentSmallestDist = distNum(Number(timeInMins), minsFromDayStart);
   //   }
   // }
  //  document.querySelector("midway-time-box").shadowRoot.querySelector("#midway-time").innerText = formatTime(ans);
  //  document.querySelector("midway-time-box").shadowRoot.querySelector("#midway-period").innerText = timeTable[day][ans]; 
 // }
		
    var timeTable = [
	    {
		    "periodName":["Period 1","Period 2","Period 3","Period 4","1st Lunch","1st Class","Period 5","Period 6","Period 7"],
		    "periodEnd":[531, 587, 643, 699, 729, 754, 784, 839, 895]
	    },
	    {
		    "periodName":["Period 1","Period 2","Homeroom","Period 3","Period 4","1st Lunch","1st Class","Period 5","Period 6","Period 7"],
		    "periodEnd":[531, 587, 597, 653, 709, 739, 764, 794, 849, 905]
	    },
	    {
		    "periodName":["Period 1","Period 2","Period 3","Period 4","1st Lunch","1st Class","Period 5","Period 6","Period 7"],
		    "periodEnd":[531, 587, 643, 699, 729, 754, 784, 839, 895]
	    },
	    {
		    "periodName":["Period 1","Period 2","Homeroom","Period 3","Period 4","1st Lunch","1st Class","Period 5","Period 6","Period 7"],
		    "periodEnd":[531, 587, 597, 653, 709, 739, 764, 794, 849, 905]
	    },
	    {
		    "periodName":["Period 1","Period 2","Period 3","Period 4","1st Lunch","1st Class","Period 5","Period 6","Period 7"],
		    "periodEnd":[531, 587, 643, 699, 729, 754, 784, 839, 895]
	    }
    ];
		
    var periodEnd = timeTable[day]["periodEnd"];
    for (var i = 0; i < periodEnd.length; i++) {
	    if (periodEnd[i] > minsFromDayStart) {
		    break;
	    }
    }
    var currPeriodEnd = periodEnd[i];
		var currPeriodName = timeTable[day]["periodName"][i];
    document.querySelector("midway-time-box").shadowRoot.querySelector("#midway-time").innerText = formatTime(currPeriodEnd);
		document.querySelector("midway-time-box").shadowRoot.querySelector("#midway-period").innerText = currPeriodName;
}
})();
