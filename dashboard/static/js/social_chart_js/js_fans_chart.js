function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function fans_chart(chart_data) {

    try {
        var fans_chart_dom = document.getElementById("fans_chart_container");
        var fans_chart_obj = echarts.init(fans_chart_dom);


        var grid_size = [20, 40, 30, 48]

        var yaxis_padd = 22
        var bar_size = 15 

        period_type = $("#period_type").val()
        var label_length = [0, 10]
         
        if (period_type == 'Monthly') {
            label_length = [0, 3] 
        } 
        var dataZoom_ctrl_ = []
        if (period_type == 'Daily' || period_type == 'Monthly') {
          
          var endval=35;
          if(period_type=='Daily' && chart_data['x_axis_data'].length>20){
            var endval=20;
          }
            dataZoom_ctrl_ = [{
                type: 'slider',
                height: 5,
                bottom: 5,
                start: 0,
                end: endval,
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
 
        user_count_option = {
            
            dataZoom: dataZoom_ctrl_,
            tooltip: {
                formatter: function (param) {
                    var total_fans_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c5cbd4";></span>';
                    var new_fans_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#96a9c7;"></span>';
                    var total_followers_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#f4e2ad;"></span>';
                    var new_followers_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#ddc26e;"></span>';
                    // var total_twitter_followers_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c5cbd4;"></span>';
                    
                    // var new_twitter_followers_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#96a9c7;"></span>';
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


                        for (i = 0; i < param.length; i++) {

                            var new_fans_comma_value = numberWithCommas(Number(chart_data['new_fans'][param[i]['dataIndex']]))
                            var new_followers_comma_value = numberWithCommas(Number(chart_data['new_followers'][param[i]['dataIndex']]))
                            var total_fans_comma_value = numberWithCommas(Number(chart_data['total_fans_tooltip'][param[i]['dataIndex']]))
                            var total_followers_comma_value = numberWithCommas(Number(chart_data['total_followers_tooltip'][param[i]['dataIndex']]))
                            // var new_fans_lost_tooltip_comma_value = numberWithCommas(Number(chart_data['new_fans_lost_tooltip'][param[i]['dataIndex']]))

                            var total_twitter_followers_comma_value = numberWithCommas(Number(chart_data['tw_total_followers_tooltip'][param[i]['dataIndex']]))
                            var new__twitter_fans_followers_comma_value = numberWithCommas(Number(chart_data['tw_new_followers'][param[i]['dataIndex']]))


                            if (param[i].seriesName == 'New Facebook Fans') { var new_fans = new_fans_tooltip + "New Facebook Fans" + ': ' + new_fans_comma_value + "</br>"; }
                            else if (param[i].seriesName == 'Total Facebook Fans') { var total_fans = total_fans_tooltip + "Total Facebook Fans" + ': ' + total_fans_comma_value + "</br>"; }
                            else if (param[i].seriesName == 'New Instagram Followers') { var new_followers = new_followers_tooltip + "New Instagram Followers" + ': ' + new_followers_comma_value + "</br>"; }
                            else if (param[i].seriesName == 'Total Instagram Followers') { var total_followers = total_followers_tooltip + "Total Instagram Followers" + ': ' + total_followers_comma_value + "</br>"; }
                           
                            else if (param[i].seriesName == 'New Twitter Followers') { var new_twitter_fans = new_twitter_followers_tooltip + "New Twitter Followers" + ': ' + new__twitter_fans_followers_comma_value + "</br>"; }
                            else if (param[i].seriesName == 'Total Twitter Followers') { var total_twitter_fans = total_twitter_followers_tooltip + "Total Twitter Followers" + ': ' + total_twitter_followers_comma_value + "</br>"; }
                            // var new_fans_lost_tooltip = "Facebook Fans Lost" + ': ' + new_fans_lost_tooltip_comma_value + "</br>";
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
                    data: chart_data['tw_new_followers']
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
                    data: chart_data['tw_total_followers']
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
