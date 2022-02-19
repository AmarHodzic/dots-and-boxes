from rest_framework import serializers
from dotsandboxesai.models import Potez


class PotezSerializer(serializers.ModelSerializer):
    class Meta:
        model = Potez
        fields = '__all__'