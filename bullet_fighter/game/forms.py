from django import forms
from .models import Score

class Background(forms.Form):
    theme =  forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}))


class ReadOnlyModelForm(forms.ModelForm):
    class Meta:
        model=Score
        fields = (
            'user',
            'level'
        )
    def __init__(self, *args, **kwargs):
        super(ReadOnlyModelForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].disabled = True