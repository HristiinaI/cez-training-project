from django.db import models

class Banner(models.Model):
    title = models.CharField(max_length=200)
    # fix migrations for media
    image = models.ImageField(upload_to="image")


ICON_CHOICES = (
        ("person-icon","PERSON-ICON"),
        ("question-icon", "QUESTION-ICON"),
        ("lists-icon", "LIST-ICON"),
        ("2dialog-icon", "2DIALOG-ICON"),
        ("book-icon", "BOOK-ICON"),
        ("company-icon", "COMPANY-ICON"),
        ("eurologo-icon", "EUROLOGO-ICON")
    )

class Аccent(models.Model):
    icon = models.CharField(max_length=13, choices=ICON_CHOICES, default='person-icon"')
    title = models.CharField(max_length=200)
    discription = models.CharField(max_length=200)
    link = models.CharField(max_length=200)
