import logging
import os

from datetime import datetime, timezone, timedelta
from .utils import token_expire_check, get_ip_fromRequest

from dashboard.forms import UserLoginForm, CreateForm, SettingsForm

from .models import CustomerDetails, SocialMedia, GoogleAnalytics, Mailchimp
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from django.conf import settings
from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth import authenticate
from django.core.files.storage import FileSystemStorage


logger = logging.getLogger(__name__)


def user_login(request):
    """
        This method is used to validate user credentials.

        Args:
            username : user's name,
            password : user's password.

        Return:
            redirect('ga_dashboard') - request redirect to google analytics dashboard.
    """
    form = UserLoginForm()
    if request.method == 'POST':
        login_form = UserLoginForm(request.POST)
        ip = get_ip_fromRequest(request)

        if login_form.is_valid():
            username = request.POST.get('username')
            password = request.POST.get('password')

            user = User.objects.filter(username__contains=username).first()
            if authenticate(username=username, password=password) and user:
                user.last_login = datetime.now(timezone.utc)
                user.save()

                # token generated
                token, created = Token.objects.get_or_create(user=user)
                token.created = datetime.now(timezone.utc)
                token.save()

                request.session['username'] = username

                logger.info('Dashboard logged-in successfully....!!! User_name :{}, IP :{}'.format(username, ip))
                return redirect('ga_dashboard')
            else:
                logger.warning('Invalid authentication User_name :{}, IP :{}'.format(username, ip))
                return render(request, 'login.html', {'form': form, 'error': 'Invalid credentials.'})
        else:
            logger.info("Login - Form invalid..!! IP :{}".format(ip))
            return render(request, 'login.html', {'form': login_form})
    
    elif request.method == 'GET':
        # param token auth
        token = request.GET.get('dm_token')
        token_obj = Token.objects.filter(key=token.strip()).first() if token else None
        if token_obj:
            user_obj = User.objects.filter(id=token_obj.user_id).first()
            request.session['username'] = user_obj.username
            return redirect('ga_dashboard')
        else:
            # existing session continue
            if request.session.get('username') != None:
                response = token_expire_check(request.session.get('username'), request, {'request_from': 'login_method'})
                if response.get('status') == 200:
                    return redirect('ga_dashboard')
        
        return render(request, 'login.html', {'form': form})


def logout(request):
    """
        This method is used remove the current session.

        Return:
            redirect('login') - request redirect to login page.
    """
    logger.info('logout function call received')
    if request.session.get('username'):
        user = User.objects.filter(username=request.session['username']).first()
        if user:
            existing_token = Token.objects.filter(user=user)
            if existing_token:
                existing_token.delete()

    # remove logout user session
    for key in list(request.session.keys()):
        del request.session[key]

    logger.info('User Successfully logged out and Stored sessions are cleared')
    return redirect('login')


def dashboard(request):
    """ 
        This method is used to generate google analytics dashboard.

        Args:
            period_value : selected period value from html,
            period_year : selected year value from html,
            period_month : selected month value from html,

        Return:
            {
                "period_value" : selected period value ,
                "year_val" : selected year value,
                "month_val" : selected month value,
                "logo_path": user current logo path,
                "selected_ga_ids": selected google analytics charts list.
            }
    """

    logger.info('dashboard function call received')
    if request.session.get('username') != None:

        # Check user token expired or not
        response = token_expire_check(request.session.get('username'), request, {
                                      'request_from': 'dashboard_method'})
        form = UserLoginForm()
        if response.get('status') == 200:
            year_val = month_val = '1'
            period_value = 'Monthly'
            logo_path = ''

            user = User.objects.filter(
                username=request.session.get('username')).first()
            customer_obj = CustomerDetails.objects.filter(user=user)
            if customer_obj:
                customer_obj = customer_obj.first()
                logo_path = customer_obj.image_path.url if customer_obj.image_path else ''

            if(request.method == "POST"):
                period_value = request.POST.get("period_value")
                year_val = request.POST.get("period_year")
                month_val = request.POST.get("period_month")

                if period_value == "Daily":
                    chartname = xValue = ''

            selected_ids = selected_charts(user)
            return render(request, "dashboard.html", {
                "period_value": period_value,
                "year_val": year_val,
                "month_val": month_val,
                "logo_path": logo_path,
                "selected_ids": selected_ids
            })
        elif response.get('status') == 403:
            logger.info('session timeout redirect to login')
            return render(request, 'login.html', {'form': form, 'error': 'Session timeout.'})
    return redirect('login')


