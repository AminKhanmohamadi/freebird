$(document).ready(function () {
    $("#button-modal-createfolder").click(function () {
        createFolder()
    });
    $("#button-main-refresh-objects").click(function () {
        refreshObjectsHere();
    });
    refreshObjects(null , null);
});