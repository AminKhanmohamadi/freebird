// function for create folder
function createFolder() {
    var pwd = getCookie('pwd');
    var foldername = $('#input-modal-foldername').val()
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getCookie('jc'));

    const formdata = new FormData();
    formdata.append("pwd", pwd);
    formdata.append("folder-name", foldername);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };

    fetch("/api/create-folder/", requestOptions)
        .then((response) => {
            if (response.status == 201) {
                toastMixin.fire({
                    animation: true,
                    title: "Your folder created successfuly on FreeBird"
                });
                $('#input-modal-foldername').val("");
            } else {
                toastMixin.fire({
                    animation: true,
                    title: 'Your folder created failed on FreeBird',
                    icon: 'error'
                });
                $('#input-modal-foldername').val("");
            }

        })
        .catch((error) => {
            console.error(error)
        });
}


async function refreshObjects() {
    $('#class-main-file-manager').html('');
    var pwd = getCookie("pwd");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getCookie("jc"));

    const formdata = new FormData();
    formdata.append("pwd", pwd);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
    };

    try {
        const response = await fetch("/api/ourobjects/", requestOptions);
        if (response.status === 200) {
            const content = await response.json();
            toastMixin.fire({
                animation: true,
                title: "Refreshed Data",
            });

            data = content.data
            if (data.length == 0 || pwd != "/root") {
                $('#class-main-file-manager').append(backItem());
            }

            for (i = 0; i < data.length; i++) {
                var file_id = data[i]['id']
                var file_owner = data[i]['owner']
                var file_name = data[i]['name']
                var file_type = data[i]['type']
                var file_format = data[i]['file_type']
                var file_uploadfile = data[i]['uploadfile']
                var file_size = data[i]['size']
                var file_stared = data[i]['stared']
                var file_pwd = data[i]['pwd']
                var file_created = data[i]['created_at']
                var file_updated = data[i]['updated_at']

                // Append folders to file manager
                if (file_type == 'folder') {
                    $('#class-main-file-manager').append(folderItem(file_id, file_name));
                } else if (file_type == 'file' && file_format.includes('image/')) {
                    $('#class-main-file-manager').append(imageItem(file_id, file_name, file_uploadfile));
                } else if (file_type == 'file' && file_format.includes('pdf')) {
                    $('#class-main-file-manager').append(pdfItem(file_id, file_name, file_uploadfile));
                } else if (file_type == 'file' && file_format.includes('zip')|| file_format.includes("x-msdownload")) {
                    $('#class-main-file-manager').append(compressedItem(file_id, file_name, file_uploadfile));
                } else if (file_type == 'file' && file_format.includes('video/')) {
                    $('#class-main-file-manager').append(videoItem(file_id, file_name, file_uploadfile));
                } else if (file_type == 'file' && file_format.includes('application/')) {
                    $('#class-main-file-manager').append(docItem(file_id, file_name, file_uploadfile));
                } else if (file_type == 'file' && file_format.includes('text/plain')) {
                    $('#class-main-file-manager').append(textItem(file_id, file_name, file_uploadfile));
                } else if (file_type == 'file') {
                    $('#class-main-file-manager').append(otherItem(file_id, file_name, file_uploadfile));
                }
            }




        } else {
            toastMixin.fire({
                animation: true,
                title: "Error when refresh data!",
                icon: "error",
            });
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
