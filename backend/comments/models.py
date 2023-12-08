# comments/models.py
from django.db import models
from shared.models import SharedDocument
from accounts.models import User

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shared_document = models.ForeignKey(SharedDocument, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.email} on {self.shared_document.document.title}"
