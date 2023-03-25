from django.http import HttpRequest, HttpResponse
from django.shortcuts import render, redirect


def play(request: HttpRequest, level: int, id:int):
    return render(request, "play.html", context={'level': level, 'id': id})
