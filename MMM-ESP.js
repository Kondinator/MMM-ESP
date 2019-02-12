//helloworld.js:



Module.register("MMM-ESP", {
  // Default module config.
  defaults: {
    starttext: "there should be some data around here",
    updateInterval: 1000
  },



  start: function () {
    this.count = 0
    var timer = setInterval(() => {
      this.updateDom()
      this.count++
    }, 1000)
  },

  getDom: function () {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://10.10.10.166", false);
    xhttp.send()
    var celsius = xhttp.responseText;
    var element = document.createElement("div")
    element.className = "myContent"
    element.innerHTML = celsius + " " + this.config.starttext
    var subElement = document.createElement("p")
    subElement.innerHTML = "Count:" + this.count
    subElement.id = "COUNT"
    element.appendChild(subElement)
    return element

  },
  notificationReceived: function () {

  },
  socketNotificationReceived: function () {

  },


});