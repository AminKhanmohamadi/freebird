var toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'Title',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

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

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function humanFileSize(size) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return +((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}


function getBackwardPath(path) {
    var folders = path.split("/");
    var backwardPath = "";
    for (i = 1; i < folders.length - 1; i++) {
        backwardPath += "/" + folders[i]
    }
    return backwardPath;
}


function buildBackwardPathToolbar(path) {
    $('#main-toolbar-tree-path').html('');
    $('#main-toolbar-tree-path').html('<li class="breadcrumb-item"></li>');
    var folders = path.split("/");
    var backwardPath = "";
    for (i = 1; i < folders.length; i++) {
        $('#main-toolbar-tree-path').append(`
            <li class="breadcrumb-item">
                ${folders[i]}
            </li>
        `);
    }
}


function refreshObjectsHere() {
    var folderId = getCookie('pwd_id').replace(/"/g, '');
    var fullpath = getCookie('pwd').replace(/"/g, '').split('/');
    var folderName = fullpath[fullpath.length - 1]
    if (folderId == '/root' && folderName == '/root') {
        refreshObjects(null, null);
    } else {
        refreshObjects(folderId, folderName, 1);
    }
}


