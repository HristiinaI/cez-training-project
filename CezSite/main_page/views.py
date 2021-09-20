from django.shortcuts import render

from .models import Banner 
from .models import Аccent

# from django.template import loader
from django.http import HttpResponse

def index(request):
    banners = Banner.objects.all()
    accents = Аccent.objects.all()

    context = {
        'accents': accents,
        'banners': banners,
    }
    # for accent in accents:
    #     print(accent.title)

    # return render(request, 'pages/index.html', context)
