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

function refreshObjects() {
    var pwd = getCookie('pwd')
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getCookie('jc'));

    const formdata = new FormData();
    formdata.append("pwd", pwd);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };
    fetch("/api/ourobjects/", requestOptions)
        .then((response) => {
            if (response.status == 200) {
                toastMixin.fire({
                    animation: true,
                    title: "Refreshed Data"
                });
            } else {
                toastMixin.fire({
                    animation: true,
                    title: 'Error when refresh data!',
                    icon: 'error'
                });

            }

        })
        .catch((error) => {
            console.error(error)
        });
}