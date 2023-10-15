from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView


from django.http import JsonResponse


#For DB Values
from .models import ProfilePage
from django.contrib.auth import authenticate


from .serializers import ProfileSerializer


#Django User 
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer, GetUserNameSerializer


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
    user = User.objects.all()
    serializer = UserSerializer(user, many=True) #We are passing notes var, many = true means we are serializing multiple objects
    return Response(serializer.data)



def create_user(request):
    userNm = request.GET.get('username', None)
    email = request.GET.get('email', None)
    pssWrd = request.GET.get('password', None)
    
    if userNm and pssWrd and email:
        try:
            user =  User.objects.create_user(username=userNm,
                                 email=email,
                                 password=pssWrd)
            print("New User Created")
            user_logged_in = True

            #Create New Profile Page
            newPage = ProfilePage(user=user, displayName=userNm, bio="Personal informaion here", profile_picture=None, exp_container=None)
            newPage.save()

        except:
            print("invalid")
            user_logged_in = False
    else:
        user_logged_in = False
    return JsonResponse({'user_logged_in': user_logged_in})


def check_user_existence(request):
    
    userNm = request.GET.get('username', None)
    pssWrd = request.GET.get('password', None)
    
    if userNm and pssWrd:
        try: 
            user = authenticate(username=userNm, password=pssWrd)
            print("User: " + userNm + " Password: " + pssWrd)
            #print(authenticate(request, email=user.email, password=password))
            userCur = User.objects.filter(username=userNm)
            userSerializer = GetUserNameSerializer(userCur, many=True)
            #print(userSerializer.data[0])
            if request.user.is_authenticated:
                # Backend to Authenticate Credentials
               

                token = Token.objects.get_or_create(user=user)
                Response = {
                    "status":status.HTTP_200_OK,
                    "message": "success",
                    "data": {
                        "Token": token[0].key,
                        "UserData": userSerializer.data[0]
                    }

                }

                user_logged_in = True
                print("1")
                
                
            else:
                Response = {
                    "status":status.HTTP_401_UNAUTHORIZED,
                    "message": "Invalid Email or Password",
                    "data": {}
                }

                user_logged_in = False
                print("2")
        except User.DoesNotExist:
            user_logged_in= False
    else:
        Response = {
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "bad request",
                "data": {}
        }
            
        user_logged_in = False

    return JsonResponse({'user_logged_in': user_logged_in, **Response})



@api_view(['GET']) 
def ProfilePageDetail(request):
    profile = ProfilePage.objects.all()
    serializer = ProfileSerializer(profile, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def GetProfilePageDetail(request, pk):
    profileDetails = ProfilePage.objects.filter(user__username__startswith=pk)
    print("1")
    serializer = ProfileSerializer(profileDetails, many=True)
    return Response(serializer.data)



        