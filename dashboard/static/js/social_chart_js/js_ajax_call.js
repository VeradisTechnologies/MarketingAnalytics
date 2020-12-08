// var human_number=n=>((Math.log10(n)/3|0)==0)?n:Number((n/Math.pow(10,(Math.log10(n)/3|0)*3)).toFixed(1))+[" ","<span>K</span>","<span>M</span>","<span>B</span>","<span>T</span>",][Math.log10(n)/3|0];


function human_number(value) {
    var suffixes = ["<span>&nbsp;</span>", "<span>K</span>", "<span>M</span>", "<span>B</span>", "<span>T</span>"];
    if (value < 1000) {
        return value + suffixes[0];
    } else {
        var suffixNum = Math.floor(("" + value).length / 3);
        var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(2));
        if (shortValue % 1 != 0) { shortValue = shortValue.toFixed(1); }
        return shortValue + suffixes[suffixNum];
    }
}

function ajax_engagement_chart(period) {
    selected_month = $("#month_value").val()
    selected_year = $("#year_value").val()
    $("#engagement_chart_nodata").hide()
    showLoader("engagement_chart_container")

    $.ajax({
        url: "endpoint/engagements_data",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month },
        success: function (data) {
            if (data["data"] == true) {
                engagements_chart(data)
                $("#engagement_chart_container").show()
                $("#engagement_chart_nodata").hide()
            } else {
                $("#engagement_chart_container").hide()
                $("#engagement_chart_nodata").show()
            }

        }
    });
}


function ajax_impressions_chart(period) {
   
    selected_month = $("#month_value").val()
    selected_year = $("#year_value").val()
    $("#impression_chart_nodata").hide()
    showLoader("impression_chart_container")

    $.ajax({
        url: "endpoint/impressions_data",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month },
        success: function (data) {
            if (data["data"] == true) {
                impressions_chart(data)
                $("#impression_chart_container").show()
                $("#impression_chart_nodata").hide()
            } else {
                $("#impression_chart_container").hide()
                $("#impression_chart_nodata").show()
            }
        }
    });
}


function ajax_fans_chart(period) {
    selected_month = $("#month_value").val()
    selected_year = $("#year_value").val()
    $("#fans_chart_nodata").hide()
    showLoader("fans_chart_container")

    $.ajax({
        url: "endpoint/fans_data",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month },
        success: function (data) {
            if (data["data"] == true) {
                fans_chart(data)
                $("#fans_chart_container").show()
                $("#fans_chart_nodata").hide()
            } else {
                $("#fans_chart_container").hide()
                $("#fans_chart_nodata").show()
            }
        }
    });
}


function ajax_click_chart(period) {
    selected_month = $("#month_value").val()
    selected_year = $("#year_value").val()
    $("#clicks_chart_nodata").hide()
    showLoader("clicks_chart_container")

    $.ajax({
        url: "endpoint/clicks_data",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month },
        success: function (data) {
            if (data["data"] == true) {
                clicks_chart(data)
                $("#clicks_chart_container").show()
                $("#clicks_chart_nodata").hide()
            } else {
                $("#link_val").text("0")
                $("#other_val").text("0")
                $("#clicks_chart_container").hide()
                $("#clicks_chart_nodata").show()
            }
        }
    });
}


function ajax_likes_chart(period) {
    selected_month = $("#month_value").val()
    selected_year = $("#year_value").val()
    $("#like_chart_nodata").hide()
    showLoader("like_chart_container")

    $.ajax({
        url: "endpoint/likes_data",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month },
        success: function (data) {
            if (data["data"] == true) {
                likes_chart(data)
                $("#like_chart_container").show()
                $("#like_chart_nodata").hide()
            } else {
                $("#like_chart_container").hide()
                $("#like_chart_nodata").show()
            }
        }
    });
}


function ajax_video_chart(period) {
    selected_month = $("#month_value").val()
    selected_year = $("#year_value").val()
    $("#video_views_chart_nodata").hide()
    showLoader("video_views_chart_container")

    $.ajax({
        url: "endpoint/video_data",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month },
        success: function (data) {
            if (data["data"] == true) {
                video_views_chart(data)
                $("#video_views_chart_container").show()
                $("#video_views_chart_nodata").hide()
            } else {
                $("#video_views_chart_container").hide()
                $("#video_views_chart_nodata").show()
            }
        }
    });
}


function ajax_fb_agegroup(period) {
    selected_month = $("#month_value").val()
    selected_year = $("#year_value").val()
    $("#social_age_group_chart_nodata").hide()
    showLoader("social_age_group_chart_container")

    $.ajax({
        url: "endpoint/fb_agegroup",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month },
        success: function (data) {
            if (data["data"] == true) {
                social_age_group_chart(data)
                $("#social_age_group_chart_container").show()
                $("#social_age_group_chart_nodata").hide()
            } else {
                $("#social_age_group_chart_container").hide()
                $("#social_age_group_chart_nodata").show()
            }
        }
    });
}
 
