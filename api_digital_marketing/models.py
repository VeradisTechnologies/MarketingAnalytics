from django.db import models


class Wp4MbnfbgfhcUsers(models.Model):
    id = models.BigAutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    user_login = models.CharField(max_length=60)
    user_pass = models.CharField(max_length=255)
    user_nicename = models.CharField(max_length=50)
    user_email = models.CharField(max_length=100)
    user_url = models.CharField(max_length=100)
    user_registered = models.DateTimeField()
    user_activation_key = models.CharField(max_length=255)
    user_status = models.IntegerField()
    display_name = models.CharField(max_length=250)

    class Meta:
        managed = False
        db_table = 'wp_4mbnfbgfhc_users'


class Wp4MbnfbgfhcDmToken(models.Model):
    user_id = models.IntegerField(blank=True, null=True)
    token = models.CharField(max_length=200, blank=True, null=True)
    logo = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'wp_4mbnfbgfhc_dm_token'
