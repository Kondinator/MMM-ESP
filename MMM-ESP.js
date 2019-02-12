//helloworld.js:

var celsius = 69;

Module.register("MMM-ESP", {
  // Default module config.
  defaults: {
    starttext: "there should be some data around here"
  },



  start: function () {

  },
  getDom: function() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://10.10.10.166", false);
    xhttp.send()
    var celsius = xhttp.responseText;

    var element = document.createElement("div")
  element.className = "myContent"
  element.innerHTML = this.celsius + this.config.starttext
  return element

  },
  notificationReceived: function() {

  },
  socketNotificationReceived: function() {

  },


});