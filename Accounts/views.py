from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
# from django.contrib.auth.forms import UserCreationForm
from .forms import SignUpForm, ProfileForm


# Create your views here.
def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        profile_form = ProfileForm(request.POST)

        if form.is_valid() and profile_form.is_valid():
            user = form.save()
            profile = profile_form.save(commit=False)

            profile.user = user
            profile.save()

            # form.save()

            # log user in
            return redirect('signup')

    else:
        form = SignUpForm
        profile_form = ProfileForm

    return render(request, 'accounts/signup.html', {'form': form, 'profile_form': profile_form})
