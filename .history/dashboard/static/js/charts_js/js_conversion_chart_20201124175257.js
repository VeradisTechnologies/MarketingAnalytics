function conversion_rate_chart(chart_data, drillDown_params=null) {
    if (conversion_rate_chart_obj != null) {
        conversion_rate_chart_obj.dispose()
    }
    try {
        var conversion_rate_chart_dom = document.getElementById("conversion_chart_container");
        conversion_rate_chart_obj = echarts.init(conversion_rate_chart_dom);

        var color_set = ['#96a9c7', '#c5cbd4', '#ddc26e', '#f4e2ad', '#56aea2', '#b1d3bb', '#c6cad3', '#f4e2ad']

        var axis_padding = [33,13]
        var grid_size = [5,50,10,60]

        conversion_rate_chart_option = {
            grid: {
                top: grid_size[0],
                bottom: grid_size[1],
                right: grid_size[2],
                left: grid_size[3]
            },

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function (params) {
                    if (params[0].value != '') {
                        return params[0].marker + params[0].name + ': ' + params[0].value + '%';
                    } else {
                        return ''
                    }
                }
            },
            yAxis: {
                name: "Source",
                nameLocation: "center",
                nameTextStyle: {
                    fontSize: 9,
                    padding: axis_padding[0],
                    color: axis_color
                },
                type: 'category',
                boundaryGap: true,
                data: [
                    { value: 'Others', textStyle: { color: color_set[6]}}, { value: 'Email', textStyle: { color: color_set[7]}}, { value: 'Display', textStyle: { color: color_set[5]}},
                    { value: 'Referal', textStyle: { color: color_set[4]}},  { value: 'Social', textStyle: { color: color_set[3]}}, { value: 'Paid search', textStyle: { color: color_set[2]}},
                    { value: 'Organic search', textStyle: { color: color_set[1]}}, { value: 'Direct', textStyle: { color: color_set[0]}}, 
                ],
                axisTick: { show: false },
                axisLine: {
                    lineStyle: {
                        color: axis_color,
                        opacity: axis_opacity
                    }
                },
                splitLine: { show: false },
                axisLabel: {
                    formatter: function (param) {
                        if (param.length > 9) {
                            tempVal = param.split(" ")
                            temp_text = ""
                            for (i = 0; i < tempVal.length; i++) {
                                temp_text += tempVal[i] + "\n"
                            }
                            return temp_text
                        }
                        return param
                    },
                    interval: 0,
                    fontSize: 9,
                    padding: [0, 0, 0, 0],
                    fontWeight: "bolder"
                }
            },
            xAxis: {
                name: "Conversion Rate",
                nameLocation: "center",
                nameTextStyle: {
                    fontSize: 9,
                    padding: axis_padding[1],
                    color: axis_color
                },
                min: 0,
                type: 'value',
                splitLine: { show: true },
                axisTick: { show: true },
                axisLine: {
                    lineStyle: {
                        color: axis_color,
                        opacity: axis_opacity
                    }
                },
                axisLabel: {
                    fontSize: 9,
                    formatter: '{value} %',
                    color: axis_color
                },
            },

            series: [{
                name: '',
                type: 'bar',
                barWidth: 20,
                symbol: "path://M 100 350 q 150 -300 300 0",
                itemStyle: {
                    opacity: 1.5
                },
                emphasis: {
                    itemStyle: {
                        opacity: 3
                    }
                }, 
                data: [
                    {
                        value: chart_data['Other'],
                        itemStyle: {
                            color: color_set[6]
                        }
                    },
                    {
                        value: chart_data['total_opens_rate'],
                        itemStyle: {
                            color: color_set[7]
                        }
                    },
                    {
                        value: chart_data['Display'],
                        itemStyle: {
                            color: color_set[5]
                        }
                    },
                    {
                        value: chart_data['Referral'],
                        itemStyle: {
                            color: color_set[4]
                        }
                    },
                    {
                        value: chart_data['Social'],
                        itemStyle: {
                            color: color_set[3]
                        }
                    
                    },
                    {
                        value: chart_data['Paid Search'],
                        itemStyle: {
                            color: color_set[2]
                        }
                    
                    },
                    {
                        value: chart_data['Organic Search'],
                        itemStyle: {
                            color: color_set[1]
                        }
                    
                    },
                    {
                        value: chart_data['Direct'],
                        itemStyle: {
                            color: color_set[0]
                        }
                    } 
                ],

            },]
        };

        if (conversion_rate_chart_option && typeof conversion_rate_chart_option === "object") {
            conversion_rate_chart_obj.setOption(conversion_rate_chart_option, true);
        }
        
        $(window).on('resize', function () {
            conversion_rate_chart_obj.resize();
        })
    }
    catch (e) { }
}
