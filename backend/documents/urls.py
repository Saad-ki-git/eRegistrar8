from django.urls import path
from .views import TextCreateView,UserSearchAPIView

urlpatterns = [
    path('document/', TextCreateView.as_view(), name='save-text'),
    path('search/', UserSearchAPIView.as_view(), name='user-search'),
]
