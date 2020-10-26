from django.http import HttpResponse
from django.shortcuts import render


def home(request):
    return HttpResponse('Home Page')


def add_vendor(request):
    # return HttpResponse('Add Vendor')
    return render(request, 'add_vendor.html')
