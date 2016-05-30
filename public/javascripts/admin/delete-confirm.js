$(document).ready(function () {
    $('body').on("click", ".disable", function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        $("#modalDisableUser").data("id", id).modal("show");
    });

    $("#btnConfirmDisable").click(function () {
        var id = $("#modalDisableUser").data("id");
        $.ajax({
            url: '/admin/user/disable/' + id,
            type: "GET",
            success: function(data, textStatus) {
                window.location.href = '/admin/';
            }
        });
        $("#modalDisableUser").modal("hide");
    })
});