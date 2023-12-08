from rest_framework import serializers
from .models import Signature
from accounts.models import User

class SignatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signature
        fields = ('id', 'user', 'signature', 'created_at', 'updated_at')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name')