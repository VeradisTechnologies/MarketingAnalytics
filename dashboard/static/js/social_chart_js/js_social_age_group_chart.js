function social_age_group_chart(chart_data) {
    try {

        var grid_size = [30, 45, 20, 60]
        var yaxis_padd = 35
        var bar_size = 18
        
       /* if (full_size_chart == 'gender_charts') {
            bar_size = 25
            grid_size = [10, 50, 20, 90]
            yaxis_padd = 55

        }*/
        var social_agegroup_chart_dom = document.getElementById("social_age_group_chart_container");
        var social_agegroup_chart_obj = echarts.init(social_agegroup_chart_dom);

        social_age_group_option = {
            //color: ['#00C9C3', '#F9A811'],
            color: ['#96a9c7','#c5cbd4'],
            grid: {
                top: grid_size[0],
                bottom: grid_size[1],
                right: grid_size[2],
                left: grid_size[3],

            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label:{show:true}
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: chart_data['x_axis_data'],
                    axisTick: {
                        alignWithLabel: true
                    },
                    name: "Age-group",
                    nameLocation: "center",
                    nameTextStyle: {
                        fontSize: 9,
                        padding: 15,
                        color: axis_color
                    },
                    axisLabel: {
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
            yAxis: [
                {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    name: 'Count',
                    type: 'value',
                    position: 'top',
                    nameLocation: "center",
                    nameTextStyle: {
                        fontSize: 9,
                        padding: yaxis_padd,
                        color: axis_color
                    },
                    axisLabel: {
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
            series: [
                {
                    name: 'Male',
                    type: 'bar',
                    barWidth: bar_size,
                    barGap: 0.1,
                    data: chart_data['male_data']
                },
                {
                    name: 'Female',
                    type: 'bar',
                    barWidth: bar_size,
                    data: chart_data['female_data']
                },

            ]
        };

        if (social_age_group_option && typeof social_age_group_option === "object") {
            social_agegroup_chart_obj.setOption(social_age_group_option, true);
            removeLoader("social_age_group_chart_container")
        }

        $(window).on('resize', function () {
            social_agegroup_chart_obj.resize();
        })
    }
    catch (e) { }
}
