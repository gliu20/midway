thMoP5AVjDh6I7kDtZSvECu
//make drag
  (function(b) {
    (function () {
      function c(e) {
        e = e || window.event;
        a = d - e.clientX;
        f = g - e.clientY;
        d = e.clientX;
        g = e.clientY;
        b.style.top = b.offsetTop - f + "px";
        b.style.left = b.offsetLeft - a + "px"
      }
      function h() {
        document.onmouseup = null;
        document.onmousemove = null
      }
      var a = 0,
          f = 0,
          d = 0,
          g = 0;
      b.onmousedown = function(a) {
        a = a || window.event;
        d = a.clientX;
        g = a.clientY;
        document.onmouseup = h;
        document.onmousemove = c
      }
    })();
    //make sure not offscreen
//    setInterval(function(){
//var a = b;
//var x = Number(a.style.top.substr(0,a.style.top.length-2));
//var y = Number(a.style.left.substr(0,a.style.left.length-2));
//stop if hidden
//      if (x == -999 & y == -999) return;
      
//var w = document.body.offsetHeight > innerHeight ? innerHeight : document.body.offsetHeight
//var h = document.body.offsetWidth > innerWidth ? innerWidth : document.body.offsetWidth
//if (x > w-a.clientHeight) x = w-a.clientHeight;
//if (y > h-a.clientWidth) y = h-a.clientWidth;
//if (x < 0) x = 0;
//if (y < 0) y = 0;
//a.style.top = x + "px";
//a.style.left = y + "px";
//},50)
    
  })(document.querySelector("#midway-timebox-mOX20mazjLAQP2s4a1bIztb7b33tcShpcTYCVw72w5KvHAFFgZ"));
