$(window).scroll(function(){
    if($(window).scrollTop() > 600) {
        $('.navbar-default').fadeIn(300);
    }
    else {
        $('.navbar-default').fadeOut(300);
    }

    if($(window).width() > 767) {
        if ($(this).scrollTop() > 600) {
            $('.scroll-up').fadeIn(300);
        } else {
            $('.scroll-up').fadeOut(300);
        }
    }
});

$(document).ready(function() {

    $("a.scroll[href^='#']").on('click', function(e) {
        e.preventDefault();
        var hash = this.hash;
        $('html, body').animate({ scrollTop: $(this.hash).offset().top}, 1000, function(){window.location.hash = hash;});
    });

    $('#skills-toggle').click(function() {
        $('#skills').slideToggle(500);
        $('.chart').easyPieChart({
            barColor: '#1ABC9C',
            trackColor: '#2F4254',
            scaleColor: false,
            lineCap: 'butt',
            lineWidth: 12,
            size:110,
            animate: 2000
        });
    });
    if($(window).width() > 767) {
        $('.scrollpoint.sp-effect1').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInLeft');},{offset:'90%'});
        $('.scrollpoint.sp-effect2').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInRight');},{offset:'90%'});
        $('.scrollpoint.sp-effect3').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInDown');},{offset:'90%'});
        $('.scrollpoint.sp-effect4').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeIn');},{offset:'70%'});

        $('.macbook-inner').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('black');},{offset:'70%'});
    }
});
