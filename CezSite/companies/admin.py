from django.contrib import admin

from django.contrib import admin

from .models import Companies, Policy, PolicyUploads

class PolicyStackedInline(admin.StackedInline):
    model = Policy

class PolicyUploadsStackedInline(admin.StackedInline):
    model = PolicyUploads

class CompaniesAdmin(admin.ModelAdmin):
    model = Companies
    fields = ['company_text', 'description', 'image', 'position', 'is_active', 'slug']
    list_display = ['company_text', 'position']
    search_fields = ['company_text']
    inlines = [PolicyStackedInline]



class PolicyAdmin(admin.ModelAdmin):
    model = Policy
    fields = ['company', 'policy_title','policy_richtext', 'is_active']
    list_display = ['policy_title', 'company']
    list_filter = ['company']
    search_fields =['policy_title']
    inlines = [PolicyUploadsStackedInline]

class PolicyUploadAdmin(admin.ModelAdmin):
    model = PolicyAdmin
    fields = ['policy', 'upload_name', 'upload_content']
    list_diplay = ['upload_name', 'policy']
    list_filter = ['policy']


admin.site.register(Companies, CompaniesAdmin)
admin.site.register(Policy, PolicyAdmin)
admin.site.register(PolicyUploads, PolicyUploadAdmin)