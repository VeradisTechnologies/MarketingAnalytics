function user_count_chart(chart_data, drillDown_params=null) {
    if (user_count_chart_obj != null) {
        user_count_chart_obj.dispose()
    }

    try {
        var user_count_dom = document.getElementById("visitor_chart_container");
        user_count_chart_obj = echarts.init(user_count_dom);

        var x_axis_data = chart_data['visitors_period'];
        var return_visitors = chart_data['return_visitors'];
        var new_visitors = chart_data['new_visitors'];
        var all_users = chart_data['all_visitors'];
        var total_all_users = chart_data['total_all_visitors'];
        var total_visitors = chart_data['total_visitors'];
        var period_type = chart_data['period']

        var label_length = [0, 3]
        var bar_width = 15;
        var symbol_size = [15, 3];
        var line_symbol_size = 15;

        $("#new_visit_count").text(Number(chart_data['total_new_visitors']).toLocaleString('en-us'));
        $("#return_visit_count").text(Number(chart_data['total_return_visitors']).toLocaleString('en-us'));
        $("#all_visits").text(Number(chart_data['total_all_visitors']).toLocaleString('en-us'));

        $("#new_visit_perchant").html(chart_data['new_visit_perchantage'] + "<span>%</span>");
        $("#return_visit_perchant").html(chart_data['return_visit_perchantage'] + "<span>%</span>");

        user_count_option = {
            tooltip: {
                trigger: 'axis',
                formatter: function (param) {
                    // Marker colors
                    var line_data_marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#f4e2ad;"></span>';
                    var bar_data_marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:hsl(247,44%,71%);"></span>';
                    var dotted_bar_data_marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#DBDBDB;"></span>';
                    var all_user_data_marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#ddc26e;"></span>';

                    // tooltip
                    var tooltip_date = param[0]['name'] + "</br>";
                    var tooltip_line_all_user = all_user_data_marker + param[3]['seriesName'] + ": " + Number(param[3]['value']).toLocaleString('en-us') + "</br>"; 
                    var tooltip_line_data = line_data_marker + param[0]['seriesName'] + ": " + Number(param[0]['value']).toLocaleString('en-us') + "</br>";
                    var tool_tip_bar = bar_data_marker + param[1]['seriesName'] + ": " + Number(param[1]['value']).toLocaleString('en-us');

                    // total_users_count
                    var new_visitor_count = Number(param[0]['value'] - param[1]['value']).toLocaleString('en-us')
                    var tool_tip_dotted = dotted_bar_data_marker + param[2]['seriesName'] + ": " + new_visitor_count + "</br>";

                    return tooltip_date + tooltip_line_all_user + tooltip_line_data + tool_tip_dotted + tool_tip_bar
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
                    color: axis_color,
                    interval: 0,
                    formatter: function (value) {
                        return value.slice(label_length[0], label_length[1])
                    }
                },
                nameLocation: "center",
                nameTextStyle: {
                    fontSize: 9,
                    padding: 13,
                    color: axis_color,
                    opacity: axis_opacity
                },
                axisLine: {
                    lineStyle: {
                        color: axis_color,
                        opacity: axis_opacity
                    }
                },
                axisTick: {
                    color: axis_color,
                    opacity: axis_opacity,
                    show: true,
                    alignWithLabel: true
                },
            },
            yAxis: [{
                name: "Visits",
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
                    color: axis_color,
                    fontSize: 9,
                    formatter: '{value}',
                }
            }

            ],
            series: [
            {
                name: 'Total Visits',
                type: 'line',
                smooth: true,
                showAllSymbol: true,
                symbol: 'emptyCircle',
                symbolSize: 15,
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
                name: 'Returning Visits',
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
                name: 'New Visits',
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
            {
                name: 'All Visits',
                type: 'line',
                smooth: true,
                showAllSymbol: true,
                symbol: 'emptyCircle',
                symbolSize: 15,
                smooth: false,
                lineStyle: {
                    width: 3
                },

                itemStyle: {
                    normal: {
                        color: '#ddc26e',
                    },
                },
                data: all_users
            }
          ]
        };

        if (user_count_option && typeof user_count_option === "object") {
            user_count_chart_obj.setOption(user_count_option, true);
        }

        $(window).on('resize', function () {
            user_count_chart_obj.resize();
        });
        
    }
    catch (e) { }
}
