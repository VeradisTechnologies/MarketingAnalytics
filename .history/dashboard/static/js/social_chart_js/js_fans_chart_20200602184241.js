function fans_chart(chart_data) {
    
    
    
    try {
        var fans_chart_dom = document.getElementById("fans_chart_container");
        var fans_chart_obj = echarts.init(fans_chart_dom);


        var grid_size = [20,70,60,80]

        var yaxis_padd = 40
        period_type = $(".active").text()
        var label_length = [0, 10]

        if (period_type == 'Monthly') {
            label_length = [0, 3]
            yaxis_padd = 50
            grid_size = [50,55,60,85]
        }

        var bar_size = 15
        if (period_type == 'Quarterly') {
            bar_size = 35
            yaxis_padd = 50
            grid_size = [20,70,60,80]
        }
        
        if (full_size_chart == 'fans_chart_container') {
            
            grid_size = [20,70,40,100]

            if(period_type == 'Quarterly'){
                //grid_size = [20,70,40,100]
                bar_size = 45
                yaxis_padd = 55
            }
        }

        var dataZoom_ctrl = []
        if (period_type == 'Daily') {
            grid_size = [40,80,40,80]
                

        }


        //item size configuration


        // var symbol_size = [15, 3];
        // var line_symbol_size = 15;

        // // item color
        // //var item_colors = ['#00B7C7', '#FE6176']
        var item_colors = social_color,


            user_count_option = {
                dataZoom: dataZoom_ctrl,

                tooltip: {
                    formatter:function(param){
                        var total_fans_tooltip= '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#3289e8";></span>';
                        var new_fans_tooltip= '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#8AB4F0;"></span>';
                        var total_followers_tooltip= '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#ff9c01;"></span>';
                        var new_followers_tooltip= '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F4D03F;"></span>';
    
                        var new_fans=new_fans_tooltip+param[0]['seriesName']+':'+param[0]['value']+"</br>";
                        var total_fans=total_fans_tooltip+param[1]['seriesName']+':'+Number(chart_data['total_fans_tooltip'][param[1]['dataIndex']])+"</br>";
                        var new_followers=new_followers_tooltip+param[2]['seriesName']+':'+param[2]['value']+"</br>";
                        var total_followers=total_followers_tooltip+param[3]['seriesName']+':'+Number(chart_data['total_followers_tooltip'][param[3]['dataIndex']])+"</br>";

                        return total_fans + new_fans+ total_followers +new_followers
                    },
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        label:{show:true}
                    }
                },
                legend: {
                    left:'center',
                    icon: "rect",
                    itemWidth: 26,
                    itemHeight: 10,
                },

                grid: {
                    top: grid_size[0],
                    bottom: grid_size[1],
                    right: grid_size[2],
                    left: grid_size[3],
                    
                },
                xAxis: {
                    name: "Period",
                    data: chart_data['x_axis_data'],
                    position: "bottom",
                    type: "category",
                    //gridIndex:12,
                    axisLabel: {
                        interval: 0,
                        formatter: function (value) {
                            return value.slice(label_length[0], label_length[1])
                        }
                    },
                    nameLocation: "center",
                    nameTextStyle: {
                        fontSize: 13,
                        padding: 15,
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
                    name: "Count",
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
                        fontSize: 13,
                        padding: yaxis_padd,
                        color: axis_color
                    },
                    axisLabel: {
                        formatter: '{value}',
                    }
                }

                ],

                series: [ 
                    {
                        
                            name: 'New Fans',
                            type: 'bar',
                            stack: 'Fans',
                            barWidth: bar_size,
                            color:'#8AB4F0',
                            // data: chart_data['organic_likes_data']
                        
                    
    
                        data: chart_data['new_fans']
                    },
                    {
                        name: 'Total Fans',
                        type: 'bar',
                        barWidth: bar_size,
                        stack: 'Fans',
                        barGap: 0.1,
                        itemStyle: {
                            normal: {
                                // barBorderRadius: 5,
                                color: '#3289e8'
                            }
                        },
                        data: chart_data['total_fans']
                    },
                    // bar 2 start
                    {
                        name: 'New Followers',
                        type: 'bar',
                        barWidth: bar_size,
                        stack: 'Followers',
                        itemStyle: {
                            normal: {
                                //barBorderRadius: 5,
                                color: '#fbd77f'
                                
                            }
                        },
                        data:chart_data['new_followers']
                    },
                    {
                        name: 'Total Followers',
                        type: 'bar',
                        barWidth: bar_size,
                        stack: 'Followers',
                        itemStyle: {
                            normal: {
                                color:item_colors[1]
                                //barBorderRadius: 5,
                            }
                        },
                        data: chart_data['total_followers']
                    },
                    
                    
                    

                ]
            };

        if (user_count_option && typeof user_count_option === "object") {
            fans_chart_obj.setOption(user_count_option, true);
            removeLoader("fans_chart_container")
        }

        $(window).on('resize', function () {
            fans_chart_obj.resize();
        })
    }
    catch (e) { }
}