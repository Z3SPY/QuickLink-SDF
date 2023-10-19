from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import json
from django.contrib.postgres.fields import JSONField
import django.contrib.postgres.fields


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
    displayName = models.TextField(null=True, blank=True)
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
    
    


class ImagePost(models.Model):
    # Title of the image post
    title = models.CharField(max_length=200)
    
    # Description or caption for the image
    description = models.TextField(null=True, blank=True)
    
    # Image file field for the post
    #image = models.ImageField(upload_to='image_posts/')
    image_picture = models.ImageField(null=True, blank=True)
    
    # Date and time of the post creation
    created_at = models.DateTimeField(auto_now_add=True)
    
    # User who posted the image
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    tags = models.JSONField(null=True, blank=True)

    # Comments related to the image post
    comments = models.ManyToManyField(User, through='Comment', related_name='commented_posts')

    def __str__(self):
        return self.title
    


class Comment(models.Model):
    # Comment text
    text = models.TextField(null=True, blank=True)
    
    # Date and time of the comment
    created_at = models.DateTimeField(auto_now_add=True)
    
    # User who posted the comment
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    # Image post associated with the comment
    post = models.ForeignKey(ImagePost, on_delete=models.CASCADE)

    def __str__(self):
        return f'Comment by {self.user.username} on {self.post.title}'





