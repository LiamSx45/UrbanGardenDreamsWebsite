(function($){
    "use strict";
	
    // Page loader
    //---------------------------------------------
    
    $(window).load(function(){
        $(".page-loader b").stop(true).delay(100).fadeOut();
        $(".page-loader").stop(true).delay(400).fadeOut("slow");
    });
    
    
    // Detect touch devices
    //--------------------------------------------- 
    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
    }
    
    
    // Logo height fix
    //---------------------------------------------
    
    function height_line(height_object, height_donor){
        height_object.height(height_donor.height());
        height_object.css({
            "line-height": height_donor.height() + "px"
        });
    }
    
    $(document).ready(function(){
        height_line($(".nav-logo-wrap .logo"), $(".main-nav"));
    });
    
    
    
    // Parallax
    //---------------------------------------------
    
    $(document).ready(function(){
        if (($(window).width() >= 1024) && (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))) && $("html").hasClass("no-touch")) {
            $(".parallax-1").parallax("50%", 0.1);
            $(".parallax-2").parallax("50%", 0.2);
            $(".parallax-3").parallax("50%", 0.3);
        }
    });
    
    
    
    // Home section height 100%
    //---------------------------------------------
    
    $(document).ready(function(){
        $(".js-height-full").height($(window).height());
    });
    
    $(window).resize(function(){
        $(".js-height-full").height($(window).height());
    });
    
    
    
    // Fittext (responsive text)
    //---------------------------------------------
    
    function fitTextInit(){
        $(".headings").fitText(2.43, {
            minFontSize: '24px',
            maxFontSize: '150px'
        });
        $(".slider-fittext").fitText(8.65, {
            minFontSize: '13px',
            maxFontSize: '30px'
        });
        
        $(".home-description").fitText(3.0, {
            minFontSize: '13px',
            maxFontSize: '20px'
        });
        
        $(".home-description.large").fitText(2.0, {
            minFontSize: '13px',
            maxFontSize: '30px'
        });
        
        $(".phone-number").fitText(1.07655, {
            minFontSize: '22px',
            maxFontSize: '80px'
        });
    }
    
    $(document).ready(function(){
        fitTextInit();
    });
    
    
    
    // Home section slider
    //---------------------------------------------
    
    $(document).ready(function(){
        
        window.js_word_sliding = $(".js-word-sliding").bxSlider({
            adaptiveHeight: true,
            mode: "fade",
            pager: false,
            controls: true,
            auto: true,
            speed: 500,
            pause: 5000,
            nextText: "Next Slide",
            prevText: "Previous Slide",
            stopAutoOnClick: true,
            onSliderLoad: function(){
                $(".bx-prev,.bx-next").attr({
                    "role": "button",
                    "tabindex": "0"
                });                
                $(".bx-prev,.bx-next").keydown(function(e){
                    if (e.keyCode == 32) {
                        $(this).trigger("click");
                        return false;
                    }
                });    
                if ($(this)[0].auto) {
                    $(".js-word-sliding").attr("aria-live", "off");
                    
                } else {
                    $(".js-word-sliding").attr("aria-live", "polite");
                } 
                $(".js-word-sliding").parents(".bx-wrapper").prepend($(".js-word-sliding").parents(".bx-wrapper").find(".bx-controls"));
                
                $(".js-word-sliding").parents(".bx-wrapper").addClass("js-word-sliding-wrap");
            }
        });
        $(".js-word-sliding > li").each(function(index){
            $(this).attr("arial-label", index + 1 + ' of ' + $(".js-word-sliding > li").length);
        });
            
        //Image slider
		var slItemBg;
        window.home_image_slider = $(".home-image-slider").bxSlider({
            adaptiveHeight: true,
            mode: "fade",
            pager: false,
            controls: true,
            auto: true,
            easing: "easeInOutExpo",
            speed: 800,
            pause: 6500,
            video: true,
            useCSS: false,
            stopAutoOnClick: true,
            onSliderLoad: function(){
                $(".bx-prev,.bx-next").attr({
                    "role": "button",
                    "tabindex": "0"
                });                
                $(".bx-prev,.bx-next").keydown(function(e){
                    if (e.keyCode == 32) {
                        $(this).trigger("click");
                        return false;
                    }
                });    
                if ($(this)[0].auto) {
                    $(".home-image-slider").attr("aria-live", "off");
                    
                } else {
                    $(".home-image-slider").attr("aria-live", "polite");
                } 
                $(".home-image-slider").parents(".bx-wrapper").prepend($(".home-image-slider").parents(".bx-wrapper").find(".bx-controls"));                 
            },
            onSlideBefore: function(){                
                /* Parallax fix */
                slItemBg = $(".home-image-slider > li").not(".bx-clone").first().css("background-position");
                $(".bx-clone").css("background-position", slItemBg);
            }
        });
        $(".home-image-slider > li").each(function(index){
            $(this).attr("arial-label", index + 1 + ' of ' + $(".home-image-slider > li").length);
        });
        
    });
    
    
    
    // Tooltips (bootstrap plugin activated)
    //---------------------------------------------
    
    $(document).ready(function(){
    
        $(".nav-social-links a").tooltip({
            placement: "bottom"
        });
        
        $(".social-links a").tooltip({
            placement: "top"
        });
        
    });
    
    
    
    // Scroll navigation
    //---------------------------------------------
    
    $(document).ready(function(){
    
        $(".scroll-nav, .home-call-action, .logo-wrap, .nav-logo-wrap, .banner-button").localScroll({
            target: "body",
            duration: 1100,
            easing: "easeInOutExpo",
            onAfter: function(anchor, settings){
                anchor.focus();
                if (anchor.is(":focus")) {
                    return !1;
                }
                else {
                    anchor.attr('tabindex', '-1');
                    anchor.focus()
                }
            }
        });
        
        var sections = $(".home-section, .page-section");
        var menu_links = $(".scroll-nav li a");
        
        $(window).scroll(function(){
        
            sections.filter(":in-viewport:first").each(function(){
                var active_section = $(this);
                var active_link = $('.scroll-nav li a[href="#' + active_section.attr("id") + '"]');
                menu_links.removeClass("active");
                active_link.addClass("active");
            });
            
        });
        $(window).trigger('scroll');
        
    });
    
    
    
    // Responsive menu
    //---------------------------------------------
    
    $(document).ready(function(){
    
        // Navbar sticky
        
        $(".js-stick").sticky({
            topSpacing: 0
        });
        
        
        var mobile_nav = $(".mobile-nav");
        var desktop_nav = $(".desktop-nav");
        
        height_line($(".inner-nav ul > li > a"), $(".main-nav"));
        height_line(mobile_nav, $(".main-nav"));
        
        mobile_nav.css({
            "width": $(".main-nav").height() + "px"
        });
        
        
        // Mobile menu style on
        
        $(window).resize(function(){
            if ($(window).width() < 1024) {
                $(".main-nav").addClass("mobile-on");
            }
            else 
                if ($(window).width() >= 1024) {
                    $(".main-nav").removeClass("mobile-on");
                    desktop_nav.show();
                }
        });
        $(window).trigger("resize");
        
        
        // Mobile menu toggle
        
        mobile_nav.click(function(){
        
            if (desktop_nav.hasClass("js-opened")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                $(this).removeClass("active");
                $(this).attr("aria-expanded", false);
            }
            else {
                desktop_nav.slideDown("slow", "easeOutQuart").addClass("js-opened");
                $(this).addClass("active");
                $(this).attr("aria-expanded", true);
            }
            
        });
        
        desktop_nav.find("a").click(function(){
            if (mobile_nav.hasClass("active")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                mobile_nav.removeClass("active");
            }
        });
        
    });
    
    
    
    // Some facts section
    //---------------------------------------------
    
    $(document).ready(function(){
        $(".count-number").appear(function(){
        
            var count = $(this);
            
            count.countTo({
                from: 0,
                to: count.html(),
                speed: 1300,
                refreshInterval: 60,
            });
            
        });
    });
    
    
    
    // Team section
    //---------------------------------------------
    
    $(document).ready(function(){
    
        var team_grid = $(".team-grid");
        var team_item = $(".team-item");
        team_item.attr("aria-expanded","false");
        var team_opened_cont = $(".team-opened-wrap");
        
        team_opened_cont.animate({
            opacity: 0
        });
        
        // Open
        
        team_item.filter(".js-clickable").click(function(){
            $(this).attr("aria-expanded", "true");
            team_grid.animate({
                opacity: 0
            }, 400);
            team_grid.slideUp(300, "easeOutExpo");
            $(this).addClass("js-opened");
            
            team_opened_cont.html('<div class="team-opened">' + $(this).html() + $(this).next(".team-cv").first().html() + '<div class="team-close-link" role="button" tabindex="0" aria-expanded="true"><i class="fa fa-times" aria-hidden="true"></i><span class="sr-only">Close info about ' + $(this).find(".team-name").text() +'</span></div></div>');
            
            setTimeout(function(){
                team_opened_cont.slideDown(450, "easeOutExpo");
                team_opened_cont.animate({
                    opacity: 1
                }, 380); 
                
                $("html, body").animate({
                    scrollTop: $(".team-opened-wrap").offset().top - 70
                }, 500);            
            }, 600);

            
        });
        
        
        // Close
        
        $("body").on("click", ".team-close-link", function(){
            $(this).attr("aria-expanded", "false");
            team_item.attr("aria-expanded","false");
            team_opened_cont.animate({
                opacity: 0
            }, 380);
            team_opened_cont.slideUp(450, "easeOutExpo");
            
            setTimeout(function(){
                team_grid.slideDown(300, "easeOutExpo");
                team_grid.animate({
                    opacity: 1
                }, 380);
                team_item.removeClass("js-opened");
                
                team_opened_cont.empty();
                
            }, 600);
            
        });
        
        /* Keyboard navigation for team menu */         
             
        team_item.keydown(function(e){ 
            if (e.keyCode == 13 || e.keyCode == 32) {
                $(this).attr("aria-expanded", "true");
                team_grid.animate({
                    opacity: 0
                }, 400);
                team_grid.slideUp(300, "easeOutExpo");
                $(this).addClass("js-opened");
                
                team_opened_cont.html('<div class="team-opened">' + $(this).html() + $(this).next(".team-cv").first().html() + '<div class="team-close-link" role="button" tabindex="0" aria-expanded="true"><i class="fa fa-times" aria-hidden="true"></i><span class="sr-only">Close info about ' + $(this).find(".team-name").text() +'</span></div></div>');
                
                setTimeout(function(){
                    team_opened_cont.slideDown(450, "easeOutExpo");
                    team_opened_cont.animate({
                        opacity: 1
                    }, 380);
                    
                    $("html, body").animate({
                        scrollTop: $(".team-opened-wrap").offset().top - 70
                    }, 500);
                    
                }, 600);
                
                return false;
            }
            
            
        });
        
        $("body").on("keydown", ".team-close-link", function(e){      
            if (e.keyCode == 13 || e.keyCode == 32) {
                $(this).attr("aria-expanded", "false");
                team_item.attr("aria-expanded","false");
                team_opened_cont.animate({
                    opacity: 0
                }, 380);
                team_opened_cont.slideUp(450, "easeOutExpo");
                
                setTimeout(function(){
                    team_grid.slideDown(300, "easeOutExpo");
                    team_grid.animate({
                        opacity: 1
                    }, 380, function() {
                        team_item.filter(".js-opened").focus();
                        });                         
                    team_opened_cont.empty();
                    
                }, 600);
                
                setTimeout(function(){
                    team_item.removeClass("js-opened");
                }, 1400);
                
                return false;
            }  
                   
        });
        
        $(document).keydown(function(e){
            if (team_item.hasClass("js-opened")) {
                if (e.keyCode == 27) {
                    $(".team-close-link").attr("aria-expanded", "false");
                    team_item.attr("aria-expanded", "false");
                    team_opened_cont.animate({
                        opacity: 0
                    }, 380);
                    team_opened_cont.slideUp(450, "easeOutExpo");
                    
                    setTimeout(function(){
                        team_grid.slideDown(300, "easeOutExpo");
                        team_grid.animate({
                            opacity: 1
                        }, 380, function() {
                            team_item.filter(".js-opened").focus();
                            });
                        
                        team_opened_cont.empty();
                        
                    }, 600);   
                    
                    setTimeout(function(){
                        team_item.removeClass("js-opened");
                    }, 1400);
                             
                }
            }
        });
        
        /* Aria-label for social media profiles */
       
       $(".team-social-links > a").each(function(){
           var team_item_social = $(this).attr("aria-label");
           $(this).attr("aria-label", team_item_social + ' of ' + $(this).parent().parent().prevAll(".team-item").find(".team-name").text());
       });
        
    });
    
    
    
    // Services Section
    //---------------------------------------------
    
    $(document).ready(function(){
    
        var service_item = $(".service-item");
        
        // On hover effect
        service_item.mouseenter(function(){
        
            if (!(service_item.hasClass("service-opened"))) {
                $(this).addClass("js-hovered");
                service_item.filter(":not(.js-hovered)").addClass("js-fade");
            }
            
            
        });
        service_item.mouseleave(function(){
        
            if (!(service_item.hasClass("service-opened"))) {
                $(this).removeClass("js-hovered");
                service_item.removeClass("js-fade");
            }
            
        });
        
        // Service open full description
        
        // Open
        $(".service-full").animate({
            opacity: 0
        });
        window.service_opened = 0;
        $(".service-item-inner").click(function(){
        
            if (!(service_item.hasClass("service-opened"))) {
            
                service_opened = $(this).parents(".service-item");
                service_opened.addClass("service-opened").addClass("no-animate").addClass("js-hovered");
                service_opened.find(".service-wrap").append('<div class="service-close-link" role="button" tabindex="0"><span class="icon-close" aria-hidden="true"></span> <span class="sr-only">Close' + $(this).find(".service-title").text() +'</span></div>');
                service_item.filter(":not(.js-hovered)").addClass("js-fade");
                
                $(".service-opened .service-more").fadeOut(400, "easeOutExpo");
                service_opened.find(".service-wrap").animate({
                    paddingBottom: 45
                }, 600, "easeOutExpo");
                
                setTimeout(function(){
                    service_opened.find(".service-full").slideDown(600, "easeInOutExpo");
                    service_opened.find(".service-full").animate({
                        opacity: 1
                    }, 250, "easeInExpo");
                }, 0);
                
                setTimeout(function(){
                    service_opened.find(".service-close-link").fadeIn(250, "easeInExpo");
                }, 600);
            }
        });
        
        // Close	
        $("body").on("click", ".service-close-link", function(){
        
            $(this).fadeOut(400, "easeOutExpo");
            setTimeout(function(){
                service_opened.find(".service-full").animate({
                    opacity: 0
                }, 300, "easeOutExpo");
                service_opened.find(".service-full").slideUp(600, "easeInOutExpo");
            }, 0);
            
            service_opened.find(".service-wrap").animate({
                paddingBottom: 70
            }, 600, "easeOutExpo");
            
            setTimeout(function(){
                service_opened.find(".service-more").fadeIn(300, "easeInExpo");
            }, 500);
            
            setTimeout(function(){
                service_opened.removeClass("service-opened").removeClass("no-animate").removeClass("js-hovered");
                service_item.removeClass("js-fade");
                service_opened.find(".service-close-link").remove();
            }, 800);
            
        });
        
        /* Keyboard navigation for services menu */
        $(".service-title").attr("aria-expanded","false");
        $(".service-title").focus(function(){
            service_item.removeClass("js-hovered");
            service_item.removeClass("js-fade");
            $(this).parents(".service-item").addClass("js-hovered");
            service_item.filter(":not(.js-hovered)").addClass("js-fade");
        });
         
        $(".service-title").keydown(function(e){
            
            if (!($(this).parents(".service-item").hasClass("service-opened"))) {
                if (e.keyCode == 13) {
                    $(this).attr("aria-expanded","true");
                    service_opened = $(this).parents(".service-item");
                    service_opened.addClass("service-opened").addClass("no-animate").addClass("js-hovered");
                    service_opened.find(".service-wrap").append('<div class="service-close-link" role="button" tabindex="0"><span class="icon-close" aria-hidden= "true"></span> <span class="sr-only">Close' + $(this).text() +'</span></div>');
                    service_item.filter(":not(.js-hovered)").addClass("js-fade");
                    
                    $(".service-opened .service-more").fadeOut(400, "easeOutExpo");
                    service_opened.find(".service-wrap").animate({
                        paddingBottom: 45
                    }, 600, "easeOutExpo");
                    
                    setTimeout(function(){
                        service_opened.find(".service-full").slideDown(600, "easeInOutExpo");
                        service_opened.find(".service-full").animate({
                            opacity: 1
                        }, 250, "easeInExpo");
                    }, 0);
                    
                    setTimeout(function(){
                        service_opened.find(".service-close-link").fadeIn(250, "easeInExpo");
                    }, 600);
                }
            } else{
                if (e.keyCode == 13) {
                    $(this).attr("aria-expanded","false");
                    $(this).parent().find(".service-close-link").fadeOut(400, "easeOutExpo");
                    service_opened = $(this).parents(".service-item");
                    setTimeout(function(){
                        service_opened.find(".service-full").animate({
                            opacity: 0
                        }, 300, "easeOutExpo");
                        service_opened.find(".service-full").slideUp(600, "easeInOutExpo");
                    }, 0);
                    
                    service_opened.find(".service-wrap").animate({
                        paddingBottom: 70
                    }, 600, "easeOutExpo");
                    
                    setTimeout(function(){
                        service_opened.find(".service-more").fadeIn(300, "easeInExpo");
                    }, 500);
                    
                    setTimeout(function(){
                        service_opened.removeClass("service-opened").removeClass("no-animate").removeClass("js-hovered");
                        service_item.removeClass("js-fade");
                        service_opened.find(".service-close-link").remove();
                    }, 800);
                }
            }

        });
        
        // Close
        $("body").on("keydown", ".service-close-link", function(e){
            if (e.keyCode == 13) {
                $(this).prevAll(".service-title").attr("aria-expanded","false");
                $(this).fadeOut(400, "easeOutExpo");
                setTimeout(function(){
                    service_opened.find(".service-full").animate({
                        opacity: 0
                    }, 300, "easeOutExpo");
                    service_opened.find(".service-full").slideUp(600, "easeInOutExpo");
                }, 0);
                
                service_opened.find(".service-wrap").animate({
                    paddingBottom: 70
                }, 600, "easeOutExpo");
                
                setTimeout(function(){
                    service_opened.find(".service-more").fadeIn(300, "easeInExpo");
                }, 500);
                
                setTimeout(function(){
                    service_opened.removeClass("service-opened").removeClass("no-animate").removeClass("js-hovered");
                    service_item.removeClass("js-fade");
                    service_opened.find(".service-close-link").remove();
                }, 800);
            }
        });
        
    });
    
    
    
    // Portfolio Filtering
    //---------------------------------------------
    
    // Works filtering
    
    $(document).ready(function(){
        
        $(".works-filter").each(function(index){
            $(this).prev(".works-filter-title").attr("id", "work-filter-" + index);
            $(this).attr("aria-labeledby", "work-filter-" + index);
        });
        $("#work-grid").mixitup({
            effects: ['fade', 'scale', 'rotateY'],
            easing: 'snap'
        });
        
        $("[data-filter]").click(function(){
            $("[data-filter]").attr("aria-pressed", "false");
            $(this).attr("aria-pressed", "true");
        });
        
        $("[data-filter]").keydown(function(e){
            if (e.keyCode == 13 || e.keyCode == 32) {
                $(this).trigger("click");
                $("[data-filter]").attr("aria-pressed", "false");
                $(this).attr("aria-pressed", "true");
                return false;
            }
        }); 
        $("[data-filter]").prepend("<span class='sr-only'>Filter by:</span> ");
           
    });
    

    // Clients Sectiron
    //---------------------------------------------
    
    $(document).ready(function(){
    
        // Reviews slider
        window.clients_slider = $(".clients-slider").bxSlider({
            nextSelector: "#tc-controls-2 .tc-arrow-right",
            prevSelector: "#tc-controls-2 .tc-arrow-left",
            nextText: "<span class='sr-only'>Next Slide</span> <i class='fa fa-angle-right' aria-hidden='true'></i>",
            prevText: "<span class='sr-only'>Previous Slide</span> <i class='fa fa-angle-left' aria-hidden='true'></i>",
            stopAutoOnClick: true,
            pager: false,
            auto: true,
            pause: 5000,
            mode: "fade",
            adaptiveHeight: true,
            onSliderLoad: function(){
                $(".bx-prev,.bx-next").attr({
                    "role": "button",
                    "tabindex": "0"
                });                
                $(".bx-prev,.bx-next").keydown(function(e){
                    if (e.keyCode == 32) {
                        $(this).trigger("click");
                        return false;
                    }
                });
                
                if ($(this)[0].auto) {
                    $(".clients-slider").attr("aria-live", "off");
                } else {
                    $(".clients-slider").attr("aria-live", "polite");
                } 
                
                $(".clients-slider").parents(".bx-wrapper").prepend($(".clients-slider").parents(".bx-wrapper").find(".bx-controls")); 
            }
        });
        $(".clients-slider > li").each(function(index){
            $(this).attr("arial-label", index + 1 + ' of ' + $(".clients-slider > li").length);
        });
        
    });
    
    
    
    // Contact form
    //---------------------------------------------
    
    $(function(){
        $("#form").submit(function(e){
        
            // Stop the form actually posting
			
            e.preventDefault();
            
            // Send the request
           
			
            setTimeout(function(){
                $.post('contact.php', {
                    name: $("#name").val(),
                    email: $("#email").val(),
                    text: $("#text").val()
                }, function(d){
                
                    // Here we handle the response from the script
                    // We are just going to alert the result for now
                    
                    $(".contact-form-wrap").height($(".contact-form").height());
                    
                    $("#form").slideUp(300, "easeInExpo");
                    
                    setTimeout(function(){
                        $(".form-success").html(d).slideDown(300, "easeOutExpo");
                    }, 450);
                    
                    console.log(d);
                    
                });
            }, 50);
			
        });
    });
    
    
})(jQuery);




