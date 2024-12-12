from django.contrib import admin

from web.models import Object

# Register your models here.


@admin.register(Object)
class ObjectAdmin(admin.ModelAdmin):
    model = Object
    list_display = ['owner' , 'name' , 'type' , 'size']