from rest_framework.serializers import ModelSerializer # Different types of serializers exist. We are using model serailizer
from .models import Users
# For parsing data from our database
""" 
Serializers allow complex data such as querysets and model instances to be converted to native Python datatypes that can then be easily rendered into JSON, XML or other content types.
Serializers also provide deserialization, allowing parsed data to be converted back into complex types, after first validating the incoming data.

"""


class UserSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__' 

# fields = '__all__' shows all values in our notes class
# Alternatively fields = ['body', 'updated'] shows only specific values associated with body and updated


# For now we are only using one serializer, we can create a separate file eventually to contain all our serializers