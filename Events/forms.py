from django import forms
from .models import Event


class ScheduleScreeningForm(forms.ModelForm):
    day = forms.DateField
    start_time = forms.TimeField
    end_time = forms.TimeField
    notes = forms.Textarea

    class Meta:
        model = Event
        fields = ["day", "start_time", "end_time", "notes"]
        widgets = {'day': forms.DateInput(attrs={'class': 'datepicker'}),
                   'start_time': forms.TimeInput(attrs={'class': 'timepicker'}),
                   'end_time': forms.TimeInput(attrs={'class': 'timepicker'})}
