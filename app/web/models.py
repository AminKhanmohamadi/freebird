from django.conf import settings
from django.db import models
from extensions.utils import convert_size


# Create your models here.
def upload_to(instance, filename):
    return f'drive/{instance.owner.username}/{filename}'



class Object(models.Model):
    TYPE_CHOICES = {
        'folder': 'Folder',
        'file': 'File',
    }
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE  , related_name='owner')
    name = models.CharField(max_length=150, verbose_name='Name')
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, verbose_name='Type')
    uploadfile = models.FileField(upload_to=upload_to, verbose_name='File' , null=True, blank=True)
    size = models.CharField(max_length=20,verbose_name='Size' , null=True, blank=True)
    path = models.TextField(verbose_name='Path' , null=True, blank=True)
    trash = models.BooleanField(default=False, verbose_name='Is Trash')
    stared = models.BooleanField(default=False, verbose_name='Is Stared')
    shared = models.BooleanField(default=False, verbose_name='Is Shared')
    shared_link = models.CharField(max_length=200, null=True, blank=True, verbose_name='Shared Link')
    shared_to = models.ManyToManyField(settings.AUTH_USER_MODEL , related_name='shared' , verbose_name='Shared To' , blank=True , null=True)

    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created At')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Updated At')

    def __str__(self):
        return f'{self.owner} - {self.name}'

    def save(self, *args, **kwargs):
        if self.uploadfile:
            self.size = convert_size(self.uploadfile.size)
            self.path = self.uploadfile.path
        super().save(*args, **kwargs)