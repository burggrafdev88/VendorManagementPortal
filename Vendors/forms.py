from django import forms
from .models import Vendor


class VendorInformationForm(forms.ModelForm):
    f_name = forms.CharField(max_length=50, label='First Name')
    l_name = forms.CharField(max_length=50, label='Last Name')
    company = forms.CharField(max_length=100)
    physical_access = forms.BooleanField(label="Physical Access Required?", help_text="Check this box if physical "
                                                                                      "access is required to "
                                                                                      "non-public areas of the Bank.",
                                         required=False)
    logical_access = forms.BooleanField(label="Logical Access Required?", help_text="Check this box if logical "
                                                                                    "access is required to FRS "
                                                                                    "information.", required=False)

    length_of_service = forms.IntegerField(min_value=0, help_text="Enter anticipated length of service in months.")
    work_description = forms.CharField(max_length=500, help_text="Enter a brief description of the work the vendor "
                                                                 "will be performing.")

    class Meta:
        model = Vendor
        fields = ["f_name", "l_name", "company", "physical_access", "logical_access", "length_of_service",
                  "work_description"]
