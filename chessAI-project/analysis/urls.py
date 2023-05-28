from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MoveListView
from .views import request_opening

router = DefaultRouter()
router.register(r'moves', MoveListView, basename='moves')

urlpatterns = [
    path('request_opening/', request_opening, name='request_opening')
]

