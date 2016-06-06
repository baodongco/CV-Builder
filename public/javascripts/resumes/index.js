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
				return $('#pop-content-'+self.parents('tr').data('res-id')).html();
			},
			html: true
		})
	});

    $('.prv-res').popover({ content: "Current link will be removed!", trigger: "hover", placement: "top" });
    $('.pub-res').popover({ content: "Send your resume through a link.", trigger: "hover", placement: "top" });
	$('body').on('click', function (e) {
        //did not click a popover toggle, or icon in popover toggle, or popover
        if ($(e.target).data('toggle') !== 'popover'
            && $(e.target).parents('[data-toggle="popover"]').length === 0
            && $(e.target).parents('.popover.in').length === 0) { 
            $('[data-toggle="popover"]').popover('hide');
        }
    });
    $('body').on('click', '.prv-res', function () {
        var row = $(this).parents('tr');
        var id = row.data('res-id');
        $.ajax({
            url: '/resumes/edit-field',
            method: 'POST',
            data: {
                id: id,
                table: 'resume',
                field: 'publicLink',
                value: 'false'
            },
            success: function (data) {
                row.find('td:nth-child(3)').fadeOut('slow', function() { $(this).text('Private').fadeIn('slow') });
                row.find('.prv-res').addClass('pub-res btn-success').removeClass('prv-res btn-warning')
                .fadeOut('slow', function (){ 
                    $(this).html('<span class="glyphicon glyphicon-globe"></span> Public').fadeIn();
                    $(this).attr('data-content',"Send your resume through a link."); 

                });
            },
            error: function (data) {
                alert(data.message);
            }
        });
    });
    $('body').on('click', '.pub-res', function () {
        var row = $(this).parents('tr');
        var id = row.data('res-id');
        $.ajax({
            url: '/resumes/edit-field',
            method: 'POST',
            data: {
                id: id,
                table: 'resume',
                field: 'publicLink',
                value: 'true'
            },
            success: function (data) {
                row.find('td:nth-child(3)').fadeOut('slow', function() {
                    $(this).html('Public <button data-toggle="popover" data-placement="right" title="Share link" class="btn btn-link btn-xs">\
                                <span class="glyphicon glyphicon-link"></span>\
                            </button>\
                            <div id="pop-content-'+id+'" class="hidden">\
                                <input type="text" value="'+ data.value +'">\
                            </div>').fadeIn('slow');
                    $('button',this).popover({
                        content: function () {
                            return $('#pop-content-'+id).html();
                        },
                        html: true,
                        trigger: 'click'
                    });

                });
                row.find('.pub-res').addClass('prv-res btn-warning')
                .removeClass('pub-res btn-success')
                .fadeOut('slow', function (){
                    $(this).html('<span class="glyphicon glyphicon-lock"></span> Private').fadeIn();
                    $(this).attr('data-content',"Current link will be removed!"); 
                });

            },
            error: function (data) {
                alert(data.message);
            }
        })
    });
});