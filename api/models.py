from django.db import models

# Create your models here.
# Where we desing our Database


#Notes Class
#We are creating a new notes class


class Users(models.Model):
    name =  models.TextField(null=True, blank=True)
    email = models.TextField(null=True, blank=True)
    password =  models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.name[:50] # pylint: disable=unsubscriptable-object
