from django.shortcuts import render

from django.http import HttpResponse

from .models import Companies, Policy

from django.template import loader
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render


def company(request):
   companies = Companies.objects.all()

   context = {'companies' : companies}
   
   # work only when the slug is written in English 
   # for company in companies:
   #    print("slug: ", company.slug)

   return render(request, 'pages/companies.html', context)

def detail(request, company_id):
   company = Companies.objects.get(pk=company_id)
   print(company, "zdrrrr")
   print(company_id, "compabyID:")
   
   for policy in company.policies():
      print(policy.policy_title)

   return render(request, 'pages/companies-details.html', {'company' : company})
