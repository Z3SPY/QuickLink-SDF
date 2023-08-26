from django.db import models

# Create your models here.
# Where we desing our Database


#Notes Class
#We are creating a new notes class
class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]