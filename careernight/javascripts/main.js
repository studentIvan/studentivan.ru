var debug = true;

function modalShow(width, height, html) {
    $('#mask').fadeIn(300);
    $('#modal').css('width', width + 'px');
    $('#modal').css('height', height + 'px');
    $('#modal').css('margin-left', '-' + (width/2) + 'px');
    $('#modal').css('margin-top', '-' + (height/2) + 'px');
    $('#modal').html(html).fadeIn(0);
}

function modalClose() {
    $('#modal').fadeOut(0);
    $('#mask').fadeOut(300);
}

function about() {
    var about = '<iframe width="640" height="360" '
    + 'src="//www.youtube.com/embed/O9R72cjxjIU?rel=0&autoplay=1" '
    + 'frameborder="0" allowfullscreen></iframe>';
    modalShow(642, 362, about);
}

function where() {
    modalShow(500, 500, 'hello world');
}

function media() {
    modalShow(500, 500, 'hello world');
}

$(document).ready(function() {
    if (!debug) {
        $('body').fadeTo(1, 0.01);
    }

    $('body').removeClass('loading');
    $('#mask').css('height', window.innerHeight + 'px');

    $('#mask').click(function () {
        modalClose();
    }); 

    if (!debug) {
        setTimeout(function() {
            $('body').fadeTo(1000, 1);
        }, 1000);
    }
});