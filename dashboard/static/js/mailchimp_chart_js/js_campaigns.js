function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function campaigns_chart(chart_data) {
    try {

        //chart_data={"data": true, "campaigns": ["Toll Sales Center Open Special Announcement", "Sept. 2020 Email Annnoucing Toll Brothers and Community Pumpkin Carving Contest", "July 2020 Email - Announcing JK Monarch, Garage Sale, Scavenger Hunt and Why Buy Now", "June 2020 Monthly Email Introducing Pulte, Rudd new Release and Museum", "May 2020 Monthly Email - Make Your Appointment To Tour", "April Monthly Email - Home Shopping from Home", "February Monthly Email - Townhome Grand Opening", "January 2020 News From Ten Trails"], "total_opens": [3235, 2943, 2648, 3091, 2487, 2559, 3020, 2135], "total_mail_sent": [8862, 8849, 8827, 8740, 8575, 8466, 8247, 8077], "total_clicks": [253, 391, 366, 537, 378, 400, 539, 371], "total_opens_rate": [37, 33, 30, 35, 29, 30, 37, 26], "unique_opens_rate": [24, 20, 17, 24, 18, 18, 20, 16]}
        var grid_size = [20, 25, 35, 35]

        var color = ['#56aea2', '#c5cbd4', '#96a9c7','#ddc26e']
        // var total_open_value = chart_data['total_opens']
        var total_mail_sent = chart_data['total_mail_sent']
        var total_clicks = chart_data['total_clicks']
        var total_opens_rate=chart_data['total_opens_rate']
        var unique_opens_rate=chart_data['unique_opens_rate']
        //var campaign_value = [140, 150, 100, 150, 120, 224]

        var campaigns_chart_dom = document.getElementById("campaigns_chart_container");
        var campaigns_chart_obj = echarts.init(campaigns_chart_dom);

        campaigns_chart_option = {
            // legend: {
            //     data: ['Total Mail Sent', 'Total Clicks','Total Opens','Unique Opens'],
            // },
            grid: {
                top: grid_size[0],
                bottom: grid_size[1],
                right: grid_size[2],
                left: grid_size[3],
                containLabel: true
            },
            /*tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label:{show:true}
                }
            },*/
            tooltip: {
                // formatter: function (param) {
                //     var total_open_tooltip; var new_open_tooltip; var return_open_tooltip;
                //     var final_tool_tip_value = '';

                //     for (i = 0; i < param.length; i++) {

                //         if (param[i].seriesName == 'Total opens') {
                //             total_open_tooltip = param[i].marker + 'Total opens :' + total_open_value[param[i].dataIndex] + '</br>'
                //         }
                //         if (param[i].seriesName == 'Total mail sent') {
                //             new_open_tooltip = param[i].marker + 'Total mail sent :' + new_open_value[param[i].dataIndex] + '</br>'
                //         }
                //         if (param[i].seriesName == 'Total clicks') {
                //             return_open_tooltip = param[i].marker + 'Total clicks :' + return_open_value[param[i].dataIndex] + '</br>'
                //         }
                //     }
                //     if (typeof total_open_tooltip != 'undefined') {
                //         final_tool_tip_value = final_tool_tip_value + "" + total_open_tooltip
                //     }
                //     if (typeof new_open_tooltip != 'undefined') {
                //         final_tool_tip_value = final_tool_tip_value + "" + new_open_tooltip
                //     }
                //     if (typeof return_open_tooltip != 'undefined') {
                //         final_tool_tip_value = final_tool_tip_value + "" + return_open_tooltip
                //     }
                //     return final_tool_tip_value

                // },
                trigger: 'axis',
                formatter:function(param){
                        var total_mail_sent_tooltip= '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c5cbd4;"></span>';
                        var total_opens_tooltip= '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#56aea2;"></span>';
                        var total_clicks_tooltip= '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#96a9c7;"></span>';
                        var unique_opens_tooltip= '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#ddc26e;"></span>';
                        

                        if(param.length>=1){
                            total_mail_sent=''
                            total_clicks=''
                            total_opens=''
                            unique_opens=''

                            for(i=0;i<param.length;i++){
                                var total_mail_sent_comma=numberWithCommas(Number(param[i].value))
                                var total_opens_comma=numberWithCommas(Number(param[i].value))
                                
                                if(param[i].seriesName=='Total Mail Sent') { var total_mail_sent=total_mail_sent_tooltip+"Total Mail Sent"+': '+total_mail_sent_comma+"</br>";}
                                else if (param[i].seriesName == 'Total Opens') {var total_opens=total_opens_tooltip+"Total Opens"+': '+total_opens_comma+"%"+"</br>";}
                                else if (param[i].seriesName == 'Total Clicks') {var total_clicks=total_clicks_tooltip+"Total Clicks"+': '+param[i].value+"</br>";}
                                else if (param[i].seriesName == 'Unique Opens') {var unique_opens=unique_opens_tooltip+"Unique Opens"+': '+param[i].value+"%"+"</br>";}

                            }

                        return total_mail_sent + total_clicks + total_opens+unique_opens
                        
                        }
 
                },
                axisPointer: {
                    type: 'shadow',
                    label: { show: true }
                },

            },
            xAxis: {
                name: 'Campaign',
                data: chart_data['campaigns'],
                type: "category",
                nameLocation: "center",
                nameTextStyle: {
                    fontSize: 9,
                    padding: 15,
                },

                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: axis_color,
                        opacity: axis_opacity
                    }
                },
                axisLabel: {
                    fontSize: 9, 
                    interval: 0,
                    formatter: function (value) {
                        return value.slice(0, 5) + ".."
                    }
                },
            },
            yAxis: [{
                name: 'Count',
                type: "value",
                splitLine: { show: false },
                axisLine: {
                },
                nameLocation: "center",
                nameTextStyle: {
                    fontSize: 9,
                    padding: 30,
                },
                axisLabel: {
                    fontSize: 9,
                    formatter: '{value}',
                },
                axisLine: {
                    lineStyle: {
                        color: axis_color,
                        opacity: axis_opacity
                    }
                },
            },
            {
                name: 'Percentage',
                //max: 0.5,
                type: 'value',
                nameLocation: "center",
                nameTextStyle: {
                    fontSize: 9,
                    padding: 15,
                    },
                //inverse: true,
                nameLocation: "center",
                nameTextStyle: {
                    fontSize: 9,
                    padding: 30,
                },
                axisLabel: {
                    fontSize: 9, 
                },
                splitLine:{
                    show:false
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
                    name: 'Total Mail Sent',
                    type: 'pictorialBar',
                    symbol: 'rect',
                    symbolRepeat: true,
                    symbolSize: [30, 1],
                    symbolMargin: 0,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: color[1],
                        }
                    },
                    z: -12,
                    data: total_mail_sent,
                },
                {
                    name: 'Total Opens',
                    type: 'line',
                    showAllSymbol: true,
                    symbol: 'emptyCircle',
                    symbolSize: 20,
                    smooth: false,
                    yAxisIndex: 1,
                    // lineStyle: {
                    //     width: 3
                    // },
                    label: {
                        show: false,
                        padding: 2,
                        // color:"purple",
                        //formatter: function (param) {
                        //return 'Campaign' + '\n\n' + campaign_value[param.dataIndex]
                        //}
                    },
                    itemStyle: {
                        normal: {
                            color: color[0]
                        },
                    },
                    data: total_opens_rate,
                }, 
                {
                    name: 'Total Clicks',
                    type: 'bar',
                    barWidth: 30,
                    itemStyle: {
                        normal: {

                            color: color[2]
                        }
                    },

                    data: total_clicks,
                },
                {
                    name: 'Unique Opens',
                    type: 'line',
                    showAllSymbol: true,
                    symbol: 'emptyCircle',
                    symbolSize: 20,
                    smooth: false,
                    yAxisIndex: 1,
                    // lineStyle: {
                    //     width: 3
                    // },
                    label: {
                        show: false,
                        padding: 2,
                        // color:"purple",
                        //formatter: function (param) {
                        //return 'Campaign' + '\n\n' + campaign_value[param.dataIndex]
                        //}
                    },
                    itemStyle: {
                        normal: {
                            color: color[3]
                        },
                    },
                    data: unique_opens_rate,
                },
                

            ]
        };

        if (campaigns_chart_option && typeof campaigns_chart_option === "object") {
            campaigns_chart_obj.setOption(campaigns_chart_option, true);
            removeLoader("campaigns_chart_container")
        }
        $(window).on('resize', function () {
            campaigns_chart_obj.resize();
        })
    }
    catch (e) { }
}
