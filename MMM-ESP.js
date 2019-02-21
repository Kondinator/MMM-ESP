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

    var celsius = ["0", "0", "0", "0", "0", "0",]
    var tidspunkt = ["0", "0", "0", "0", "0", "0"]

    function myloop() {
      celsius.shift()
      tidspunkt.shift()

      function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
      var lowest = (Math.round(Math.min(...celsius))) - 5   ;
      var highest = (Math.round(Math.max(...celsius))) + 5   ;
      var now = new Date();
      var m = addZero(now.getMinutes());
      var h = addZero(now.getHours());
      var aTime = "" + h + ":" + m;
      console.log(aTime + " " + h + " " + m);

      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", "http://10.10.10.166", false);
      xhttp.send()
      celsius.push(Number(xhttp.responseText))
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
            textShadowBlur: 2,
            textShadowColor: '#000',
            textShadowOffsetX: 0,
            textShadowOffsetY: 1,
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

            //align: 'center',
            color: 'black',
            fontSize: 15,
            textShadowBlur: 2,
            textShadowColor: 'white',
            textShadowOffsetX: 0,
            textShadowOffsetY: 1,
            //textBorderColor: '#333',
            //textBorderWidth: '2',
            //showMinLabel: true,
            //showMaxLabel: true,

          },

          data: [tidspunkt[0],
          tidspunkt[1],
          tidspunkt[2],
          tidspunkt[3],
          tidspunkt[4],
          tidspunkt[5],
          ]

        },
        yAxis: { //siden
          max: highest,
          min: lowest,
          type: 'value',

          axisLabel: {
            show: true,
            color: 'black',
            fontSize: 15,
            textShadowBlur: 2,
            textShadowColor: 'white',
            textShadowOffsetX: 0,
            textShadowOffsetY: 1,
            //textBorderColor: 'white', //bugged
            //textBorderWidth: '2', //bugged
            //showMinLabel: true,
            //showMaxLabel: true,


          },

        },

        series: [{
          name: 'Temperatur',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 5,
          },
          data: [celsius[0],
          celsius[1],
          celsius[2],
          celsius[3],
          celsius[4],
          celsius[5],

          ]
        }]
      };
      myChart.setOption(option);

    }
    myloop()
    return graphDiv;
  }

});