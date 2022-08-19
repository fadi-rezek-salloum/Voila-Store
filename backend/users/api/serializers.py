from rest_framework import serializers

from users.models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['firstname', 'lastname', 'email', 'mobile', 'password', 'is_staff']
        extra_kwargs = {
            'password': {'write_only': True}
        }