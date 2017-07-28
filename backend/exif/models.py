from django.db import models
from .classes import JSONFieldBasic


class Image(models.Model):
    hash = models.CharField(max_length=200, unique=True)
    exif = JSONFieldBasic(blank=True, null=True)
    is_fetching = models.BooleanField(default=False)

    def __str__(self):
        return self.hash
