from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Account(models.Model):
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    signUpDate = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.firstName


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    phone = models.CharField(max_length=10, blank=False)

    def __str__(self):
        return self.user.username