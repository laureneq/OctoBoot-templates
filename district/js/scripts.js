(function($) {
    "use strict";

    /* -------------------
    Parallax Sections
    ---------------------*/
    if(!Modernizr.touch){
        $('#home-parallax-fullscreen').parallax("50%", 0.5);
        $('#home-parallax-fullwidth').parallax("50%", 0.5);
        $('.parallax-section-1').parallax("50%", 0.5);
        $('.parallax-section-2').parallax("50%", 0.5);
        $('.parallax-section-3').parallax("50%", 0.5);
        $('.parallax-section-4').parallax("50%", 0.5);
        $('.parallax-section-5').parallax("50%", 0.5);
        $('.parallax-section-6').parallax("50%", 0.5);
        $('.parallax-section-7').parallax("50%", 0.5);
        $('.parallax-section-8').parallax("50%", 0.5);
        $('.parallax-section-9').parallax("50%", 0.5);
        $('#home-landing').parallax("50%", 0.5);

        /* -------------------
        Animation.css calling
        ---------------------*/
        new WOW().init();
    }

    /* -------------------
    Scroll functions
    ---------------------*/
    $(window).scroll(function(){
        parallax();
        /* -------------------
        Header Animation
        ---------------------*/
        if ($(this).scrollTop() > 5){
            $('nav').addClass("navbar-small")
        }
        else{
            $('nav').removeClass("navbar-small")
        }
        /* -------------------
        Back to top button popup
        ---------------------*/
        if($(window).scrollTop() > 400){
        $("#back-to-top").stop().animate({ bottom:'16px' },300,'easeInOutCubic')
        }
        else{
            $("#back-to-top").stop().animate({ bottom:'-50px' },300,'easeInOutCubic')
        }
    });
    /* -------------------
    Preloader
    ---------------------*/
    $(window).load(function(){
        // Preloader
        $('#loader').fadeOut('slow');
        $('.spinner').fadeOut('slow');
    }); // End Window Load
    /* -------------------
    Page Hero Parallax
    ---------------------*/
    function parallax(){
        var scrolled = $(window).scrollTop();
        $('.hero').css('top',-(scrolled*0.0515)+'rem');
        $('.home-container').css('bottom',-(scrolled*0.0515)+'rem');
        $('.op-1,.op-2,.op-3').css('opacity',1-(scrolled*.00110));
    };
    /* -------------------
    Smooth scrolling to anchor
    ---------------------*/
    $('.to-section a,.btn-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 54
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });
    /* -------------------
    Back to top button function
    ---------------------*/
    $('#back-to-top,.to-top').click(function() {
        $('html, body').animate({ scrollTop: 0}, 1000, 'easeInOutExpo');
        return false;
    });
    /* -------------------
    Active menu item on page scroll
    ---------------------*/
    var sections = $('section')
    , nav = $('nav')
    , nav_height = nav.outerHeight();
    $(window).on('scroll', function () {
      var cur_pos = $(this).scrollTop();
      sections.each(function() {
        var top = $(this).offset().top - nav_height,
            bottom = top + $(this).outerHeight();
        if (cur_pos >= top && cur_pos <= bottom) {
          nav.find('a').removeClass('current');
          sections.removeClass('current');
          $(this).addClass('current');
          nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('current');
        }
      });
    });
    /* -------------------
    Auto-close responsive navbar
    ---------------------*/
    function close_toggle() {
        if ($(window).width() <= 992) {
          $('.navbar-collapse a').on('click', function(){
              $('.navbar-collapse').collapse('hide')
          });
        }
        else {
         $('.navbar .navbar-default a').off('click')
        }
    }
    close_toggle();
    $(window).resize(close_toggle);
    $(".navbar-collapse").css({ maxHeight: $(window).height() - $(".navbar-header").height() + "px" });
    /* -------------------
    Contact form
    ---------------------*/

    $( '#contactform' ).on( 'submit', function( e ) {
            e.preventDefault();
            var $el = $( this ),
                $alert = $el.find( '.form-validation' ),
                $submit = $el.find( '#submit' ),
                action = $el.attr( 'action' );
            $alert.removeClass( 'alert-danger alert-success' );
            $alert.html( '' );

            if (!$el.find('input#name').val() || !$el.find('input#email').val() || !$el.find('input#subject').val() || !$el.find('textarea#comments').val()) {
                $alert.html( 'Les champs marqués d\'une étoile sont requis' );
                $alert.addClass( 'alert-danger' ).fadeIn( 500 );
                return
            }

            $submit
                .after('<img src="img/assets/contact-form-loader.gif" class="loader" />')
                .attr('disabled','disabled');

            $.ajax({
                type     : 'POST',
                url      : action,
                data     : $el.serialize(),
                success  : function( response ) {
                    if ( response.status == 'error' ) {
                        $alert.html( 'Error!' );
                        $alert.addClass( 'alert-danger' ).fadeIn( 500 );
                    }
                    else {
                        $el.trigger( 'reset' );
                        $alert.html( 'Success!' );
                        $alert.addClass( 'alert-success' ).fadeIn( 500 );
                        $('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
                    }
                },
            })
        });

    /* -------------------
    Bootstrap Tooltip, Alert, Tabs
    ---------------------*/
    $(function () { $("[data-toggle='tooltip']").tooltip();
        $(".alert").alert()
    });
    $(function () {
        var active = true;
        $('#collapse-init').click(function () {
            if (active) {
                active = false;
                $('.panel-collapse').collapse('show');
                $('.panel-title').attr('data-toggle', '');
                $(this).text('Close All');
            } else {
                active = true;
                $('.panel-collapse').collapse('hide');
                $('.panel-title').attr('data-toggle', 'collapse');
                $(this).text('Open All');
            }
        });
        $('#accordion').on('show.bs.collapse', function () {
            if (active) $('#accordion .in').collapse('hide');
        });
    });
    $('#myTab a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })

    window.octoboot_before_save = function(done) {
        window.scrollTo(0,0)
        $('*.animated').removeClass('animated')
        $('html').get(0).className = ""
        $('.parallax').each(function(i, e) {
            e.style.backgroundPosition = ""
        })
        $('.wow.fadeInUp').each(function(i, e) {
            e.style = ""
        })
        $('#loader, .spinner').css('display', 'block')
        setTimeout(done, 500)
    }

    /* LA SALLE PHOTO */
    if ($(window).width() < $(window).height()) {
        $('#lasalle_photo').addClass('mobile')
        $('#lasalle_photo').css('height', $(window).height())
    }
    var update_photo = function(index) {
        // get index
        var old = $('#lasalle_photo .main_photo img.current')
        index = index || (index === 0 ? index : old.index() + 1)

        if (index > $('#lasalle_photo .main_photo img').length - 1) {
            index = 0
        }
        // reset current
        $('#lasalle_photo .current').removeClass('current')

        // get new one
        var current = $($('#lasalle_photo .main_photo img').get(index))
        var current_min = $($('#lasalle_photo .min_photo img').get(index))
        var current_title = $($('#lasalle_photo .title_photo div').get(index))

        // set new as current
        current.addClass('current')
        current_min.addClass('current')
        current_title.addClass('current')
    }
    var lasalle_inter = setInterval(update_photo, 8000)

    $('#lasalle_photo .min_photo img').click(function() {
        update_photo($(this).index())
        clearInterval(lasalle_inter)
        lasalle_inter = setInterval(update_photo, 8000)
    })

    update_photo(0)

    $('section#lescours .district_bt').hover(function() {
        $(this).addClass('hover')
    }, function() {
        $(this).removeClass('hover')
    })

})(jQuery);
