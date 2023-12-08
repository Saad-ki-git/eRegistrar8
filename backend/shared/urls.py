from django.urls import path
from . import views
 
urlpatterns = [
    path('shared-documents/',views.ShareDocumentView.as_view()),
]