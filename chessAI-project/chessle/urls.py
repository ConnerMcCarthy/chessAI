from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MoveListView

router = DefaultRouter()
router.register(r'moveList', MoveListView, basename='moveList')
urlpatterns = router.urls