"""
WSGI config for DigitalMarketing project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/
"""

import os, sys

sys.path.append("/usr/python/DigitalMarketing/new_dashboard/old/110520/DigitalMarketing")
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'DigitalMarketing.settings')

application = get_wsgi_application()
