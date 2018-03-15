(function () {
	function addStyle (css) {
		var link = document.createElement('link');
		link.href = css;
		link.rel = "stylesheet";
		document.head.appendChild(link);
	}
	//function addElement (html) {
	//	document.body.innerHTML += html;
	//}

	addStyle("https://fonts.googleapis.com/css?family=Ubuntu");
	//addStyle("https://gliu20.github.io/midway/ext/css/timebox.css");

	class Midway extends HTMLElement {
		constructor() {
			super();
		
			let midway = this.attachShadow({mode:'open'});
			midway.innerHTML = '<style>.midway-OyOZQ5nBzEf3wxsbh1HS-top {-webkit-transition: opacity 0.3s ease;transition: all 0.3s ease;opacity:0.7;margin:0;padding:0;user-select:none;cursor:default;font-family:Ubuntu,"Ubuntu",Arial,sans-serif;font-size:75%;width:100px;height:103px;display:inline-block;box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);border-radius:2px;}.midway-OyOZQ5nBzEf3wxsbh1HS-top:hover {opacity:1;box-shadow:0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)}.midway-OyOZQ5nBzEf3wxsbh1HS-top h1,.midway-OyOZQ5nBzEf3wxsbh1HS-top p{margin:0}.midway-OyOZQ5nBzEf3wxsbh1HS-top button {-webkit-app-region: no-drag}.midway-OyOZQ5nBzEf3wxsbh1HS-window-header {height:32px;background:rgba(0,0,0,0.12)}.midway-OyOZQ5nBzEf3wxsbh1HS-window-header-button {float:right;height:32px;width:32px;border:none;background-color:rgba(0,0,0,0);color:#fff}.midway-OyOZQ5nBzEf3wxsbh1HS-window-header-button:focus {outline:0}.midway-OyOZQ5nBzEf3wxsbh1HS-window-header-button:hover {background-color:rgba(0,0,0,0.08);color:rgb(225,225,225)}.midway-OyOZQ5nBzEf3wxsbh1HS-window-header-button:active {background-color:rgba(0,0,0,0.16);color:rgb(200,200,200)}.midway-OyOZQ5nBzEf3wxsbh1HS-top {background:#5892dc;-webkit-app-region: drag}.midway-OyOZQ5nBzEf3wxsbh1HS-top-info-expand {margin:4.5px;margin-right:0;height:32px;width:32px;border:none;border-radius:999px;background-color:rgba(0,0,0,0);color:#fff}.midway-OyOZQ5nBzEf3wxsbh1HS-top-info-expand:focus {outline:0}.midway-OyOZQ5nBzEf3wxsbh1HS-top-info-expand:hover {background-color:rgba(0,0,0,0.08);color:rgb(225,225,225)}.midway-OyOZQ5nBzEf3wxsbh1HS-top-info-expand:active {background-color:rgba(0,0,0,0.16);color:rgb(200,200,200)}#midway-OyOZQ5nBzEf3wxsbh1HS-close {background-image:url(https://gliu20.github.io/midway/ext/icons/close.png);background-size:32px;}#midway-OyOZQ5nBzEf3wxsbh1HS-hide {background-image:url(https://gliu20.github.io/midway/ext/icons/hide.png);background-size:32px;}#midway-OyOZQ5nBzEf3wxsbh1HS-expand {background-image:url(https://gliu20.github.io/midway/ext/icons/expand.png);background-size:32px;}</style><div class="midway-OyOZQ5nBzEf3wxsbh1HS-top"><header class="midway-OyOZQ5nBzEf3wxsbh1HS-window-header"><button id="midway-OyOZQ5nBzEf3wxsbh1HS-close" class="midway-OyOZQ5nBzEf3wxsbh1HS-window-header-button"></button><button id="midway-OyOZQ5nBzEf3wxsbh1HS-hide" class="midway-OyOZQ5nBzEf3wxsbh1HS-window-header-button"></button></header><div style="padding:15px;color:#fff;display:flex;"><div style="display:inline-block;flex:999;"><h1>8:52</h1><p>Period 1</p></div><div style="display:none;flex:1;"><button id="midway-OyOZQ5nBzEf3wxsbh1HS-expand" class="midway-OyOZQ5nBzEf3wxsbh1HS-top-info-expand"></button></div></div></div>'
	
		}
	}


	customElements.define('midway-time-box',Midway);

	var m = document.createElement('midway-time-box');
	m.style.position = "absolute";
	m.style.top = "0px";
	m.style.left = "0px";
	m.style.zIndex = "999";
	document.body.appendChild(m);
})();
