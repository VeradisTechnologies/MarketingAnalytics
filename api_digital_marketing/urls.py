from django.urls import path, include
from .views import (gender_data,conversion_chart_data,interacton_chart_data,visitors_data,
                device_data,city_chart_data,total_page_data,pageview_data,agegroup_data,engagement_chart_data,
                impressions_chart_data,fans_chart_data, clicks_chart_data, likes_chart_data, 
                video_chart_data, fb_agegroup_data, fb_tile_bar_data,fb_total_likes_fans, insta_tile_bar_data,fb_most_views_post_data,
                insta_total_likes_followers,gender_data_social, session_check, opens_chart_data, click_through_chart_data,
                email_send_chart_data, top_campaign_chart_data, campaigns_top_chart)

urlpatterns = [
  
    # google analytics
    path("api/visitors_data", visitors_data),
    path("api/gender_data", gender_data),
    path("api/agegroup_data", agegroup_data),
    path('api/conversation_data',conversion_chart_data),
    path('api/interaction_data',interacton_chart_data),
    path('api/device_data',device_data),
    path('api/city_data',city_chart_data),
    path('api/top_page_data',total_page_data),
    path('api/pageview_data',pageview_data),

    # social media
    path('api/engagements_data', engagement_chart_data),
    path('api/impressions_data', impressions_chart_data),
    path('api/fans_data', fans_chart_data),
    path('api/clicks_data', clicks_chart_data),
    path('api/likes_data', likes_chart_data),
    path("api/video_data", video_chart_data),
    path("api/fb_agegroup", fb_agegroup_data),
    path("api/fb_gender", gender_data_social),
    path("api/fb_tile_bar_data", fb_tile_bar_data),
    path("api/fb_total_likes_fans",fb_total_likes_fans),
    path("api/insta_tile_bar_data", insta_tile_bar_data),
    path("api/insta_total_likes_followers",insta_total_likes_followers),
	path('api/fb_most_views_post_data',fb_most_views_post_data),

    # mail chimp
    path('api/opens_chart_data',opens_chart_data),
    path('api/click_through_data',click_through_chart_data),
    path('api/email_send_data',email_send_chart_data),
    path('api/top_campaign_data',top_campaign_chart_data),
    path('api/campaigns_top_chart', campaigns_top_chart),

    #session check
    path("api/session_check", session_check)
]