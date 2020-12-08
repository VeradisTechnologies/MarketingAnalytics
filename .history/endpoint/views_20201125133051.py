import traceback
import logging
import json
import numpy as np

from datetime import datetime
from dashboard.utils import token_expire_check

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.shortcuts import render
from django.http import JsonResponse
from django.db import connection


logger = logging.getLogger(__name__)


def visitors_data(request):
    """
        This method is used to fetch total visits - new visit & returning chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    
    
    if is_valid_session(request):
        chart_name=request.GET.get('chart_name')
        visitor_type=request.GET.get('visitor_type')
        
        visitors_period = []
        new_visitors = []
        return_visitors = []
        total_visitors = []
        all_visitors = []

        context = {
            "period":period,
            "data":False,
            "visitors_period": [],
            "new_visitors": [],
            "return_visitors": [],
            "total_visitors": [],
            "all_visitors": [],
            "total_all_visitors": 0,
            "total_new_visitors": 0,
            "total_return_visitors": 0,
            "total_visit": 0,
            "new_visit_perchantage": 0,
            "return_visit_perchantage": 0
        }
        cursor = connection.cursor()
        try:
            if period == "Monthly":
                period = "total"
            elif period == "Daily":
                period = "month"
            elif period == "Quarterly":
                period = "total"
            elif period == "Weekly":
                period = "month"
                
            if period and period_year:
                if period == "day" or period == "week" and period_month:
                    cursor.callproc("usp_report_ga_visitor", [str(period),str(period_year),str(period_month),chart_name,visitor_type])
                else:    
                    cursor.callproc("usp_report_ga_visitor", [str(period),str(period_year), None,chart_name,visitor_type])
            else:
                cursor.callproc("usp_report_ga_visitor", ['month',str(datetime.now().year), None,chart_name,visitor_type])

            if cursor.rowcount > 0: 
                for i in cursor.fetchall():
                    visitors_period.append(str(i[0])) # i[0] - period type
                    new_visitors.append(float(i[1])) # i[1] - new visitor count
                    return_visitors.append(float(i[2])) # i[2] - return visitor count
                    all_visitors.append(float(i[3])) # i[3] - all users
                    total_visitors.append(float(i[4])) # i[4] - total visitor count
            
                # chart data
                if period == "quarter":
                    context['visitors_period'] = ["Quarter "+s for s in visitors_period]
                else:
                    context['visitors_period'] = visitors_period
                context['period'] = period
                context['data'] = True
                context['new_visitors'] = new_visitors
                context['return_visitors'] = return_visitors
                context['total_visitors'] = total_visitors
                context['all_visitors'] = all_visitors

                # css data
                context['total_new_visitors'] = int(sum(new_visitors))
                context['total_return_visitors'] = int(sum(return_visitors))
                context['total_visit'] = int(sum(total_visitors))
                context['total_all_visitors'] = int(sum(all_visitors))

                context['new_visit_perchantage'] = round((sum(new_visitors) / sum(total_visitors)) * 100)
                context['return_visit_perchantage'] = round((sum(return_visitors) / sum(total_visitors)) * 100)

        except Exception as e:
            logger.error("#"*10+'\t'+str(e))
            context = {
                "period":period,
                "data":False,
                "visitors_period": [],
                "new_visitors": [],
                "return_visitors": [],
                "total_visitors": [],
                "all_visitors": [],
                "total_all_visitors": 0,
                "total_new_visitors": 0,
                "total_return_visitors": 0,
                "total_visit": 0,
                "new_visit_perchantage": 0,
                "return_visit_perchantage": 0
            }
        finally:
            cursor.close()
        
        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def gender_data(request):
    """
        This method is used to fetch gender chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    
    
    if is_valid_session(request):    
        data = {}
        context = {'data':False, 'male':'0', 'female':'0'}
        cursor = connection.cursor()
        
        try:
            if period == "Monthly":
                period = "total"
            elif period == "Daily":
                period = "month"
            elif period == "Quarterly":
                period = "total"
            elif period == "Weekly":
                period = "month"

            cursor.callproc("usp_report_ga_gender", [period, period_year, period_month])
            
            if cursor.rowcount > 0:
                for i in cursor.fetchall():
                    if i[0] not in data:
                        data[str(i[0])] = i[1] # i[0] - gender type ,i[1] - count 

                female_count = data['female']
                male_count = data['male']
                total = female_count + male_count

                female_perchantage = round((female_count / total) * 100)
                male_perchantage = round((male_count / total) * 100)

                context['data'] = True
                context['male'] = male_perchantage
                context['female'] = female_perchantage        
        
        except Exception as e:
            logger.error("#"*10+'\t'+str(e))
            context = {'data':False, 'male':'0', 'female':'0'}
        finally:
            cursor.close()

        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def agegroup_data(request):
    """
        This method is used to fetch age group chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    
    
    if is_valid_session(request):
        cursor = connection.cursor()
        age_category = []
        male = []
        female = []
        context = {'data':False, 'age_category':['NA'], 'male':['NA'], 'female':['NA']}
        
        try:
            if period == "Monthly":
                period = "total"
            elif period == "Daily":
                period = "month"
            elif period == "Quarterly":
                period = "total"
            elif period == "Weekly":
                period = "month"
                
            cursor.callproc("usp_report_ga_AgeGroup", [period, period_year, period_month])
        
            if cursor.rowcount > 0:
                for i in cursor.fetchall():
                    age_category.append(i[0]) # i[0] - agegroup 
                    female.append(int(i[1])) # i[1] - female count
                    male.append(int(i[2])) # i[2] - male count 
                    context['data'] = True
                    context['age_category'] = age_category
                    context['male'] = male
                    context['female'] = female        

        except Exception as e:
            logger.error("#"*10+'\t'+str(e))
            context = {'data':False, 'age_category':['NA'], 'male':['NA'], 'female':['NA']}
        finally:
            cursor.close()
        
        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def conversion_chart_data(request):
    """
        This method is used to fetch conversion rate by source chart data
    """
    period = request.GET.get('type')
    print(period,"periods")
    period_year = request.GET.get('year')
    print(period_year,"period_year")

    period_month = request.GET.get('month')
    print(period_month,"period_month")


    chart_name=request.GET.get('chart_name')
    visitor_type=request.GET.get('visitor_type')
    
    
    if is_valid_session(request):
        print("valid session")
        context = {"data":False, 'Direct': 0, 'Display': 0, 'Organic Search': 0, 
            'Paid Search': 0, 'Social': 0, 'Referral': 0, 'Other': 0, 'total_opens_rate':0
        }

        cursor = connection.cursor()

        try:
            if period == "Monthly":
                period = "total"
            elif period == "Daily":
                period = "month"
            elif period == "Quarterly":
                period = "total"
            elif period == "Weekly":
                period = "month"
                
            cursor.callproc("usp_report_ga_conversion_rate_day", [period, period_year, period_month,chart_name,visitor_type])
            if cursor.rowcount > 0:
                context['data'] = True
                for i in cursor.fetchall():
                    # i[0] - x axis value , i[2] - percentage
                    context[str(i[0])] = '' if float(i[2][:-1]) <=0 else round(float(i[2][:-1]), 2) # remove % symbol
                
        except Exception as e:
            logger.error("#"*10+'\t'+str(e))
            context = {"data":False, 'Direct': 0, 'Display': 0, 'Organic Search': 0, 
                'Paid Search': 0, 'Social': 0, 'Referral': 0, 'Other': 0, 'total_opens_rate':0 }
        finally:
            cursor.close()   

        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def interacton_chart_data(request):
    """
        This method is used to fetch interaction per visit chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')

    chart_name=request.GET.get('chart_name')
    visitor_type=request.GET.get('visitor_type')    
    
    
    if is_valid_session(request):
        cursor = connection.cursor()

        axis_label_list = set()
        avg_time_total = []
        pages_per_visit = []
        context = {"period":period, 'data': False, "axis_label_list": [], "avg_time_total": [], "pages_per_visit": []}

        try:
            if period == "Monthly":
                period = "total"
            elif period == "Daily":
                period = "month"
            elif period == "Quarterly":
                period = "total"
            elif period == "Weekly":
                period = "month"

            cursor.callproc("usp_report_ga_Interaction_per_visit", [period, period_year, period_month, chart_name,visitor_type ])
            if cursor.rowcount > 0:
                for i in cursor.fetchall():
                    axis_label_list.add(i[0]) # i[0] - x axis value 
                    if i[2] == "average time total":
                        avg_time_total.append(int(i[1])) # i[1] - count
                    elif i[2] == "pages per visit":
                        pages_per_visit.append(float(i[1]))
                
                axis_label_list = list(sorted(axis_label_list))
                order = [1,0,3,4,2]
                axis_label_list = list( np.array(axis_label_list, dtype=object)[order] )

                context = {
                    "period":period,
                    'data': True,
                    "axis_label_list": axis_label_list,
                    "avg_time_total": avg_time_total,
                    "pages_per_visit": pages_per_visit,
                }

        except Exception as e:
            logger.error("#"*10+'\t'+str(e))
            context = {"period":period, 'data': False, "axis_label_list": [], "avg_time_total": [], "pages_per_visit": []}
        finally:
            cursor.close()
        
        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def device_data(request):
    """
        This method is used to fetch device chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')

    chart_name=request.GET.get('chart_name')
    visitor_type=request.GET.get('visitor_type')
    
    
    if is_valid_session(request):      
        cursor = connection.cursor()
    
        context = {'data':False, 'tablet':'0','mobile':'0','desktop':'0'}
        temp_data = {}    
    
        try:
            if period == "Monthly":
                period = "total"
            elif period == "Daily":
                period = "month"
            elif period == "Quarterly":
                period = "total"
            elif period == "Weekly":
                period = "month"

            cursor.callproc("usp_report_ga_Device", [period, period_year, period_month,chart_name,visitor_type])
            if cursor.rowcount > 0:            
                for i in cursor.fetchall():
                    temp_data[str(i[0])]=i[1]  # i[0] - device type , i[1] - count
                desktop_temp = temp_data.get('desktop', 0)
                mobile_temp = temp_data.get('mobile', 0)
                tablet_temp =temp_data.get('tablet', 0)

                total=desktop_temp+mobile_temp+tablet_temp

                desktop = round((desktop_temp/total) *100, 1)
                mobile = round((mobile_temp/total)*100, 1)
                tablet = round((tablet_temp/total)*100, 1)
                
                context['data'] = True
                context['tablet']=tablet
                context['mobile']=mobile
                context['desktop']=desktop

        except Exception as e:
            logger.error("#"*10+'\t'+str(e))
            context = {'data':False, 'tablet':'0','mobile':'0','desktop':'0'}
        finally:
            cursor.close()
        return JsonResponse(context)    
    else:
        return JsonResponse({'data':False,'status':403})


def city_chart_data(request):
    """
        This method is used to fetch city chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')

    chart_name=request.GET.get('chart_name')
    visitor_type=request.GET.get('visitor_type')
    
    
    if is_valid_session(request):
        data = []
        context = {'data':False, 'city_data':[], 'over_all':'0'}
        overall_data = 0

        cursor = connection.cursor()
        
        try:
            if period == "Monthly":
                period = "total"
            elif period == "Daily":
                period = "month"
            elif period == "Quarterly":
                period = "total"
            elif period == "Weekly":
                period = "month"

            cursor.callproc("usp_report_ga_City", [period, period_year, period_month,chart_name,visitor_type])
            if cursor.rowcount > 0:
                for i in cursor.fetchall():
                    if i:
                        data.append({"name":str(i[0]),"value":int(i[1])}) # i[0] - city name ,i[1] - count
                        overall_data += int(i[1])

                context['data'] = True
                context["city_data"]=data
                context["over_all"] = overall_data

        except Exception as e:
            logger.error("#"*10+'\t'+str(e))
            context = {'data':False, 'city_data':[], 'over_all':'0'}
        finally:
            cursor.close()
        return JsonResponse(context,safe=False)
    else:
        return JsonResponse({'data':False,'status':403})


