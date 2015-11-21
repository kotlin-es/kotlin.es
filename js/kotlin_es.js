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
});