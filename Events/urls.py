"""VendorManagementPortal URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views

# URL path calls the views
urlpatterns = [
    path('schedule_screening/<int:vendorID>', views.schedule_screening, name="schedule_screening"),
    path('schedule_screening_ajax', views.schedule_screening_ajax.as_view(), name="schedule_screening_ajax"),
    path('retrieve_screening_info_ajax', views.retrieveScreeningInfoAJAX.as_view(), name='retrieve_screening_info_ajax'),
]