from rest_framework.serializers import ModelSerializer # Different types of serializers exist. We are using model serailizer
from .models import ProfilePage, ImagePost, Comment
from django.contrib.auth.models import User
from rest_framework import serializers

from drf_extra_fields.fields import Base64ImageField


# For parsing data from our database
""" 
Serializers allow complex data such as querysets and model instances to be converted to native Python datatypes that can then be easily rendered into JSON, XML or other content types.
Serializers also provide deserialization, allowing parsed data to be converted back into complex types, after first validating the incoming data.

"""


# PROFILE VALUES 
class ProfileSerializer(ModelSerializer):
    class Meta:
        model = ProfilePage
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'        


class GetUserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')



# USER POST VALUES
class GetPostValuesSerializer(serializers.ModelSerializer):
    user = serializers.CharField()
    image_picture = serializers.ImageField()
    class Meta:
        model =  ImagePost
        fields =('user' , 'image_picture' , 'title', 'id')
  
    @property
    def get_image_url(self) -> str:
        if self.image_pictur and hasattr(self.image_file, 'url'):
            return f"http://127.0.0.1:8000{self.image_picture.url}"

class GetAllPostValues(serializers.ModelSerializer):
    user = serializers.CharField()
    class Meta:
        model = ImagePost
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    image_picture = Base64ImageField()

    class Meta:
        model= ImagePost
        fields= ('title','image_picture','description')

    

# Comment Values
class CommentSerializer(serializers.ModelSerializer):
    user = serializers.CharField()
    class Meta: 
        model = Comment
        fields = '__all__'


# fields = '__all__' shows all values in our notes class
# Alternatively fields = ['body', 'updated'] shows only specific values associated with body and updated


# For now we are only using one serializer, we can create a separate file eventually to contain all our serializers