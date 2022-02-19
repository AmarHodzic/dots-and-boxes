from django.db import models

# Create your models here.
class Potez(models.Model):
    kol = models.IntegerField()
    red = models.IntegerField()
    player = models.CharField(max_length=100)
    id_partije = models.UUIDField(max_length=100, unique=True, primary_key=True)  