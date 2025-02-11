(function ($) {
    var $window = $(window),
        $body = $('body');

    // Ensure jQuery is available
    if (typeof jQuery === "undefined") {
        console.error("jQuery is not loaded!");
        return;
    }

    // Ensure `browser` is defined
    if (typeof browser === "undefined") {
        console.warn("browser.min.js is missing or not loaded correctly.");
    }

    // Play initial animations on page load
    $window.on('load', function () {
        setTimeout(function () {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Enable touch mode
    if (typeof browser !== "undefined" && browser.mobile) {
        $body.addClass('is-touch');
    }

    // Smooth scrolling links
    if ($.fn.scrolly) {
        $('.scrolly').scrolly({
            speed: 2000
        });
    } else {
        console.warn("Scrolly is not loaded.");
    }

    // Dropdown navigation
    if ($.fn.dropotron) {
        $('#nav > ul').dropotron({
            alignment: 'right',
            hideDelay: 350
        });
    } else {
        console.warn("Dropotron is not loaded.");
    }

    // Parallax Effect (Disable for mobile)
    var $spotlights = $('.spotlight');
    if (typeof browser !== "undefined" && !browser.mobile) {
        $spotlights.each(function () {
            var $this = $(this);
            $this.scrollex({
                mode: 'middle',
                top: 0,
                bottom: 0,
                initialize: function () { $this.addClass('inactive'); },
                enter: function () { $this.removeClass('inactive'); }
            });
        });
    }

})(jQuery);
