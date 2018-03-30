var DEBUG = true;
var UPDATE_INTERVAL = 2 * 60 * 60 * 1000; //two hrs
var DOMAIN = "https://gliu20.github.io/";
var SCRIPT_DOMAIN = DOMAIN + "src/js/";

run("timebox.js");

function run (scriptName) {
  getCachedScript(scriptName,SCRIPT_DOMAIN + scriptName,function (code) {
    var script = code.split('\n');
    var signature = script[0];
  
    script[0] = "";
  
    runScript(script,signature);
  });
}

function runScript (script, signature) {
  //worst possible form of 'security'
  if (signature !== "thMoP5AVjDh6I7kDtZSvECu") {//stop running if passcode doesn't match
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

function getCachedScript (name,url,callback) {
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
    
    if (!items[url].code) {//no update available, get from extension
      getScript(chrome.extension.getURL(name),callback);
      return;
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
//"content_security_policy": "script-src 'self' "https://gliu20.github.io/; object-src 'self'"
//manifest "web_accessible_resources": ["timebox.js"]
