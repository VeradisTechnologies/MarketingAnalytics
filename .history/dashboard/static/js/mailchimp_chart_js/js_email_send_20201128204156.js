function email_send_chart(chart_data) {

    try {
        var email_chart_dom = document.getElementById("emailSend_chart_container");
        var email_chart_obj = echarts.init(email_chart_dom);
        var grid_size = [20, 25, 35, 35]


        var line_symbol_size = 10
        // var period_type = $(".active").text()
        var period_type ='Monthly';

        if (period_type == 'Weekly') {
            var line_symbol_size = 18;
        }

        if (period_type == 'Monthly') {
            var line_symbol_size = 12;
        }

        email_chart_option = {

            tooltip: {
                show: true,
                trigger: 'axis',
                showDelay: 0,
                formatter: function (param) {
                    // console.log(param)
                    var unique_opens_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#424a4e;"></span>';
                    var email_send_count_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#96a9c7;"></span>';
                    var total_opens_count_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c5cbd4;"></span>';
                    var unique_opens_percentage_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#ddc26e;"></span>';
                    var total_opens_percentage_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#56aea2;"></span>';
                   
                    //XXX
                    chart_data = { "data": true, "x_axis_data": ["Tuesday", "Thursday", "Friday"], "email_send_counts": [8740, 8247, 51656], "email_send_count_bars": [], "total_opens": [3091, 3020, 16007], "unique_opens": [2015, 1596, 9501], "total_open_percentage": [], "unique_open_percentage": [], "email": [5649, 5227, 35649], "total_opens_percentage": [35, 37, 31], "unique_opens_percentage": [23, 19, 18] }
                    
                    if (param.length >= 1) {
                        unique_opens_count = ''
                        total_opens_count = ''
                        emai_send_count = ''
                        unique_open_percentage_count = ''
                        total_open_percentage_count = ''

 
                        for (i = 0; i < param.length; i++) {
                            if (param[i].seriesName == 'Unique Opens') { var unique_opens_count = unique_opens_tooltip + "Unique Opens" + ": " + Number(chart_data['unique_opens'][param[i]['dataIndex']]).toLocaleString('en-us') + "</br>"; }
                            else if (param[i].seriesName == 'Total Opens') { var total_opens_count = total_opens_count_tooltip + "Total Opens" + ": " + Number(chart_data['total_opens'][param[i]['dataIndex']]).toLocaleString('en-us') + "</br>"; }
                            else if (param[i].seriesName == 'Total Email Sent') { var emai_send_count = email_send_count_tooltip + "Total Email Sent" + ": " + Number(chart_data['email_send_counts'][param[i]['dataIndex']]).toLocaleString('en-us') + "</br>"; }
                            else if (param[i].seriesName == 'Unique Opens %') { var unique_open_percentage_count = unique_opens_percentage_tooltip + 'Unique Opens Percentage' + ": " + Number(chart_data['unique_opens_percentage'][param[i]['dataIndex']]).toLocaleString('en-us') + "%" + "</br>"; }
                            else if (param[i].seriesName == 'Total Opens %') { var total_open_percentage_count = total_opens_percentage_tooltip + 'Total Opens Percentage' + ": " + Number(chart_data['total_opens_percentage'][param[i]['dataIndex']]).toLocaleString('en-us') + "%" + "</br>"; }
                        }
                        return emai_send_count + total_opens_count + unique_opens_count + total_open_percentage_count + unique_open_percentage_count
                    }



                },
                extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
                axisPointer: {
                    type: 'shadow'
                }
            },
            // legend: {
            //     data: ['Total Email Sent', 'Total Opens', 'Unique Opens', 'Total Opens %', 'Unique Opens %']
            // },
            grid: {
                top: grid_size[0],
                bottom: grid_size[1],
                right: grid_size[2],
                left: grid_size[3],
                containLabel: true
            },
            xAxis: {
                name: 'Day Of Week',
                nameLocation: 'center',
                nameTextStyle: {
                    fontSize: 9,
                    padding: 15,
                },
                axisTick: {
                    show: false
                },
                boundaryGap: true,
                axisLabel:{ 
                    fontSize: 9, 
                },
                axisLine: {
                    lineStyle: {
                        color: axis_color,
                        opacity: axis_opacity
                    }
                },
                axisTick: {
                    alignWithLabel: true
                },

                data: chart_data['x_axis_data']
            },
            yAxis: [
                {
                    name: 'Count',
                    nameLocation: 'center',
                    nameTextStyle: {
                        fontSize: 9,
                        padding: 32,
                    },
                    axisLabel:{ 
                        fontSize: 9, 
                    },
                    type: 'value',
                    // max: 40000,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: axis_color,
                            opacity: axis_opacity,

                        }
                    },
                },

                {
                    name: 'Percentage Rate',
                    //max: 0.5,
                    type: 'value',
                    nameLocation: "center",
 
                    //inverse: true,
                    nameLocation: "center",
                    nameTextStyle: {
                        fontSize: 9,
                        padding: 15,
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel:{ 
                        fontSize: 9, 
                    },
                    axisLine: {
                        lineStyle: {
                            color: axis_color,
                            opacity: axis_opacity
                        }
                    },
                }
            ],

            series: [{
                name: 'Unique Opens',
                type: 'bar',
                barGap: '-300%',
                barWidth: 6,
                z: 10,
                itemStyle: {
                    normal: {
                        color: '#424a4e'
                    }
                },
                data: chart_data['unique_opens']
            }, 

            {
                name: 'Total Opens',
                type: 'bar',
                barWidth: 30,
                itemStyle: {
                    normal: {
                        color: '#c5cbd4'
                    }
                },
                stack: 'total',
                data: chart_data['total_opens']


            },
            {
                name: 'Total Email Sent',
                type: 'bar',
                barWidth: 30,
                itemStyle: {
                    normal: {
                        color: ' #96a9c7'
                    }
                },
                stack: 'total',
                data: chart_data['email']
            },

            {
                name: 'Unique Opens %',
                type: 'line',
                yAxisIndex: 1,
                color: '#ddc26e',
                data: chart_data['unique_opens_percentage'],
                symbolSize: line_symbol_size
            },
            {
                name: 'Total Opens %',
                type: 'line',
                yAxisIndex: 1,
                color: '#56aea2',
                data: chart_data['total_opens_percentage'],
                symbolSize: line_symbol_size
            }
            ]
        };
        if (email_chart_option && typeof email_chart_option === "object") {
            email_chart_obj.setOption(email_chart_option, true);
            removeLoader("emailSend_chart_container")
        }
        $(window).on('resize', function () {
            email_chart_obj.resize();
        })
    }
    catch (e) { }
}
