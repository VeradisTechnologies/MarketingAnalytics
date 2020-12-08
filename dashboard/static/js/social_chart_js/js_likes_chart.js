function likes_chart(chart_data) {

    

    period_type = $("#period_type").val()
    var label_length = [0, 10]

    if (period_type == 'Monthly') {
        label_length = [0, 3]
    }
    var grid_size = [40, 40, 20, 43]

    var symbol_size = 12
    var bar_size = 15

    if (period_type == 'Quarterly') {
        bar_size = 15
        symbol_size = 20
    }

    var dataZoom_ctrl = []
    if (period_type == 'Daily' || period_type == 'Monthly') {
        var endval=35;
        if(period_type=='Daily' && chart_data['x_axis_data'].length>20){
            var endval=20;
          }
        // grid_size = [30, 40, 40, 43],
            dataZoom_ctrl = [{
                type: 'slider',
                height: 5,
                bottom: 5,
                start: 0,
                end: endval,
                borderColor: 'transparent',

                backgroundColor:'transparent',
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
                    color:'transparent',
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
        var like_chart_dom = document.getElementById("like_chart_container");
        var like_chart_obj = echarts.init(like_chart_dom);
        like_chart_option = { 
            color: ['#85a0cc', '#c5cbd4', '#96a9c7','#ddc26e', '#56aea2' ], 
            tooltip: { 
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: { show: true }
                }
            },
            dataZoom: dataZoom_ctrl,
            grid: {
                top: grid_size[0],
                bottom: grid_size[1],
                right: grid_size[2],
                left: grid_size[3],

            },
            // legend: {
            //     icon: "rect",
            //     right: '10%',
            //     itemWidth: 26,
            //     itemHeight: 12,
            // },
            xAxis:
            {
                name: "Period",
                nameLocation: "center",
                nameTextStyle: {
                    fontSize: 9,
                    padding: 10,
                    color: axis_color
                },
                type: 'category',
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
                data: chart_data['x_axis_data']
            }
            ,
            yAxis:
            {
                type: 'value',
                name: 'Count',
                nameLocation: "center",
                nameTextStyle: {
                    fontSize: 9,
                    padding: 18,
                    color: axis_color
                },
                axisLabel: {
                    fontSize: 9,
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: axis_color,
                        opacity: axis_opacity
                    }
                },
            },

            series: [{
                name: 'FB - Total',
                type: 'line',
                smooth: true,
                symbol: 'emptyCircle',
                symbolSize: symbol_size,
                lineStyle: {
                    width: 3,
                    // color:'#4FDAD5'
                },
                data: chart_data['fb_total']
            },

            {
                name: 'FB - Paid',
                type: 'bar',
                barWidth: bar_size,
                barGap: 0.1,
                stack: 'FB',
                data: chart_data['paid_likes_data']
            },
            {
                name: 'FB - Organic ',
                type: 'bar',
                stack: 'FB',
                barWidth: bar_size,
                data: chart_data['organic_likes_data']
            },
            {
                name: 'Instagram',
                type: 'bar',
                barWidth: bar_size,
                data: chart_data['insta_likes_data']
            },
            {
                name: 'Twitter',
                type: 'bar',
                barWidth: bar_size,
                data: chart_data['twiter_likes_data']
            },

            
            ]
        };


        if (like_chart_option && typeof like_chart_option === "object") {
            like_chart_obj.setOption(like_chart_option, true);
            removeLoader("like_chart_container")
        }

        $(window).on('resize', function () {
            like_chart_obj.resize();
        })
    }
    catch (e) { }
}
