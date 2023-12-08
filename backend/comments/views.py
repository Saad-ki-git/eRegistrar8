# views.py
from shared.models import SharedDocument
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Comment, SharedDocument
from .serializers import CommentSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_comment(request):
    user = request.user

    try:
        document_data = request.data['shared_document'][0]
        document_title = document_data['title']
        comment_text = request.data['text']

        # Retrieve all SharedDocument instances with the specified title
        shared_documents = SharedDocument.objects.filter(document__title=document_title)

        if not shared_documents.exists():
            return Response({'error': 'SharedDocument not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Choose one of the instances, you may want to implement specific logic here
        shared_document = shared_documents.first()

        comment = Comment.objects.create(user=user, shared_document=shared_document, text=comment_text)

        serializer = CommentSerializer(comment)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

