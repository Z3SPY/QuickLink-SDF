from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework import generics

from django.http import JsonResponse

#For DB Values
from .models import Users
from .models import ProfilePage
from django.contrib.auth import authenticate

from .serializers import UserSerializer
from .serializers import ProfileSerializer


# Each function gets its own window within django framework
# Create your views here.
# All routes I want to pass into my application
@api_view(['GET']) #Specify the methods allowed to this view i.e GET, PUT, POST, DELETE
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]

    return Response(routes)



#Gets Users 
@api_view(['GET', 'POST']) 
def getUsers(request):
    #Serializing all values from our notes object, we are getting notes from notes class
    user = Users.objects.all().filter(name="Jake")
    serializer = UserSerializer(user, many=True) #We are passing notes var, many = true means we are serializing multiple objects
    return Response(serializer.data)


def check_user_existence(request):
    username = request.GET.get('username', None)
    password = request.GET.get('password', None)
    
    if username and password:
        try: 
            user = Users.objects.get(email=username)
            print("User: " + username + " Password: " + password)
            #print(authenticate(request, email=user.email, password=password))

            if user and user.password == password:
                user_logged_in = True
                print("1")
            else:
                print("2")
                user_logged_in = False
        except Users.DoesNotExist:
            user_logged_in= False
    else:
        user_logged_in = False

    return JsonResponse({'user_logged_in': user_logged_in})



@api_view(['GET']) 
def ProfilePageDetail(request):
    profile = ProfilePage.objects.all()
    serializer = ProfileSerializer(profile, many=True)
    return Response(serializer.data)
