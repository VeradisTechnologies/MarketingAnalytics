function impressions_chart(chart_data) {

    period_type = $("#period_type").val()

    var label_length = [0, 10]
    var yaxis_padd = 15
    var grid_size = [40, 30, 20, 40]

    if (period_type == 'Monthly') {
        label_length = [0, 3]
    }

    var bar_size = 12
    if (period_type == 'Quarterly') {
        bar_size = 15;
        grid_size = [40, 30, 20, 50]
        yaxis_padd = 25
        label_length = [0, 5]
    }

    var legend_pos = '5%'

    var dataZoom_ctrl = []
 
    if (period_type == 'Daily' || period_type == 'Monthly') {
        grid_size[1] = 15;
        var startval = 75;
        if (period_type == 'Daily' && chart_data['y_axis_data'].length > 20) {
            var startval = 85;
        }
        dataZoom_ctrl = [{
            type: 'slider',
            yAxisIndex: 0,
            // height: 18,
            width: 5,
            // right:50,
            // left:50,
            //bottom: 15,
            start: startval,
            end: 100,
            borderColor: 'transparent',

            backgroundColor: 'transparent',
            fillerColor: 'transparent',
            showDataShadow: false, //zoom bar backround chart
            showDetail: true,//zoom bar text
            textStyle: {
                fontSize: 9,
                //color:"red"
            },
            //handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
            // handleIcon:' M 25, 50a 25,25 0 1,1 50,0a 25,25 0 1,1 -50,0',
            // handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: 15,

            handleStyle: {
                color: 'transparent',
                shadowBlur: 6,
                shadowOffsetX: 1,
                shadowOffsetY: 2,
                shadowColor: '#aaa'
            }
        }, {
            type: 'inside',
            orient: 'vertical'
        }]

    }
    try {
        var impressions_chart_dom = document.getElementById("impression_chart_container");
        var impressions_chart_obj = echarts.init(impressions_chart_dom);
        impression_chart_option = {
            //color: ['#647A8F', '#D54C54'],
            color: social_eng_color,
            grid: {
                top: grid_size[0],
                bottom: grid_size[1],
                right: grid_size[2],
                left: grid_size[3],

            },
            dataZoom: dataZoom_ctrl,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: { show: true }
                }
            },
            // legend: {
            //     right: legend_pos,
            //     icon: "rect",
            //     itemWidth: 26,
            //     itemHeight: 10,
            //     padding: 1
            // },

            xAxis: {
                name: 'Count',
                type: 'value',
                position: 'top',
                nameLocation: "center",
                nameTextStyle: {
                    fontSize: 9,
                    padding: 15,
                    color: axis_color
                },
                axisLine: {
                    lineStyle: {
                        color: axis_color,
                        opacity: axis_opacity
                    }
                },
                axisLabel: {
                    fontSize: 9,
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }

            },
            yAxis: {
                name: 'Period',
                type: 'category',
                nameLocation: "center",
                nameTextStyle: {
                    fontSize: 9,
                    padding: yaxis_padd,
                    color: axis_color
                },
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    fontSize: 9,
                    interval: 0,
                    formatter: function (value) {
                        return value.slice(label_length[0], label_length[1])
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: axis_color,
                        opacity: axis_opacity
                    }
                },
                data: chart_data["y_axis_data"]
            },
            series: [
                {
                    name: 'Facebook',
                    type: 'bar',
                    barGap: 0.1,
                    barWidth: bar_size,
                    data: chart_data["facebook_data"]
                },
                {
                    name: 'Instagram',
                    type: 'bar',
                    barWidth: bar_size,
                    data: chart_data["instagram_data"]
                },
                {
                    name: 'Twitter',
                    type: 'bar',
                    barWidth: bar_size,
                    data: chart_data["twiter_data"]
                },
            ]
        };


        if (impression_chart_option && typeof impression_chart_option === "object") {
            impressions_chart_obj.setOption(impression_chart_option, true);
            removeLoader("impression_chart_container")
        }

        $(window).on('resize', function () {
            impressions_chart_obj.resize();
        })
    }
    catch (e) { }
}