(function($){
    "use strict";
    
    $(".work-full-slider").bxSlider({
        adaptiveHeight: true,
        pager: false,
        controls: true,
        auto: false,
        speed: 500,
        pause: 5000,
        video: true,
        mode: "fade",
        useCSS: false,
        stopAutoOnClick: true,
        onSliderLoad: function(){
            $(".bx-prev,.bx-next").attr({
                "role": "button",
                "tabindex": "0"
            });
            if ($(this)[0].auto) {
                $(".work-full-slider").attr("aria-live", "off");
                
            }
            else {
                $(".work-full-slider").attr("aria-live", "polite");
            }
            $(".work-full-slider").parents(".bx-wrapper").prepend($(".work-full-slider").parents(".bx-wrapper").find(".bx-controls"));
        }
    });
    $(".work-full-slider > li").each(function(index){
        $(this).attr("arial-label", index + 1 + ' of ' + $(".work-full-slider > li").length);
    });

})(jQuery);
    


    
// Shortcodes
//---------------------------------------------

$(document).ready(function(){

    // Accordion
    var allPanels = $(".accordion > dd");
    allPanels.hide();
    allPanels.first().slideDown("easeOutExpo");
    $(".accordion > dt > a").attr({
        "role": "button",
        "tabindex": "0",
        "aria-expanded": "false"        
    });
    $(".accordion > dt > a").first().addClass("active");
    $(".accordion > dt > a").first().attr("aria-expanded", true);
    
    $(".accordion > dt > a").click(function(){
    
        var current = $(this).parent().next("dd");
        $(".accordion > dt > a").removeClass("active");
        $(".accordion > dt > a").attr("aria-expanded", false);
        $(this).addClass("active");
        $(this).attr("aria-expanded", true);
        allPanels.not(current).slideUp("easeInExpo");
        $(this).parent().next().slideDown("easeOutExpo");
        
        return false;
        
    });
    
    // Toggle
    var allToggles = $(".toggle > dd");
    allToggle = $(".toggle > dd").hide();
    $(".toggle > dt > a").attr({
        "role": "button",
        "tabindex": "0",
        "aria-expanded": "false"        
    }); 
    $(".toggle > dt > a").click(function(){  
      
        if ($(this).hasClass("active")) { 
            $(this).removeClass("active");
            $(this).attr("aria-expanded", true);
            $(this).parent().next().slideUp("easeOutExpo");            
        }
        else {
            var current = $(this).parent().next("dd");            
            $(this).addClass("active");
            $(this).attr("aria-expanded", true);
            $(this).parent().next().slideDown("easeOutExpo");
        }
        
        return false;
    });
    
    //Video
    $(".video").fitVids();
    
});



