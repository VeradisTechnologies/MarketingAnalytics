function pageView_chart(chart_data) {
    if (pageview_chart_obj != null) {
        pageview_chart_obj.dispose()
    }
    try {
        var user_count_dom = document.getElementById("pageviews_chart_container");
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

        $("#p_new_visit_count").text(Number(chart_data['total_new_visitors']).toLocaleString('en-us'));
        $("#p_return_visit_count").text(Number(chart_data['total_return_visitors']).toLocaleString('en-us'));
        $("#p_total_visit").text(Number(chart_data['total_visit']).toLocaleString('en-us'));

        $("#p_new_visit_perchant").html(chart_data['new_visit_perchantage'] + "<span>%</span>");
        $("#p_return_visit_perchant").html(chart_data['return_visit_perchantage'] + "<span>%</span>");

        pageview_option = {
            tooltip: {
                trigger: 'axis',
                formatter: function (param) {
                    // Marker colors
                    var line_data_marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#89aa03;"></span>';
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
                        return value.slice(label_length[0], label_length[1])+".."
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
