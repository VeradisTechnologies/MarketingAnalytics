from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from datetime import datetime, timezone, timedelta
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def token_expire_check(username, request,kwargs):
    """
        This method is used to check user token key expired or not. 

        Args:
            username : Login username to get user object,
            request : Standard django request,
            kwargs : Name of which function calling token_expire_check() function.

        Return:
            {
                "status": 200 (or) 403 response code.
            }
    """
    logger.info(f"token_expire_checkmethod call received FROM : {kwargs['request_from']}")
    ip = get_ip_fromRequest(request)
    
    user = User.objects.filter(username=username).first()
    if user:
        token = Token.objects.filter(user=user).first()
        if token:
            token_created = token.created
            current_time = datetime.now(timezone.utc)

            time_diff = current_time-token_created
            expire_time = settings.TOKEN_EXPIRE_TIME 
            
            # token key is not expired then update token time.
            if expire_time > time_diff:
                token.created = datetime.now(timezone.utc)
                token.save()
                logger.info('Dashboard logged-in ,Session continued....!!! User_name :{}, IP :{}'.format(request.session.get('username'),ip))
                return {"status":200}
            else:
                existing_token = Token.objects.filter(user=user)
                if existing_token:
                    existing_token.delete()

                logger.info('Session timeout redirect to login....!!! User_name :{}, IP :{}'.format(request.session.get('username'),ip))    
                # remove user session
                for key in list(request.session.keys()):
                    del request.session[key]

    return {"status":403}


def get_ip_fromRequest(request):
    """
        get login user ip address for logging

        Return:
            ip : Identified user ip address
    """
    logger.debug('Find IP address from request...')
    try:
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
    except:
        logger.debug("Can't identify the ip address from request...")
    return ip    
