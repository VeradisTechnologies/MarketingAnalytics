from django.urls import path, include
from .views import (gender_data,conversion_chart_data,interacton_chart_data,visitors_data,
                device_data,city_chart_data,total_page_data,pageview_data,agegroup_data,engagement_chart_data,
                impressions_chart_data,fans_chart_data, clicks_chart_data, likes_chart_data, 
                video_chart_data, fb_agegroup_data, fb_tile_bar_data,fb_total_likes_fans, insta_tile_bar_data,fb_most_views_post_data,
                insta_total_likes_followers,gender_data_social, session_check, opens_chart_data, click_through_chart_data,
                email_send_chart_data, top_campaign_chart_data, campaigns_top_chart, tw_impression, tw_like_n_replay, tw_followers, tw_video_views,tw_tile_bar_data)

urlpatterns = [
  
    # google analytics
    path("endpoint/visitors_data", visitors_data),
    path("endpoint/gender_data", gender_data),
    path("endpoint/agegroup_data", agegroup_data),
    path('endpoint/conversation_data',conversion_chart_data),
    path('endpoint/interaction_data',interacton_chart_data),
    path('endpoint/device_data',device_data),
    path('endpoint/city_data',city_chart_data),
    path('endpoint/top_page_data',total_page_data),
    path('endpoint/pageview_data',pageview_data),
    path('endpoint/ga_summary_top_chart',ga_summary_top_chart),


    # social media
    path('endpoint/engagements_data', engagement_chart_data),
    path('endpoint/impressions_data', impressions_chart_data),
    path('endpoint/fans_data', fans_chart_data),
    path('endpoint/clicks_data', clicks_chart_data),
    path('endpoint/likes_data', likes_chart_data),
    path("endpoint/video_data", video_chart_data),
    path("endpoint/fb_agegroup", fb_agegroup_data),
    path("endpoint/fb_gender", gender_data_social),
    path("endpoint/fb_tile_bar_data", fb_tile_bar_data),
    path("endpoint/fb_total_likes_fans",fb_total_likes_fans),
    path("endpoint/insta_tile_bar_data", insta_tile_bar_data),
    path("endpoint/insta_total_likes_followers",insta_total_likes_followers),
	path('endpoint/fb_most_views_post_data',fb_most_views_post_data),
    path('endpoint/tw_video_views', tw_video_views),
    path("endpoint/tw_tile_bar_data", tw_tile_bar_data),

    # mail chimp
    path('endpoint/opens_chart_data',opens_chart_data),
    path('endpoint/click_through_data',click_through_chart_data),
    path('endpoint/email_send_data',email_send_chart_data),
    path('endpoint/top_campaign_data',top_campaign_chart_data),
    path('endpoint/campaigns_top_chart', campaigns_top_chart),

    # twitter
    path('endpoint/tw_impression_data', tw_impression),
    path('endpoint/tw_like_n_replay', tw_like_n_replay),
    path('endpoint/tw_followers', tw_followers),
    

    #session check
    path("endpoint/session_check", session_check)
]
