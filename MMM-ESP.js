//MMM-ESP.js:
Module.register("MMM-ESP", {
  // Default module config.
  defaults: {
    firsttext: "there should be some data around here",
  },

  getScripts: function () {
    return [
      'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.1.0/echarts-en.common.min.js'

    ]
  },

  getDom: function () {

    var graphDiv = document.createElement('div');
    graphDiv.setAttribute("id", "main");
    graphDiv.style.width = '55%';
    graphDiv.style.height = '40%';
    document.body.appendChild(graphDiv);

    var celsius = ["", "", "", "", "", "",]
    var tidspunkt = ["", "", "", "", "", ""]

    function myloop() {
      celsius.shift()
      tidspunkt.shift()

      function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }

      var now = new Date();
      var m = addZero(now.getMinutes());
      var h = addZero(now.getHours());
      var aTime = "" + h + ":" + m;
      console.log(aTime + " " + h + " " + m);

      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", "http://10.10.10.166", false);
      xhttp.send()
      celsius.push(xhttp.responseText)
      tidspunkt.push(aTime)
      setTimeout(myloop, 60000)

      // based on prepared DOM, initialize echarts instance
      var myChart = echarts.init(document.getElementById('main'));
      // specify chart configuration item and data
      var option = {

        title: {
          text: 'Rum temperatur',
          textStyle: {
            color: '#fff',
            fontSize: 30,
            textBorderColor: '#333',
            textBorderWidth: 2

          },

        },

        tooltip: {

        },

        xAxis: { //bunden
          type: 'category',
          //interval: 6,

          axisTick: {
            //alignWithLabel: true,
          },

          axisLabel: {

            align: 'center',
            color: '#fff',
            fontSize: 14,
            textBorderColor: '#333',
            textBorderWidth: '2',
            showMinLabel: true,
            showMaxLabel: true,

          },

          data: [String(tidspunkt[0]),
          String(tidspunkt[1]),
          String(tidspunkt[2]),
          String(tidspunkt[3]),
          String(tidspunkt[4]),
          String(tidspunkt[5]),
          ]

        },
        yAxis: { //siden

          axisLabel: {
            //interval: 1,
            color: '#fff',
            fontSize: 14,
            textBorderColor: '#333',
            textBorderWidth: '2',
            showMinLabel: true,
            showMaxLabel: true,
            showLabel: true,

          },

        },

        series: [{
          name: 'Temperatur',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 5,
          },
          data: [Number(celsius[0]),
          Number(celsius[1]),
          Number(celsius[2]),
          Number(celsius[3]),
          Number(celsius[4]),
          Number(celsius[5]),

          ]
        }]
      };
      myChart.setOption(option);

    }
    myloop()
    return graphDiv;
  }

});