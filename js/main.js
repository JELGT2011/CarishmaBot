(function ($, d3, OriDomi) {
  $(document).ready(function () {

    g_photo_page = null;

    $.tubeplayer.defaults.afterReady = function ($player) {
      $player.tubeplayer('volume', 0);
    };

    var VIDEO_BORDER = 100;
    var MAX_VIDEO_WIDTH = 800;
    var MIN_VIDEO_WIDTH = 400;
    var ASPECT_RATIO = 16 / 9;

    var $featured_video = $('#featured-video');

    var video_width = Math.max(MIN_VIDEO_WIDTH, Math.min(MAX_VIDEO_WIDTH, $featured_video.parent().width() - VIDEO_BORDER));
    var video_height = video_width / ASPECT_RATIO;

    $featured_video.tubeplayer({
      width: video_width,
      height: video_height,
      initialVideo: 'rWWX0-TQhyc',
      showControls: false,
      autoPlay: false,
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

    var $photo_page = $('.photo-page').first()
        .css('background', "url('http://placehold.it/350x300/00ff00')")
        .css('background-repeat', 'no-repeat')
        .css('background-position', "top left")
        .css('width', 350)
        .css('height', 300);

    $photo_page.oriDomi({
      vPanels: 10,
      hPanels: 5,
      ripple: true,
      touchEnabled: false,
      shading: 'soft',
      perspective: 1000,
      maxAngle: 1800
    });

    g_photo_page = $photo_page.oriDomi(true);
    g_photo_page.current_page = true;

    $photo_page.on('click', function(event) {
      if (g_photo_page.current_page) {
        g_photo_page.setSpeed(500).curl(-60).setSpeed(1000).ramp(-180);
      } else {
        g_photo_page.setSpeed(1000).ramp(0);
      }
      g_photo_page.current_page = !g_photo_page.current_page;
    });

    // var photo_page = new OriDomi('.photo-page', {
    //  vPanels: 5,
    //  hPanels: 5,
    //  ripple: true,
    //  shading: 'soft',
    //  perspective: 1000,
    //  maxAngle: 350
    //});

    //photo_page.reveal();
    //photo_page.ramp(10);


    //photo_page.map(curl_corner)(-10);
    //
    //function curl_corner(angle, panel_index, num_panels) {
    //  if (panel_index === 0) {
    //    debugger;
    //    return this.curl(angle);
    //  }
    //}

    //var $portfolio = $('#portfolio');
    //$portfolio.append('hi');
    //g_portfolio = $portfolio;

    g_photo = $photo_page;

    //var home_svg = d3.select('#home').appendChild('svg')
    //    .attr('width', 100)
    //    .attr('height', 100);
    //
    //home_svg.append('line');

  });
})(jQuery, d3, OriDomi);

