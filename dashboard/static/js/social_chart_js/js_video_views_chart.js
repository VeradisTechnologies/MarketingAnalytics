function video_views_chart(chart_data) {

    period_type = $("#period_type").val()
    var label_length = [0, 10]

    if (period_type == 'Monthly') {
        label_length = [0, 3]
    }

    var grid_size = [45, 50, 150, 70]
    var symbol_size = 12
    var bar_size = 25
    if (period_type == 'Quarterly') {
        bar_size = 40
        symbol_size = 20
    }
    if (period_type == 'Daily') {
        grid_size = [35, 70, 150, 70]
    }

    
    var legend_ctrl = {
        icon: "roundRect",
        itemGap: 20,
        itemWidth: 30,
        itemHeight: 15,
        orient: 'vertical',
        right: '3%',
        top: '40%',
        padding: 10,

    }

    if (half_video_size_chart == 'video_view_half') {
       
        legend_ctrl['orient'] = 'horizontal'
        legend_ctrl['top'] = ' '
        legend_ctrl['rigth'] = '5%'
        legend_ctrl['padding'] = 5
        legend_ctrl['itemGap'] = 15
        legend_ctrl['itemWidth'] = 25
        legend_ctrl['itemHeight'] = 10

        grid_size = [45, 50, 30, 70]
       
        if (period_type == 'Monthly' || period_type == 'Daily') {
            label_length = [0, 3]
            bar_size = 12
        }
        if (period_type == 'Daily') {
            grid_size = [35, 70, 30, 70]

        }


    }



    var dataZoom_ctrl = []
    if (period_type == 'Daily') {
        dataZoom_ctrl = [{
            type: 'slider',
            height: 5,
            // right:50,
            // left:50,
            bottom: 7,
            start: 0,
            end: 50,
            borderColor: 'transparent',

            backgroundColor: zoombar_color[0],
            fillerColor: zoombar_color[1],
            showDataShadow: false, //zoom bar backround chart
            showDetail: true,//zoom bar text
            textStyle: {
                //color:"red"
            },
            //handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
            // handleIcon:' M 25, 50a 25,25 0 1,1 50,0a 25,25 0 1,1 -50,0',
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: 15,

            handleStyle: {

                color: zoombar_color[2],
                shadowBlur: 6,
                shadowOffsetX: 1,
                shadowOffsetY: 2,
                shadowColor: '#aaa'
            }
        }, {
            type: 'inside'
        }]

    }
    try {
        var video_views_chart_dom = document.getElementById("video_views_chart_container");
        var video_views_chart_obj = echarts.init(video_views_chart_dom);

        video_views_chart_option = {
            //color: ['#11325D', '#F9A810', '#006FFF'],
            color: video_view_color,
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
                    label:{show:true}
                }
            },
            // legend: legend_ctrl,

            xAxis: [
                {
                    type: 'category',
                    data: chart_data['x_axis_data'],
                    axisTick: {
                        alignWithLabel: true
                    },
                    name: "Period",
                    nameLocation: "center",
                    nameTextStyle: {
                        fontSize: 9,
                        padding: 15,
                        //color: axis_color
                    }, axisLabel: {
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
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    name: 'Count',
                    nameLocation: "center",
                    nameTextStyle: {
                        fontSize: 9,
                        padding: 15,
                        // color: axis_color
                    }, axisLine: {
                        lineStyle: {
                            color: axis_color,
                            opacity: axis_opacity
                        }
                    },
                }
            ],
            series: [
                {
                    name: 'Organic',
                    type: 'bar',
                    barGap: 0.1,
                    barWidth: bar_size,
                    data: chart_data['organic_view_data']
                },
                {
                    name: 'Paid',
                    type: 'bar',
                    barWidth: bar_size,
                    data: chart_data['paid_view_data']
                },
                {
                    name: 'Total',
                    type: 'line',
                    symbolSize: symbol_size,
                    lineStyle: {
                        width: 3
                    },
                    data: chart_data['total_view_data']
                }
            ]
        };


        if (video_views_chart_option && typeof video_views_chart_option === "object") {
            video_views_chart_obj.setOption(video_views_chart_option, true);
            removeLoader("video_views_chart_container")
        }

        $(window).on('resize', function () {
            video_views_chart_obj.resize();
        })
    }
    catch (e) { }
}