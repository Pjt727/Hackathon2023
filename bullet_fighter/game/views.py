from django.http import HttpRequest, HttpResponse
from django.shortcuts import render, redirect
from .forms import Background, SubmitScore
from image_generator import imageGen
from django.templatetags.static import static

def play(request: HttpRequest, level: int, id:int) -> HttpRequest:
    background = static("game_assets/DefBackground.png")
    if request.method == "POST":

        themeForm=Background(request.POST)
        if themeForm.is_valid():
            theme = themeForm.cleaned_data['theme']
            background = imageGen.callImageGenerator(theme)
    
    themeForm = Background()
    submitForm = SubmitScore()
    return render(request, "play.html", context={'level': level, 'id': id, 'themeForm': themeForm, 'background': background, 'submitForm': submitForm})

def receiveScore(request:HttpRequest):

    return {}