def dashboard_social(request):
    """ 
        This method is used to generate social media dashboard.

        Args:
            period_value : selected period value from html,
            period_year : selected year value from html,
            period_month : selected month value from html,

        Return:
            {
                "period_value" : selected period value ,
                "year_val" : selected year value,
                "month_val" : selected month value,
                "logo_path": user current logo path,
                "selected_social_ids": selected social media charts list.
            }
    """

    logger.info('dashboard_social function call received')
    period_value = year_value = month_value = None
    if request.session.get('username') != None:

        # Check user token expired or not
        response = token_expire_check(request.session.get('username'), request, {
                                      'request_from': 'dashboard_social_method'})
        form = UserLoginForm()
        if response.get('status') == 200:
            logo_path = ''

            user = User.objects.filter(
                username=request.session.get('username')).first()
            customer_obj = CustomerDetails.objects.filter(user=user)
            if customer_obj:
                customer_obj = customer_obj.first()
                logo_path = customer_obj.image_path.url if customer_obj.image_path else ''

            if(request.method == "POST"):
                period_value = request.POST.get("period_value")
                year_value = request.POST.get("period_year")
                month_value = request.POST.get("period_month")

                selected_ids = selected_charts(user)
                return render(request, "dashboard_social.html", {
                    "period_value": period_value.strip(),
                    "year_value": year_value,
                    "month_value": month_value,
                    'logo_path': logo_path,
                    "selected_ids": selected_ids
                })
        elif response.get('status') == 403:
            logger.info('session timeout redirect to login')
            return render(request, 'login.html', {'form': form, 'error': 'Session timeout.'})
    return redirect('login')


def dashboard_mailchimp(request):
    """
        This method is used to generate mailchimp dashboard.

        Args:
            period_value : selected period value from html,
            period_year : selected year value from html,
            period_month : selected month value from html,

        Return:
            {
                "period_value" : selected period value ,
                "year_val" : selected year value,
                "month_val" : selected month value,
                "logo_path": user current logo path,
                "selected_campaign_ids": selected mailchimp charts list.
            }    
    """
    logger.info('dashboard_mailchimp function call received')
    period_value = year_value = month_value = None
    if request.session.get('username') != None:
        # Check user token expired or not
        response = token_expire_check(request.session.get('username'), request, {
                                      'request_from': 'dashboard_mailchimp'})
        form = UserLoginForm()
        if response.get('status') == 200:
            logo_path = ''
            user = User.objects.filter(username=request.session.get('username')).first()
            customer_obj = CustomerDetails.objects.filter(user=user)

            if customer_obj:
                customer_obj = customer_obj.first()
                logo_path = customer_obj.image_path.url if customer_obj.image_path else ''

            if(request.method == "POST"):
                period_value = request.POST.get("period_value")
                year_value = request.POST.get("period_year")
                month_value = request.POST.get("period_month")

                selected_ids = selected_charts(user)
                return render(request, 'dashboard_mailchimp.html',{
                    "period_value": period_value,
                    "year_value": year_value,
                    "month_value": month_value,
                    'logo_path': logo_path,
                    'selected_ids':selected_ids
            })
        elif response.get('status') == 403:
            logger.info('session timeout redirect to login')
            return render(request, 'login.html', {'form': form, 'error': 'Session timeout.'})
    return redirect('login')
  

def session_timeout(request):
    """ 
        If session expired return login page.

        Return:
            {
                "form" : login form, 
                "error" : Session timeout message.
            } 
    """
    form = UserLoginForm()
    return render(request, 'login.html', {'form': form, 'error': 'Session timeout.'})


