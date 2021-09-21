from django.contrib import admin

from django.contrib import admin

from .models import Companies
from .models import Policy

class PolicyStackedInline(admin.StackedInline):
    model = Policy

class CompaniesAdmin(admin.ModelAdmin):
    model = Companies
    fields = ['company_text', 'description', 'image','policies', 'position', 'is_active', 'slug']
    list_display = ['company_text', 'position']
    search_fields = ['company_text']
    inlines = [PolicyStackedInline]



class PolicyAdmin(admin.ModelAdmin):
    model = Policy
    fields = ['company', 'policy_title','policy_richtext','upload', 'is_active']
    list_display = ['policy_title', 'company']
    list_filter = ['company']
    search_fields =['policy_title']

admin.site.register(Companies, CompaniesAdmin)
admin.site.register(Policy, PolicyAdmin)