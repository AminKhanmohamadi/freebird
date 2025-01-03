from django.urls import path , include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    path('' , views.homeview , name='home'),
    path('api/upload/' , views.UploadFileView.as_view() , name='upload'),
    path('api/create-folder/' , views.CreateFolderView.as_view() , name='create-folder'),
    path('api/ourobjects/' , views.OurObjectsView.as_view() , name='our-objects'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]