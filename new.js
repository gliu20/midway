var DEBUG = true;
var UPDATE_INTERVAL = 2 * 60 * 60 * 1000; //two hrs

function runScript (script, signature) {
  if (signature !== "geo") {//stop running if passcode doesn't match
    if (DEBUG) {
      console.error("Signature does not match. Aborting.");
    }
    return false;
  }
  
  try {//run code
    window.eval(script);
  }
  catch (err) {//catch errors
    if (DEBUG) {
      console.error(err);
    }
  }
}

function getCachedScript (url,callback) {
  var defaultCache = {};
  defaultCache[url] = {code:"",lastUpdated:0};
  
  chrome.storage.local.get(defaultCache, function (items) {
    if (Date.now() - items[url].lastUpdated > UPDATE_INTERVAL) {
      getScript(url,function (code) {
        if(!code) {//no new version available
          return;
        }
        items[url] = {lastUpdated: Date.now(), code: code}
        chrome.storage.local.set(items);//update with new code
      });
    }
    
    callback(items[url].code);
  });
}

function getScript (url,callback) {
  var xhttp = new XMLHttpRequest();
    
  xhttp.onload = function () {//get item
    callback(this.responseText);
  };
    
  xhttp.onerror = function () {
    callback(this.responseText);
    if (DEBUG) {
      console.error("An error occured. Cannot get item");
    }
  };
    
  xhttp.open("GET", url, true);
  xhttp.send();
}

  
//"permissions":["storage"]
//"content_security_policy": "script-src 'self' https://ssl.google-analytics.com; object-src 'self'"
//manifest "web_accessible_resources": ["script.js"]
