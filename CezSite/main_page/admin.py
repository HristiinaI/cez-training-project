from django.contrib import admin
from .models import Banner
from .models import Аccent

class BannerAdmin(admin.ModelAdmin):
    fields = ['title', 'image']
    list_display = ['title']
    search_fields = ['title']

class AccentAdmin(admin.ModelAdmin):
    fields = ['title','icon','discription', 'link']
    list_display = ['title']
    search_fields = ['title']

admin.site.register(Banner, BannerAdmin)
admin.site.register(Аccent, AccentAdmin)