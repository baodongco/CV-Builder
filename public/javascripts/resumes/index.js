$(function () {
	$('.del-res').click(function () {
		var self = $(this).parents('tr');
		$.ajax({
			url: "/resumes/"+ $(this).data('id'),
			method: "DELETE",
			success: function () {
				self.fadeOut(300, function () {
					self.remove();
				});
			}
		});
	});
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
});