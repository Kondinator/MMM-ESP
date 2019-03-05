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

    var celsius1 = new Array(6).fill(null);
    var celsius2 = new Array(6).fill(null);
    var tidspunkt = new Array(6).fill();

    function loadRumTemp() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    celsius1.push(Number(xhttp.responseText))
                      console.log('temp 1 pushed')
                }
                
            };
            xhttp.open("GET", "http://10.10.10.166", false);
            xhttp.send();      
        }

        function loadVandTemp() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    celsius2.push(Number(xhttp.responseText))
                    console.log('temp 2 pushed')
                }
                
            };
            xhttp.open("GET", "http://10.10.10.191", false);
            xhttp.send();
        }

    function myloop() {
        celsius1.shift()
        celsius2.shift()
        tidspunkt.shift()

        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        function round5u(x) {
            return Math.ceil(x / 5) * 5;
        }

        function round5d(x) {
            return Math.floor(x / 5) * 5;
        }

        var lowest = (Math.round(Math.min(...celsius1, ...celsius2 )))
        var highest = (Math.round(Math.max(...celsius1, ...celsius2)))
        console.log(lowest + ' <LH> ' + highest)
        var now = new Date();
        var m = addZero(now.getMinutes());
        var h = addZero(now.getHours());
        var t = "" + h + ":" + m;
        var setTime = String(t);

        loadRumTemp()
        loadVandTemp()

        setTimeout(myloop, 6000)
        tidspunkt.push(setTime)

        /*

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log('success')
            }
        };
        xhttp.open("GET", "http://10.10.10.166", false);
        xhttp.send();
        //var x1Array = xhttp.responseText.split(',')
        //arrayCelsius1.push(x1Array[0])
        //arrayCelsius2.push(x1Array[1])
        celsius1.push(Number(arrayCelsius1))
        celsius2.push(Number(arrayCelsius2))
        //console.log(t + ' : ' + x1Array[0] + ' - ' + x1Array[1])
        
        

        denne kode ville blive brugt hvis dataen blev hentet fra samme hjemmeside, her vil jeg dele daten op i string delt af kommaer
        og så sætte delene ind i et array.
        */

        // based on prepared DOM, initialize echarts instance
        var myChart = echarts.init(document.getElementById('main'));

        // specify chart configuration item and data
        var option = {

            legend: {
                textStyle: {
                    fontSize: 15,
                    textShadowBlur: 1,
                    textShadowColor: 'white',
                    textShadowOffsetX: 1,
                    textShadowOffsetY: 1,
                },
                data: ['Rum temperatur', 'Vandmåler temperatur']
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
                min: round5d(lowest),
                max: round5u(highest),
                type: 'value',

                axisTick: {
                  interval: 2.5,
              },

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
                name: 'Rum temperatur',
                type: 'line',
                smooth: true,
                symbolSize: 8,
                lineStyle: {
                    width: 5,
                },
                data: celsius1
            },

            {
                name: 'Vandmåler temperatur',
                type: 'line',
                smooth: true,
                symbolSize: 8,
                lineStyle: {
                    width: 5,
                },
                data: celsius2

            }
            ]
        };
        myChart.setOption(option);

    }
    myloop()
    return graphDiv;
  }

});