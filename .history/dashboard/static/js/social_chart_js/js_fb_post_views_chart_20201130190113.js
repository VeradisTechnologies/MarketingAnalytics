function fb_post_views_chart(chart_data) {
    //console.log(chart_data)
    try {
        var fb_post_views_dom = document.getElementById("fb_most_views_post_chart_container");
        var fb_post_views_chart_obj = echarts.init(fb_post_views_dom);

        var grid_size = [20, 40, 30, 50]
       /// ['#c5cbd4','#96a9c7']  total ,paid,uniq,,
        var color_set = ['#c5cbd4', '#96a9c7','#2a456c','#f4e2ad'];//['#8ab4f0', '#3289e8', '#3b5998'];   // Color set
        fb_post_views_option = {

            tooltip: {

                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: { show: true }
                },

                formatter: function (param) {
                    var unique_impressions_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#ddc26e;"></span>';
                    var total_impressions_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c5cbd4;"></span>';
                    var paid_impressions_tooltip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#96a9c7;"></span>';

                    if (param.length >= 1) {
                        unique_impressions_count = ''
                        total_impressions_count = ''
                        paid_impressions_count = ''
                        x_axis_data = ''

                       
                        for (i = 0; i < param.length; i++) {
                            // alert(param[i].seriesName);
                            if (param[i].seriesName == 'Unique Impressions') { var unique_impressions_count = unique_impressions_tooltip + param[i].seriesName + ": " + Number(param[i].value).toLocaleString('en-us') + "</br>"; }
                            else if (param[i].seriesName == 'Total Impressions') { var total_impressions_count = total_impressions_tooltip + param[i].seriesName + ": " + Number(chart_data['total_impressions_tooltip'][param[i]['dataIndex']]).toLocaleString('en-us') + "</br>"; }
                            else if (param[i].seriesName == 'Paid Impressions') { var paid_impressions_count = paid_impressions_tooltip + param[i].seriesName + ": " + Number(param[i].value).toLocaleString('en-us') + "</br>"; }
                            //var x_axis_data
                            post_desc = chart_data['description'];
                            for (j = 0; j <= post_desc.length; j++) {
                                if (j == param[i]['dataIndex']) {
                                    if (post_desc[j] == "") {
                                        x_axis_data = param[i]['axisValue'] + "</br>";
                                    } else {
                                        x_axis_data = post_desc[j].split(' ').slice(0, 3).join(" ") + "</br>";
                                    }
                                }
                            };
                        }
                        return x_axis_data + total_impressions_count + unique_impressions_count + paid_impressions_count
                    }
                },
            },
            grid: {
                top: grid_size[0],
                bottom: grid_size[1],
                right: grid_size[2],
                left: grid_size[3]
            },
            // legend: { right: '5%' },
            xAxis: [
                {
                    name: "Posts",
                    nameLocation: "center",
                    nameTextStyle: {
                        fontSize: 9,
                        padding: 15,
                    },
                    type: 'category',
                    boundaryGap: true,
                    axisTick: {
                        show: true,
                        alignWithLabel: true,
                    },
                    axisLabel: {
                        fontSize: 9, 
                        interval: 0,
                        padding: [0, 0, 0, 20]
                    },
                    axisLine: {
                        lineStyle: {
                            color: axis_color,
                            opacity: axis_opacity
                        }
                    },
                    data: chart_data['x_axis_data'],

                }
            ],
            yAxis: {
                name: 'Count',
                nameLocation: "center",
                nameTextStyle: {
                    fontSize: 9,
                    padding: 15,
                },
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLabel: {
                    fontSize: 9,
                },
                axisLine: {
                    lineStyle: {
                        color: axis_color,
                        opacity: axis_opacity
                    }
                }
            },
            series: [
                {
                    name: 'Unique Impressions',
                    data: chart_data['unique_impressions'],
                    type: 'bar',
                    barWidth: 25,
                    stack: 'post',
                    itemStyle: {
                        normal: {
                            color: color_set[1]
                        }
                    },
                },
                {
                    name: 'Total Impressions',
                    data: chart_data['total_impressions'],
                    type: 'bar',
                    barWidth: 25,
                    stack: 'post',
                    itemStyle: {
                        normal: {
                            color: color_set[0]
                        }
                    },
                },

                {
                    name: 'Paid Impressions',
                    data: chart_data['paid_impressions'],
                    type: 'bar', 
                    barGap: '-60%',
                    barWidth: 5,
                    z: 10,
                    itemStyle: {
                        normal: {
                            color: color_set[2]
                        }
                    },
                },
            ]
        };

        if (fb_post_views_option && typeof fb_post_views_option === "object") {
            fb_post_views_chart_obj.setOption(fb_post_views_option, true);
            removeLoader("fb_most_views_post_chart_container")
        }
        $(window).on('resize', function () {
            fb_post_views_chart_obj.resize();
        })


        fb_post_views_chart_obj.setOption(Option);
        fb_post_views_chart_obj.off();
        fb_post_views_chart_obj.on('click', function (param) {
            target_url = chart_data['target_url']
            for (i = 0; i <= target_url.length; i++) {
                if (i == param['dataIndex']) {
                    if (target_url[i] == "") {
                        alert("No URL available for this Post")
                    } else {
                        window.open(
                            target_url[i]
                        );
                    }
                }
            }
        });

    }
    catch (e) {  }
}
