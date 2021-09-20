from . import views
from CezSite import settings
from django.conf.urls.static import static
from django.urls import path, include 
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns  

urlpatterns = [
    path('', views.index, name = 'index'),
] 

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)