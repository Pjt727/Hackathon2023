from django import forms


class Background(forms.Form):
    theme =  forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}))
