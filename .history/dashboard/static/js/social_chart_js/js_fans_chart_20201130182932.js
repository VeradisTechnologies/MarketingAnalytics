function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function fans_chart(chart_data) {

    try {
        var fans_chart_dom = document.getElementById("fans_chart_container");
        var fans_chart_obj = echarts.init(fans_chart_dom);


        var grid_size = [20, 40, 30, 43]

        var yaxis_padd = 18
        period_type = $(".active").text()
        var label_length = [0, 10]
        period_type = 'Monthly';
        if (period_type == 'Monthly') {
            label_length = [0, 3]
            yaxis_padd = 18
            grid_size = [20, 40, 30, 43]
        }

        var bar_size = 15
        if (period_type == 'Quarterly') {
            bar_size = 35
            yaxis_padd = 18
            grid_size = [20, 40, 30, 43]
        }

        /* if (full_size_chart == 'fans_chart_container') {
             
             grid_size = [20,70,40,100]
 
             if(period_type == 'Quarterly'){
                 //grid_size = [20,70,40,100]
                 bar_size = 45
                 yaxis_padd = 55
             }
         }*/

        var dataZoom_ctrl = []
        if (period_type == 'Daily' || period_type == 'Monthly') {
            // alert('dialy')
            grid_size = [20, 40, 30, 43]
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

        //item size configuration


        // var symbol_size = [15, 3];
        // var line_symbol_size = 15;

        // // item color
        // //var item_colors = ['#00B7C7', '#FE6176']
        // var item_colors = social_color, 
        user_count_option = {
            dataZoom: dataZoom_ctrl,
            tooltip: {
                formatter: function (param) {
                    var total_fans_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c5cbd4";></span>';
                    var new_fans_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#96a9c7;"></span>';
                    var total_followers_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#f4e2ad;"></span>';
                    var new_followers_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#ddc26e;"></span>';
                    var total_twitter_followers_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c5cbd4;"></span>';
                    
                    var new_twitter_followers_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#96a9c7;"></span>';
                    var total_twitter_followers_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#b1d3bb;"></span>';
                    var new_twitter_followers_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#5ebfb2;"></span>';


                    if (param.length >= 1) {
                        new_fans = ''
                        total_fans = ''
                        new_followers = ''
                        total_followers = ''
                        new_fans_lost_tooltip = ''
                        total_twitter_fans = ''
                        new_twitter_fans = ''
                        // chart_data = {
                        //     "data": true, "x_axis_data": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November"],
                        //     "total_fans": [5034, 5527, 5928, 6461, 7209, 7839, 8318, 8698, 9150, 9411, 9684],
                        //     "new_fans": [580, 494, 623, 841, 720, 572, 473, 540, 348, 315, 182],
                        //     "total_followers": [1673, 1719, 1755, 1793, 1824, 1866, 1896, 1937, 1977, 2011, 2050],
                        //     "new_followers": [46, 36, 38, 31, 42, 30, 41, 40, 34, 39, 23],
                        //     "total_fans_tootltip": [],
                        //     "total_followers_tooltip": [1719, 1755, 1793, 1824, 1866, 1896, 1937, 1977, 2011, 2050, 2073],
                        //     "fan_remove_count": [],
                        //     "fan_remove_count_tot": [],
                        //     "new_fans_lost_tooltip": [93, 87, 93, 90, 93, 90, 93, 93, 88, 87, 42],
                        //     "total_fans_tooltip": [5614, 6021, 6551, 7302, 7929, 8411, 8791, 9238, 9498, 9726, 9866],
                        //     "total_twitter_followers_tooltip": [1519, 1555, 1593, 1624, 1666, 1696, 1737, 1777, 1911, 1950, 1973],
                        //     "new_twitter_fans": [36, 26, 28, 11, 22, 10, 21, 20, 30, 29, 13],
                        // }

                        for (i = 0; i < param.length; i++) {

                            var new_fans_comma_value = numberWithCommas(Number(chart_data['new_fans'][param[i]['dataIndex']]))
                            var new_followers_comma_value = numberWithCommas(Number(chart_data['new_followers'][param[i]['dataIndex']]))
                            var total_fans_comma_value = numberWithCommas(Number(chart_data['total_fans_tooltip'][param[i]['dataIndex']]))
                            var total_followers_comma_value = numberWithCommas(Number(chart_data['total_followers_tooltip'][param[i]['dataIndex']]))
                            var new_fans_lost_tooltip_comma_value = numberWithCommas(Number(chart_data['new_fans_lost_tooltip'][param[i]['dataIndex']]))

                            var total_twitter_followers_comma_value = numberWithCommas(Number(chart_data['tw_total_followers_tooltip'][param[i]['dataIndex']]))
                            var new__twitter_fans_followers_comma_value = numberWithCommas(Number(chart_data['tw_new_followers'][param[i]['dataIndex']]))


                            if (param[i].seriesName == 'New Facebook Fans') { var new_fans = new_fans_tooltip + "New Facebook Fans" + ': ' + new_fans_comma_value + "</br>"; }
                            else if (param[i].seriesName == 'Total Facebook Fans') { var total_fans = total_fans_tooltip + "Total Facebook Fans" + ': ' + total_fans_comma_value + "</br>"; }
                            else if (param[i].seriesName == 'New Instagram Followers') { var new_followers = new_followers_tooltip + "New Instagram Followers" + ': ' + new_followers_comma_value + "</br>"; }
                            else if (param[i].seriesName == 'Total Instagram Followers') { var total_followers = total_followers_tooltip + "Total Instagram Followers" + ': ' + total_followers_comma_value + "</br>"; }
                           
                            else if (param[i].seriesName == 'New Twitter Followers') { var new_twitter_fans = new_twitter_followers_tooltip + "New Twitter Followers" + ': ' + new__twitter_fans_followers_comma_value + "</br>"; }
                            else if (param[i].seriesName == 'Total Twitter Followers') { var total_twitter_fans = total_twitter_followers_tooltip + "Total Twitter Followers" + ': ' + total_twitter_followers_comma_value + "</br>"; }
                            var new_fans_lost_tooltip = "Facebook Fans Lost" + ': ' + new_fans_lost_tooltip_comma_value + "</br>";
                        }

                        return total_fans + new_fans + new_fans_lost_tooltip + total_followers + new_followers + total_twitter_fans + new_twitter_fans;

                    }

                },
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: { show: true }
                }
            },

            // legend: {
            //     left:'center',
            //     icon: "rect",
            //     itemWidth: 26,
            //     itemHeight: 10,
            // },

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
                    fontSize: 9,
                    interval: 0,
                    formatter: function (value) {
                        return value.slice(label_length[0], label_length[1])
                    }
                },
                nameLocation: "center",
                nameTextStyle: {
                    fontSize: 9,
                    padding: 10,
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
                    fontSize: 9,
                    padding: yaxis_padd,
                    color: axis_color
                },
                axisLabel: {
                    fontSize: 9,
                    formatter: '{value}',
                }
            }

            ],
            // ['#ddc26e', '#c5cbd4', '#96a9c7','#f4e2ad']
            series: [
                {
                    name: 'New Facebook Fans',
                    type: 'bar',
                    stack: 'Fans',
                    barWidth: bar_size,
                    color: '#96a9c7',
                    // data: chart_data['organic_likes_data']

                    data: chart_data['new_fans']
                },
                {
                    name: 'Total Facebook Fans',
                    type: 'bar',
                    barWidth: bar_size,
                    stack: 'Fans',
                    barGap: 0.1,
                    itemStyle: {
                        normal: {
                            // barBorderRadius: 5,
                            color: '#c5cbd4'
                        }
                    },
                    data: chart_data['total_fans']
                },
                // bar 2 start
                {
                    name: 'New Instagram Followers',
                    type: 'bar',
                    barWidth: bar_size,
                    stack: 'Followers',
                    itemStyle: {
                        normal: {
                            //barBorderRadius: 5,
                            color: '#ddc26e'

                        }
                    },
                    data: chart_data['new_followers']
                },
                {
                    name: 'Total Instagram Followers',
                    type: 'bar',
                    barWidth: bar_size,
                    stack: 'Followers',
                    itemStyle: {
                        normal: {
                            color: '#f4e2ad'
                            //barBorderRadius: 5,
                        }
                    },
                    data: chart_data['total_followers']
                },
                // bar 3 start
                {
                    name: 'New Twitter Followers',
                    type: 'bar',
                    barWidth: bar_size,
                    stack: 'TwitterFollowers',
                    itemStyle: {
                        normal: {
                            //barBorderRadius: 5,
                            color: '#5ebfb2'

                        }
                    },
                    data: chart_data['new_twitter_fans']
                },
                {
                    name: 'Total Twitter Followers',
                    type: 'bar',
                    barWidth: bar_size,
                    stack: 'TwitterFollowers',
                    itemStyle: {
                        normal: {
                            color: '#b1d3bb'
                            //barBorderRadius: 5,
                        }
                    },
                    data: chart_data['total_twitter_followers_tooltip']
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
    catch (e) { alert(e)}
}
