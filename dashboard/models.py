from django.db import models
from django.contrib.auth.models import User


class UserCompanyMapping(models.Model):
    user_id = models.IntegerField(blank=True, null=True)
    company = models.ForeignKey('Company', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_company_mapping'

class Company(models.Model):
    companyid = models.IntegerField(db_column='CompanyID', primary_key=True)  # Field name made lowercase.
    companyname = models.TextField(db_column='CompanyName', blank=True, null=True)  # Field name made lowercase.
    ga_key_file_name = models.CharField(max_length=100, blank=True, null=True)
    ga_viewid = models.CharField(db_column='ga_viewId', max_length=100, blank=True, null=True)  # Field name made lowercase.
    fb_page_token = models.CharField(max_length=200, blank=True, null=True)
    fb_id = models.CharField(max_length=100, blank=True, null=True)
    insta_id = models.CharField(max_length=100, blank=True, null=True)
    mc_apikey = models.CharField(max_length=100, blank=True, null=True)
    mc_server = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'company'
        
class CustomerDetails(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)
    image_path = models.ImageField(upload_to='profile')
    user_role = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customer_details'


class GoogleAnalytics(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)
    chart = models.CharField(db_column='Chart', max_length=50, blank=True, null=True) 

    class Meta:
        managed = False
        db_table = 'google_analytics'


class SocialMedia(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)
    chart = models.CharField(db_column='Chart', max_length=50, blank=True, null=True) 

    class Meta:
        managed = False
        db_table = 'social_media'

class Mailchimp(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)
    chart = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mailchimp'