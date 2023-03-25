from django.http import HttpRequest, HttpResponse
from django.shortcuts import render, redirect
from .forms import Background
from image_generator import imageGen

def play(request: HttpRequest, level: int, id:int):
    
    if request.method == "POST":

        themeForm=Background(request.POST)
        if themeForm.is_valid():
            theme = themeForm.cleaned_data['theme']
            background = imageGen.callImageGenerator(theme)
    
    themeForm = Background()

    return render(request, "play.html", context={'level': level, 'id': id, 'themeForm': themeForm, 'background': background})
