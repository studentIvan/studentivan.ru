function avatarIndexNext(currentIndex)
{
    var nextIndex = (currentIndex == 10) ? 1 : currentIndex + 1,
    $image = $('section[role="avatar"] img');
    setTimeout(function() 
    {
        $image.fadeTo('slow', 0.01, function() {
            $(this).attr('src', 'images/avatars/' + nextIndex + '.png');
            $(this).fadeTo('slow', 1, function() {
                avatarIndexNext(nextIndex);
            });
        });
    }, 4000);
}

$(document).ready(function() {
    $('section[role="left-panel"]').css('height', $(window).height() + 'px');
    avatarIndexNext(1);
})