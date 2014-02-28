var debug = false;

function modalShow(width, height, html) {
    $('#mask').fadeIn(300);
    $('#modal').css('width', width + 'px');
    $('#modal').css('height', height + 'px');
    $('#modal').css('margin-left', '-' + (width/2) + 'px');
    $('#modal').css('margin-top', '-' + (height/2) + 'px');
    $('#modal').html(html).fadeIn(1100);
}

function modalClose() {
    $('#modal').fadeOut(0);
    $('#mask').fadeOut(300);
    $('#modal').html('');
}

function showOurPlace() {
    var html = '<img src="//api-maps.yandex.ru/services/constructor/1.0/static/?sid=fjToQwj-b_KDNns_ey-iR2V_z_TEv4Dz&width=600&height=450" alt=""/>';
    modalShow(602, 452, html);
}

function showRegistrationForm() {
    /*var width = $(window).width() - 100, height = window.innerHeight - 100;
    var html = '<iframe src="https://docs.google.com/forms/d/1zpC5nH7gUFxqRHLcgsaskGWxgMgdJy8jS28IK_TXndU/viewform?embedded=true" width="' + width + '" height="' + height + '" frameborder="0" marginheight="0" marginwidth="0">Загрузка...</iframe>';
    modalShow(width + 2, height + 2, html);*/
    window.open('https://docs.google.com/forms/d/1zpC5nH7gUFxqRHLcgsaskGWxgMgdJy8jS28IK_TXndU/viewform');
}

function resetInfoBG() {
    var $alpha = $('#background-alpha'), $beta = $('#background-beta');
    $alpha.css("background-image", "url('images/slides/1.jpg')");
    $beta.css("background-image", "url('images/slides/2.jpg')");
    $beta.css("opacity", "0");
    $alpha.data('id', '1');
    $alpha.data('master', 'true');
}

function nextInfoBG() {
    var $alpha = $('#background-alpha'), $beta = $('#background-beta');
    var $nextId = (($alpha.data('id')) * 1) + 1;
    if ($nextId > 4) $nextId = 1;

    if ($alpha.data('lock') === 'true') {
        return false;
    } else {
        $alpha.data('lock', 'true');
    }

    if ($alpha.data('master') == 'true') {
        var $master = $alpha, $slave = $beta;
        $alpha.data('master', 'false');
    } else {
        var $master = $beta, $slave = $alpha;
        $alpha.data('master', 'true');
    }

    $slave.fadeTo(1500, 1, function() {
        setTimeout(function() {
            $master.css("opacity", "0");
            $master.css("z-index", "-4999");
            $slave.css("z-index", "-5000");
            $master.css("background-image", "url('images/slides/" 
                + (($nextId == 4) ? 1 : $nextId + 1).toString() + ".jpg')");
            $alpha.data('id', $nextId.toString());
            $alpha.data('lock', 'false');
        }, 50);
    });

    return true;
}

function initActivity() {
    setInterval(function() {
        nextInfoBG();
    }, 6500);

    setTimeout(function() {
        $('div[role="register"] button').css('border', '1px solid rgba(0, 128, 211, 1)');
        $('#mask-teta').fadeTo(1000, 0.9, function() {
            setTimeout(function() {
                $('div[role="register"] button').css('border', '1px solid rgba(255, 255, 255, 0.1)');
                $('#mask-teta').fadeOut(1000);
            }, 1000);
        });
    }, 2500);

    var CareerNightPartyDate = Math.round((new Date(2014, 5, 28, 17, 0, 0)).getTime()/1000);

    $('#flipcountdownbox1').flipcountdown({
        speedFlip: 60,

        tick: function() {
            var nol = function(h) {
                return h>9?h:'0'+h;
            }
            var range   =   CareerNightPartyDate-Math.round((new Date()).getTime()/1000),
                secday  =   86400, sechour = 3600,
                days    =   parseInt(range/secday),
                hours   =   parseInt((range%secday)/sechour),
                min =   parseInt(((range%secday)%sechour)/60),
                sec =   ((range%secday)%sechour)%60;
            return nol(days)+' '+nol(hours)+' '+nol(min)+' '+nol(sec);
        }
    });
}

$(document).ready(function() {
    $('#mask-teta').css('opacity', '0');

    if (!debug) {
        $('body').fadeTo(1, 0.01);
    }

    resetInfoBG();

    $('body').removeClass('loading');

    $(window).resize(function() {
        $('*[role~="fullscreen"]').each(function() {
            $(this).css('height', window.innerHeight + 'px');
        });
    });

    $(window).resize();

    $('#mask').click(function () {
        modalClose();
    }); 

    if (!debug) {
        setTimeout(function() {
            $('body').fadeTo(1000, 1);
            initActivity();
        }, 1000);
    } else {
        initActivity();
    }
});