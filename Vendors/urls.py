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
    path('submit_vif', views.submit_vif, name="submit_vif"),
    path('my_vendors', views.my_vendors, name="my_vendors"),
    # path('add_vendor', views.add_vendor, name="add_vendor"),
    path('edit_vendor', views.EditVendor.as_view(), name="edit_vendor"),
    path('add_vendor_ajax', views.AddVendorAjax.as_view(), name="add_vendor_ajax"),
    path('delete_vendor', views.DeleteVendor.as_view(), name="delete_vendor_ajax")
]
