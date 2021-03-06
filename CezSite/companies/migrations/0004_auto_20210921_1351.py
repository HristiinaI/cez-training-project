# Generated by Django 3.2.7 on 2021-09-21 13:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0003_companies_policies'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='policy',
            name='upload',
        ),
        migrations.AlterField(
            model_name='policy',
            name='company',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='company', to='companies.companies'),
        ),
        migrations.CreateModel(
            name='PolicyUploads',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('upload_name', models.CharField(max_length=200)),
                ('upload_content', models.FileField(upload_to='uploads/')),
                ('policy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='policy', to='companies.policy')),
            ],
        ),
        migrations.AddField(
            model_name='policy',
            name='uploads',
            field=models.OneToOneField(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='uploads', to='companies.policyuploads'),
        ),
    ]