// Blog
//---------------------------------------------

$(document).ready(function(){
    $(".blog-slider > li").each(function(index){
        $(this).attr("arial-label", index + 1 + ' of ' + $(".blog-slider > li").length);
    });
    $(".blog-slider").bxSlider({
        adaptiveHeight: true,
        pager: false,
        controls: true,
        auto: false,
        speed: 500,
        pause: 5000,
        video: true,
        useCSS: false,
        mode: "fade",
        stopAutoOnClick: true,
            onSliderLoad: function(){
                $(".bx-prev,.bx-next").attr({
                    "role": "button",
                    "tabindex": "0"
                });                
                $(".bx-prev,.bx-next").keydown(function(e){
                    if (e.keyCode == 32) {
                        $(this).trigger("click");
                        return false;
                    }
                });
                   
                if ($(this)[0].auto) {
                    $(".blog-slider").attr("aria-live", "off");
                    
                } else {
                    $(".blog-slider").attr("aria-live", "polite");
                } 
                $(".blog-slider").parents(".bx-wrapper").prepend($(".blog-slider").parents(".bx-wrapper").find(".bx-controls"));                 
            }
        });
        
    
});


// Some facts section
//---------------------------------------------

$(document).ready(function(){

    if ($(window).width() > 1024) {
        $(".go-fade-in").animate({
            opacity: 0
        }, 10);
        
        $(".go-fade-in").appear(function(){
        
            $(this).animate({
                opacity: 1
            }, 600, "easeInSine");
        });
    }
});
	

