$(function() {
    //$('a[href^="http://"]').attr('target','_blank');

    var fixContent = $("#main-navbar");

    var minOffset = fixContent.offset().top;

    $(document).on("scroll", function(e) {
      if ($(document).scrollTop() > minOffset) {
        fixContent.addClass("fix-top");
      } else {
        fixContent.removeClass("fix-top");
      }

    });

    /*
    $('#main-navbar').affix({
      offset: {
        top: 0,
        bottom: function () {
          return (this.bottom = $('.footer').outerHeight(true))
        }
      }
    })
    */

   // Find all YouTube videos
   var $allVideos = $(".youtube");
   // The element that is fluid width
   var $fluidEl = $(".post-content");

   console.info($allVideos);
   console.info($allVideos.length);
   console.info($fluidEl);

   // Figure out and save aspect ratio for each video
   $allVideos.each(function() {

     $(this)
       .data('aspectRatio', this.height / this.width)

       // and remove the hard coded width/height
       .removeAttr('height')
       .removeAttr('width');

   });

   // When the window is resized
   $(window).resize(function() {

     var newWidth = $fluidEl.width();

     // Resize all videos according to their own aspect ratio
     $allVideos.each(function() {

       var $el = $(this);
       $el
         .width(newWidth)
         .height(newWidth * $el.data('aspectRatio'));

     });

   // Kick off one resize to fix all videos on page load
   }).resize();
});

