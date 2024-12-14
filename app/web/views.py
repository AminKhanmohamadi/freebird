from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.
@login_required
def homeview(request):
    response =render(request, 'web/home.html')
    refresh = RefreshToken.for_user(request.user)
    response.set_cookie('jr' , str(refresh))
    response.set_cookie('jc' , str(refresh.access_token))
    return response


class UploadFileView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)
    def post(self, request):
        content = {
            'msg':'Success upload file',
            'data': None
        }
        return Response(content ,status=status.HTTP_201_CREATED)
