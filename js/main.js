

(function($) {
  $(document).ready(function() {

    $.tubeplayer.defaults.afterReady = function($player) {
      $player.tubeplayer('volume', 0);
    };

    var VIDEO_BORDER = 200;
    var MAX_VIDEO_WIDTH = 800;
    var MIN_VIDEO_WIDTH = 400;
    var ASPECT_RATIO = 1.5;

    var video_width = Math.max(MIN_VIDEO_WIDTH, Math.min(MAX_VIDEO_WIDTH, $(window).width() - VIDEO_BORDER));
    var video_height = video_width / ASPECT_RATIO;

    var featured_video = $('#featured-video').tubeplayer({
      width: video_width,
      height: video_height,
      initialVideo: 'WGOohBytKTU',
      showControls: 1,
      autoPlay: false,
      modestbranding: false
    });

    g_video = featured_video;

    var video_iframe = featured_video.children();
    video_iframe.addClass('center-block');


  });
})(jQuery);

