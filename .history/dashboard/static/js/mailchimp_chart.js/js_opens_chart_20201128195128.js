function opens_chart_container(chart_data) {    
    // if (opens_chart_obj != null) {
    //     opens_chart_obj.dispose()
    // }
    try {
        var opens_chart_dom = document.getElementById("opens_chart_container");
        opens_chart_obj = echarts.init(opens_chart_dom);

        var unique_opens_val = chart_data['unique_opens'];
        var total_opens_val = chart_data['total_opens'];
        var campaigns_val = chart_data['campaigns'];
        var mail_send_val = chart_data['mail_sent'];
        var x_axis_val = chart_data['x_axis_data']
        mail_send_val = mail_send_val.map(function(v){
            return v/100
        })
        period_type = $("#period_dropdown option:selected").val()

        var grid_size = [20, 45, 45, 50]
        var bar_width = 15
        var line_symbol_size = 10
        // var period_type = $("#period_dropdown option:selected").text()
        var label_length = [0, 10]
        period_type == 'Monthly';
        if (period_type == 'Monthly') {
            var bar_width = 20;
            var line_symbol_size = 12;
            label_length = [0, 3]
        }

        if (period_type == 'Weekly') {
            var bar_width = 28;
            var line_symbol_size = 15;
        }

        if (period_type == 'Quarterly') {
            var bar_width = 45;
            var line_symbol_size = 22;
        }
        opens_chart_option = {
            color: ['#96a9c7', '#c5cbd4', '#ddc26e', '#f4e2ad'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: { show: true }
                },
                formatter: function (params) {
                    if (params.length > 1) {
                        tt_header = ''
                        tt_campaigns = ''
                        tt_mailsend = ''
                        tt_total_opens = ''
                        tt_unique_opens = ''

                        for (i = 0; i < params.length; i++) {
                            if (tt_header == '') { tt_header = "Campaign Started : " + params[i].name + "</br>" }

                            if (params[i].seriesName == 'Campaigns') { tt_campaigns = params[i].marker + params[i].seriesName + " : " + Number(params[i].value).toLocaleString('en-us') + "</br>" }
                            else if (params[i].seriesName == 'Mail Sent') { tt_mailsend = params[i].marker + params[i].seriesName + " : " + (Number(params[i].value)*100).toLocaleString('en-us') + "</br>" }
                            else if (params[i].seriesName == 'Total Opens') { tt_total_opens = params[i].marker + params[i].seriesName + " : " + Number(params[i].value).toLocaleString('en-us') + "</br>" }
                            else if (params[i].seriesName == 'Unique Opens') { tt_unique_opens = params[i].marker + params[i].seriesName + " : " + Number(params[i].value).toLocaleString('en-us') + "</br>" }
                        }

                        return tt_header + tt_campaigns + tt_mailsend + tt_total_opens + tt_unique_opens

                    }

                }
            },
            grid: {
                top: grid_size[0],
                bottom: grid_size[1],
                right: grid_size[2],
                left: grid_size[3]
            },
            // legend: {
            //     data: ['Campaigns', 'Total Opens', 'Unique Opens']
            // },

            xAxis: [
                {
                    name: 'Campaign Started',
                    type: 'category',
                    axisTick: { show: true },
                    nameLocation: "center",
                    nameTextStyle: {
                        fontSize: 9,
                        padding: 15,
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
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: x_axis_val
                }
            ],
            yAxis: [
                {
                    name: 'Count',
                    type: 'value',
                    nameLocation: "center",
                    nameTextStyle: {
                        fontSize: 9,
                        padding: 25,
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
                {
                    name: 'Number Of Campaigns',
                    type: 'value',
                    //inverse: true,
                    nameLocation: "center",
                    nameTextStyle: {
                        fontSize: 9,
                        padding: 20,
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

            ],
            series: [
                {
                    name: 'Total Opens',
                    type: 'bar',
                    barGap: 0.1,
                    barWidth: bar_width,
                    data: total_opens_val
                },
                {
                    name: 'Unique Opens',
                    type: 'bar',
                    barWidth: bar_width,
                    data: unique_opens_val
                },
                {
                    name: 'Campaigns',
                    type: 'line',
                    yAxisIndex: 1,
                    label: {
                        show: true,
                        fontSize: 9,
                        color: 'black'
                    },
                    symbol: 'emptyCircle',
                    symbolSize: line_symbol_size,
                    smooth: false,
                    // lineStyle: {
                    //     width: 3, 
                    // },
                    data: campaigns_val
                },
                {
                    name: 'Mail Sent',
                    type: 'line',
                    label: {
                        show: false,
                        fontSize: 9,
                        color: 'black'
                    },
                    showSymbol: false,
                    symbol: 'emptyCircle',
                    symbolSize: 0,
                    lineStyle: {
                        width: 0,
                    },
                    data: mail_send_val
                }
            ]
        };
        var index = -1;
        var is_chart_selected = false;
        var chart_state = false;

        opens_chart_obj.on('click', function (params) {
            period = 'day'
            selected_value = ''
            if (period_type == "Monthly") {
                period = "Monthly"
                month_obj = { 'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6, 'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12 }
                selected_value = month_obj[params.name]
            }
            else if (period_type == "Quarterly") {
                period = "Quarterly"
                quarter_obj = { 'quarter 1': 1, 'quarter 2': 2, 'quarter 3': 3, 'quarter 4': 4 }
                selected_value = quarter_obj[params.name]
            }

        

            if ($("#period_dropdown option:selected").val() != "Daily" && $("#period_dropdown option:selected").val() != "Weekly") {
                control_option_xValue = params.dataIndex
                if (index == -1 || index != params.dataIndex) {
                    index = params.dataIndex;
                    is_chart_selected = true;
                }
                else {
                    if (is_chart_selected == false) {
                        is_chart_selected = true
                    }
                    else {
                        is_chart_selected = false;
                        ajax_opens_chart(period)
                    }
                }

                for (var i = 0; i < x_axis_val.length; i++) {
                    if (unique_opens_val[i].value) { unique_opens_val[i] = unique_opens_val[i].value; }
                    if (total_opens_val[i].value) { total_opens_val[i] = total_opens_val[i].value; }
                    if (campaigns_val[i].value) { campaigns_val[i] = campaigns_val[i].value; }
                    if (mail_send_val[i].value) { mail_send_val[i] = mail_send_val[i].value; }

                    if (index == i) {
                        if (is_chart_selected) {
                            unique_opens_val[i] = {
                                value: unique_opens_val[i],
                                itemStyle: { normal: { color: getOrigColor('hsl(178, 100%, 39%)') } }
                            }
                            total_opens_val[i] = {
                                value: total_opens_val[i],
                                itemStyle: { normal: { color: getOrigColor('hsl(39, 95%, 52%)') } }
                            }
                            campaigns_val[i] = {
                                value: campaigns_val[i],
                                itemStyle: { normal: { color: getOrigColor('hsl(358, 74%, 65%)') } }
                            }
                            mail_send_val[i] = {
                                value: mail_send_val[i],
                                itemStyle: { normal: { color: getOrigColor('hsl(0, 0%, 42%)') } }
                            }
                        }
                        else {
                            if (unique_opens_val[i].value) {
                                unique_opens_val[i] = {
                                    value: unique_opens_val[i],
                                    itemStyle: { normal: { color: 'hsl(178, 100%, 39%)' } }
                                }
                            }
                            if (total_opens_val[i].value) {
                                total_opens_val[i] = {
                                    value: total_opens_val[i],
                                    itemStyle: { normal: { color: 'hsl(39, 95%, 52%)' } }
                                }
                            }
                            if (campaigns_val[i].value) {
                                campaigns_val[i] = {
                                    value: campaigns_val[i],
                                    itemStyle: { normal: { color: 'hsl(358, 74%, 65%)' } }
                                }
                            }
                            if (mail_send_val[i].value) {
                                mail_send_val[i] = {
                                    value: mail_send_val[i],
                                    itemStyle: { normal: { color: 'hsl(0, 0%, 42%)' } }
                                }
                            }
                            chart_state = true
                            index = -1
                        }
                    } else {
                        unique_opens_val[i] = {
                            value: unique_opens_val[i],
                            itemStyle: { normal: { color: getHighLightColor('hsl(178, 100%, 39%)') } }
                        }
                        total_opens_val[i] = {
                            value: total_opens_val[i],
                            itemStyle: { normal: { color: getHighLightColor('hsl(39, 95%, 52%)') } }
                        }
                        campaigns_val[i] = {
                            value: campaigns_val[i],
                            itemStyle: { normal: { color: getHighLightColor('hsl(358, 74%, 65%)') } }
                        }
                        mail_send_val[i] = {
                            value: mail_send_val[i],
                            itemStyle: { normal: { color: getHighLightColor('hsl(0, 0%, 42%)') } }
                        }
                    }
                    opens_chart_obj.setOption(opens_chart_option, true);
                }

                if (chart_state == false) {
                    ajax_campaigns_top_chart(period, selected_period = selected_value)
                    ajax_top_campaign_chart(period, selected_period = selected_value)
                    ajax_click_through_chart(period, selected_period = selected_value)
                    ajax_email_send_chart(period, selected_period = selected_value)
                    if (period_type == "Monthly") {
                        $("#top_campaigns_header").text("Campaigns")
                    }
                } else {
                    ajax_campaigns_top_chart(period)
                    ajax_top_campaign_chart(period)
                    ajax_click_through_chart(period)
                    ajax_email_send_chart(period)
                    chart_state = false
                    if (period_type == "Monthly") {
                        $("#top_campaigns_header").text("Top Campaigns")
                    }
                }
            }
        });

        if (opens_chart_option && typeof opens_chart_option === "object") {
            opens_chart_obj.setOption(opens_chart_option, true);
            // removeLoader("opens_chart_container")
        }

        $(window).on('resize', function () {
            opens_chart_obj.resize();
        });

        function getHighLightColor(color) {
            return color.replace(/(\d+)%\)/, (...args) => { return 30 + Number(args[1]) + '%)' });
        }
        function getOrigColor(highlightColor) {
            return highlightColor.replace(/(\d+)%\)/, (...args) => { return Number(args[1]) - 30 + '%)' });
        }
    }

    catch (e) { }
}
