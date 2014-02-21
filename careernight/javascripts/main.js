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
    $('#modal').html('');
}

function about() {
    /*var about = '<iframe width="853" height="480" '
    + 'src="//www.youtube.com/embed/O9R72cjxjIU?rel=0&autoplay=1&hd=1" '
    + 'frameborder="0" allowfullscreen></iframe>';
    modalShow(855, 482, about);*/
    modalShow(500, 500, 'hello world');
}

function where() {
    var where = '<img src="//api-maps.yandex.ru/services/constructor/1.0/static/?sid=fjToQwj-b_KDNns_ey-iR2V_z_TEv4Dz&width=600&height=450" alt=""/>';
    modalShow(602, 452, where);
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