def total_page_data(request):
    """
        This method is used to fetch top 10 pages chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    
    
    if is_valid_session(request):       
        page_name = []
        page_count = []
        context ={'data':False, 'page_name':['NA'], 'page_count':['NA']}
        
        cursor = connection.cursor()
        try:
            if period == "Monthly":
                period = "total"
            elif period == "Daily":
                period = "month"
            elif period == "Quarterly":
                period = "total"
            elif period == "Weekly":
                period = "month"
                
            cursor.callproc("usp_report_ga_Pages", [period, period_year, period_month])
            if cursor.rowcount > 0:
                for i in cursor.fetchall():
                    page_name.append(i[0]) # i[0] - page name
                    page_count.append(int(i[1])) # i[1] - count
                context['data'] = True
                context['page_name'] = page_name
                context['page_count'] = page_count
        except Exception as e:
            logger.error("#"*10+'\t'+str(e))
            context ={'data':False, 'page_name':['NA'], 'page_count':['NA']}
        finally:
            cursor.close()
    
        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def pageview_data(request):
    """
        This method is used to fetch page views chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    s_date = request.GET.get('s_date', '')
    e_date = request.GET.get('e_date', '')
    q_drilldown = request.GET.get('q_drilldown', '')
    
    
    if is_valid_session(request):    
        context ={'data':False, 'x_axis_data':[], 'new_visitors':[], 'return_visitors':[], 'total_visitors':[],
            'total_new_visitors':0, 'total_return_visitors':0, 'total_visit':0, 'new_visit_perchantage':0, 'return_visit_perchantage':0
        }
        x_axis_data = []
        new_visitors = []
        return_visitors = []
        total_visitors = []

        cursor = connection.cursor()
        try:
            cursor.callproc("usp_report_ga_Pageviews", [period, period_year, period_month, s_date, e_date, q_drilldown])
            
            if cursor.rowcount > 0:
                for i in cursor.fetchall():
                    x_axis_data.append(i[0])
                    new_visitors.append(i[1])
                    return_visitors.append(i[2])            
                    total_visitors.append(i[3])

                context['data'] = True
                if period == 'quarter' and q_drilldown == '':
                    context['x_axis_data'] = ['Quarter '+str(x) for x in x_axis_data]
                else:
                    context['x_axis_data'] = x_axis_data
                context['new_visitors'] = new_visitors
                context['return_visitors'] = return_visitors
                context['total_visitors'] = total_visitors
                context['period'] = period

                # css data
                context['total_new_visitors'] = int(sum(new_visitors))
                context['total_return_visitors'] = int(sum(return_visitors))
                context['total_visit'] = int(sum(total_visitors))
                context['new_visit_perchantage'] = round((sum(new_visitors) / sum(total_visitors)) * 100)
                context['return_visit_perchantage'] = round((sum(return_visitors) / sum(total_visitors)) * 100)
        except Exception as e:
            logger.error("#"*10+'\t'+str(e))
            context ={'data':False, 'x_axis_data':[], 'new_visitors':[], 'return_visitors':[], 'total_visitors':[]}
        finally:
            cursor.close()
        
        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


