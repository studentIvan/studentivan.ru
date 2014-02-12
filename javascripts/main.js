/*function avatarIndexNext(currentIndex)
{
    var nextIndex = (currentIndex == 10) ? 3 : currentIndex + 1, $image1 = $('#avatar1');
    $('<img id="avatar2" src="images/avatars/' + nextIndex + '.png">').insertAfter($image1);
    var $image2 = $('#avatar2');
    setTimeout(function() 
    {
        $image1.fadeOut(2000, function() {
            $image1.remove();
            $image2.attr('id', 'avatar1');
            avatarIndexNext(nextIndex);
        });
    }, 4000);
}
*/
$(document).ready(function() {
    $('section[role="left-panel"]').css('height', $(window).height() + 'px');
    $('section[role="page"]').css('height', $(window).height() - 30 + 'px');
    /*avatarIndexNext(3);*/

    /*$('section[role="left-panel"] a').hover(function() {
        $(this).find('i').addClass('fa-spin');
    }, function() {
        $(this).find('i').removeClass('fa-spin');
    });*/
})