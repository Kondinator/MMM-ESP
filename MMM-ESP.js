//MMM-ESP.js:
Module.register("MMM-ESP", {
  // Default module config.
  defaults: {
    firsttext: "there should be some data around here",
  },

  getScripts: function () {
    return [
        'canvasjs.min.js'

    ]
},

  getDom: function () {
/*
    var element = document.createElement("div")
        element.setAttribute("id", "chartContainer")    
*/
    var celsius = ["0", "0", "0", "0", "0", "0"]

    function myloop() {

      celsius.shift()

      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", "http://10.10.10.166", false);
      xhttp.send()

      celsius.push(xhttp.responseText)
      console.log(celsius)

      setTimeout(myloop, 10000)

      var chart = new CanvasJS.Chart("chart-Container", {

        animationEnabled: false,
        theme: "light2",
        title: {
          text: "Simple Line Chart"
        },
        axisY: {
          includeZero: true
        },
        data: [{
          type: "line",
          dataPoints: [

            { y: Number(celsius[0]) },
            { y: Number(celsius[1]) },
            { y: Number(celsius[2]) },
            { y: Number(celsius[3]) },
            { y: Number(celsius[4]) },
            { y: Number(celsius[5]) },
          ]
        }]
      });
      chart.render();
    }
    myloop()
    
    

  }
});