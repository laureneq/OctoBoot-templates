
function main() {

(function () {
   'use strict';



    /*====================================
    Show Menu on Book
    ======================================*/
    $(window).bind('scroll', function() {
        var navHeight = $(window).height() - 100;
        if ($(window).scrollTop() > navHeight) {
            $('.navbar-default').addClass('on');
        } else {
            $('.navbar-default').removeClass('on');
        }
    });

    $('body').scrollspy({
        target: '.navbar-default',
        offset: 80
    })

    /* ==============================================
  	Owl Sliders News, Testimonials, Clients
  	=============================================== */

  	$(document).ready(function(){
	    $(".news").owlCarousel({
		autoPlay: 6000,
        navigation : false, // Show next and prev buttons
		     navigationText: [
               "<i class='fa fa-angle-left'></i>",
               "<i class='fa fa-angle-right'></i>"
            ],
        slideSpeed : 300,
        singleItem:true,
		pagination: true,
		paginationSpeed : 400,
		stopOnHover: true
        });


      $(".testimonials").owlCarousel({
	    navigation : false, // Show next and prev buttons
        pagination: true,
		paginationSpeed : 400,
		slideSpeed : 300,
		stopOnHover: true,
		autoPlay: 6000,
		stopOnHover: true,
        singleItem:true

        });



  	  $(".clients").owlCarousel({
  	      autoPlay: 3000,
  	      navigation : false, // Show next and prev buttons
  	      slideSpeed : 300,
  	      pagination: false,
  	      autoHeight : false,
  	      itemsCustom : [
				        [0, 1],
				        [450, 2],
				        [600, 2],
				        [700, 2],
				        [1000, 4],
				        [1200, 5],
				        [1400, 5],
				        [1600, 5]
				      ],
  	  });



  	});

    $(".why-us").slideUp(0)
    $(".why-us-trigger").click(function(){
        $(".why-us").slideUp(500)
        $($(".why-us")[$(this).index()]).slideDown(500)
    })

    window.duplicate_mission = function(el, duplicate) {
        var i = $(el).index()
        if (duplicate) {
            var wu = $($(".why-us").get(i - 1))
            $(el).click(function(){
                $(".why-us").slideUp(500)
                $($(".why-us")[$(this).index()]).slideDown(500)
            })
            var clone = wu.clone()
            clone.insertAfter(wu).find('.icon-tab').each(function(index, m) {
                var d = Math.ceil(Date.now() * Math.random())
                clone.find($(m).attr('href')).attr('id', d)
                $(m).attr('href', '#' + d)
            })
            $(".why-us").slideUp(500)
        } else {
            $($(".why-us").get(i)).remove()
        }

        var ch = $(el).parent().children()
        var row = Math.ceil((ch.length * 4) / 12)
        var sp = (12 * row) - ((duplicate ? ch.length : ch.length - 1) * 4)
        sp = sp / 2

        ch.removeClass(function(index, classs) {
            var match = classs.match(/col-md-offset-\d+/)
            return match ? match[0] : null
        })
        $(ch[(row - 1) * 3]).addClass('col-md-offset-' + sp)
    }

    window.octoboot_before_save = function(save) {
       $("html").attr("class", "")
       $(".why-us").slideUp(0)
       // reset owl-carousel
       $('.owl-carousel').each(function(i, c) {
           var clone = $(c).find('.item').clone()
           $(c).html('')
           $(c).append(clone)
       })
       save()
   }


}());


}
main();