def kpi_update(request):
    logger.info('user_setting function call received')
    if request.session.get('username') != None:
        response = token_expire_check(request.session.get('username'), request, {'request_from': 'setting_page'})
        login = UserLoginForm()
        if response.get('status') == 200:
            if(request.method == "POST"):
                period_value = request.POST.get("period_value")
                period_month = request.POST.get("period_month")
                period_year = request.POST.get("period_year")
                ga_kpi_selected = request.POST.get("ga_kpi_selected")
                sm_kpi_selected = request.POST.get("sm_kpi_selected")
                mc_kpi_selected = request.POST.get("mc_kpi_selected")
                redir_page = request.POST.get("redir_page")
                logo_path = ''
                
                user = User.objects.filter(username=request.session.get('username')).first()
                customer_obj = CustomerDetails.objects.filter(user=user)
                if customer_obj:
                    customer_obj = customer_obj.first()
                    logo_path = customer_obj.image_path.url if customer_obj.image_path else ''

                # GA selection update
                GoogleAnalytics.objects.filter(user=user).delete()
                if ga_kpi_selected:
                    for chart_id in ga_kpi_selected.split(','):
                        GoogleAnalytics.objects.create(user=user, chart=chart_id).save()
                
                # SocialMedia selection update
                SocialMedia.objects.filter(user=user).delete()
                if sm_kpi_selected:
                    for chart_id in sm_kpi_selected.split(','):
                        SocialMedia.objects.create(user=user, chart=chart_id).save()
                
                # MailChimp selection update
                Mailchimp.objects.filter(user=user).delete()
                if mc_kpi_selected:
                    for chart_id in mc_kpi_selected.split(','):
                        Mailchimp.objects.create(user=user, chart=chart_id).save()
                
                return render(request, redir_page, {
                    "period_value": period_value,
                    "year_val": period_year,
                    "month_val": period_month,
                    "logo_path": logo_path,
                    "selected_ids": selected_charts(user)
                })
              
            else:
                logger.info('bad request type redirect to login')    
                return render(request, 'login.html', {'form': login, 'error': ''})
        elif response.get('status') == 403:
            logger.info('session timeout redirect to login')
            return render(request, 'login.html', {'form': login, 'error': 'Session timeout.'})
    return render(request, 'login.html', {'form': login, 'error': ''})


def selected_charts(user):
    selected_ga_ids = list(GoogleAnalytics.objects.filter(user=user).values_list('chart', flat=True)) if GoogleAnalytics.objects.filter(user=user) else []
    selected_sm_ids = list(SocialMedia.objects.filter(user=user).values_list('chart', flat=True)) if SocialMedia.objects.filter(user=user) else []
    selected_mc_ids = list(Mailchimp.objects.filter(user=user).values_list('chart', flat=True)) if Mailchimp.objects.filter(user=user) else []
    return {'ga': selected_ga_ids, 'sm': selected_sm_ids, 'mc': selected_mc_ids}


def create_user(request):
    form = CreateForm()
    if request.method == 'POST':
        user_form = CreateForm(request.POST, request.FILES)

        ga_ids = ['user_count_chart_container','interaction_chart_container', 'conversion_rate_chart_container',
            'gender_charts','top_pages_chart_container','city_chart_container','device_chart_container']
        social_ids = ['engagement_chart_container', 'impression_chart_container', 'fans_chart_container', 
            'gender_charts', 'like_chart_container', 'clicks_chart_container', 'video_views_chart_container']
        mail_campaigns = ['opens_chart_container', 'campaigns_chart_container', 'clickThrough_chart_container', 'emailSend_chart_container']
    
        if user_form.is_valid():
            username = request.POST.get('username')
            password = request.POST.get('password')
            upload_file = request.FILES.get('profile_pic')

            fs = FileSystemStorage().save(upload_file.name, upload_file)
            user = User.objects.create_superuser(username=username, email=None, password=password)
            CustomerDetails.objects.create(user=user, image_path=fs).save()

            for i in ga_ids:
                GoogleAnalytics.objects.create(user=user, chart=i).save()
            for j in social_ids:
                SocialMedia.objects.create(user=user, chart=j).save()
            for k in mail_campaigns:
                Mailchimp.objects.create(user=user, chart=k).save()

            return render(request, 'create_user.html', {"form": user_form, "msg": "success"})

    return render(request, 'create_user.html', {"form": form})