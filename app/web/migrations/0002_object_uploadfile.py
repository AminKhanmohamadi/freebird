# Generated by Django 5.1.4 on 2024-12-12 15:09

import web.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='object',
            name='uploadfile',
            field=models.FileField(blank=True, null=True, upload_to=web.models.upload_to, verbose_name='File'),
        ),
    ]
