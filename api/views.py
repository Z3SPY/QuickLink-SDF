from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
import json
import inspect

from django.views.decorators.csrf import csrf_exempt



import base64
from django.core.files.base import ContentFile



from django.http import JsonResponse


#For DB Values
from .models import ProfilePage, ImagePost, Comment
from django.contrib.auth import authenticate


from .serializers import ProfileSerializer, GetPostValuesSerializer, CommentSerializer


#Django User 
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer, GetUserNameSerializer, GetAllPostValues, PostSerializer


# Each function gets its own window within django framework
# Create your views here.
# All routes I want to pass into my application

# AUTHENTICATION BASED VIEWS
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
            newPage = ProfilePage(user=user, displayName=userNm, userAuth=userNm, bio="Personal informaion here", profile_picture=None, exp_container=None)
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
            
            if user.is_authenticated:
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


# PROFILE BASED VIEWS
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

def GetSpecificUserPost(request, pk):
    filtered_User = User.objects.get(id=pk)
    filtered_UserProfile = ProfilePage.objects.get(user=filtered_User)
    ListPostsUser = ImagePost.objects.filter(user=filtered_UserProfile)
    serialized_Posts =  GetPostValuesSerializer(ListPostsUser, many=True).data

    data = {
        'message': 'Obtained all user posts.',
        'posts': serialized_Posts
    }
    return JsonResponse(data)



# POST BASED VIEWS
@api_view(['GET', 'POST'])
def GetAllPosts(request):
    ListPosts = ImagePost.objects.all()
    serialized_data = []

    for post in ListPosts:
        post_serializer = GetPostValuesSerializer(post)

        profile_page_serializer = ProfileSerializer(post.user)

        post_data = {
            'post': post_serializer.data,
            'display_name': profile_page_serializer.data['displayName'],
            'profile_picture': str(post.user.profile_picture.url) if post.user.profile_picture else None,
        }

        serialized_data.append(post_data)

    print(serialized_data[0])

    return JsonResponse({'Posts': serialized_data})
        

@api_view(['GET'])
def GetSpecificPost(request, pk):

    try: 
        GetPost = get_object_or_404(ImagePost,id=pk)
        comments = Comment.objects.filter(post=GetPost)
        serializer = GetAllPostValues(GetPost, many=False)


        profile_serializer = ProfileSerializer(GetPost.user)

                
         # Serialize comments separately
        comment_serializer = CommentSerializer(comments, many=True)
        serialized_data = serializer.data
        serialized_data['comments'] = comment_serializer.data


        response_data = {
            'post': serialized_data,
            'user_ID': GetPost.user.user.id,
            'profile_pic': str(GetPost.user.profile_picture.url) if GetPost.user.profile_picture else None,
            
        }

        

        return Response(response_data)
    except ImagePost.DoesNotExist as e:
        return Response(str(e), status=404)

@csrf_exempt
def CreateNewPost(request):
    data = json.loads(request.body)

    postDataTitle =  data['user_title']
    postDataDesc = data['user_description']
    postUserAuth = data['user_auth']
    postDataImage = data['user_file']
    print(data)    

        
    if postDataTitle and postDataDesc:
        try:
            format, imgstr = postDataImage.split(';base64,') 
            ext = format.split('/')[-1] 
            data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)
            #profile_response = GetProfilePageDetail(request, "Joshua")
            #profile_data = profile_response.data

            profile_response = ProfilePage.objects.filter(user__username__startswith=postUserAuth).first()
            
            #Create New Profile Page
            newPost = ImagePost(title=postDataTitle, description=postDataDesc, image_picture=data, user=profile_response)
            newPost.save()
            
            return JsonResponse({'message': 'Image post created successfully!'})
        except Exception as e:
            return JsonResponse({'error': str(e)})

    return JsonResponse({'error': 'Invalid request method. Use POST to create an image post.', 'code': postDataTitle})


# COMMENT VIEWS
@csrf_exempt
def CreateComment(request):
    data = json.loads(request.body)
    

    if data is not None:
        comment = data['comment']
        user = data['user']
        post = data['post_ID']

        # Get the user instance
        try:
            filtered_User = User.objects.get(id=user)
            filtered_UserName = ProfilePage.objects.get(user=filtered_User)
            print(filtered_UserName.displayName)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=400)
        
         # Get the specific post
        try:
            specific_post = ImagePost.objects.get(id=post)
        except Comment.DoesNotExist:
            return JsonResponse({'error': 'Post not found'}, status=400)

        newComment = Comment(text=comment, user=filtered_User, profileName=filtered_UserName.displayName, post=specific_post)
        newComment.save()
        return JsonResponse({'message': 'Comment post created successfully!', 'username': filtered_UserName.displayName})

    return JsonResponse({'error': 'Invalid request method. Use POST to create an comment.'})

# UPDATE PROFILE
@csrf_exempt
def EditProfile(request):
    data = json.loads(request.body)
    if data is not None:
        postDataName =  data['name']
        postDataDesc = data['desc']
        postUserCont = data['cont']
        postFileImage = data['picFile']
        userID = data['id']

        filtered_User = User.objects.get(id=userID)

    if filtered_User is not None: 
        #Retrieve object to be updated
        try:
            filtered_Profile = ProfilePage.objects.get(user=filtered_User)
        except filtered_User.DoesNotExist:
            return JsonResponse({'error': 'User not found'})
        
        if postDataName is not None:
            filtered_Profile.displayName = postDataName

        if postDataDesc is not None:
            filtered_Profile.bio = postDataDesc

        if postFileImage is not None:
            format, imgstr = postFileImage.split(';base64,') 
            ext = format.split('/')[-1] 
            data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)
            filtered_Profile.profile_picture = data
            



        filtered_Profile.save()    
    else:
        return JsonResponse({'error': 'User not found'})



    return JsonResponse({'error': 'Invalid '})

   




