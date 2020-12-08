function ajax_opens_chart(period){
    selected_month = $("#month_dropdown option:selected").val()
    selected_year = $("#year_dropdown option:selected").val()

    $("#opens_chart_nodata").hide()
    showLoader("opens_chart_container")

    $.ajax({
        url: "endpoint/opens_chart_data",
        // data: { "type": '' + period, 'year': selected_year, 'month': selected_month },
        success: function (data) {
            if (data["data"] == true) {
                opens_chart_container(data)
                $("#opens_chart_container").show()
                $("#opens_chart_nodata").hide()
            } else {
                $("#opens_chart_container").hide()
                $("#opens_chart_nodata").show()
            }
        }
    });
}


function ajax_click_through_chart(period, selected_period=''){
    selected_month = $("#month_dropdown option:selected").val()
    selected_year = $("#year_dropdown option:selected").val()
    $("#clickThrough_chart_nodata").hide()
    showLoader("clickThrough_chart_container")
    
    $.ajax({
        url: "endpoint/click_through_data",
        // data: { "type": '' + period, 'year': selected_year, 'month': selected_month, 'selected_period':selected_period },
        success: function (data) {
            if (data["data"] == true) {
                mailchimp_click_through(data)
                $("#clickThrough_chart_container").show()
                $("#clickThrough_chart_nodata").hide()
            } else {
                $("#clickThrough_chart_container").hide()
                $("#clickThrough_chart_nodata").show()
            }
        }
    });
}


function ajax_email_send_chart(period, selected_period=''){
    selected_month = $("#month_dropdown option:selected").val()
    selected_year = $("#year_dropdown option:selected").val()
    $("#emailSend_chart_nodata").hide()
    showLoader("emailSend_chart_container")

    $.ajax({
        url: "endpoint/email_send_data",
        // data: { "type": '' + period, 'year': selected_year, 'month': selected_month, 'selected_period':selected_period },
        success: function (data) {
            if (data['data'] == true) {
                email_send_chart(data)
                $("#emailSend_chart_container").show()
                $("#emailSend_chart_nodata").hide()
            } else {
                $("#emailSend_chart_container").hide()
                $("#emailSend_chart_nodata").show()
            }
        }
    });
}


function ajax_top_campaign_chart(period, selected_period=''){
    selected_month = $("#month_dropdown option:selected").val()
    selected_year = $("#year_dropdown option:selected").val()
    $("#campaigns_chart_nodata").hide()
    showLoader("campaigns_chart_container")

    $.ajax({
        url: "endpoint/top_campaign_data",
        // data: { "type": '' + period, 'year': selected_year, 'month': selected_month, 'selected_period':selected_period },
        success: function (data) {
            if (data['data'] == true) {
                campaigns_chart(data)
                $("#campaigns_chart_container").show()
                $("#campaigns_chart_nodata").hide()
            } else {
                $("#campaigns_chart_container").hide()
                $("#campaigns_chart_nodata").show()
            }
        }
    });
}


function ajax_campaigns_top_chart(period, selected_period=''){
    selected_month = $("#month_dropdown option:selected").val()
    selected_year = $("#year_dropdown option:selected").val()

    $.ajax({
        url: "endpoint/campaigns_top_chart",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month, 'selected_period':selected_period },
        success: function (data) {            
            if (data['data'] == true) {
                                
                $("#tc_total_campaigns").text(Number( data['total_campaign'] ).toLocaleString('en-us'))
                $("#tc_total_mail_sent").text(Number( data['total_mail_sent'] ).toLocaleString('en-us'))
                $("#tc_total_clicks").text(Number( data['click_throughs'] ).toLocaleString('en-us'))
                $("#tc_total_opens").text(Number( data['total_opens'] ).toLocaleString('en-us'))
                $("#tc_total_spams").text(Number( data['spam_complaints'] ).toLocaleString('en-us'))
                $("#tc_unique_opens").text(Number( data['unique_opens'] ).toLocaleString('en-us'))

            } else {
                $("#tc_total_campaigns").text('NA')
                $("#tc_total_mail_sent").text('NA')
                $("#tc_total_clicks").text('NA')
                $("#tc_total_opens").text('NA')
                $("#tc_total_spams").text('NA')
                $("#tc_unique_opens").text('NA')
            }
        }
    });
}


data: true
total_campaign: "4"
total_mail_sent: "33365"
click_throughs: "1672"
total_opens: "5134"
spam_complaints: "39"
