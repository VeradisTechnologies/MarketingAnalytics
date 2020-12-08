function gender_chart(chart_data) {
    $("#men_png").prop('src', $("#men_png_src").prop('src'))
    $("#female_png").prop('src', $("#women_png_src").prop('src'))

    if (gender_chart_obj != null) {
        gender_chart_obj.dispose()
    }

    try {
        var dom = document.getElementById("gender_charts_ga");
        gender_chart_obj = echarts.init(dom);

        var male = chart_data['male'];
        var female = chart_data['female'];
        var color_set = [ '#f4e2ad','#ddc26e']
        var data_set = [
            { name: 'Female', value: female },
            { name: 'Male', value: male },
        ]
        var hover_status = true
        var itemStyle_set = {}

        if (male == 0 && female == 0) {
            hover_status = false
            color_set = ['#E3DFDE']
            data_set = [
                { name: 'data', value: female },
            ]
            itemStyle_set = {
                normal: { color: '#E3DFDE' },
                emphasis: { color: '#E3DFDE' }
            }
        }

        $("#male").html(male + "<span>%</span>");
        $("#female").html(female + "<span>%</span>");
        option = {
            color: color_set,
            tooltip: {
                formatter: function (param) {
                    return param.marker + param.name + ": " + param.percent + "%"
                }
            },
            series: [
                {
                    hoverAnimation: false,
                    //name: 'Age group',
                    type: 'pie',
                    radius: ['60%', '85%'],
                    center: ['50%', '50%'],
                    data: data_set,
                    itemStyle: itemStyle_set,
                    label: {
                        show: true,
                        normal: {
                            color: "#676566",
                            fontSize: 12,
                            position: "center",
                            formatter: "Gender"
                        }
                    },
                }
            ],

        };

        if (option && typeof option === "object") {
                gender_chart_obj.setOption(option, true);
        }
        $(window).on('resize', function () {
            gender_chart_obj.resize();
        })
    }
    catch (e) { 
        
    }
}
