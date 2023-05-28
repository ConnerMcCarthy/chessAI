from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MoveListSerializer
from .models import MoveList
from rest_framework.response import Response

from rest_framework.decorators import action

from django.http import JsonResponse

from .templatetags.opening import requestOpening

class MoveListView(viewsets.ModelViewSet):
    serializer_class = MoveListSerializer
    queryset = MoveList.objects.all()
     
    """ 
    @action(detail=True, methods='post', url_path='update-opening', url_name='update_opening')
    def update_opening(self, request, pk=None):
        moves = self.get_object()
        moves.update_opening(pk)
        moves.save()
        return Response({'status': 'opening updated'})
    """

# Gets a new opening based on the request
def request_opening(request):
    op_string = requestOpening(str(request.body))
    return JsonResponse({'opening':op_string})

