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

    var div = document.createElement('div');
    div.setAttribute('id', 'chartContainer'); // and make sure myclass has some styles in css
    document.body.appendChild(div);
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Simple Line Chart"
      },
      axisY: {
        includeZero: false
      },
      data: [{
        type: "line",
        dataPoints: [
          { y: 450 },
          { y: 414 },
          { y: 520, indexLabel: "highest", markerColor: "red", markerType: "triangle" },
          { y: 460 },
          { y: 450 },
          { y: 500 },
          { y: 480 },
          { y: 480 },
          { y: 410, indexLabel: "lowest", markerColor: "DarkSlateGrey", markerType: "cross" },
          { y: 500 },
          { y: 480 },
          { y: 510 }
        ]
      }]
    });
    chart.render();

  }

});