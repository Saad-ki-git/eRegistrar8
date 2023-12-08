from rest_framework.views import APIView
from rest_framework.response import Response   
from rest_framework import status
from .models import Signature
from accounts.models import User
from .serializers import SignatureSerializer
from rest_framework.permissions import AllowAny
import base64
from django.core.files.base import ContentFile
from django.contrib.auth import authenticate
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

class SignatureView(APIView):
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def post(self, request, format=None):
        email = request.data.get('email')
        user = User.objects.get(email=email)

        existing_signature = Signature.objects.filter(user=user).first()

        signature_data = request.data.get('signature')
        format, imgstr = signature_data.split(';base64,')
        ext = format.split('/')[-1]
        signature_data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)

        if existing_signature:
            existing_signature.signature = signature_data
            existing_signature.save()
        else:
            signature = Signature(user=user, signature=signature_data)
            signature.save()

        return Response({'msg': 'Signature Uploaded Successfully'}, status=status.HTTP_201_CREATED)

    