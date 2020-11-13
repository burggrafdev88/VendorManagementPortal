from django.db import models
from django.core.exceptions import ValidationError


# Create your models here.
class Event(models.Model):
    day = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    notes = models.TextField(blank=True, null=True)

    # Model metadata is “anything that’s not a field”, such as ordering options (ordering), database table name (
    # db_table), or human-readable singular and plural names (verbose_name and verbose_name_plural). None are
    # required, and adding class Meta to a model is completely optional.
    # Read more here:  https://docs.djangoproject.com/en/3.1/topics/db/models/#meta-options
    class Meta:
        verbose_name = u'Scheduling'
        verbose_name_plural = u'Scheduling'

    def check_overlap(self, fixed_start, fixed_end, new_start, new_end):
        overlap = False
        if new_start == fixed_end or new_end == fixed_start:  # edge case
            overlap = False

        elif (fixed_start <= new_start <= fixed_end) or (fixed_start <= new_end <= fixed_end):  # inner limits
            overlap = True

        elif new_start <= fixed_start and new_end >= fixed_end:  # outer limits
            overlap = True

        return overlap

    def clean(self):
        if self.end_time <= self.start_time:
            raise ValidationError('Ending times must after starting times')

        events = Event.objects.filter(day=self.day)
        if events.exists():
            for event in events:
                if self.check_overlap(event.start_time, event.end_time, self.start_time, self.end_time):
                    raise ValidationError('There is an overlap with another event: ' + str(event.day) + ', ' + str(
                            event.start_time) + '-' + str(event.end_time))
