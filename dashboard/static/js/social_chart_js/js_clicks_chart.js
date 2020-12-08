function clicks_chart(chart_data) {
    try {
        $("#link_val").text(Number(chart_data['link_clicks_data']).toLocaleString('en-us'))
        $("#other_val").text(Number(chart_data['other_clicks_data']).toLocaleString('en-us'))

        var fb_png = document.getElementById("fb_icon").src;
        var clicks_chart_dom = document.getElementById("clicks_chart_container");
        var clicks_chart_obj = echarts.init(clicks_chart_dom);


        var img_size = [20,20,'40%'] // fb icon width ,height, top
        var fb_total_count_size = [20,'48%'] // fb count text size , position
        var fb_total_text_size = [12,'55%']
        var pie_chart_size = ['65%', '90%']
        if (full_size_chart == 'clicks_chart_container') {
                img_size = [30,30,'38%']
                fb_total_count_size = [30,'47%']
                fb_total_text_size = [15,'55%']
                pie_chart_size = ['55%', '80%']
         
        }

        clicks_chart_option = {
            tooltip: {},
            //color: ['#498CE7', '#F58A00'],		
            color: ['#3289e8', '#8AB4F0'],
            series: [
                {
                    name: '',
                    type: 'pie',
                    center: ['50%', '50%'],
                    radius: pie_chart_size,
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    
                    data: [
                        { value: chart_data['link_clicks_data'], name: 'Link' },
                        { value: chart_data['other_clicks_data'], name: 'Others' },
                    ]
                }
            ],
            graphic: [
                {
                    type: 'image',
                    silent: true,
                    style: {
                        image: fb_png,
                        width: img_size[0],
                        height: img_size[1]
                    },
                    left: 'center',
                    top: img_size[2]
                },
                {
                    type: 'text',
                    silent: true,
                    left: 'center',
                    top: fb_total_count_size[1],
                    style: {
                        fill: '#666',
                        text: [
                            Number(parseInt(chart_data['link_clicks_data']) + parseInt(chart_data['other_clicks_data'])).toLocaleString('en-us')
                        ],
                        fontSize: fb_total_count_size[0],
                        fontWeight: "bold"
                    }
                },
                {
                    type: 'text',
                    silent: true,
                    left: 'center',
                    top: fb_total_text_size[1],
                    style: {
                        fill: '#666',
                        text: [
                            'Total'
                        ],
                        fontSize: fb_total_text_size[0],
                    }
                }
            ],
        };
        if (clicks_chart_option && typeof clicks_chart_option === "object") {
            clicks_chart_obj.setOption(clicks_chart_option, true);
            removeLoader("clicks_chart_container")
        }

        // $(window).on('resize', function () {
        //     clicks_chart_obj.resize();
        // })
    }
    catch (e) { }
}