//Polyfill for :focus-visible     
//---------------------------------------------

/**
 * https://github.com/WICG/focus-visible
 */
function init() {
  var hadKeyboardEvent = true;
  var hadFocusVisibleRecently = false;
  var hadFocusVisibleRecentlyTimeout = null;

  var inputTypesWhitelist = {
    text: true,
    search: true,
    url: true,
    tel: true,
    email: true,
    password: true,
    number: true,
    date: true,
    month: true,
    week: true,
    time: true,
    datetime: true,
    'datetime-local': true
  };

  /**
   * Helper function for legacy browsers and iframes which sometimes focus
   * elements like document, body, and non-interactive SVG.
   * @param {Element} el
   */
  function isValidFocusTarget(el) {
    if (
      el &&
      el !== document &&
      el.nodeName !== 'HTML' &&
      el.nodeName !== 'BODY' &&
      'classList' in el &&
      'contains' in el.classList
    ) {
      return true;
    }
    return false;
  }

  /**
   * Computes whether the given element should automatically trigger the
   * `focus-visible` class being added, i.e. whether it should always match
   * `:focus-visible` when focused.
   * @param {Element} el
   * @return {boolean}
   */
  function focusTriggersKeyboardModality(el) {
    var type = el.type;
    var tagName = el.tagName;

    if (tagName == 'INPUT' && inputTypesWhitelist[type] && !el.readOnly) {
      return true;
    }

    if (tagName == 'TEXTAREA' && !el.readOnly) {
      return true;
    }

    if (el.isContentEditable) {
      return true;
    }

    return false;
  }

  /**
   * Add the `focus-visible` class to the given element if it was not added by
   * the author.
   * @param {Element} el
   */
  function addFocusVisibleClass(el) {
    if (el.classList.contains('focus-visible')) {
      return;
    }
    el.classList.add('focus-visible');
    el.setAttribute('data-focus-visible-added', '');
  }

  /**
   * Remove the `focus-visible` class from the given element if it was not
   * originally added by the author.
   * @param {Element} el
   */
  function removeFocusVisibleClass(el) {
    if (!el.hasAttribute('data-focus-visible-added')) {
      return;
    }
    el.classList.remove('focus-visible');
    el.removeAttribute('data-focus-visible-added');
  }

  /**
   * Treat `keydown` as a signal that the user is in keyboard modality.
   * Apply `focus-visible` to any current active element and keep track
   * of our keyboard modality state with `hadKeyboardEvent`.
   * @param {Event} e
   */
  function onKeyDown(e) {
    if (isValidFocusTarget(document.activeElement)) {
      addFocusVisibleClass(document.activeElement);
    }

    hadKeyboardEvent = true;
  }

  /**
   * If at any point a user clicks with a pointing device, ensure that we change
   * the modality away from keyboard.
   * This avoids the situation where a user presses a key on an already focused
   * element, and then clicks on a different element, focusing it with a
   * pointing device, while we still think we're in keyboard modality.
   * @param {Event} e
   */
  function onPointerDown(e) {
    hadKeyboardEvent = false;
  }

  /**
   * On `focus`, add the `focus-visible` class to the target if:
   * - the target received focus as a result of keyboard navigation, or
   * - the event target is an element that will likely require interaction
   *   via the keyboard (e.g. a text box)
   * @param {Event} e
   */
  function onFocus(e) {
    // Prevent IE from focusing the document or HTML element.
    if (!isValidFocusTarget(e.target)) {
      return;
    }

    if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
      addFocusVisibleClass(e.target);
    }
  }

  /**
   * On `blur`, remove the `focus-visible` class from the target.
   * @param {Event} e
   */
  function onBlur(e) {
    if (!isValidFocusTarget(e.target)) {
      return;
    }

    if (
      e.target.classList.contains('focus-visible') ||
      e.target.hasAttribute('data-focus-visible-added')
    ) {
      // To detect a tab/window switch, we look for a blur event followed
      // rapidly by a visibility change.
      // If we don't see a visibility change within 100ms, it's probably a
      // regular focus change.
      hadFocusVisibleRecently = true;
      window.clearTimeout(hadFocusVisibleRecentlyTimeout);
      hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
        hadFocusVisibleRecently = false;
        window.clearTimeout(hadFocusVisibleRecentlyTimeout);
      }, 100);
      removeFocusVisibleClass(e.target);
    }
  }

  /**
   * If the user changes tabs, keep track of whether or not the previously
   * focused element had .focus-visible.
   * @param {Event} e
   */
  function onVisibilityChange(e) {
    if (document.visibilityState == 'hidden') {
      // If the tab becomes active again, the browser will handle calling focus
      // on the element (Safari actually calls it twice).
      // If this tab change caused a blur on an element with focus-visible,
      // re-apply the class when the user switches back to the tab.
      if (hadFocusVisibleRecently) {
        hadKeyboardEvent = true;
      }
      addInitialPointerMoveListeners();
    }
  }

  /**
   * Add a group of listeners to detect usage of any pointing devices.
   * These listeners will be added when the polyfill first loads, and anytime
   * the window is blurred, so that they are active when the window regains
   * focus.
   */
  function addInitialPointerMoveListeners() {
    document.addEventListener('mousemove', onInitialPointerMove);
    document.addEventListener('mousedown', onInitialPointerMove);
    document.addEventListener('mouseup', onInitialPointerMove);
    document.addEventListener('pointermove', onInitialPointerMove);
    document.addEventListener('pointerdown', onInitialPointerMove);
    document.addEventListener('pointerup', onInitialPointerMove);
    document.addEventListener('touchmove', onInitialPointerMove);
    document.addEventListener('touchstart', onInitialPointerMove);
    document.addEventListener('touchend', onInitialPointerMove);
  }

  function removeInitialPointerMoveListeners() {
    document.removeEventListener('mousemove', onInitialPointerMove);
    document.removeEventListener('mousedown', onInitialPointerMove);
    document.removeEventListener('mouseup', onInitialPointerMove);
    document.removeEventListener('pointermove', onInitialPointerMove);
    document.removeEventListener('pointerdown', onInitialPointerMove);
    document.removeEventListener('pointerup', onInitialPointerMove);
    document.removeEventListener('touchmove', onInitialPointerMove);
    document.removeEventListener('touchstart', onInitialPointerMove);
    document.removeEventListener('touchend', onInitialPointerMove);
  }

  /**
   * When the polfyill first loads, assume the user is in keyboard modality.
   * If any event is received from a pointing device (e.g. mouse, pointer,
   * touch), turn off keyboard modality.
   * This accounts for situations where focus enters the page from the URL bar.
   * @param {Event} e
   */
  function onInitialPointerMove(e) {
    // Work around a Safari quirk that fires a mousemove on <html> whenever the
    // window blurs, even if you're tabbing out of the page. ¯\_(ツ)_/¯
    if (e.target.nodeName.toLowerCase() === 'html') {
      return;
    }

    hadKeyboardEvent = false;
    removeInitialPointerMoveListeners();
  }

  document.addEventListener('keydown', onKeyDown, true);
  document.addEventListener('mousedown', onPointerDown, true);
  document.addEventListener('pointerdown', onPointerDown, true);
  document.addEventListener('touchstart', onPointerDown, true);
  document.addEventListener('focus', onFocus, true);
  document.addEventListener('blur', onBlur, true);
  document.addEventListener('visibilitychange', onVisibilityChange, true);
  addInitialPointerMoveListeners();

  document.body.classList.add('js-focus-visible');
}

/**
 * Subscription when the DOM is ready
 * @param {Function} callback
 */
function onDOMReady(callback) {
  var loaded;

  /**
   * Callback wrapper for check loaded state
   */
  function load() {
    if (!loaded) {
      loaded = true;

      callback();
    }
  }

  if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
    callback();
  } else {
    loaded = false;
    document.addEventListener('DOMContentLoaded', load, false);
    window.addEventListener('load', load, false);
  }
}

if (typeof document !== 'undefined') {
  onDOMReady(init);
}


// Adding aria-hidden to Font Awesome and Et-line 
// icons
//---------------------------------------------

(function(){
    let getIcons = document.querySelectorAll('i.fa, span[class^="icon"]');
    getIcons.forEach(function(iconEach)
    {
        let getIconAttr = iconEach.getAttribute('aria-hidden');
        if (!getIconAttr)
        {
            iconEach.setAttribute('aria-hidden','true');
        }
    });
})();











