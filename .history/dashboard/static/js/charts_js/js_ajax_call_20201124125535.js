function ajax_user_count_chart(period,selected_year,selected_month,chart_name='',visitor_type='', drillDown_params=null) {

    selected_month = $("#month_dropdown option:selected").val()
    selected_year = $("#year_dropdown option:selected").val()
    $("#user_count_chart_container_nodata_sml").hide()
    showLoader("user_count_chart_container_sml")

    if (period != null) {
        if (period == "Daily") {
            period = "day"
        } else if (period == "Monthly") {
            period = "month"
        } else if (period == "Weekly") {
            period = "week"
        } else { 
            period = "quarter"
        }
    }else{
        period = "month"
    }

    $.ajax({
        url: "endpoint/visitors_data",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month,'chart_name':chart_name, 'visitor_type':visitor_type },
        success: function (data) {
            if (data["data"] == true) {
                user_count_chart(data, drillDown_params)
                $("#usercount_tile").show()
                $("#user_count_chart_container_sml").show()
                $("#user_count_chart_container_nodata_sml").hide()
            }
            else {
                $("#usercount_tile").hide()
                $("#user_count_chart_container_sml").hide()
                $("#user_count_chart_container_nodata_sml").show()
            }

        }
    });
}


function ajax_pageview_chart(period,selected_year,month_val=null, s_date='',e_date='', q_drilldown='') {
    // selected_month = $("#month_select option:selected").val()
    selected_month = month_val
    if (selected_month == null) {
        selected_month = $("#month_dropdown option:selected").val()
    }
    selected_year = $("#year_dropdown option:selected").val()
    $("#pageviews_chart_container_nodata_sml").hide()
    showLoader("pageviews_chart_container_sml")
    
    if (period != null) {
        if (period == "Daily") {
            period = "day"
        } else if (period == "Monthly") {
            period = "month"
        } else if (period == "Weekly") {
            period = "week"
        } else { 
            period = "quarter"
        }
    }else{
        period = "month"
    }
    
    $.ajax({
        url: "endpoint/pageview_data",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month,'s_date':s_date, 'e_date':e_date, 'q_drilldown':q_drilldown },
        success: function (data) {
            if (data["data"] == true) {
                pageView_chart(data)
                $("#p_usercount_tile").show()
                $("#pageviews_chart_container_sml").show()
                $("#pageviews_chart_container_nodata_sml").hide()
            }
            else {
                $("#p_usercount_tile").hide()
                $("#pageviews_chart_container_sml").hide()
                $("#pageviews_chart_container_nodata_sml").show()
            }

        }
    });
}


function ajax_conversion_rate_chart(period, year_val = null, month_val = null,chart_name='',visitor_type='', drillDown_params=null) {
    selected_year = year_val
    selected_month = month_val

    if (selected_year == null) {
        selected_year = $("#year_dropdown option:selected").val()
    }
    if (selected_month == null) {
        selected_month = $("#month_dropdown option:selected").val()
    }
    $("#conversion_rate_chart_container_nodata_sml").hide()
    showLoader("conversion_rate_chart_container_sml")
    $.ajax({
        url: "endpoint/conversation_data",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month,'chart_name':chart_name, 'visitor_type':visitor_type},
        success: function (data) {
            if (data["data"] == true) {
                $("#conversion_rate_chart_container_sml").show()
                conversion_rate_chart(data, drillDown_params)
            } else {
                $("#conversion_rate_chart_container_sml").hide()
                $("#conversion_rate_chart_container_nodata_sml").show()
            }

        }
    });
}

function ajax_gender_chart(period, year_val = null, month_val = null) {
    selected_year = year_val
    selected_month = month_val

    if (selected_year == null) {
        selected_year = $("#year_dropdown option:selected").val()
    }
    if (selected_month == null) {
        selected_month = $("#month_dropdown option:selected").val()
    }

    $("#gender_charts_nodata_sml").hide()
    showLoader("gender_charts_sml")
    $.ajax({
        url: "endpoint/gender_data",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month },
        success: function (data) {
            if (data["data"] == true) {
                $("#male_percentage_text").show()
                $("#female_percentage_text").show()
                $("#gender_charts_sml").show()
                $("#gender_pie").show()
                gender_chart(data)
            } else {
                $("#gender_pie").hide()
                $("#male_percentage_text").hide()
                $("#female_percentage_text").hide()
                $("#gender_charts_sml").hide()
                $("#gender_charts_nodata_sml").show()
            }
        }
    });
}

