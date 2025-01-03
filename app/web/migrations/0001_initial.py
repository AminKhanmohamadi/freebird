# Generated by Django 5.1.4 on 2024-12-12 15:03

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Object',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='Name')),
                ('type', models.CharField(choices=[('folder', 'Folder'), ('file', 'File')], max_length=10, verbose_name='Type')),
                ('size', models.CharField(max_length=150, verbose_name='Size')),
                ('path', models.TextField(verbose_name='Path')),
                ('trash', models.BooleanField(default=False, verbose_name='Is Trash')),
                ('stared', models.BooleanField(default=False, verbose_name='Is Stared')),
                ('shared', models.BooleanField(default=False, verbose_name='Is Shared')),
                ('shared_link', models.CharField(blank=True, max_length=200, null=True, verbose_name='Shared Link')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated At')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owner', to=settings.AUTH_USER_MODEL)),
                ('shared_to', models.ManyToManyField(related_name='shared', to=settings.AUTH_USER_MODEL, verbose_name='Shared To')),
            ],
        ),
    ]
