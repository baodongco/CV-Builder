	$(function () {
		var responsiveView = function () {
			var scale = $('#resume-preview-container').width()/1240;
			$('#resume-view-port').css({
			  '-webkit-transform' : 'scale(' + scale + ')',
			  '-moz-transform'    : 'scale(' + scale + ')',
			  '-ms-transform'     : 'scale(' + scale + ')',
			  '-o-transform'      : 'scale(' + scale + ')',
			  'transform'         : 'scale(' + scale + ')'
			});			
		};
		responsiveView();
		
		$(window).resize(responsiveView);

		$('#temp-poll').carousel({
		  interval: 5000
		});
		if ($(window).width() > 700) {
			$('.carousel .item').each(function(){
			  	var next = $(this).next();
				if (!next.length) {
				    next = $(this).siblings(':first');
				}
				next.children(':first-child').clone().appendTo($(this));
				  
				for (var i=0;i<2;i++) {
				    next=next.next();
				    if (!next.length) {
				    	next = $(this).siblings(':first');
				  	}
				    
				    next.children(':first-child').clone().appendTo($(this));
				}
			});
		}
		

		$('#temp-poll img').click(function () {
			$(this).parents('#temp-poll').find('.selected').removeClass('selected');
			$(this).addClass('selected');
			$('img[data-id='+$(this).data('id')+']').addClass('selected');
			$.ajax({
				url: '/resumes/edit-field',
				method: 'POST',
				data: {
					table: "resume",
					id: $('#resume-preview-container').data('id'),
					field: "templateId",
					value: $(this).data('id')
				},
				success: function () {
					$('#resume-view-port').attr('src',$('#resume-view-port').attr('src'));
				}
			})			
		});

		$('#resume-print').click(function () {
			window.frames["resume-view-port"].focus();
			window.frames["resume-view-port"].print();
		});
		$('[data-toggle="tooltip"]').tooltip();
	});

	$('iframe').on('load', function () {
		$('iframe .sortfield').sortable({
			item: 'iframe .sortable'
		})
	})