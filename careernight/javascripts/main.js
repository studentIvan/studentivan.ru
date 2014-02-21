var debug = false;

$(document).ready(function() {
    if (!debug) {
        $('body').fadeTo(1, 0.01);
    }

    $('body').removeClass('loading');

    if (!debug) {
        setTimeout(function() {
            $('body').fadeTo(1000, 1);
        }, 1000);
    }
});