function runScript (script, signature) {
  if (signature !== "geo") {
    return false;
  }
  try {
    window.eval(script);
  }
  catch (err) {
    console.error(e);
  }
}
//manifest "web_accessible_resources": ["script.js"]
