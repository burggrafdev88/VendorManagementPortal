from django.http import JsonResponse

from .forms import ScheduleScreeningForm
from django.shortcuts import render, redirect, HttpResponse
from Vendors.models import Vendor
from Events.models import Event
from django.views import View


# Create your views here.
def schedule_screening(request, vendorID):
    vendor = Vendor.objects.get(pk=vendorID)

    if request.method == 'POST':
        form = ScheduleScreeningForm(request.POST)

        if form.is_valid():
            form.save()
            vendor.form_status_id = 2  # change status of vendor form to 2
            vendor.save()
            return redirect('/vendors/my_vendors')

    else:
        # create the form.
        form_class = ScheduleScreeningForm
        form = form_class(initial={'vendor': vendorID})

    return render(request, 'events/schedule_screening.html', {'form': form, 'vendor': vendor})


# Schedule screening through AJAX.
class schedule_screening_ajax(View):
    def get(self, request):
        print('Add screening via AJAX called.')

        # retrieve vendor information from ajax call
        vendor_id = request.GET.get('vendor', None)
        day = request.GET.get('day', None)
        start_time = request.GET.get('start_time', None)
        end_time = request.GET.get('end_time', None)
        notes = request.GET.get('notes', None)
        vendor = Vendor.objects.get(pk=vendor_id)

        # create event object
        event_object = Event.objects.create(
            vendor=vendor,
            day=day,
            start_time=start_time,
            end_time=end_time,
            notes=notes,
        )

        if event_object:
            status = 'true'
            vendor_object = Vendor.objects.get(id=vendor_id)
            vendor_object.form_status_id = 2
            vendor_object.save()

        else:
            status = 'false'

        return HttpResponse(status)


# retrieve schedule screening information via AJAX
class retrieveScreeningInfoAJAX(View):
    print('Retrieve screening information called.')

    def get(self, request):
        vendor_ID = request.GET.get('id', None)
        event_object = Event.objects.get(vendor_id=1)  #must remove hard coded '1' for vendor ID
        # event_object_day = event_object.day
        event_object_start_time = event_object.start_time
        # event_object_end_time = event_object.end_time

        event = {'day': event_object.day, 'start_time': event_object_start_time, 'end_time': event_object.end_time,
                 'notes': event_object.notes
        }

        data = {
            'event': event,
        }

        return JsonResponse(data)
