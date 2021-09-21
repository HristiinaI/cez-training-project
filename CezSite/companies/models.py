from django.db import models

# from djrichtextfield.models import RichTextField
from ckeditor.fields import RichTextField


 
class Companies(models.Model):
    company_text = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    image = models.ImageField(upload_to='media', blank=True)
    position = models.IntegerField()
    is_active = models.BooleanField(default=True)
    slug = models.SlugField(max_length=40, blank=True)

    def __str__(self):
        return self.company_text

class Policy(models.Model):
    company = models.ForeignKey(Companies, on_delete=models.CASCADE)
    policy_title = models.CharField(max_length=200)
    policy_richtext = RichTextField()
    # file will be uploaded to MEDIA_ROOT/uploads
    upload = models.FileField(upload_to='uploads/')
    is_active = models.BooleanField(default=True)

    def __str__(self):   
        return self.policy_title