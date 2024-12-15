from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

from web.models import Object


# Create your views here.
@login_required
def homeview(request):
    response =render(request, 'web/home.html')
    refresh = RefreshToken.for_user(request.user)
    response.set_cookie('pwd' , '/root')
    response.set_cookie('pwd_id' , '/root')
    response.set_cookie('jr' , str(refresh))
    response.set_cookie('jc' , str(refresh.access_token))
    return response


class UploadFileView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)
    def post(self, request):
        user_file = request.FILES.get('file')
        userFilePath = request.POST.get('user-file-path')
        userFilePath = userFilePath.replace('"', '')
        file_type = user_file.content_type
        new_file = Object()
        new_file.owner = request.user
        new_file.name = user_file.name.split(".")[0]
        new_file.type = 'file'
        new_file.file_type = file_type
        new_file.uploadfile = user_file
        new_file.path = userFilePath
        new_file.save()
        content = {
            'msg':'Success upload file',
            'data': None
        }
        return Response(content ,status=status.HTTP_201_CREATED)


class CreateFolderView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)
    def post(self, request):
        userFolderName = request.POST.get('folder-name')
        pwd = request.POST.get('pwd')
        pwd = pwd.replace('"', '')

        new_file = Object()
        new_file.owner = request.user
        new_file.name = userFolderName
        new_file.type = 'folder'
        new_file.path = pwd
        new_file.save()
        content = {
            'msg':'Success create folder',
            'data': None
        }
        return Response(content ,status=status.HTTP_201_CREATED)



class OurObjectsView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)
    def post(self, request):
        pwd = request.POST.get('pwd')
        folderId = request.POST.get('folderId')
        folderName = request.POST.get('folderName')
        owner = request.user

        if folderName == 'null':
            objects = Object.objects.filter(owner=owner, path=pwd).exclude(trash=True)
            print(pwd)
        else:
            targetPWD = f'{pwd}/{folderName}'
            objects = Object.objects.filter(owner=owner , path=targetPWD).exclude(trash=True)
            print(targetPWD)

        alldata = []
        for data in objects:
            if data.type == 'file':
                dataurl = data.uploadfile.url
            else:
                dataurl = None
            alldata.append({
                'id': data.id,
                'owner': data.owner.username,
                'name': data.name,
                'type': data.type,
                'uploadfile': dataurl,
                'file_type': data.file_type,
                'size': data.size,
                'pwd': data.path,
                'stared': data.stared,
                'created_at': data.created_at.strftime('%Y-%m-%d %H:%M'),
                'updated_at': data.updated_at.strftime('%Y-%m-%d %H:%M'),
            })


        content = {
            'msg': "Your objects",
            'data': alldata,

        }
        return Response(content ,status=status.HTTP_200_OK)