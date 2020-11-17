from .forms import ScheduleScreeningForm
from django.shortcuts import render, redirect


# Create your views here.
def schedule_screening(request):
    if request.method == 'POST':
        form = ScheduleScreeningForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('/vendors/my_vendors')

    else:
        # create the form.
        form = ScheduleScreeningForm

    return render(request, 'events/schedule_screening.html', {'form': form})


