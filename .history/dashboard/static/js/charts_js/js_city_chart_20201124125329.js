var city_label_name;
var city_dummy_set = null
var city_name_flag = false

function city_chart(chart_data) {
    if (city_chart_obj != null) {
        city_chart_obj.dispose()
    }

    try {
        var city_dom = document.getElementById("city_chart_container_sml");
        city_chart_obj = echarts.init(city_dom);
        var overall_count = chart_data['over_all'] // total visits per year
        
        city_chart_option = {
            tooltip: {
                trigger: 'item',
            },
            series: [
                {
                    type: 'pie',
                    startAngle: 120,
                    radius: ["50%", "70%"],
                    center: ['50%', '50%'],
                    color: ["#3366cc","#dc3912","#ff9900","#109618","#990099","#0099c6","#dd4477","#66aa00","#b82e2e","#316395","#3366cc","#994499","#22aa99","#aaaa11","#6633cc","#e67300","#8b0707","#651067","#329262","#5574a6","#3b3eac","#b77322","#16d620","#b91383","#f4359e","#9c5935","#a9c413","#2a778d","#668d1c","#bea413","#0c5922","#743411"],
                    hoverAnimation: true,
                    selectedMode:'single',
                    data: chart_data['city_data'],
                    label: {
                        show: true,
                        normal: {
                            padding: [0, -1],
                            formatter: function (param, ticket, callback) {
                                return '{grey|' + param.name + '}' + ' (' + '{bold|' + param.percent + '}' + '{percent|' + '%' + '})';
                            },
                            rich: {
                                grey: {
                                    align: 'center',
                                    color: "#7F7B7A",
                                    fontSize: 10,
                                },
                                bold: {
                                    fontSize: 10,
                                },
                                percent: {
                                    fontSize: 8
                                }
                            },
                            fontSize: 10,
                            show: true,
                        },
                    },
                    labelLine: {
                        normal: {
                            length: 10,
                            length2: 10,
                            show: true,
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 2,
                            borderColor: '#fff',
                        },
                        emphasis: {
                            borderWidth: 0,
                            shadowBlur: 2,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: chart_data['city_data']
                }
            ],
            graphic: [{
                type: 'group',
                silent: true,
                left: 'center',
                top: 'middle',
                children: [{
                    type: 'text',
                    z: 100,
                    left: 'center',
                    top: '0',
                    style: {
                        fill: '#333',
                        text: [Number(overall_count).toLocaleString('en-us')],
                        fontSize: 50,
                    }
                },
                {
                    type: 'text',
                    z: 100,
                    left: 'center',
                    top: '50',
                    style: {
                        fill: '#666',
                        text: [
                            'Overall'
                        ],
                        fontSize: 15,
                    }
                }
               ]
            }]
        }
        if (city_chart_option && typeof city_chart_option === "object") {
            city_chart_obj.setOption(city_chart_option, true);
        }
        $(window).on('resize', function () {
            city_chart_obj.resize();
        })
    }
    catch (e) {

    }

}
