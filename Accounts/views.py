from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout
from .forms import SignUpForm, ProfileForm
from django.http import HttpResponse


# Create your views here.
def signup(request):
    if request.method == 'POST':
        # SignUpForm includes fields reflecting Django's standard User model.
        form = SignUpForm(request.POST)

        # ProfileForm includes fields in the extended user model.
        profile_form = ProfileForm(request.POST)

        if form.is_valid() and profile_form.is_valid():
            # return user from form.save()
            user = form.save()

            # create a new profile from profile_form.save(), but don't commit profile to the database.
            profile = profile_form.save(commit=False)

            # set the user field of the profile equal to the User, using the one-to-one field established in the
            # Profile model. Then save.
            profile.user = user
            profile.save()

            # redirect user to login page.
            return redirect('/accounts/login')

    # if request is not equal to POST, create forms, then render sign up page.
    else:
        # Create forms.
        form = SignUpForm
        profile_form = ProfileForm

    return render(request, 'accounts/signup.html', {'form': form, 'profile_form': profile_form})


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            # log User in
            user = form.get_user()
            login(request, user)
            print("Should be logged in.")
            return redirect('/accounts/login')

    # if request is not equal to POST, create login form then render login page.
    else:
        form = AuthenticationForm()

    return render(request, 'accounts/login.html', {'form': form})


def logout_view(request):
    if request.method == "POST":
        logout(request)
        # return HttpResponse("Logged out bro!")
        return redirect('/accounts/login')
