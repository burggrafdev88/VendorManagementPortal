from .forms import ScheduleScreeningForm
from django.shortcuts import render, redirect
from Events.models import Event


# Create your views here.
def schedule_screening(request):
    form = ScheduleScreeningForm
    return render(request, 'events/schedule_screening.html', {'form': form})
