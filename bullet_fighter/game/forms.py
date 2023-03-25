from django import forms
from .models import Score

class Background(forms.Form):
    theme =  forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}))

