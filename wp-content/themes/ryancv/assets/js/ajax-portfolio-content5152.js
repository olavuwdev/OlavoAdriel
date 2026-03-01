( function( $ ) {
	'use strict';

	/* popup media */
	$('.has-popup-media').magnificPopup({
		type: 'inline',
		overflowY: 'auto',
		closeBtnInside: true,
		mainClass: 'popup-box-inline',
		callbacks: {
			elementParse: function( item ) {
				var $container = $( item.src );
				if ( ! $container.length ) return;

				var post_id = item.src.replace( '#popup-', '' );
				if ( ! post_id || isNaN( post_id ) ) return;

				$.ajax( {
					url: portfolio_ajax_loading_data.url,
					type: 'POST',
					data: {
						action: 'portfolio_popup',
						post_id: post_id
					},
					success: function( response ) {
						if ( response.success ) {
							$container.find( '.content' ).html( response.data.content );
						} else {
							$container.find( '.content' ).html(
								'<p class="error">' + ( response.data.message || 'Loading failed.' ) + '</p>'
							);
						}
					},
					error: function() {
						$container.find( '.content' ).html(
							'<p class="error">Request failed. Please try again.</p>'
						);
					}
				} );
			},
			open: function() {
				// optional: scroll to top, etc.
			}
		}
	});

} )( jQuery );