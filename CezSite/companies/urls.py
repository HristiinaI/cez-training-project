from django.urls import path

from . import views

urlpatterns = [
    path('', views.company, name='company'),
     path('<int:question_id>/', views.detail, name='detail')

]