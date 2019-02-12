//helloworld.js:

var celsius;

Module.register("MMM-ESP", {
  // Default module config.
  defaults: {
    text: "there should be some data around here" + celsius
  },

  getData() {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://10.10.10.166", false);
    xhttp.send()
    var celsius = xhttp.responseText;
    //document.getElementById("test").innerHTML = "bruh shit works " + celsius;
  }
});