########################################################################################
                    ################# Social Media #################
########################################################################################


def engagement_chart_data(request):
    """
        This method is used to fetch engagement chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    
    
    if is_valid_session(request):
        x_axis_data = []
        facebook_data = []
        instagram_data = []
        context = {'data':False, 'x_axis_data':[], 'facebook_data':[], 'instagram_data':[]}
        period_index = {"Daily": "day", "Weekly":"week", "Monthly":"month", "Quarterly":"quarter"}
        cursor = connection.cursor()
        
        try:
            period=period_index.get(period)
            cursor.callproc("usp_report_engagements", [period, period_year, period_month, '', ''])

            if cursor.rowcount > 0:
                for i in cursor.fetchall():
                    x_axis_data.append(i[0]) # i[0] - period name
                    facebook_data.append(int(i[1])) # i[1] - facebook count
                    instagram_data.append(int(i[2])) # i[2] - instagram count
            
                context['data'] =True
                context['x_axis_data'] = x_axis_data
                context['facebook_data']  = facebook_data
                context['instagram_data'] = instagram_data
        
        except Exception as e:
            logger.error("#"*10+'\t'+str(e))
            context = {'data':False, 'x_axis_data':[], 'facebook_data':[], 'instagram_data':[]}
        finally:
            cursor.close()
        
        return JsonResponse(context)   
    else:
        return JsonResponse({'data':False,'status':403})


def impressions_chart_data(request):
    """
        This method is used to fetch impressions chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    
    
    if is_valid_session(request):
        y_axis_data = []
        facebook_data = []
        instagram_data = []
        twiter_data = []
        context = {'data':False, 'y_axis_data':[], 'facebook_data':[], 'instagram_data':[], 'twiter_data':[]}
        period_index = {"Daily": "day", "Weekly":"week", "Monthly":"month", "Quarterly":"quarter"}
        cursor = connection.cursor()
        
        try:
            period=period_index.get(period)
            cursor.callproc("usp_report_impressions_v1", [period, period_year, period_month])
            if cursor.rowcount > 0:
                for i in cursor.fetchall():
                    y_axis_data.append(i[0]) # i[0] - period type
                    facebook_data.append(int(i[1])) # i[1] - facebook count
                    instagram_data.append(int(i[2])) # i[2] - instagram count
                    twiter_data.append(int(i[3])) # i[2] - instagram count
            
                context['data'] =True
                context['y_axis_data'] = y_axis_data[::-1]
                context['facebook_data']  = facebook_data[::-1]
                context['instagram_data'] = instagram_data[::-1]
                context['twiter_data'] = twiter_data[::-1]
        except Exception as e:
            context = {'data':False, 'y_axis_data':[], 'facebook_data':[], 'instagram_data':[], 'twiter_data':[]}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()
        return JsonResponse(context)   
    else:
        return JsonResponse({'data':False,'status':403})


