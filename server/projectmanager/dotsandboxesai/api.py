from dotsandboxesai.models import Potez
from rest_framework import viewsets, permissions
from .serializers import PotezSerializer

class PotezViewSet(viewsets.ModelViewSet):
    queryset = Potez.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PotezSerializer