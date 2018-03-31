document.getElementById("close").addEventListener("click",function () {
  chrome.app.window.current().close()
});
document.getElementById("hide").addEventListener("click",function () {
  chrome.app.window.current().minimize()
});

(function () {
  var open = false;
  document.getElementById("expand").addEventListener("click",function () {
    if (!open) {
      document.getElementById("expand").style.backgroundImage = 'url("collapse.png")';
      chrome.app.window.current().innerBounds.height = 300;
    }
    else {
      document.getElementById("expand").style.backgroundImage = 'url("expand.png")';
      chrome.app.window.current().innerBounds.height = 103;
    }
    open = !open;
  });
})();