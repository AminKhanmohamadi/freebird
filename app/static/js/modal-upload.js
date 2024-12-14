+function ($) {
    'use strict';

    // UPLOAD CLASS DEFINITION
    // ======================

    var dropZone = document.getElementById('drop-zone');
    var uploadForm = document.getElementById('js-upload-form');

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // کوکی موردنظر را پیدا کنید
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var startUpload = function (files) {
        console.log("Uploading files:", files);

        for (let i = 0; i < files.length; i++) {
            var form = new FormData();
            form.append("file", files[i]);
            var accessToken = getCookie('jc');

            var settings = {
                "url": "http://localhost:8000/api/upload/",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Authorization": "Bearer " + accessToken
                },
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
            };
            $.ajax(settings)
                .done(function (response) {
                    console.log("File uploaded successfully:", response);
                })
                .fail(function (xhr, status, error) {
                    console.error("Upload failed for file:", files[i].name, status, error);
                });
        }
    };

    uploadForm.addEventListener('submit', function (e) {
        var uploadFiles = document.getElementById('js-upload-files').files;
        e.preventDefault()

        startUpload(uploadFiles)
    })

    dropZone.ondrop = function (e) {
        e.preventDefault();
        this.className = 'upload-drop-zone';

        startUpload(e.dataTransfer.files)
    }

    dropZone.ondragover = function () {
        this.className = 'upload-drop-zone drop';
        return false;
    }

    dropZone.ondragleave = function () {
        this.className = 'upload-drop-zone';
        return false;
    }

}(jQuery);