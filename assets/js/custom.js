(function($){

	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$(window).load(function() {
		$('.loader').fadeOut();
		$('.page-loader').delay(350).fadeOut('slow');
	});

	$(document).ready(function() {

		/* ---------------------------------------------- /*
		 * Initialization General Scripts for all pages
		/* ---------------------------------------------- */

		var moduleHero = $('.module-hero'),
			module     = $('.module-hero, .module, .module-small'),
			navbar     = $('.navbar-custom'),
			worksgrid  = $('#works-grid'),
			width      = Math.max($(window).width(), window.innerWidth),
			mobileTest;

		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			mobileTest = true;
		}

		buildModuleHero(moduleHero);
		navbarSubmenu(width);
		hoverDropdown(width, mobileTest);

		$(window).resize(function() {
			var width = Math.max($(window).width(), window.innerWidth);
			buildModuleHero(moduleHero);
			hoverDropdown(width);
		});

		/* ---------------------------------------------- /*
		 * Set module backgrounds
		/* ---------------------------------------------- */

		module.each(function(i) {
			if ($(this).attr('data-background')) {
				$(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
			}
		});

		/* ---------------------------------------------- /*
		 * Full height module
		/* ---------------------------------------------- */

		function buildModuleHero(moduleHero) {
			if (moduleHero.length > 0) {
				if (moduleHero.hasClass('module-full-height')) {
					moduleHero.height($(window).height());
				} else {
					moduleHero.height($(window).height() * 0.85);
				}
			}
		};

		/* ---------------------------------------------- /*
		 * Hero module parallax, fade
		/* ---------------------------------------------- */

		function effectsModuleHero(moduleHero, scrollTopp) {
			if (moduleHero.length > 0) {
				var homeSHeight = moduleHero.height();
				var topScroll = $(document).scrollTop();
				if ((moduleHero.hasClass('module-parallax')) && ($(scrollTopp).scrollTop() <= homeSHeight)) {
					moduleHero.css('top', (topScroll * 0.55));
				}
				if (moduleHero.hasClass('module-fade') && ($(scrollTopp).scrollTop() <= homeSHeight)) {
					moduleHero.css('opacity', (1 - topScroll/moduleHero.height() * 1));
				}
			}
		};

		/* ---------------------------------------------- /*
		 * Hero slider setup
		/* ---------------------------------------------- */

		if(mobileTest != true) {
			directionNav = true;
		} else {
			directionNav = false;
		}

		if ($('.hero-slider').length > 0) {
			$('.hero-slider').flexslider({
				animation: 'fade',
				animationSpeed: 1000,
				animationLoop: true,
				directionNav: directionNav,
				prevText: '',
				nextText: '',
				start: function(slider) {
					heroSliderLight();
				},
				before: function(slider) {
					if(mobileTest != true) {
						$('.hs-caption').fadeOut().animate({top:'-80px'},{queue:false, easing: 'swing', duration: 700});
						slider.slides.eq(slider.currentSlide).delay(500);
						slider.slides.eq(slider.animatingTo).delay(500);
					}
				},
				after: function(slider) {
					heroSliderLight();
					if(mobileTest != true) {
						$('.hs-caption').fadeIn().animate({top:'0'},{queue:false, easing: 'swing', duration: 700});
					}
				},
				useCSS: true
			});
		};

		/* ---------------------------------------------- /*
		 * Hero slider pause on scroll
		/* ---------------------------------------------- */

		if ($('.hero-slider').length > 0) {
			$(window).scroll(function() {
				var st = $(window).scrollTop();
				if (st > 0) {
					$('.hero-slider').flexslider('pause');
				}
			});
		}

		/* ---------------------------------------------- /*
		 * Navbar collapse on click
		/* ---------------------------------------------- */

		$(document).on('click','.navbar-collapse.in',function(e) {
			if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
				$(this).collapse('hide');
			}
		});

		/* ---------------------------------------------- /*
		 * Navbar submenu
		/* ---------------------------------------------- */

		function navbarSubmenu(width) {
			if (width > 767) {
				$('.navbar-custom .navbar-nav > li.dropdown').hover(function() {
					var MenuLeftOffset  = $('.dropdown-menu', $(this)).offset().left;
					var Menu1LevelWidth = $('.dropdown-menu', $(this)).width();
					if (width - MenuLeftOffset < Menu1LevelWidth * 2) {
						$(this).children('.dropdown-menu').addClass('leftauto');
					} else {
						$(this).children('.dropdown-menu').removeClass('leftauto');
					}
					if ($('.dropdown', $(this)).length > 0) {
						var Menu2LevelWidth = $('.dropdown-menu', $(this)).width();
						if (width - MenuLeftOffset - Menu1LevelWidth < Menu2LevelWidth) {
							$(this).children('.dropdown-menu').addClass('left-side');
						} else {
							$(this).children('.dropdown-menu').removeClass('left-side');
						}
					}
				});
			}
		}

		/* ---------------------------------------------- /*
		 * Navbar hover dropdown on desktop
		/* ---------------------------------------------- */

		function hoverDropdown(width, mobileTest) {
			if ((width > 767) && (mobileTest != true)) {
				$('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').removeClass('open');
				var delay = 0;
				var setTimeoutConst;
				$('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').hover(function() {
					var $this = $(this);
					setTimeoutConst = setTimeout(function() {
						$this.addClass('open');
						$this.find('.dropdown-toggle').addClass('disabled');
					}, delay);
				},
				function() {
					clearTimeout(setTimeoutConst);
					$(this).removeClass('open');
					$(this).find('.dropdown-toggle').removeClass('disabled');
				});
			} else {
				$('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').unbind('mouseenter mouseleave');
				$('.navbar-custom [data-toggle=dropdown]').not('.binded').addClass('binded').on('click', function(event) {
					event.preventDefault();
					event.stopPropagation();
					$(this).parent().siblings().removeClass('open');
					$(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
					$(this).parent().toggleClass('open');
				});
			}
		}

		/* ---------------------------------------------- /*
		 * Youtube video background
		/* ---------------------------------------------- */

		$.tubeplayer.defaults.afterReady = function($player) {
			$player.tubeplayer('volume', 0);
		};

		var VIDEO_BORDER = 100;
		var MAX_VIDEO_WIDTH = 1000;
		var MIN_VIDEO_WIDTH = 400;
		var ASPECT_RATIO = 16 / 9;

		var $featured_video = $('#featured-video');

		var video_width = Math.max(MIN_VIDEO_WIDTH, Math.min(MAX_VIDEO_WIDTH, $featured_video.parent().width() - VIDEO_BORDER));
		var video_height = video_width / ASPECT_RATIO;

		$featured_video.tubeplayer({
			width: video_width,
			height: video_height,
			initialVideo: 'rWWX0-TQhyc',
			showControls: true,
			autoPlay: true,
			modestbranding: false
		});

		$featured_video.mouseenter(function (event) {
			$(this).tubeplayer('volume', 80);
		});

		$featured_video.mouseleave(function (event) {
			$(this).tubeplayer('volume', 0);
		});

		var video_iframe = $featured_video.children();
		video_iframe.addClass('center-block');


		var $video_title = $('#video-title');
		// $video_title.fadeOut(2000);

		/* ---------------------------------------------- /*
		 * Portfolio
		/* ---------------------------------------------- */

		var worksgrid_mode;
		if (worksgrid.hasClass('works-grid-masonry')) {
			worksgrid_mode = 'masonry';
		} else {
			worksgrid_mode = 'fitRows';
		}

		worksgrid.imagesLoaded(function() {
			worksgrid.isotope({
				layoutMode: worksgrid_mode,
				itemSelector: '.work-item',
			});
		});

		$('#filters a').click(function() {
			$('#filters .current').removeClass('current');
			$(this).addClass('current');
			var selector = $(this).attr('data-filter');

			worksgrid.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});

			return false;
		});

		/* ---------------------------------------------- /*
		 * Post slider
		/* ---------------------------------------------- */

		$('.post-images-slider').flexslider( {
			animation: 'slide',
			smoothHeight: true,
		});

		/* ---------------------------------------------- /*
		 * Progress bars, counters animations
		/* ---------------------------------------------- */

		$('.progress-bar').each(function(i) {
			$(this).appear(function() {
				var percent = $(this).attr('aria-valuenow');
				$(this).animate({'width' : percent + '%'});
				$(this).find('span').animate({'opacity' : 1}, 900);
				$(this).find('span').countTo({from: 0, to: percent, speed: 900, refreshInterval: 30});
			});
		});

		$('.counter-item').each(function(i) {
			$(this).appear(function() {
				var number = $(this).find('.counter-number').data('number');
				$(this).find('.counter-number span').countTo({from: 0, to: number, speed: 1200, refreshInterval: 30});
			});
		});

		/* ---------------------------------------------- /*
		 * Popup images
		/* ---------------------------------------------- */

		$('a.popup').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1]
			},
			image: {
				titleSrc: 'title',
				tError: 'The image could not be loaded.',
			}
		});

		/* ---------------------------------------------- /*
		 * Rotate
		/* ---------------------------------------------- */

		$(".rotate").textrotator({
			animation: "dissolve",
			separator: "|",
			speed: 3000
		});

		/* ---------------------------------------------- /*
		 * A jQuery plugin for fluid width video embeds
		/* ---------------------------------------------- */

		$('body').fitVids();

        /* ---------------------------------------------- /*
         * Social Media Icons
        /* ---------------------------------------------- */

        $('.social-icon').on("mouseover", function() {
            var $this = $(this);
            if ($this.is(':animated')) {
                return;
            }
            $this.effect("bounce", { times: 1 }, 500);
        });

        // TODO: set auto scrolling behavior

		// Google Analytics
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-75045795-2', 'auto');
		ga('send', 'pageview');

	});

})(jQuery);