$(function () {
	$('#confirm-dialog').on('show.bs.modal',function (e) {
        var data = $(e.relatedTarget).parents('tr').data();
        $('.modal-body', this).text('Delete ' + data.title + ' resume?');
        $('.btn-delete',this).data('id', data.resId);
        $('.btn-delete', this).data('row',$(e.relatedTarget).parents('tr'));
	});
    $('#confirm-dialog').on('click', '.btn-delete', function (e) {
        var row = $(this).data('row');
        $('#confirm-dialog').find('.modal-body').append('<i class="fa fa-spinner fa-pulse fa-2x fa-fw text-center"></i><span class="sr-only">Loading...</span>');
        $.ajax({
            url: '/resumes/'+ $(this).data('id'),
            method: "DELETE",
            success: function () {
                $('#confirm-dialog').modal('hide').removeClass('loading');
                row.fadeOut(300, function () {
                    row.remove();
                });                
            },
            error: function (err) {
                $('#confirm-dialog').find('.modal-body').text(err.message);
            }
        }) 
    })
	$('[data-toggle=popover]').each(function () {
		var self = $(this);
		self.popover({
			content: function () {
				return $('#pop-content-'+self.data('id')).html();
			},
			html: true
		})
	});
	$('body').on('click', function (e) {
        //did not click a popover toggle, or icon in popover toggle, or popover
        if ($(e.target).data('toggle') !== 'popover'
            && $(e.target).parents('[data-toggle="popover"]').length === 0
            && $(e.target).parents('.popover.in').length === 0) { 
            $('[data-toggle="popover"]').popover('hide');
        }
    });
    $('.prv-res').click(function () {
        var id =$(this).data('id');
        $.ajax({
            url: '/resumes/privacy?status=false&id='+ id,
            success: function (data) {
                alert(data.publicLink);
            },
            error: function (data) {
                alert(data);
            }
        })
    })
});