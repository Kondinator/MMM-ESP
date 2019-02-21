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

    var celsius = new Array(6).fill(null);
    var tidspunkt = new Array(6).fill(0);

    function myloop() {
      celsius.shift()
      tidspunkt.shift()

      function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }

      var lowest = (Math.round(Math.min(...celsius))) - 3;
      var highest = (Math.round(Math.max(...celsius))) + 3;
      var now = new Date();
      var m = addZero(now.getMinutes());
      var h = addZero(now.getHours());
      var t = h + ":" + m;
      var setTime = String(t);
      console.log(setTime + " " + h + " " + m)

      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", "http://10.10.10.166", false);
      xhttp.send()
      celsius.push(Number(xhttp.responseText))
      tidspunkt.push(setTime)
      setTimeout(myloop, 600000)

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

          axisTick: {
            //alignWithLabel: true,
          },

          axisLabel: {
            //align: 'center',
            color: 'black',
            fontSize: 15,
            textShadowBlur: 1,
            textShadowColor: 'white',
            textShadowOffsetX: 1,
            textShadowOffsetY: 1,
            //textBorderColor: '#333',
            //textBorderWidth: '2',
            //showMinLabel: true,
            //showMaxLabel: true,
          },

          data: tidspunkt
        },
        yAxis: { //siden
          min: lowest,
          max: highest,
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

          data: celsius
        }]
      };

      myChart.setOption(option);
    }
    myloop()
    return graphDiv;
  }

});