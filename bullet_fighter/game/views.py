import json
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from .forms import Background, Score
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
    return render(request, "play.html", context={'level': level, 'id': id, 'themeForm': themeForm, 'background': background})

def receiveScore(request:HttpRequest):
    if request.method == "POST":
        data = json.loads(request.body)
        score = data.get("score")
        levelId = data.get("levelId")
        bestScore = Score.objects.filter(user=request.user, level=levelId).first()
        if(bestScore):
            if(bestScore.score < score):
                bestScore.score = score
                bestScore.save()
        else:
            newScore: Score = Score(score=score, user=request.user, level=levelId)
            newScore.save()

    return JsonResponse({"status": "success"})
