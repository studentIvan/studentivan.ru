var rebuild, rebuild1, rebuild2;

$(document).ready(function() 
{
    function startVision(camId) 
    {
        var $container = $('#camera'), j = 0;

        if (!/Firefox/.test(navigator.userAgent))
        {
            $container.html('You need latest version of Mozilla Firefox browser');
            $('.lead').html('');
        }
        else
        {
            $('#helper').html('');
            for (var i = 1; i < 16; i++) {
                $('#helper').html($('#helper').html() + 
                    '<img width="1" height="1" src="data/' + camId + '/' + i + '.jpg">');
            }

            rebuild1 = setInterval(function() {
                $('.lead').html(Date());
            }, 500);

            rebuild2 = setTimeout(function() {
                rebuild = setInterval(function() {
                    j = (j == 15) ? 1 : j + 1;
                    $container.html('<img src="data/' + camId + '/' + j + '.jpg">');
                }, 600);
            }, 5000);
        }
    }

    $('li a').click(function() 
    {
        var cam = $(this).attr('href'),
            $header = $('h1'),
            $container = $('#camera');

        clearInterval(rebuild);
        clearInterval(rebuild1);
        clearTimeout(rebuild2);

        $('.lead').html('');
        $container.html('getting video....');
        $('.active').removeClass('active');
        $(this).parent('li').addClass('active');

        if (cam == '#cam1')
        {
            $header.html('EP-3208#Комната 605');
            startVision('c1');
        }
        else if (cam == '#cam2')
        {
            $header.html('EP-3208#Коридор 1');
            startVision('c2');
        }
        else if (cam == '#cam3')
        {
            $header.html('EP-3208#Коридор 2');
            //startVision('c3');
            if (/Firefox/.test(navigator.userAgent))
            {
                rebuild3 = setTimeout(function() {
                    $container.html('Error: could not connect to camera. Please check charge and connection!');
                }, 1856);
            }
            else
            {
                $container.html('You need latest version of Mozilla Firefox browser');
            }
        }
        else
        {
            $header.html('Select error');
            $container.html('');
        }
    });

    $('.active a').click();
});