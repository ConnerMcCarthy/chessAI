from django.db import models

# Create your models here.

class MoveList(models.Model):
    moves = models.CharField(max_length=100)