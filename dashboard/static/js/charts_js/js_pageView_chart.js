function pageView_chart(chart_data) {
    if (pageview_chart_obj != null) {
        pageview_chart_obj.dispose()
    }
    try {
        var user_count_dom = document.getElementById("pageview_chart_container");
        pageview_chart_obj = echarts.init(user_count_dom);

        var x_axis_data = chart_data['x_axis_data'];
        var return_visitors = chart_data['return_visitors'];
        var new_visitors = chart_data['new_visitors'];
        var total_visitors = chart_data['total_visitors'];
        var period_type = chart_data['period']
        var dataZoom_context = []

        var label_length = [0, 3]
        var bar_width = 15;
        var symbol_size = [15, 3];
        var line_symbol_size = 15;

        period_type = $("#period_type").val()

        if (period_type == 'Monthly') {
            var bar_width = 20;
            var symbol_size = [20, 3];
            var line_symbol_size = 12;
            label_length = [0, 3]
        }

        if (period_type == 'Weekly' || period_type == 'Quarterly') {
            var bar_width = 40;
            var symbol_size = [40, 3];
            label_length = [0, 5]
            var line_symbol_size = 18;
        }

        var dataZoom_ctrl = []
        if (period_type == 'Daily' || period_type == 'Monthly') {
             
            dataZoom_ctrl = [{
                type: 'slider',
                height: 5,
                bottom: 5,
                start: 0,
                end: 35,
                borderColor: 'transparent',

                backgroundColor: 'transparent',
                fillerColor:'transparent',
                showDataShadow: false, //zoom bar backround chart
                showDetail: true,//zoom bar text
                textStyle: {
                    //color:"red"
                    fontSize:9,
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
                type: 'inside'
            }]

        } 
        $("#p_new_visit_count").text(Number(chart_data['total_new_visitors']).toLocaleString('en-us'));
        $("#p_return_visit_count").text(Number(chart_data['total_return_visitors']).toLocaleString('en-us'));
        $("#p_total_visit").text(Number(chart_data['total_visit']).toLocaleString('en-us'));

        $("#p_new_visit_perchant").html(chart_data['new_visit_perchantage'] + "<span>%</span>");
        $("#p_return_visit_perchant").html(chart_data['return_visit_perchantage'] + "<span>%</span>");

        pageview_option = {
            dataZoom: dataZoom_ctrl,
            tooltip: {
                trigger: 'axis',
                formatter: function (param) {
                    // Marker colors
                    var line_data_marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#f4e2ad;"></span>';
                    var bar_data_marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#3c5c7c;"></span>';
                    var dotted_bar_data_marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#DBDBDB;"></span>';

                    // tooltip
                    var tooltip_date = param[0]['name'] + "</br>";
                    var tooltip_line_data = line_data_marker + param[0]['seriesName'] + ": " + Number(param[0]['value']).toLocaleString('en-us') + "</br>";
                    var tool_tip_bar = bar_data_marker + param[1]['seriesName'] + ": " + Number(param[1]['value']).toLocaleString('en-us');

                    // total_users_count
                    var new_visitor_count = Number(param[0]['value'] - param[1]['value']).toLocaleString('en-us')
                    var tool_tip_dotted = dotted_bar_data_marker + param[2]['seriesName'] + ": " + new_visitor_count + "</br>";

                    return tooltip_date + tooltip_line_data + tool_tip_dotted + tool_tip_bar
                },
                backgroundColor: 'grey',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true,
                        //backgroundColor: '#7B7DDC'
                    }
                }
            },
            grid: {
                left: 55,
                right: 0,
                top: 12,
                bottom: 45
            },
            xAxis: {
                name: "Period",
                data: x_axis_data,
                type: "category",
                axisLabel: {
                    fontSize: 9,
                    interval: 0,
                    formatter: function (value) {
                        return value.slice(label_length[0], label_length[1]) +(value.length> label_length[1]? "..":"")
                    }
                },
                nameLocation: "center",
                nameTextStyle: {
                    fontSize: 9,
                    padding: 13,
                    color: axis_color
                },
                axisLine: {
                    lineStyle: {
                        color: axis_color,
                        opacity: axis_opacity
                    }
                },
                axisTick: {
                    show: true,
                    alignWithLabel: true
                },
            },
            yAxis: [{
                name: "Page Views",
                type: "value",
                splitLine: { show: false },
                axisLine: {
                    lineStyle: {
                        color: axis_color,
                        opacity: axis_opacity
                    }
                },
                nameLocation: "center",
                nameTextStyle: {
                    fontSize: 9,
                    padding: 25,
                    color: axis_color
                },
                axisLabel: {
                    fontSize: 9,
                    formatter: '{value}',
                }
            }

            ],
            series: [{
                name: 'Total Views',
                type: 'line',
                smooth: true,
                showAllSymbol: true,
                symbol: 'emptyCircle',
                symbolSize: line_symbol_size,
                smooth: false,
                lineStyle: {
                    width: 3
                },

                itemStyle: {
                    normal: {
                        color: '#f4e2ad'
                    },
                },
                data: total_visitors
            },

            {
                name: 'Returning Views',
                type: 'bar',
                barWidth: bar_width,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: '#96a9c7'
                    }
                },
                data: return_visitors
            },

            {
                name: 'New Views',
                type: 'pictorialBar',
                // barGap: '-100%',
                //barWidth: 1,
                symbol: 'rect',
                symbolRepeat: true,
                symbolSize: symbol_size,
                symbolMargin: 1,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: '#c5cbd4',
                    }
                },
                z: -12,

                data: total_visitors
            },
            ]
        };

        if (pageview_option && typeof pageview_option === "object") {
            pageview_chart_obj.setOption(pageview_option, true);
        }
        $(window).on('resize', function () {
            pageview_chart_obj.resize();
        })
    }
    catch (e) { }
}
