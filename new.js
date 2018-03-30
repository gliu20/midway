var DEBUG = true;
var UPDATE_INTERVAL = 2 * 60 * 60 * 1000; //two hrs

function runScript (script, signature) {
  if (signature !== "geo") {//stop running if passcode doesn't match
    if (DEBUG) {
      console.error("Signature does not match");
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

function getItem (url,callback) {
  var xhttp = new XMLHttpRequest();
    
  xhttp.onload = function () {//get item
    callback(this.responseText);
  };
    
  xhttp.onerror = function () {
    callback(this.responseText);
  };
    
  xhttp.open("GET", url, true);
  xhttp.send();
}

//"permissions":["storage"]
//"content_security_policy": "script-src 'self' https://ssl.google-analytics.com; object-src 'self'"
//manifest "web_accessible_resources": ["script.js"]
