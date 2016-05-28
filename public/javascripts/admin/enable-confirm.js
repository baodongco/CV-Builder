$(document).ready(function () {
    $('body').on("click", ".enable", function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        $("#modalEnableUser").data("id", id).modal("show");
    });

    $("#btnConfirmEnable").click(function () {
        var id = $("#modalEnableUser").data("id");
        $.ajax({
            url: '/admin/user/enable/' + id,
            type: "GET",
            success: function(data, textStatus) {
                window.location.href = '/admin/';
            }
        });
        $("#modalEnableUser").modal("hide");
    })
});