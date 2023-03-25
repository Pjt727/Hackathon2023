from django.contrib.auth import authenticate
from django.contrib.auth import login as login_user
from django.contrib.auth import logout as logout_user
from django.contrib import messages
from django.shortcuts import render, redirect
from django.http import HttpRequest, HttpResponse, JsonResponse, Http404
from .forms import RegisterUserForm, LoginUserForm
from django.contrib.auth.models import User



def register(request: HttpRequest) -> HttpResponse:
    if request.method == 'POST':
        # check if can make valid user
        form  = RegisterUserForm(request.POST)
        if form.is_valid():

            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            login_user(request=request, user=user)
            messages.success(request, ("Registration Successful"))
            return redirect('index')
    form = RegisterUserForm()
    return render(request, 'register.html', context={'form': form})

def login(request: HttpRequest) -> HttpResponse:
    if request.method == 'POST':
        form = LoginUserForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login_user(request, user)
                messages.success(request=request, message=("Login Successful"))
                return redirect('index')
            messages.error(request=request, message=("Login not successful"))
            
    form = LoginUserForm()
    return render(request, 'login.html', context={'form': form})
     
def logout(request: HttpRequest) -> HttpResponse:
    logout_user(request)
    return redirect('index')


