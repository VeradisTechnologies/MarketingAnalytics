function interaction_chart() {
    try {
        var chart_data = {"period": "total", 
            "axis_label_list": ["New+Repeat", "New Users", "Returned Once", "Returned Twice", "Returned 3x"], 
            "avg_time_total": [3, 2, 2, 2, 4], "pages_per_visit": [2.16, 1.99, 2.05, 2.05, 2.55]
        }
        var interaction_chart_dom = document.getElementById("interaction_chart_container");
        interaction_per_visit_chart = echarts.init(interaction_chart_dom);

        var x_axis_data = chart_data['axis_label_list'];
        var average_time = chart_data['avg_time_total'];
        var pages_per_visit = chart_data['pages_per_visit'];
        var axis_padding = [30,25,30]  
        var grid_size = [45,73,38,46]

        interaction_per_visit_option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                show: false,
                data: ['Average Time in Minutes', 'Pages Per Visit']
            },
            grid: {
                top: grid_size[0],
                bottom: grid_size[1],
                right: grid_size[2],
                left: grid_size[3],
                containLabel:true
            },
            xAxis: [
                {
                    name: 'Visit Type',
                    nameLocation: "center",
                    nameTextStyle: {
                        fontSize: 9,
                        padding: 20,
                        color: axis_color
                    },
                    axisLabel: {
                        formatter: function (param) {
                            if (param == "Returned Once") {
                                return "Returned\nOnce"
                            } else if (param == "Returned Twice") {
                                return "Returned\nTwice"
                            } else if (param == "Returned 3x or more") {
                                return "Returned\n3x or More"
                            }
                            return param
                        },
                        interval: 0,
                        fontSize: 9,
                        color: axis_color
                    },
                    type: 'category',
                    data: x_axis_data,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: axis_color,
                            opacity: axis_opacity
                        }
                    },
                }
            ],
            yAxis: [
                {
                    name: 'Avg Time (Minutes)',
                    nameLocation: "center",
                    axisLabel: {
                        fontSize: 9,
                        color: axis_color,
                    },
                    nameTextStyle: {
                        fontSize: 9,
                        padding: 20,
                        color: axis_color
                    },
                    type: 'value',
                    splitLine: { show: false },
                    axisLine: {
                        lineStyle: {
                            color: axis_color,
                            opacity: axis_opacity
                        }
                    },
                },
                {
                    name: 'Pages Per Visit',
                    nameLocation: "center",
                    type: 'value',
                    splitLine: { show: false },
                    axisLabel: {
                        fontSize: 9,
                        color: axis_color
                    },
                    nameTextStyle: {
                        fontSize: 9,
                        padding: 20,
                        color: axis_color
                    },
                    axisLine: {
                        lineStyle: {
                            color: axis_color,
                            opacity: axis_opacity
                        }
                    },
                }
            ],
            series: [
                {
                    name: "Average Time in Minutes",
                    type: 'bar',
                    barWidth: 39,
                    itemStyle: {
                        normal: {
                            color: '#96a9c7'
                        }
                    },
                    data: average_time
                }, {

                    name: "Pages Per Visit",
                    type: "line",
                    yAxisIndex: 1,
                    symbolSize: 12,
                    itemStyle: {
                        normal: {
                            color: "#f4e2ad",
                        }
                    },
                    data: pages_per_visit
                }
            ]
        };

        if (interaction_per_visit_option && typeof interaction_per_visit_option === "object") {
            interaction_per_visit_chart.setOption(interaction_per_visit_option, true);
        }
        
        $(window).on('resize', function () {
            interaction_per_visit_chart.resize();
        })
    }
    catch (e) { }
}