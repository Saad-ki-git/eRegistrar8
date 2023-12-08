from rest_framework import serializers
from django.contrib.auth import get_user_model
from accounts.models import User
from .models import SharedDocument, Document
from signature.models import Signature

class SharedDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharedDocument
        fields = ['sender_id', 'recipient_id', 'document', 'created_at']

    def create(self, validated_data):
        sender_id = validated_data.pop('sender_id')
        recipient_id = validated_data.pop('recipient_id')
        document_id = validated_data.pop('document')
        signatures_data = self.context.get('signatures_data', [])

        sender = User.objects.get(email=sender_id)
        recipient = User.objects.get(email=recipient_id)
        document_obj = Document.objects.get(docId=document_id.docId)

        sender_signature = Signature.objects.filter(user=sender).first()

        if not sender_signature:
            raise serializers.ValidationError("Sender's signature not found.")

        previous_shared_document_id = self.context.get('previous_shared_document_id')
        previous_shared_document = SharedDocument.objects.filter(id=previous_shared_document_id).first()

        # Check if the document has been shared before
        shared_document_exists = SharedDocument.objects.filter(document=document_obj).exists()

        if shared_document_exists:
            # Document has been shared before, update title and content
            document_obj.title = validated_data.get('title', document_obj.title)
            document_obj.content = validated_data.get('content', document_obj.content)
            document_obj.save()
        else:
            # Document is being shared for the first time, create a new document
            shared_document = SharedDocument.objects.create(
                sender_id=sender,
                recipient_id=recipient,
                document=document_obj,
                previous_shared_document=previous_shared_document,
                **validated_data
            )

            shared_document.signatures.set(signatures_data)
            shared_document.signatures.add(sender_signature)

        return shared_document