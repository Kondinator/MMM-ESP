//helloworld.js:



Module.register("MMM-ESP", {
  // Default module config.
  defaults: {
    starttext: "there should be some data around here"
  },



  start: function () {

  },
  getDom: function () {
    celsius = 69;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://10.10.10.166", true);
    xhttp.send()
    
    //var celsius = xhttp.responseText;

    var element = document.createElement("div")
    element.className = "myContent"
    element.innerHTML= this.celsius + " " + this.config.starttext
    return element

  },
  notificationReceived: function () {

  },
  socketNotificationReceived: function () {

  },


});