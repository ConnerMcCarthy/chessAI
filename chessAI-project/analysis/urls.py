from django.urls import path, include
from . import views

urlpatterns = [
    path('get_analysis/', views.get_analysis, name='get_analysis'),
]

