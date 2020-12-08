from django.urls import path, include
from .views import dashboard, dashboard_social, dashboard_mailchimp
from .views import user_login, logout, session_timeout, create_user
from .views import kpi_update
from django.conf import settings
from django.conf.urls.static import static

  
urlpatterns = [
    path('',user_login,name='login'),
    path('logout',logout),
    path("ga_dashboard", dashboard,name='ga_dashboard'),
    path("social_dashboard", dashboard_social),
    path("mailchimp_dashboard", dashboard_mailchimp),
    path("session_timeout", session_timeout),
    # path('create', create_user),
    path('kpi_update', kpi_update)
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
