from rest_framework import serializers
from .models import MoveList

class MoveListSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoveList
        fields = ('id', 'text')