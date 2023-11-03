from django.contrib import admin

# Register your models here.
# We are looking at the models in model.py

from .models import ProfilePage, ImagePost, Comment
from django.contrib.auth.models import User



admin.site.register(ProfilePage)
admin.site.register(ImagePost)

admin.site.register(Comment)
