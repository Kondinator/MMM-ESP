//MMM-ESP.js:
Module.register("MMM-ESP", {
  // Default module config.
  defaults: {
    firsttext: "there should be some data around here",
  },

  start: function () {
    var timer = setInterval(() => {
      this.updateDom()
    }, 60000)
  },

  getDom: function () {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://10.10.10.166", false);
    xhttp.send()

    var celsius5 = celsius4;
    var celsius4 = celsius3;
    var celsius3 = celsius2;
    var celsius2 = celsius1;
    var celsius1 = xhttp.responseText;
  
    var element = document.createElement("div")
    element.className = "myContent"
    element.innerHTML = this.config.firsttext + " " + celsius1 + " " + this.config.lasttext
    return element

  },
  notificationReceived: function () {

  },
  socketNotificationReceived: function () {

  },

});