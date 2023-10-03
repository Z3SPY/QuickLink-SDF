from django.contrib import admin

# Register your models here.
# We are looking at the models in model.py

from .models import Users
from .models import ProfilePage


admin.site.register(Users)
admin.site.register(ProfilePage)