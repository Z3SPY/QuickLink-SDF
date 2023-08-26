from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view 

#For DB Values
from .models import Note
from .serializers import NoteSerializer

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

# Querying the database and rending the values out
@api_view(['GET'])
def getNotes(request):
    #Serializing all values from our notes object, we are getting notes from notes class
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True) #We are passing notes var, many = true means we are serializing multiple objects
    return Response(serializer.data)



#Gets a single Note
#pk = primary key, the id of the specific note we want to get
@api_view(['GET']) 
def getNote(request, pk):
    #Serializing all values from our notes object, we are getting notes from notes class
    notes = Note.objects.get(id=pk)
    serializer = NoteSerializer(notes, many=False) #We are passing notes var, many = true means we are serializing multiple objects
    return Response(serializer.data)