from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views #Import views from this folder
#For configuring every single routing end point


# paths(ROUTE THAT WE NEED TO GO TO, THE VIEW, NAME OF THE ROUTE)
urlpatterns = [
    path('users/', views.getUsers, name="Users"),
    path('profileValues/', views.ProfilePageDetail, name="profileValues"),
    path('getUser/', views.check_user_existence, name="getUsers"),
    path('createUser/', views.create_user, name="createUser"),
    path('obtainPostList/', views.GetAllPosts, name="GetAllPost"),
    path('post/<str:pk>/', views.GetSpecificPost, name="GetSpecificPost"),
    path('profile/<str:pk>/', views.GetProfilePageDetail, name="getProfile"),
    path('createNewPost/', views.CreateNewPost, name="createNewPost"),
    path('createComment/', views.CreateComment, name="userCreateComment"),
<<<<<<< HEAD
    path('getUserPostsList/<int:pk>/', views.GetSpecificUserPost, name="getUserPostsList"),
    path('editProfile/', views.EditProfile, name="editProfile")
=======
    path('search/', views.search_posts, name='search_posts')
>>>>>>> 9e8203ecf68884a96a1c6bd373450200cb872651
    #The line of code below is for getting a singular note, from our notes database, the dir needs to defined and the variable pk can be changed in views.py
]

