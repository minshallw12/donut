from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

# Create your views here.

def send_the_index(request):
    the_index = open('static/index.html')
    return HttpResponse(the_index)


