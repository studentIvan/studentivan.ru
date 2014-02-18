var debug = true;

$(document).ready(function() {
    if (!debug) {
        $('body').fadeTo(1, 0.01);
    }

    $('body').removeClass('loading');

    $('section[role="fullscreen"]').each(function() {
        $(this).css('height', window.innerHeight + 'px');
    });

    if (!debug) {
        setTimeout(function() {
            $('body').fadeTo(1000, 1);
        }, 1000);
    }

    $('nav ul li a').click(function() {
        $.scrollTo($(this).attr('href'), 800);
        history.replaceState({}, window.title, $(this).attr('href'));
        return false;
    });

    $('#social button').click(function() {
        window.open($(this).data('link'));
    });
});