def fans_chart_data(request):
    """
        This method is used to fetch fans & followers chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    
    
    if is_valid_session(request):
        x_axis_data = []
        total_fans = []  
        new_fans = []
        total_followers = []  
        new_followers = []
        total_fans_tootltip=[]
        total_followers_tooltip=[]
        new_fans_lost_tooltip=[]
        tw_total_followers=[]
        tw_new_followers=[]
        tw_total_followers_tooltip=[]

        period_index = {"Daily": "day", "Weekly":"week", "Monthly":"month", "Quarterly":"quarter"}
        context = {'data':False, 'x_axis_data':[], 'total_fans':[], 'new_fans':[],'total_followers':[],'new_followers':[],
        'total_fans_tootltip':[],'total_followers_tooltip':[],'fan_remove_count':[],'fan_remove_count_tot':[],
        'new_fans_lost_tooltip':[],'tw_total_followers':[],'tw_new_followers':[],'tw_total_followers_tooltip':[]}
        
        cursor = connection.cursor()

        try:
            period=period_index.get(period)
            cursor.callproc("usp_report_followers_total_v1", [period, period_year, period_month])
            if cursor.rowcount > 0:
                previous_total_follower=0
                previous_tw_total_follower=0
                for i in cursor.fetchall():
                    x_axis_data.append(i[0])  # i[0] - period type                
                    new_fans.append(int(i[1])) # i[1] - new fans
                    new_fans_lost_tooltip.append(int(i[5])) #new fans lost count
                    new_followers.append(int(i[2])) # new follow
                    tw_new_followers.append(int(i[7])) #twitter new follow
                    total_fans_tootltip.append(int(i[3]-i[6])) # total fans for tooltip (total fans -total fans remove count )
                    total_fans.append(int(i[3]-i[1]-i[6])) # i[3] - total fans -new fans -total fans remove count
                    
                    if i[4] and int(i[4])!=0:
                        total_followers_tooltip.append(int(i[4]))# total follow for tooltip
                        total_followers.append(int(i[4])-int(i[2])) # i[4] -total followers - new followers
                        previous_total_follower= int(i[4])
                    else:
                        total_followers_tooltip.append(previous_total_follower)# total follow for tooltip
                        total_followers.append(previous_total_follower) # i[4] -total followers
                    #twiter followers
                    if i[8] and int(i[8])!=0:
                        tw_total_followers_tooltip.append(int(i[8]))# total follow for tooltip
                        tw_total_followers.append(int(i[8])-int(i[7])) # i[4] -total followers - new followers
                        previous_tw_total_follower= int(i[8])
                    else:
                        tw_total_followers_tooltip.append(previous_tw_total_follower)# total follow for tooltip
                        tw_total_followers.append(previous_tw_total_follower) # i[4] -total followers

                context['data'] =True
                context['x_axis_data'] = x_axis_data
                context['total_fans']  = total_fans
                context['total_fans_tooltip']=total_fans_tootltip
                context['new_fans'] = new_fans
                context['new_fans_lost_tooltip']=new_fans_lost_tooltip
                context['total_followers']  = total_followers
                context['total_followers_tooltip']=total_followers_tooltip
                context['new_followers'] = new_followers
                context['tw_total_followers']  = tw_total_followers
                context['tw_total_followers_tooltip']=tw_total_followers_tooltip
                context['tw_new_followers'] = tw_new_followers
        except Exception as e:
            logger.error("#"*10+'\t'+str(e))
            context = {'data':False, 'x_axis_data':[], 'total_fans':[], 'new_fans':[],'total_followers':[],'new_followers':[],'total_fans_tootltip':[],'total_followers_tooltip':[],'new_fans_lost_tooltip':[]}
        finally:
            cursor.close()
        
        return JsonResponse(context) 
    else:
        return JsonResponse({'data':False,'status':403})


def clicks_chart_data(request):
    """
        This method is used to fetch facebook clicks chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    
    
    if is_valid_session(request):
        link_clicks_data = []
        other_clicks_data = []
        context = {'data':False, 'link_clicks_data':[], 'other_clicks_data':[]}
        period_index = {"Daily": "day", "Weekly":"week", "Monthly":"month", "Quarterly":"quarter"}
        cursor = connection.cursor()

        try:
            period=period_index.get(period)
            cursor.callproc("usp_report_Clicks", [period, period_year, period_month])

            if cursor.rowcount > 0:
                for i in cursor.fetchall():
                    link_clicks_data.append(int(i[1])) # i[1] - link clicks
                    other_clicks_data.append(int(i[2])) # i[2] - other clicks

                context['data'] = True
                context['link_clicks_data'] = link_clicks_data
                context['other_clicks_data'] = other_clicks_data
        except Exception as e:
            logger.error("#"*10+'\t'+str(e))
            context = {'data':False, 'link_clicks_data':[], 'other_clicks_data':[]}
        finally:
            cursor.close()
        
        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def likes_chart_data(request):
    """
        This method is used to fetch likes chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    
    if is_valid_session(request):
        x_axis_data = []
        paid_likes_data = []
        organic_likes_data = []
        insta_likes_data = []
        twiter_likes_data = []
        fb_total = []
        twiter_likes_data=[]
        period_index = {"Daily": "day", "Weekly":"week", "Monthly":"month", "Quarterly":"quarter"}
        context = {'data':False, 'x_axis_data':[], 'paid_likes_data':[], 'organic_likes_data':[],
            'insta_likes_data':[], 'fb_total':[], 'twiter_likes_data':[]
        }

        cursor = connection.cursor()

        try:
            period=period_index.get(period)
            cursor.callproc("usp_report_likes_v1", [period, period_year, period_month])    
            if cursor.rowcount > 0:
                for i in cursor.fetchall():
                    x_axis_data.append(i[0]) # i[0] - period type
                    paid_likes_data.append(int(i[1])) # i[1] - paid likes
                    organic_likes_data.append(int(i[2])) # i[2] - organic likes
                    insta_likes_data.append(int(i[3])) # i[3] - instagram likes
                    fb_total.append(int(i[4])) # i[4] - facebook total likes
                    twiter_likes_data.append(int(i[5])) # i[4] - twiter total likes
                context['data'] = True
                context['x_axis_data'] = x_axis_data
                context['paid_likes_data'] = paid_likes_data
                context['organic_likes_data'] = organic_likes_data
                context['insta_likes_data'] = insta_likes_data
                context['fb_total'] = fb_total
                context['twiter_likes_data'] = twiter_likes_data
        except Exception as e:
            context = {'data':False, 'x_axis_data':[], 'paid_likes_data':[], 'organic_likes_data':[],
                'insta_likes_data':[], 'fb_total':[], 'twiter_likes_data':[]
            }
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()    
            
        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def video_chart_data(request):
    """
        This method is used to fetch facebook video views chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    
    
    if is_valid_session(request):
        x_axis_data = []
        paid_view_data = []
        organic_view_data = []
        total_view_data = []
        
        context = { 'data':False, 'x_axis_data':[], 'paid_view_data':[], 'organic_view_data':[], 
            'total_view_data':[]
        }
        period_index = {"Daily": "day", "Weekly":"week", "Monthly":"month", "Quarterly":"quarter"}
        cursor = connection.cursor()

        try:
            period=period_index.get(period)
            cursor.callproc("usp_report_VideoViews", [period, period_year, period_month])
            if cursor.rowcount > 0:
                for i in cursor.fetchall():
                    x_axis_data.append(i[0]) # i[0] - period type
                    organic_view_data.append(int(i[1])) # i[1] - organic view
                    paid_view_data.append(int(i[2]))  # i[2] - paid view
                    total_view_data.append(int(i[3])) # i[3] - total view

                context['data'] = True
                context['x_axis_data'] = x_axis_data
                context['paid_view_data'] = paid_view_data
                context['organic_view_data'] = organic_view_data
                context['total_view_data'] = total_view_data
        except Exception as e:
            context = { 'data':False, 'x_axis_data':[], 'paid_view_data':[], 'organic_view_data':[], 
                'total_view_data':[]
            }
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()    
            
        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def fb_agegroup_data(request):
    """
        This method is used to fetch facebook age group chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    
    
    if is_valid_session(request):
        x_axis_data = []
        female_data = []
        male_data = []
        period_index = {"Daily": "month", "Weekly":"month", "Monthly":"total", "Quarterly":"total"}
        context = {'data':False, 'x_axis_data':[], 'female_data':[], 'male_data':[]}
        
        cursor = connection.cursor()

        try:
            period=period_index.get(period)
            cursor.callproc("usp_report_Facebook_AgeGroup", [period, period_year, period_month])
            if cursor.rowcount > 0:
                for i in cursor.fetchall():
                    x_axis_data.append(i[0]) # i[0] - agegroup
                    female_data.append(int(i[1])) # i[1] - female count
                    male_data.append(int(i[2])) # i[2] - male count

                context['data'] = True
                context['x_axis_data'] = x_axis_data
                context['female_data'] = female_data
                context['male_data'] = male_data
        except Exception as e:
            context = {'data':False, 'x_axis_data':[], 'female_data':[], 'male_data':[]}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()

        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def fb_tile_bar_data(request):
    """
        This method is used to fetch facebook tile bar data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    
    
    if is_valid_session(request):
        context = {'data': False, 'Daily impressions': 0, 'Paid Likes': 0, 'Organic Likes': 0, 
            'Total fans': 0, 'Other clicks': 0, 'Link clicks': 0, 'Organic view': 0, 'Paid view': 0,'fan remove count': 0
        }
        
        cursor = connection.cursor()

        try:
            if period == "Monthly":
                period = "total"
            elif period == "Daily":
                period = "month"
            elif period == "Quarterly":
                period = "total"
            elif period == "Weekly":
                period = "month"

            cursor.callproc("usp_report_Facebookdata", [period, period_year, period_month])
            if cursor.rowcount > 0:
                context['data'] = True
                for i in cursor.fetchall():
                    context[i[0]] = int(i[1]) # i[0] - label ,i[1] - count
        except Exception as e:
            context = {'data':False}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()
        
        if context['Total fans']!=0:
            context['Total fans']=context['Total fans']-context['fan remove count']    
        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def fb_total_likes_fans(request):
    """
        This method is used to fetch facebook tile bar data for total fans and total likes
    """
    if is_valid_session(request):
        context = {'data': False,'Total fans': 0,'Paid Likes': 0, 'Organic Likes': 0,'fan remove count': 0}
        cursor = connection.cursor()
        try:
            cursor.callproc("usp_report_facebookdata",('all','',''))
            if cursor.rowcount > 0:
                context['data'] = True
                for i in cursor.fetchall():
                    context[i[0]] = int(i[1]) # i[0] - label ,i[1] - count
        except Exception as e:
            context = {'data':False}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()

        if context['Total fans']!=0:
            context['Total fans']=context['Total fans']-context['fan remove count']    
        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def tw_tile_bar_data(request):
    """
        This method is used to fetch twitter tile bar data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')    
    
    if is_valid_session(request):
        context = {'data': False, 'Daily impressions': 0, 'Daily retweet count': 0, 'Daily relpy count': 0, 
            'Daily likes count': 0, 'Daily videos total': 0, 'Daily Followers': 0
        }
        
        cursor = connection.cursor()

        try:
            if period == "Monthly":
                period = "total"
            elif period == "Daily":
                period = "month"
            elif period == "Quarterly":
                period = "total"
            elif period == "Weekly":
                period = "month"

            # cursor.callproc("usp_report_twitterdata",('all','2020','10'))
            cursor.callproc("usp_report_twitterdata", ['all', period_year, period_month])
            if cursor.rowcount > 0:
                context['data'] = True
                for i in cursor.fetchall():
                    context['Daily impressions']=int(i[0])
                    context['Daily retweet count']=int(i[1])
                    context['Daily relpy count']=int(i[2])
                    context['Daily likes count']=int(i[3])
                    context['Daily videos total']=int(i[4])
                    context['Daily Followers']=int(i[5])
        except Exception as e:
            context = {'data':False}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()

        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def insta_tile_bar_data(request):
    """
        This method is used to fetch instagram tile bar data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    
    if is_valid_session(request):
        context = {'data': False, 'Impressions': 0, 'Engagements': 0, 'Likes': 0, 'Followers': 0, 'Comments': 0}
        cursor = connection.cursor()

        try:
            if period == "Monthly":
                period = "total"
            elif period == "Daily":
                period = "month"
            elif period == "Quarterly":
                period = "total"
            elif period == "Weekly":
                period = "month"

            cursor.callproc("usp_report_Instagramdata", [period, period_year, period_month])
            if cursor.rowcount > 0:
                context['data'] = True
                for i in cursor.fetchall():
                    context[i[0]] = int(i[1]) # i[0] - label ,i[1] - count
        except Exception as e:
            context = {'data':False}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()    
        
        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def insta_total_likes_followers(request):
    """
        This method is used to fetch instagram tile bar data for total followers and likes
    """
    if is_valid_session(request):
        context = {'data': False,'Likes': 0, 'Followers': 0}
        cursor = connection.cursor()
        try:
            cursor.callproc("usp_report_instagramdata",('all','',''))
            if cursor.rowcount > 0:
                context['data'] = True
                for i in cursor.fetchall():
                    context[i[0]] = int(i[1])     # i[0] - label ,i[1] - count  
        except Exception as e:
            context = {'data':False}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()

        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})
	  
      
