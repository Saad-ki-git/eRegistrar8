from django.db import models
from django.utils import timezone
from accounts.models import User
from signature.models import Signature

class Document(models.Model):
    docId = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255,default='')
    content = models.TextField(default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    signature = models.ForeignKey(Signature, on_delete=models.CASCADE, null=True, blank=True) #many doc can have one sign

    def __str__(self):
        return str(self.docId)
