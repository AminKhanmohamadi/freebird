var uploadedFileName;

function updateProgressBar(progressId, progress) {
    const progressBar = $(`#${progressId}`);
    progressBar.attr('style', `width: ${progress}%`);
    progressBar.attr('aria-valuenow', progress);
    if (progress === 100) {
        progressBar.addClass('bg-success');
    }
}


function uploadProgressHandler(event) {
    var percent = (event.loaded / event.total) * 100;
    var progress = Math.round(percent);
    $('#modal-upload-progressbar-percentage').html(progress + '%' + " | " + humanFileSize(event.loaded) + " bytes of " + humanFileSize(event.total));
}

function loadHandler(event) {
    var percent = (event.loaded / event.total) * 100;
    var progress = Math.round(percent);
    $('#modal-upload-progressbar').attr('style', 'width: ' + progress + '%;');
    $('#modal-upload-progressbar').attr('aria-valuenow', progress + '');
    if (progress == 100) {
        $('#modal-upload-progressbar').attr('class', 'progress-bar bg-success');
        $('#modal-listof-uploaded').prepend("<a href='#' class='list-group-item list-group-item-success text-success'>"+uploadedFileName+"</a>");

    }
}



function errorHandler(event) {
    $('#modal-upload-progressbar').attr('class', 'progress-bar bg-danger');
    $('#modal-upload-progressbar').attr('style', 'width: 100%;');
    $('#modal-upload-progressbar').attr('aria-valuenow', '100');
    $('#modal-upload-progressbar-percentage').html('Upload Failed');
    $('#modal-listof-uploaded').prepend("<a href='#' class='list-group-item list-group-item-success text-danger'>"+uploadedFileName+"</a>");
}

function abortHandler(event) {
    $('#modal-upload-progressbar').attr('class', 'progress-bar bg-warning');
    $('#modal-upload-progressbar').attr('style', 'width: 100%;');
    $('#modal-upload-progressbar').attr('aria-valuenow', '100');
    $('#modal-upload-progressbar-percentage').html('Upload Aborted');
    $('#modal-listof-uploaded').prepend("<a href='#' class='list-group-item list-group-item-success text-warning'>"+uploadedFileName+"</a>");
}


+function ($) {
    'use strict';

    // UPLOAD CLASS DEFINITION
    // ======================

    var dropZone = document.getElementById('drop-zone');
    var uploadForm = document.getElementById('js-upload-form');


    var startUpload = function (files) {
        console.log("Uploading files:", files);

        for (let i = 0; i < files.length; i++) {
            var file = files[i];
            uploadedFileName = file.name;
            var form = new FormData();
            form.append("file", files[i]);
            var accessToken = getCookie('jc');


            var settings = {
                "url": "/api/upload/",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Authorization": "Bearer " + accessToken
                },
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form,
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress",
                        uploadProgressHandler,
                        false
                    );
                    xhr.addEventListener("load", loadHandler, false);
                    xhr.addEventListener("error", errorHandler, false);
                    xhr.addEventListener("abort", abortHandler, false);

                    return xhr;
                }
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