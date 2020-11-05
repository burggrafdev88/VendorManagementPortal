from django.db import models
from django.contrib.auth.models import User


# Extend user by adding a profile.
class Profile(models.Model):
    # Profile will have a one to one relationship with the user. On User delete, cascade.
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Fields that will be in each User's profile.
    department = models.CharField(max_length=50, blank=False)

    def __str__(self):
        return self.user.username
