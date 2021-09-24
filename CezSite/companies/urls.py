from django.urls import path

from . import views

urlpatterns = [
    path('', views.company, name='company'),
     path('<int:company_id>/', views.detail, name='detail')

]