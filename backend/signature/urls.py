from django.urls import path
from . import views

urlpatterns = [ 
    path('signature/',views.SignatureView.as_view(),name='user-signature'),
]