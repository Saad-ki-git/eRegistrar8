from rest_framework import serializers
from .models import Document
from accounts.models import User
from signature.models import Signature

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('docId', 'title' ,'content', 'created_at','updated_at')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email')

class SignatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signature
        fields = ('id','signature')