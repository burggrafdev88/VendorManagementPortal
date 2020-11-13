from django.contrib import admin
from .models import Event


# Register event class with admin site.
admin.site.register(Event)
