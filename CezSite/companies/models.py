from django.db import models

# from djrichtextfield.models import RichTextField
from ckeditor.fields import RichTextField
from django.utils.text import slugify

 
class Companies(models.Model):
    company_text = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    image = models.ImageField(upload_to='media', blank=True)
    # policies = models.ManyToOneField('Policy', default=None, on_delete=models.CASCADE, blank=True, null=True)
    position = models.IntegerField()
    is_active = models.BooleanField(default=True)
    slug = models.SlugField(max_length=40, blank=True)

    def __str__(self):
        return self.company_text

    def policies(self):
        return Policy.objects.filter(company=self)

    def save(self, *args, **kwargs):
        value = self.company_text
        self.slug = slugify(value, allow_unicode=True)
        super().save(*args, **kwargs)

class Policy(models.Model):
    company = models.ForeignKey(Companies, related_name ='policy',related_query_name = 'policy', on_delete=models.CASCADE)
    policy_title = models.CharField(max_length=200)
    policy_richtext = RichTextField()
    # file will be uploaded to MEDIA_ROOT/uploads
    uploads = models.ManyToManyField('PolicyUploads', related_name='uploads', default=None, blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def policy_uploads(self):
        return PolicyUploads.objects.filter(policy=self)

    def __str__(self):   
        return self.policy_title

class PolicyUploads(models.Model):
    policy = models.ForeignKey(Policy, related_name='policy', on_delete=models.CASCADE)
    upload_name = models.CharField(max_length=200)
    upload_content = models.FileField(upload_to='uploads/')

    def __str__(self):   
        return self.upload_name

