from django.contrib import admin
from .models import Profile

# Register your models here.

# Register profile class with admin site.
admin.site.register(Profile)
