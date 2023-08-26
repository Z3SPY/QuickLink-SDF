from django.contrib import admin

# Register your models here.
# We are looking at the models in model.py

from .models import Note

admin.site.register(Note)