function ajax_agegroup_chart(period, year_val = null, month_val = null) {
    selected_year = year_val
    selected_month = month_val

    if (selected_year == null) {
        selected_year = $("#year_dropdown option:selected").val()
    }
    if (selected_month == null) {
        selected_month = $("#month_dropdown option:selected").val()
    }

    $("#age_gender_charts_nodata_sml").hide()
    showLoader("age_gender_charts_sml")
    $.ajax({
        url: "endpoint/agegroup_data",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month },
        success: function (data) {
            if (data["data"] == true) {
                $("#age_gender_charts_sml").show()
                age_group_chart(data)
            } else {
                $("#age_gender_charts_sml").hide()
                $("#age_gender_charts_nodata_sml").show()
            }
        }
    });
}

function ajax_interaction_chart(period, year_val = null, month_val = null,chart_name='',visitor_type='', drillDown_params=null) {
    selected_year = year_val
    selected_month = month_val

    if (selected_year == null) {
        selected_year = $("#year_dropdown option:selected").val()
    }
    if (selected_month == null) {
        selected_month = $("#month_dropdown option:selected").val()
    }   
    $("#interaction_chart_container_nodata_sml").hide()
    showLoader("interaction_chart_container_sml")
    $.ajax({
        url: "endpoint/interaction_data",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month,'chart_name':chart_name, 'visitor_type':visitor_type },
        success: function (data) {
            if (data["data"] == true) {
                $("#interaction_chart_container_sml").show()
                interaction_chart(data, drillDown_params)
            } else {
                $("#interaction_chart_container_sml").hide()
                $("#interaction_chart_container_nodata_sml").show()
            }

        }
    });
}


function ajax_device_chart(period, year_val = null, month_val = null,chart_name='',visitor_type='', param=null) {
    selected_year = year_val
    selected_month = month_val

    if (selected_year == null) {
        selected_year = $("#year_dropdown option:selected").val()
    }
    if (selected_month == null) {
        selected_month = $("#month_dropdown option:selected").val()
    }

    $("#device_chart_container_nodata_sml").hide()
    showLoader("device_chart_container_sml")
    $.ajax({
        url: "endpoint/device_data",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month, 'chart_name':chart_name,'visitor_type':visitor_type},
        success: function (data) {
            if (data["data"] == true) {
                $("#device_chart_container_sml").show()
                $("#device_percentage_text").show()
                device_chart(data, param)
            } else {
                $("#device_chart_container_sml").hide()
                $("#device_percentage_text").hide()
                $("#device_chart_container_nodata_sml").show()
            }
        }
    });
}


function ajax_city_chart(period, year_val = null, month_val = null,chart_name='',visitor_type='', drillDown_params=null) {
    selected_year = year_val
    selected_month = month_val

    if (selected_year == null) {
        selected_year = $("#year_dropdown option:selected").val()
    }
    if (selected_month == null) {
        selected_month = $("#month_dropdown option:selected").val()
    }

    $("#city_chart_container_nodata_sml").hide()
    showLoader("city_chart_container_sml")
    $.ajax({
        url: "endpoint/city_data",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month,'chart_name':chart_name,'visitor_type':visitor_type },
        success: function (data) {
            if (data["data"] == true) {
                $("#city_chart_container").show()
                city_chart(data, drillDown_params)
            } else {
                $("#city_chart_container").hide()
                $("#city_chart_container_nodata").show()
            }
        }
    });
}


function ajax_top_pages_chart(period, year_val = null, month_val = null) {
    selected_year = year_val
    selected_month = month_val

    if (selected_year == null) {
        selected_year = $("#year_dropdown option:selected").val()
    }
    if (selected_month == null) {
        selected_month = $("#month_dropdown option:selected").val()
    }
    $("#top_pages_chart_container_nodata_sml").hide()
    showLoader("top_pages_chart_container_sml")
    $.ajax({
        url: "endpoint/top_page_data",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month },
        success: function (data) {
            if (data["data"] == true) {
                $("#top_pages_chart_container_sml").show()
                top_pages_chart(data)
            } else {
                $("#top_pages_chart_container_sml").hide()
                $("#top_pages_chart_container_nodata_sml").show()
            }
        }
    });
}