function ajax_sum_fb_insta_tw_summary(period) {
    selected_month =  $("#month_value").val()
    selected_year =  $("#year_value").val()
    $.ajax({
        url: "endpoint/fb_total_summary",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month },
        success: function (data) {
            if (data["fb_data"] == true|| data['insta_data']==true || data['twitter_data']==true) {
            $("#sum_likes").attr("title", Number((parseInt(data['Paid Likes']) + parseInt(data['Organic Likes'])+ parseInt(data['Likes']) + parseInt(data['Daily likes count']))).toLocaleString('en-us') ).attr("data-original-title", Number((parseInt(data['Paid Likes']) + parseInt(data['Organic Likes'])+ parseInt(data['Likes']) + parseInt(data['Daily likes count']))).toLocaleString('en-us'))
            $("#sum_likes").html(human_number(parseInt(data['Paid Likes']) + parseInt(data['Organic Likes'])+ parseInt(data['Likes']) + parseInt(data['Daily likes count'])))
            
            $("#sum_fans").attr("title", Number((parseInt(data['Total fans'])+ parseInt(data['Followers']) + parseInt(data['Daily Followers']))).toLocaleString('en-us') ).attr("data-original-title", Number((parseInt(data['Total fans'] )+parseInt(data['Followers'])+ parseInt(data['Daily Followers']))).toLocaleString('en-us'))
            $("#sum_fans").html(human_number(parseInt(data['Total fans']) + parseInt(data['Followers'])+ parseInt(data['Daily Followers'])))
                
            $("#sum_clicks").attr("title", Number((parseInt(data['Link clicks']))).toLocaleString('en-us'))
            $("#sum_clicks").html(human_number(parseInt(data['Link clicks'])))

            $("#sum_impressions").attr("title", Number( parseInt(data['Daily impressions']) + parseInt(data['Impressions']) + parseInt(data['Daily Impressions'])).toLocaleString('en-us') ).attr("data-original-title", Number( parseInt(data['Daily impressions']) + parseInt(data['Impressions']) + parseInt(data['Daily Impressions']) ).toLocaleString('en-us'))
            $("#sum_impressions").html(human_number(parseInt(data['Daily impressions']) + parseInt(data['Impressions']) + parseInt(data['Daily Impressions'])))
    
            $("#sum_videos").attr("title", Number( parseInt(data['Organic view']) + parseInt(data['Paid view']) +parseInt(data['Daily videos total']) ).toLocaleString('en-us') ).attr("data-original-title", Number( parseInt(data['Organic view']) + parseInt(data['Paid view']) + parseInt(data['Daily videos total']) ).toLocaleString('en-us'))
            $("#sum_videos").html(human_number(parseInt(data['Organic view']) + parseInt(data['Paid view']) + parseInt(data['Daily videos total'])))
        
        }
        else if(data['fb_data']==false || data['insta_data']==false || data['twitter_data']==false){
            $("#sum_likes").text('NA')
            $("#sum_fans").text('NA')
            $("#sum_clicks").text('NA')
            $("#sum_impressions").text('NA')
            $("#sum_videos").text('NA')

        }
        }
    });
}




function ajax_fb_gender_chart(period) {
    selected_month = $("#month_value").val()
    selected_year = $("#year_value").val()
    $("#social_gender_chart_nodata").hide()
    showLoader("social_gender_chart_container")

    $.ajax({
        url: "endpoint/fb_gender",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month },
        success: function (data) {
            if (data["data"] == true) {
                social_gender_chart(data)
                $("#social_gender_chart_container").show()
                $("#social_gender_chart_nodata").hide()

                $("#fb_gender_male").text(data['male']).append("<span>%</span>")
                $("#fb_gender_female").text(data['female']).append("<span>%</span>")
            } else {
                $("#social_gender_chart_container").hide()
                $("#social_gender_chart_nodata").show()

                $("#fb_gender_male").text("")
                $("#fb_gender_female").text("")
            }
        }
    });
}

function ajax_fb_post_views_chart(period){
    
    selected_month = $("#month_value").val()
    selected_year = $("#year_value").val()
    $("#fb_most_views_post_chart_nodata").hide()
    showLoader("fb_most_views_post_chart_container")

    $.ajax({
        url: "endpoint/fb_most_views_post_data",
        data: { "type": '' + period, 'year': selected_year, 'month': selected_month },
        success: function (data) {
            
            
            if (data["data"] == true) {
                
                fb_post_views_chart(data)
                $("#fb_most_views_post_chart_container").show()
                $("#fb_most_views_post_chart_nodata").hide()
            } else {
                $("#fb_most_views_post_chart_container").hide()
                $("#fb_most_views_post_chart_nodata").show()
            }
        }
    });


}