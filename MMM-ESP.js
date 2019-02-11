//helloworld.js:

Module.register("MMM-ESP", {
  // Default module config.
  defaults: {
    text: "there should be some data around here"
  },

  setPosition: function(pos) {
		//Add css to body depending on the set position for notifications
		var sheet = document.createElement("style");
		if (pos === "center") {sheet.innerHTML = ".ns-box {margin-left: auto; margin-right: auto;text-align: center;}";}
		if (pos === "right") {sheet.innerHTML = ".ns-box {margin-left: auto;text-align: right;}";}
		if (pos === "left") {sheet.innerHTML = ".ns-box {margin-right: auto;text-align: left;}";}
    document.body.appendChild(sheet);
    
  },

  

  // Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.config.text;
		return wrapper;
	},

  getData() {


    var response, xmlhttp;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://10.10.10.166", false);
    xhttp.send()
    var celsius = xhttp.responseText;
    document.getElementById("test").innerHTML = "bruh shit works " + celsius;
  }
});