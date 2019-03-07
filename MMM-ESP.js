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
        graphDiv.style.height = '50%';
        document.body.appendChild(graphDiv);

        var celsius1 = new Array(6).fill();
        var celsius2 = new Array(6).fill();
        var tidspunkt = new Array(6).fill();

        function loadRumTemp() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {

                    console.log('rum success')
                    rumTempTal = xhttp.responseText //sæt Math.round på for at kun vise runde tal
                    celsius1.push(Number(rumTempTal))
                    console.log(Number(xhttp.responseText) + ' temp 1 pushed')
                    var size = celsius1.filter(function (value) { return value !== undefined }).length;
                    console.log(size);

                    if (size < 6) {

                        celsius1.fill(rumTempTal)
                        console.log('celsius 1 filled')
                    }
                }

            }
            xhttp.open("GET", "http://10.10.10.166", false);
            xhttp.send();

        }

        function loadVandTemp() {

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {

                console.log('ready state change')

                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    console.log(this.readyState)
                    console.log(this.status)

                    console.log('vand success');
                    vandTempTal = xhttp.responseText; //sæt Math.round på for at kun vise Runde tal
                    celsius2.push(Number(vandTempTal));
                    console.log(Number(xhttp.responseText) + ' temp 2 pushed');
                    var size = celsius2.filter(function (value) { return value !== undefined }).length;
                    // ovre var tager et array of filtrere det fra værdier som er lig= undefined

                    if (size < 6) {
                        celsius2.fill(vandTempTal)
                        console.log('celsius 2 filled');
                    }

                }

            };
            xhttp.open("GET", "http://10.10.10.191", false);
            xhttp.send();

        }

        function filltidspunkt(x) {
            var tsize = tidspunkt.filter(function (value) { return value !== undefined }).length;
            tidspunkt.push(x)

            if (tsize < 5) {
                tidspunkt.fill(x)
                console.log('tidspunkt filled ' + tsize)
            }

        };

        function myloop() {

            setTimeout(myloop, 600000) //opdatering af grafen i milli-sekunder
            celsius1.shift()
            celsius2.shift()
            tidspunkt.shift()

            //test tal til array. tal mellem 5 og 25(30)
            //celsius1.push(Math.floor((Math.random() * 25) + 5))
            //celsius2.push(Math.floor((Math.random() * 25) + 5))

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

            loadRumTemp()
            loadVandTemp()

            var SamletCelsius = celsius1.concat(celsius2)
            var filtered = SamletCelsius.filter(Number)
            var highest = Math.max(...filtered)
            var lowest = Math.min(...filtered)
            console.log(lowest + ' <LH> ' + highest)

            var now = new Date();
            var m = addZero(now.getMinutes());
            var h = addZero(now.getHours());
            var t = "" + h + ":" + m;
            var setTime = String(t);

            filltidspunkt(setTime)

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
                        interval: 1,
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

                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            fontSize: 16,
                        }
                    },

                    markLine: {
                        data: [
                            {
                                name: "Test",
                                yAxis: 'max',
                                x: '90%',
                                symbol: 'circle',

                            },
                        ]
                    },


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
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            fontSize: 16,
                        }
                    },
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