def fb_most_views_post_data(request):
    """
        This method is used to fetch facebook most views data for post
    """
    period =request.GET.get('type')
    period_year=request.GET.get('year')
    period_month=request.GET.get('month')
    selected_period = request.GET.get('selected_period', '')
    
    
    if is_valid_session(request):
        cal_bar=0
        period_index = {"Daily": "day", "Weekly":"week", "Monthly":"month", "Quarterly":"quarter"}
        context = {'data':False, 'x_axis_data':[],'description':[],'target_url':[] ,'unique_impressions':[], 'total_impressions':[],'paid_impressions':[],'total_impressions_tooltip':[]}
        cursor = connection.cursor()
        
        x_axis_data = []
        description=[]
        target_url=[]
        unique_impressions = []
        total_impressions = []
        paid_impressions=[]
        total_impressions_tooltip=[]

        try:
            period=period_index.get(period)
            cursor.callproc("usp_report_top_fb_post", [period, period_year, period_month, selected_period])
            
            if cursor.rowcount > 0:     
                for i in cursor.fetchall():
                    cal_bar=int(i[3])-int(i[4])
                    if cal_bar < 0:
                        cal_bar=0
                    x_axis_data.append(i[0]) 
                    description.append(i[1]) 
                    target_url.append(i[2])
                    total_impressions.append(cal_bar)
                    total_impressions_tooltip.append(int(i[3]))
                    unique_impressions.append(int(i[4])) 
                    paid_impressions.append(int(i[5]))
                    
                context['data'] = True
                context['x_axis_data']=x_axis_data
                context['description']=description
                context['target_url']=target_url
                context['unique_impressions']=unique_impressions
                context['total_impressions']=total_impressions
                context['paid_impressions']=paid_impressions
                context['total_impressions_tooltip']=total_impressions_tooltip
            
        except Exception as e:
            context = {'data':False, 'x_axis_data':[], 'unique_impressions':[], 'total_impressions':[],'paid_impressions':[],'total_impressions_tooltip':[]}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()    

        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def gender_data_social(request):
    """
        This method is used to fetch facebook gender chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    
    
    if is_valid_session(request):
        context = {'data':False, 'male':'0', 'female':'0'}
        cursor = connection.cursor()
        try:
            if period == "Monthly":
                period = "total"
            elif period == "Daily":
                period = "month"
            elif period == "Quarterly":
                period = "total"
            elif period == "Weekly":
                period = "month"
                
            cursor.callproc("usp_report_Gender", [period, period_year, period_month])
            if cursor.rowcount > 0:
                context['data'] = True
                for i in cursor.fetchall():
                    # i[0] - gender ,i[1] - percentage
                    if(i[0] == "Female"): 
                        context['female'] = str(i[1][0:-1]) 
                    else:
                        context['male'] = str(i[1][0:-1])

        except Exception as e:
            context = {'data':False, 'male':'0', 'female':'0'}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()    

        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


########################################################################################
                    ################# Mail Chimp #################
########################################################################################


def opens_chart_data(request):
    """
        This method is used to fetch total opens & unique opens chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    
    
    if is_valid_session(request):
        period_index = {"Daily": "day", "Weekly":"week", "Monthly":"month", "Quarterly":"quarter"}
        context = {'data':False, 'x_axis_data':[], 'total_opens':[],'unique_opens':[],'campaigns':[],'mail_sent':[]}
        cursor = connection.cursor()

        x_axis_data = []
        total_opens = []
        unique_opens = []
        campaigns = []
        mail_sent = []

        try:
            period=period_index.get(period)
            cursor.callproc("usp_report_mc_total_unique_opens", [period, period_year, period_month])
            if cursor.rowcount > 0:
                context['data'] = True
                for i in cursor.fetchall():
                    x_axis_data.append(i[0])  # i[0] - period type
                    total_opens.append(int(i[1])) # i[1] - total_opens count
                    unique_opens.append(int(i[2])) # i[2] - unique_opens count
                    campaigns.append(int(i[3])) # i[3] - campaigns count
                    mail_sent.append(int(i[4])) # i[4] - mailsent count

                context['x_axis_data'] = x_axis_data
                context['total_opens'] = total_opens
                context['unique_opens'] = unique_opens
                context['campaigns'] = campaigns
                context['mail_sent'] = mail_sent

        except Exception as e:
            context = {'data':False, 'x_axis_data':[], 'total_opens':[],'unique_opens':[],'campaigns':[],'mail_sent':[]}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()    

        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def click_through_chart_data(request):
    """
        This method is used to fetch click through & click through rate chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    selected_period = request.GET.get('selected_period', '')
    
    
    if is_valid_session(request):
        period_index = {"Daily": "day", "Weekly":"week", "Monthly":"month", "Quarterly":"quarter"}
        context = {'data':False, 'x_axis_data':[], 'click_through':[], 'click_through_rate':[]}
        cursor = connection.cursor()

        x_axis_data = []
        click_through = []
        click_through_rate = []

        try:
            period=period_index.get(period)
            cursor.callproc("usp_report_mc_click_through", [period, period_year, period_month, selected_period])
            if cursor.rowcount > 0:
                context['data'] = True
                for i in cursor.fetchall():
                    x_axis_data.append(i[0]) # i[0] - period type
                    click_through.append(int(i[1])) # i[1] - click_through count
                    click_through_rate.append(round((float(i[2])*100)))#click through rate

            context['x_axis_data'] = x_axis_data
            context['click_through'] = click_through
            context['click_through_rate'] = click_through_rate

        except Exception as e:
            context = {'data':False, 'x_axis_data':[], 'click_through':[], 'click_through_rate':[]}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()    

        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def email_send_chart_data(request):
    """
        This method is used to fetch email send day of week chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    selected_period = request.GET.get('selected_period', '')
    
    
    if is_valid_session(request):
        x_axis_data=[]
        email_send_counts=[]
        email_send_count_bars=[]
        total_opens=[]
        unique_opens=[]
        unique_opens_percentage=[]
        total_opens_percentage=[]

        context = {'data':False,'x_axis_data':[],'email_send_counts':[],'email_send_count_bars':[],'total_opens':[],'unique_opens':[],'total_open_percentage':[],'unique_open_percentage':[]}
        period_index = {"Daily": "day", "Weekly":"day", "Monthly":"month", "Quarterly":"quarter"}
        cursor = connection.cursor()
        cal_bar=0
        try:
            period = period_index.get(period)
            cursor.callproc("usp_report_mc_email_send", [period, period_year, period_month, selected_period])
            if cursor.rowcount > 0:
                context['data'] = True
                for i in cursor.fetchall():
                    
                    cal_bar=int(i[1])-int(i[4])
                    if cal_bar < 0:
                        cal_bar=0
                    x_axis_data.append(str(i[0])) # xaxis data
                    email_send_counts.append(int(i[1])) #email send counts
                    email_send_count_bars.append(cal_bar) #calculation for bar
                    total_opens.append(round(float(i[4]))) # i[4] total opens
                    unique_opens.append(int(i[2])) #unique opens 
                    total_opens_percentage.append(round(float(i[4]/i[1]*100))) #total_opens_percentage
                    unique_opens_percentage.append(round(float(i[2]/i[1]*100))) #unique_opens_percentage

            context['x_axis_data'] =x_axis_data 
            context['email_send_counts'] =email_send_counts
            context['total_opens'] =total_opens
            context['unique_opens'] =unique_opens
            context['email']=email_send_count_bars
            context['total_opens_percentage']=total_opens_percentage
            context['unique_opens_percentage']=unique_opens_percentage


        except Exception as e:
            context = {'data':False}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()    

        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def top_campaign_chart_data(request):
    """
        This method is used to fetch top campaigns chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    selected_period = request.GET.get('selected_period', '')
    
    
    if is_valid_session(request):
        period_index = {"Daily": "day", "Weekly":"day", "Monthly":"month", "Quarterly":"quarter"}
        context = {'data':False, 'campaigns':[], 'total_opens':[], 'total_mail_sent':[], 'total_clicks':[],'total_opens_rate':[],'unique_opens_rate':[]}
        cursor = connection.cursor()

        campaigns = []
        total_opens = []
        total_mail_sent = []
        total_clicks = []
        unique_opens_rate=[]
        total_opens_rate=[]

        try:
            period=period_index.get(period)
            cursor.callproc("usp_report_mc_Top_campaign", [period, period_year, period_month, selected_period])
            if cursor.rowcount > 0:
                context['data'] = True
                for i in cursor.fetchall():
                    campaigns.append(i[0]) # i[0] - campaigns name
                    total_opens.append(i[1]) # i[1] - total opens count
                    total_mail_sent.append(i[2]) # i[2] - total mail sent
                    total_clicks.append(i[3]) # i[3] - total clicks count
                    unique_opens_rate.append(round(float(i[4]*100)))#i[4]-unique opens as percentage
                    total_opens_rate.append(round(float(i[5]*100)))#i[5]-total open as percentage

                context['campaigns'] = campaigns
                context['total_opens'] = total_opens
                context['total_mail_sent'] = total_mail_sent
                context['total_clicks'] = total_clicks
                context['unique_opens_rate']=unique_opens_rate
                context['total_opens_rate']=total_opens_rate

        except Exception as e:
            context = {'data':False, 'campaigns':[], 'total_opens':[], 'total_mail_sent':[], 'total_clicks':[],'unique_opens_rate':[],'total_opens_rate':[]}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()    

        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def campaigns_top_chart(request):    
    """
        This method is used to fetch  campaigns top chart data
    """
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
    selected_period = request.GET.get('selected_period', '')
    
    
    if is_valid_session(request):
        context = {'data':False}
        period_index = {"Daily": "day", "Weekly":"week", "Monthly":"month", "Quarterly":"quarter"}
        cursor = connection.cursor()
        try:  
            period=period_index.get(period)     
            # cursor.callproc("usp_report_mc_mail_campaigns", [period, period_year, period_month, selected_period])
            cursor.callproc("usp_report_mc_mail_campaigns", ['month', period_year, period_month, selected_period])
            if cursor.rowcount > 0:
                context['data'] = True
                for i in cursor.fetchall():                
                    context[i[0]] = i[1] # i[0] - label name ,i[1] - count 
        except Exception as e:
            context = {'data':False}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()    
        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


########################################################################################
                    ################# Twitter #################
########################################################################################

def tw_impression(request):
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
        
    if is_valid_session(request):
        x_axis_data = []
        impression_count = []   
        tweet_count = []             
        period_index = {"Daily": "day", "Weekly":"week", "Monthly":"month", "Quarterly":"quarter"}
        context = {'data':False, 'x_axis_data':[], 'impression_count':[], 'tweet_count':[]}
        cursor = connection.cursor()

        try:
            period = period_index.get(period)
            cursor.callproc("usp_select_twitter_data", [period, period_year, period_month])    
            if cursor.rowcount > 0:
                for i in cursor.fetchall():
                    x_axis_data.append(i[0]) # i[0] - period type
                    impression_count.append(int(i[1])) # i[1] - paid likes                    
                    tweet_count.append(int(i[2])) # i[1] - paid likes     

                context['data'] = True
                context['x_axis_data'] = x_axis_data
                context['impression_count'] = impression_count
                context['tweet_count'] = tweet_count
            else:
                context = {'data':False, 'x_axis_data':[], 'impression_count':[], 'tweet_count':[]}
        except Exception as e:
            context = {'data':False, 'x_axis_data':[], 'impression_count':[], 'tweet_count':[]}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()    
        
        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def tw_like_n_replay(request):
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
        
    if is_valid_session(request):
        x_axis_data = []
        likes_count = []
        reply_count = []
        context = {'data':False, 'x_axis_data':[], 'likes_count':[], 'reply_count':[]}
        period_index = {"Daily": "day", "Weekly":"week", "Monthly":"month", "Quarterly":"quarter"}
        cursor = connection.cursor()

        try:
            period = period_index.get(period)
            cursor.callproc("usp_select_twitter_data_likes", [period, period_year, period_month])    
            if cursor.rowcount > 0:
                for i in cursor.fetchall():
                    x_axis_data.append(i[0]) # i[0] - period type
                    likes_count.append(int(i[1])) # i[1] - likes_count
                    reply_count.append(int(i[2])) # i[1] - reply_count

                context['data'] = True
                context['x_axis_data'] = x_axis_data
                context['likes_count'] = likes_count
                context['reply_count'] = reply_count
            else:
                context = {'data':False, 'x_axis_data':[], 'likes_count':[], 'reply_count':[]}

        except Exception as e:
            context = {'data':False, 'x_axis_data':[], 'likes_count':[], 'reply_count':[]}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()    
            
        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def tw_followers(request):
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
        
    if is_valid_session(request):
        x_axis_data = []
        followers_count = []

        context = {'data':False, 'x_axis_data':[], 'followers_count':[]}
        period_index = {"Daily": "day", "Weekly":"week", "Monthly":"month", "Quarterly":"quarter"}
        cursor = connection.cursor()

        try:
            period = period_index.get(period)
            cursor.callproc("usp_select_twitter_followers_count", [period, period_year, period_month])    
            if cursor.rowcount > 0:
                for i in cursor.fetchall():
                    x_axis_data.append(i[0]) # i[0] - period type
                    followers_count.append(int(i[1])) # i[1] - likes_count                    

                context['data'] = True
                context['x_axis_data'] = x_axis_data
                context['followers_count'] = followers_count                
            else:
                context = {'data':False, 'x_axis_data':[], 'followers_count':[]}

        except Exception as e:
            context = {'data':False, 'x_axis_data':[], 'followers_count':[]}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()    
            
        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


def tw_video_views(request):
    period = request.GET.get('type')
    period_year = request.GET.get('year')
    period_month = request.GET.get('month')
        
    if is_valid_session(request):
        x_axis_data = []
        view_count = []
        pb_25_count = []
        pb_50_count = []
        pb_75_count = []
        pb_100_count = []
                
        context = {'data':False, 'x_axis_data':[], 'view_count':[], 'pb_25_count':[], 'pb_50_count':[], 'pb_75_count':[], 'pb_100_count':[]}
        period_index = {"Daily": "day", "Weekly":"week", "Monthly":"month", "Quarterly":"quarter"}
        cursor = connection.cursor()

        try:
            period = period_index.get(period.strip())
            cursor.callproc("usp_select_twitter_videos_data", [period, period_year, period_month])    
            if cursor.rowcount > 0:
                for i in cursor.fetchall():
                    x_axis_data.append(i[0]) # i[0] - period type
                    view_count.append(int(i[1])) # i[1] - likes_count
                    pb_25_count.append(int(i[2])) # i[1] - reply_count
                    pb_50_count.append(int(i[3])) # i[1] - likes_count
                    pb_75_count.append(int(i[4])) # i[1] - reply_count
                    pb_100_count.append(int(i[5])) # i[1] - reply_count

                context['data'] = True
                context['x_axis_data'] = x_axis_data
                context['view_count'] = view_count
                context['pb_25_count'] = pb_25_count
                context['pb_50_count'] = pb_50_count
                context['pb_75_count'] = pb_75_count
                context['pb_100_count'] = pb_100_count
            else:
                context = {'data':False, 'x_axis_data':[], 'view_count':[], 'pb_25_count':[], 'pb_50_count':[], 'pb_75_count':[], 'pb_100_count':[]}

        except Exception as e:
            context = {'data':False, 'x_axis_data':[], 'view_count':[], 'pb_25_count':[], 'pb_50_count':[], 'pb_75_count':[], 'pb_100_count':[]}
            logger.error("#"*10+'\t'+str(e))
        finally:
            cursor.close()    
            
        return JsonResponse(context)
    else:
        return JsonResponse({'data':False,'status':403})


########################################################################################
                    ################# Session Check #################
########################################################################################

def session_check(request):
    """
        This method is used to check session expired or not
    """
    response = token_expire_check(request.session.get('username'), request,{'request_from': 'endpoint session_check_method'})
    if response.get('status') == 403:
        return JsonResponse({'data':403})
    else:
        return JsonResponse({'data':200})


def is_valid_session(request):
    if request.session.get('username'):
        s_code = session_check(request)
        if json.loads(s_code.content).get('data') == 200:
            return True
    return False
