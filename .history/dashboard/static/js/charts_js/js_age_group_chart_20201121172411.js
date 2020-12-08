function age_group_chart() {
    try {
        chart_data = {"data": true, "age_category": ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"], "male": [41, 2049, 1061, 556, 410, 221], "female": [171, 2988, 1873, 1956, 1616, 744]}
        var dom = document.getElementById("age_gender_charts_ga");
        age_group_obj = echarts.init(dom);

        var age_category = chart_data['age_category']
        var male = chart_data['male']
        var female = chart_data['female']

        var axis_padding = [15,30]   
        var grid_size = [30,35,30,28] 

        by_age_option = {
            color: ['#ddc26e', '#f4e2ad'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label:{show:true}
                }
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
                    name: "Age Group",
                    nameLocation: "center",
                    axisLabel: {
                        fontSize: 9,
                        color: axis_color
                    },
                    axisLine: {
                        lineStyle: {
                            color: axis_color,
                            opacity: axis_opacity
                        }
                    },
                    nameTextStyle: {
                        fontSize: 9,
                        padding: axis_padding[0],
                        color: axis_color
                    },
                    type: 'category',
                    axisTick: {
                        show: true,
                        alignWithLabel: true
                    },
                    data: age_category

                }
            ],
            yAxis: [
                {
                    name: "Count",
                    nameLocation: "center",
                    axisLabel: {
                        fontSize: 9,
                        color: axis_color
                    },
                    axisLine: {
                        lineStyle: {
                            color: axis_color,
                            opacity: axis_opacity
                        }
                    },
                    nameTextStyle: {
                        fontSize: 9,
                        padding: axis_padding[1],
                        color: axis_color
                    },
                    type: 'value',
                    splitLine: {
                        show: false
                    }
                }
            ],
            
            series: [
                {
                    name: 'Male',
                    type: 'bar',
                    stack: 'A',
                    barWidth: 40,
                    data: male,
                },

                {
                    name: 'Female',
                    type: 'bar',
                    barGap: 0.1,
                    stack: 'A',
                    barWidth: 50,
                    data: female,

                },
            ]
        };

        if (by_age_option && typeof by_age_option === "object") {
            age_group_obj.setOption(by_age_option, true);
        }

        $(window).on('resize', function () {
            age_group_obj.resize();
        })
    }
    catch (e) { }
}
