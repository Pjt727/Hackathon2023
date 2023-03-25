from django.contrib.auth.models import User
from django.db import models

class Level(models.Model):
    url = models.CharField()


class Score(models.Model):
    user =  models.OneToOneField(User, on_delete=models.CASCADE, related_name='scores')
    level = models.ForeignKey(Level, related_name="scores")