from django.contrib.auth.models import User
from django.db import models

class Level(models.Model):
    url = models.CharField(max_length=1000)


class Score(models.Model):
    score = models.IntegerField()

    user =  models.OneToOneField(User, on_delete=models.CASCADE, related_name='scores')
    level = models.ForeignKey(Level, on_delete=models.CASCADE, related_name="scores")
    
