function top_pages_chart(chart_data) {
    if (top_page_chart_obj != null) {
        top_page_chart_obj.dispose()
    }
    try {

        // axis_value=[chart_data['page_count']]
        // chart_data = {"period": "total",
        //     "axis_label": ['builders', 'community', 'location', 'retail', 'biking'],
        //     "axis_value": []
        // }

        var top_pages = document.getElementById("top5_chart_container");
        top_page_chart_obj = echarts.init(top_pages);        

    
        var axis_label = chart_data['page_name'];
        var axis_value = chart_data['page_count'];
        for(i=0;i<axis_valueaxis_value.length;i++){
            var top5_axis_label = chart_data['page_name'];
            var top5_axis_value = chart_data['page_count'];

        }
        var grid_size = [10,20,20,0]
        
        top_page_option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                show: false,
            },
            grid: {
                top: grid_size[0],
                bottom: grid_size[1],
                right: grid_size[2],
                left: grid_size[3],
                containLabel:true
            },
            xAxis: {
                type: 'value',
                splitLine: { show: false },
                nameTextStyle: {
                    fontSize: 9,
                    padding: 0,
                    color: axis_color
                },
                axisLabel: {
                    interval: 0,
                    fontSize: 9,
                    color: axis_color
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
            },
            yAxis: {
                type: 'category',
                data: top5_axis_label,
                nameTextStyle: {
                    fontSize: 9,
                    padding: 0,
                    color: axis_color
                },
                axisLabel: {
                    interval: 0,
                    fontSize: 9,
                    color: axis_color
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
            },
            series: [
                {
                    name: '',
                    type: 'bar',
                    barWidth: 25,
                    data: [
                        {value: top5_axis_value[0],itemStyle: {color: '#ddc36f'}}, {value: top5_axis_value[1],itemStyle: {color: '#f4e3ad'}}, 
                        {value: top5_axis_value[2],itemStyle: {color: '#96a9c7'}}, {value: top5_axis_value[3],itemStyle: {color: '#c6cad3'}}, 
                        {value: top5_axis_value[4],itemStyle: {color: '#b4d2ba'}}
                    ],
                },
            ]
        };
        if(top_page_option && typeof top_page_option === "object") {
            top_page_chart_obj.setOption(top_page_option, true);
        }
        $(window).on('resize', function () {
            top_page_chart_obj.resize();
        });
    }
    catch (e) { alert(e) }
}
