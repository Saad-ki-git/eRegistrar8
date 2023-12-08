from rest_framework import generics
from .models import Document
from .serializers import DocumentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from accounts.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Document
from .serializers import DocumentSerializer,SignatureSerializer

class TextCreateView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def perform_create(self, serializer):
        # Set the user ID from the request data
        user_id = self.request.data.get('user')  # Assuming 'user' key contains the user ID in the request data
        serializer.save(user_id=user_id)  # Associate the user ID with the Document object


from rest_framework import generics
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import UserSerializer

class UserSearchAPIView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['email']  
    search_fields = ['email']
