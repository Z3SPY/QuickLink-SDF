from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import json
from django.contrib.postgres.fields import JSONField

# Create your models here.
# Where we desing our Database


#Notes Class
#We are creating a new notes class





"""

#Updates Users model when updating Django User
@receiver(post_save, sender=User) 
def create_user_profile(sender, instance, created, **kwargs):
        if created:
                Users.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
"""



class ProfilePage(models.Model):
    user = models.OneToOneField(
        User, 
        on_delete = models.CASCADE,
        primary_key = True,
    )
    bio = models.TextField(null=True, blank=True)
    profile_picture = models.ImageField(null=True, blank=True)
    exp_container = models.JSONField(null=True, blank=True)

    # Deserialize JSON data into Python objects when retrieving
    def get_objects(self):
        if self.exp_container:
                return json.loads(self.exp_container)
        else:
             return []

    # Serialize Python objects into JSON before storing
    def set_objects(self, value):
        self.my_objects = json.dumps(value)

    def __str__(self):
        return self.bio[:50] # pylint: disable=unsubscriptable-object

