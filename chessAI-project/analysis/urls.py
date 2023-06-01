from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

urlpatterns = [
    path('get_analysis/', views.get_analysis, name='get_analysis'),
]