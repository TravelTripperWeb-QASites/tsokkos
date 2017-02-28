 
    $(document).ready(function() { 

    $(".carousel-inner .item").css({
            width: $(window).width(),
            height: $(window).height()
        }); 

          $("#owl-demo").owlCarousel({
            items : 1,
            loop: true,
            nav:true,
            navText: [  "<i class='fa fa-angle-left' aria-hidden='true'></i>", "<i class='fa fa-angle-right' aria-hidden='true'></i>" ], 
            lazyLoad : true, 
            autoplay:false
          });
          $("#owl-demo2").owlCarousel({
            items : 1,
            loop: true,
            nav:true,
            navText: [  "<i class='fa fa-angle-left' aria-hidden='true'></i>", "<i class='fa fa-angle-right' aria-hidden='true'></i>" ], 
            lazyLoad : true, 
            autoplay:false
          });   

          $("#owl-gallery").owlCarousel({
            items : 1,
            loop: true,
            nav:true,
            navText: [  "<i class='fa fa-angle-left' aria-hidden='true'></i>", "<i class='fa fa-angle-right' aria-hidden='true'></i>" ], 
            lazyLoad : true, 
            autoplay:true
          });  

           smoothScroll.init({
            offset: 120,
           });
		   
		   //Menu Resize function here
		   
		   $(window).scroll(function (event) {
			var y = $(this).scrollTop(); //set position from top in pixels
			if (y >= 300) {
        $('.navbar-right').css("padding-right","0px");
				$('#mainNav').addClass('resized');
			} else {
				$('#mainNav').removeClass('resized');
         $('.navbar-right').css("padding-right","30px");
			}
			});
		
if ($('#back-to-top').length) {
    var scrollTrigger = 100, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}
    
    });


 