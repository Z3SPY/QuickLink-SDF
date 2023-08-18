from django.shortcuts import render
from django.http import JsonResponse


# Create your views here.
# All routes I want to pass into my application

def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of Notes'
        }

    ]

    return JsonResponse(routes, safe=False)