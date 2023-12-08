from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import SharedDocument
from .serializers import SharedDocumentSerializer
from accounts.models import User  # Assuming your custom user model is in accounts.models
from documents.models import Document
from signature.models import Signature
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics, serializers
from rest_framework.response import Response
from rest_framework import status
from .models import SharedDocument

class ShareDocumentView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = SharedDocument.objects.all().order_by('-created_at')
    serializer_class = SharedDocumentSerializer

    def post(self, request, *args, **kwargs):
        previous_shared_document_id = request.data.get('previous_shared_document_id')
        signatures_data = request.data.get('signatures_data', [])

        document_id = request.data.get('document')
        document_exists = Document.objects.filter(docId=document_id).exists()

        if document_exists:
            # Document has been shared before, use existing document
            serializer = SharedDocumentSerializer(
                data=request.data,
                context={
                    'previous_shared_document_id': previous_shared_document_id,
                    'signatures_data': signatures_data,
                }
            )
        else:
            # Document is being shared for the first time, create a new document
            serializer = SharedDocumentSerializer(
                data={
                    'document': {
                        'docId': document_id,
                        'title': request.data.get('title', ''),
                        'content': request.data.get('content', ''),
                        'user': request.user.id,
                    },
                    'sender_id': request.data.get('sender_id'),
                    'recipient_id': request.data.get('recipient_id'),
                },
                context={
                    'previous_shared_document_id': previous_shared_document_id,
                    'signatures_data': signatures_data,
                }
            )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request, *args, **kwargs):
        logged_in_user_email = request.user.email
        shared_documents = SharedDocument.objects.filter(recipient_id__email=logged_in_user_email)
        serializer = SharedDocumentSerializer(shared_documents, many=True)

        for data in serializer.data:
            sender_id = data['sender_id']
            recipient_id = data['recipient_id']

            sender_user = get_object_or_404(User, id=sender_id)
            recipient_user = get_object_or_404(User, id=recipient_id)

            data['sender_id'] = sender_user.email
            data['recipient_id'] = recipient_user.email

            document_id = data['document']
            document = get_object_or_404(Document, docId=document_id)
            
            data['document'] = {
                'title': document.title,
                'content': document.content,
                'docId': document.docId,
                # Add other fields as needed
            }

        return Response(serializer.data)
