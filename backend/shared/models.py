from django.db import models
from accounts.models import User
from signature.models import Signature
from documents.models import Document  


class SharedDocument(models.Model):
    sender_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_documents')
    recipient_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_documents')
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    signatures = models.ManyToManyField(Signature, related_name='shared_documents', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    previous_shared_document = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Shared Document - {self.document.title}"
