from django.db import models
from accounts.models import User

class Signature(models.Model):
    user = models.ForeignKey(User, related_name='signed_documents', blank=True, null=True, on_delete=models.CASCADE)
    signature = models.ImageField(upload_to='signatures/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email