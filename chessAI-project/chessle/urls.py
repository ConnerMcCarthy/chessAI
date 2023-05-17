from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MoveListView

router = DefaultRouter()
router.register(r'moves', MoveListView, basename='moves')
urlpatterns = router.urls