//helloworld.js:

var celsius;

Module.register("MMM-ESP", {
  // Default module config.
  defaults: {
    starttext: "there should be some data around here"
  },



  start: function () {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://10.10.10.166", false);
    xhttp.send()
    var celsius = xhttp.responseText;
    //document.getElementById("test").innerHTML = "bruh shit works " + celsius;
  

  },
  getDom: function() {
    var element = document.createElement("div")
  element.className = "myContent"
  element.innerHTML = celsius + this.config.starttext
  return element

  },
  notificationReceived: function() {

  },
  socketNotificationReceived: function() {

  },


});