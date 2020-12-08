from django.forms import Form, CharField, PasswordInput, TextInput, ValidationError, ImageField, ClearableFileInput

NOT_NULL = 'Enter a valid {}.'
MAX_LENGTH = '{} must not exceed {} characters.'


def isNone(object):
    if object == None or object == '':
        return True
    return False


class UserLoginForm(Form):
    username = CharField(required=False, widget=TextInput(attrs={'id': "UserName", 'name': 'UserName', }))
    password = CharField(required=False, widget=PasswordInput(attrs={'id': 'Password', 'name': 'Password', }))

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if isNone(username):
            raise ValidationError(NOT_NULL.format('username'))
        if len(username) > 50:
            raise ValidationError(MAX_LENGTH.format('Username','50'))
        return username

    def clean_password(self):
        password = self.cleaned_data.get('password')
        if isNone(password):
            raise ValidationError(NOT_NULL.format('password'))
        if len(password) > 500:
            raise ValidationError(MAX_LENGTH.format('Password','500'))
        return password


class CreateForm(Form):
    username = CharField(required=True, widget=TextInput())
    password = CharField(required=True, widget=TextInput())
    profile_pic = ImageField()

class SettingsForm(Form):
    update_profile = ImageField(required=False, widget=ClearableFileInput(attrs={"class":"custom-file-input",
        "id":"profile_pic_uploader"
    }))