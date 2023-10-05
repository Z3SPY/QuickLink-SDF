from django.contrib import admin

# Register your models here.
# We are looking at the models in model.py

from .models import ProfilePage
from django.contrib.auth.models import User



admin.site.register(ProfilePage)

