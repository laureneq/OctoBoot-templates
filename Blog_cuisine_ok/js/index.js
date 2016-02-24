$(document).ready(function() {

	// clone menu for fixed purpose
	if (window.screen.width >= 740) {
		var menu = $('.menu')
		var menu_fixed = $('.menu.fixed').css('display', 'none')

	    $(window).scroll(function() {
			if ($(window).scrollTop() >= menu.offset().top + menu.height() && menu_fixed.css('display') === 'none') {
				menu_fixed.fadeIn(250)
			} else if ($(window).scrollTop() < menu.offset().top && menu_fixed.css('display') !== 'none') {
				menu_fixed.fadeOut(250)
			}
		})
	}

	$('article .button').click(function() {
		$(this).parents('article').find('div.more').slideToggle()
	})
	$('div.more').slideUp(0)
})


