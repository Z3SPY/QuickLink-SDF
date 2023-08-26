from django.urls import path
from . import views #Import views from this folder
#For configuring every single routing end point


# paths(ROUTE THAT WE NEED TO GO TO, THE VIEW, NAME OF THE ROUTE)
urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('notes/', views.getNotes, name="notes"),
    #The line of code below is for getting a singular note, from our notes database, the dir needs to defined and the variable pk can be changed in views.py
    path('notes/<str:pk>/', views.getNote, name="note"),
]
