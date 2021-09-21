from django.shortcuts import render

from django.http import HttpResponse

from .models import Companies

from django.template import loader
from django.http import HttpResponse
from django.shortcuts import render


def company(request):
   companies = Companies.objects.all()

   context = {'companies' : companies}


   for company in companies: 
      if company.is_active:
         print(company.company_text)

   return render(request, 'pages/companies.html', context)
