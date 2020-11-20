from .forms import ScheduleScreeningForm
from django.shortcuts import render, redirect, HttpResponse
from Vendors.models import Vendor


# Create your views here.
def schedule_screening(request, vendorID):
    vendor = Vendor.objects.get(pk=vendorID)

    if request.method == 'POST':
        form = ScheduleScreeningForm(request.POST)

        if form.is_valid():
            form.save()
            vendor.form_status_id = 2   # change status of vendor form to 2
            vendor.save()
            return redirect('/vendors/my_vendors')

    else:
        # create the form.
        form_class = ScheduleScreeningForm
        form = form_class(initial={'vendor': vendorID})

    return render(request, 'events/schedule_screening.html', {'form': form, 'vendor': vendor})

