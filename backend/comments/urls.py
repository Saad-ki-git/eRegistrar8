
from django.contrib import admin
from django.urls import path,include,re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from .views import create_comment

urlpatterns = [
    path('comments/',create_comment,name="comment-list-create" ),
] 