function social_gender_chart() {
    chart_data={"data": true, "male": "47", "female": "53"};
    try {
        var social_gender_chart_dom = document.getElementById("social_gender_chart_container");
        var social_gender_chart_obj = echarts.init(social_gender_chart_dom);

        social_gender_option = {
            //color: ['#F9A811', '#00C9C3'],
            color: ['#c5cbd4','#96a9c7'],
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
                    radius: ['70%', '100%'],
                    center: ['50%', '45%'],
                    data: [
                        { name: 'Female', value: chart_data['female'] },
                        { name: 'Male', value: chart_data['male'] },
                    ],
 
                    label: {
                        show: true,
                        normal: {
                            color: "#676566",
                            fontSize: 11,
                            position: "center",
                            formatter: "Gender"
                        }
                    },
                }
            ],
        };
        if (social_gender_option && typeof social_gender_option === "object") {
            social_gender_chart_obj.setOption(social_gender_option, true);
            removeLoader("social_gender_chart_container")
        }

        $(window).on('resize', function () {
            social_gender_chart_obj.resize();
        })
    }
    catch (e) { }
}