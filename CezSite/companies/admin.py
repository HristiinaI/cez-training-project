from django.contrib import admin

from django.contrib import admin

from .models import Companies
from .models import Policy

class CompaniesAdmin(admin.ModelAdmin):
    fields = ['company_text', 'description', 'image', 'position', 'is_active', 'slug']
    list_display = ['company_text', 'position']
    search_fields = ['company_text']
class PolicyAdmin(admin.ModelAdmin):
    fields = ['company', 'policy_title','policy_richtext','upload', 'is_active']
    list_display = ['policy_title', 'company']
    list_filter = ['company']
    search_fields =['policy_title']

admin.site.register(Companies, CompaniesAdmin)
admin.site.register(Policy, PolicyAdmin)