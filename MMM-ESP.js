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
    var div = document.createElement('div');
    div.id = 'echarts';
    div.setAttribute = "style", "width:30%";
    document.body.appendChild(div);

    var celsius = ["0", "0", "0", "0", "0", "0"]
        var tidspunkt = ["0", "0", "0", "0", "0", "0"]

        function myloop() {
            celsius.shift()
            tidspunkt.shift()

            var now = new Date();
            var m = now.getMinutes();
            var h = now.getHours();
            var t = "" + h + ":" + m;
            console.log(t + " " + h + " " + m)

            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "http://10.10.10.166", false);
            xhttp.send()
            celsius.push(xhttp.responseText)
            tidspunkt.push(t)
            setTimeout(myloop, 60000)


            // based on prepared DOM, initialize echarts instance
            var myChart = echarts.init(document.getElementById('div'));

            // specify chart configuration item and data
            var option = {
                title: {
                    text: 'ECharts entry example'
                },
                tooltip: {},

                xAxis: {
                    type: 'category',
                    data: [String(tidspunkt[0]),
                    String(tidspunkt[1]),
                    String(tidspunkt[2]),
                    String(tidspunkt[3]),
                    String(tidspunkt[4]),
                    String(tidspunkt[5]),

                    ]
                },
                yAxis: {},
                series: [{
                    name: 'Sales',
                    type: 'line',
                    smooth: true,
                    data: [Number(celsius[0]),
                    Number(celsius[1]),
                    Number(celsius[2]),
                    Number(celsius[3]),
                    Number(celsius[4]),
                    Number(celsius[5])]
                }]
            };
            myChart.setOption(option);

        }
        myloop()
  }

});