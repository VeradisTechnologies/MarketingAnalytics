function mailchimp_click_through(chart_data) {

    try {
        var mailchimp_click_dom = document.getElementById("clickThrough_chart_container");
        var mailchimp_click_chart_obj = echarts.init(mailchimp_click_dom);

        var grid_size = [20, 45, 45, 50]
        var bar_width = 15
        var line_symbol_size = 10
        period_type = $("#period_dropdown option:selected").val()

        var label_length = [0, 10]

        period_type == 'Monthly';
        
        if (period_type == 'Monthly') {
            var bar_width = 20;
            var line_symbol_size = 12;
            label_length = [0, 3]
        }
        
        if (period_type == 'Weekly'){
            var bar_width = 30;
            var line_symbol_size = 18;
        }

        if (period_type == 'Quarterly') {
            var bar_width = 45;
            var line_symbol_size = 22;
        }

        mail_chimp_click_option = {
            color:['#56aea2', '#ddc26e'],
            // tooltip: {
            //     trigger: 'axis',
            //     axisPointer: {
            //         type: 'shadow',
            //         label:{show:true}
            //     }
            // }, 
            tooltip: {
                trigger: 'axis',
                formatter:function(param){
                    var click_through_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#96a9c7;"></span>';
                    var click_through_rate_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#ddc26e;"></span>';
                    
                    if(param.length>=1){
                        click_through=''
                        click_through_rate=''

                        for(i=0;i<param.length;i++){
                            
                            if(param[i].seriesName=='Click Through') { var click_through=click_through_tooltip+param[i].seriesName+': '+numberWithCommas(Number(param[i].value))+"</br>";}
                            else if (param[i].seriesName == 'Click Through Rate') {var click_through_rate=click_through_rate_tooltip+param[i].seriesName+': '+numberWithCommas(Number(param[i].value))+'%'+"</br>"}
                        }
                    }                   
                    
                    return click_through+click_through_rate
                },
                    axisPointer: {
                    type: 'shadow',
                    label:{show:true}
                }
            },
            grid: {
                top: grid_size[0],
                bottom: grid_size[1],
                right: grid_size[2],
                left: grid_size[3]
            },
            // legend: {
            //     visible:false,
            //    data:['Click Through','Click Through Rate']
            // },

            xAxis: [
                {   name: 'Campaign Started',
                    type: 'category',
                    nameLocation: "center",
                    nameTextStyle: {
                        fontSize: 9,
                        padding: 15,
                    },
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel:{
                        interval:0,
                        fontSize: 9,
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
                },

            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Count',
                    nameLocation: "center",
                    nameTextStyle: {
                        fontSize: 9,
                        padding: 25,
                        },
                    splitLine:{
                        show:false
                    },
                    axisLabel:{ 
                        fontSize: 9, 
                    },
                    axisLine: {
                        lineStyle: {
                            color: axis_color,
                            opacity: axis_opacity
                        }
                    },   
                    
                },
                {
                    name: 'Percentage Rate',
                    //max: 0.5,
                    type: 'value',
                    nameLocation: "center",
                    nameTextStyle: {
                        fontSize: 9,
                        padding: 15,
                        },
                    //inverse: true,
                    nameLocation: "center", 
                    splitLine:{
                        show:false
                    },
                    axisLabel:{ 
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
                    name: 'Click Through',
                    type: 'bar',
                    data: chart_data['click_through'],
                    barWidth: bar_width
                },
                {
                    name: 'Click Through Rate',
                    type: 'line',
                    yAxisIndex: 1,
                    data: chart_data['click_through_rate'],
                    symbolSize: line_symbol_size
                }
            ]
        };

        if (mail_chimp_click_option && typeof mail_chimp_click_option === "object") {
            mailchimp_click_chart_obj.setOption(mail_chimp_click_option, true);
            removeLoader("clickThrough_chart_container")
        }
        $(window).on('resize', function () {
            mailchimp_click_chart_obj.resize();
        })
    }
    catch (e) { }
}
