from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MoveListSerializer
from .models import MoveList
class MoveListView(viewsets.ModelViewSet):
    serializer_class = MoveListSerializer
    queryset = MoveList.objects.all()

