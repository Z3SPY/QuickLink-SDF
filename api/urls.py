from django.urls import path
from . import views #Import views from this folder
#For configuring every single routing end point


# paths(ROUTE THAT WE NEED TO GO TO, THE VIEW, NAME OF THE ROUTE)
urlpatterns = [
    path('users/', views.getUsers, name="Users"),
    path('profileValues/', views.ProfilePageDetail, name="profileValues"),
    path('getUser/', views.check_user_existence, name="getUsers"),
    path('createUser/', views.create_user, name="createUser"),
    path('obtainPostList/', views.GetAllPosts, name="GetAllPost"),
    path('obtainPost/<str:pk>', views.GetSpecificPost, name="GetSpecificPost"),
    path('profile/<str:pk>/', views.GetProfilePageDetail, name="getProfile")
    #The line of code below is for getting a singular note, from our notes database, the dir needs to defined and the variable pk can be changed in views.py
]
