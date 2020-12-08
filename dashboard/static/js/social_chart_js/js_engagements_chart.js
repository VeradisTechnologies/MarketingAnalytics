function engagements_chart(chart_data) {

    try {
        var engagement_chart_dom = document.getElementById("engagement_chart_container");
        var engagement_chart_obj = echarts.init(engagement_chart_dom);
        
        period_type = $("#period_type").val()
	   

	    var label_length = [0, 10]
	    if (period_type == 'Monthly') {
		label_length = [0, 3]
	    }

	    var symbol_size = 12
	    if (period_type == 'Quarterly') {
		symbol_size = 20
	    }

        var grid_size = [30,40,20,55] 
        var dataZoom_ctrl_ = []
        if (period_type == 'Daily' || period_type == 'Monthly') { 
          var endval=35;
         // if(period_type=='Daily' && chart_data['x_axis_data'].length>20){
         //   var endval=20;
         // }
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

 

        engagement_chart_option = {
            //color: ['#4FDAD5', '#FBB738'],
            dataZoom: dataZoom_ctrl_,

            color: social_eng_color,
            tooltip: {
                trigger: 'axis',
                align:"left",
                axisPointer: {
                    // type: 'shadow',
                    label:{show:true},
                }
            },

            // legend: {
            //     top: '0%',
            //     right: '5%'
            // },
            grid: {
                top: grid_size[0],
                bottom: grid_size[1],
                right: grid_size[2],
                left: grid_size[3],
                
            },
            xAxis: {
                name: "Period",
                boundaryGap: false,
                nameLocation: "center",
                nameTextStyle: {
                    fontSize: 9,
                    padding: 12,
                    color: axis_color
                },
                type: 'category',
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
                    show: true,
                    alignWithLabel: true
                },
                data: chart_data['x_axis_data']
            },
            yAxis: {
                name: 'Count',
                nameLocation: "center",
                nameTextStyle: {
                    fontSize: 9,
                    padding: 30,
                    color: axis_color
                },
                axisLabel: {
                    fontSize: 9,
                },
                axisLine: {
                    lineStyle: {
                        color: axis_color,
                        opacity: axis_opacity
                    }
                },
                type: 'value'
            },
            series: [{
                name: "Facebook",
                data: chart_data['facebook_data'],
                type: 'line',
                smooth: true,
                symbol: 'emptyCircle',
                symbolSize: symbol_size,
                lineStyle: {
                    width: 3
                },
            },
            {
                name: "Instagram",
                data: chart_data['instagram_data'],
                type: 'line',
                smooth: true,
                symbol: 'emptyCircle',
                symbolSize: symbol_size,
                lineStyle: {
                    width: 3
                },
            },
            {
                name: "Twitter",
                data: chart_data['twitter_data'],
                type: 'line',
                smooth: true,
                symbol: 'emptyCircle',
                symbolSize: symbol_size,
                lineStyle: {
                    width: 3
                },
            }] 
        };
        if (engagement_chart_option && typeof engagement_chart_option === "object") {
            engagement_chart_obj.setOption(engagement_chart_option, true);
            removeLoader("engagement_chart_container")
        }

        $(window).on('resize', function () {
            engagement_chart_obj.resize();
        })
    }
    catch (e) { }
}
