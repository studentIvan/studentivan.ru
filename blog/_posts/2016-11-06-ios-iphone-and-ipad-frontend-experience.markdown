---
title: iOS iPhone and iPad frontend experience
layout: post
---

Today I will share some secrets of web development for Safari and iOS.

There are examples on JavaScript and Stylus.

#### Detection iPhone, iPad, iPod (JS, Stylus)

```javascript
const isIPhone = () => /iPhone/.test(navigator.userAgent) && !window.MSStream
```

This method will strict detect iPhone device. If you want to detect an iPad - замените на iPad. If you need a Simulator - the user-agent will contain additional word "Simulator".
Microsoft adds some of its user-agents string "iPhone" with some strange goals - keep this in mind.

Next, assume that you have determined that the user is using iPhone. But you want to make a hack/feature for the specific model. When it comes to layout, as the hack will be convenient to add an CSS class. We will come stylus:

```stylus
/**
 * iPhone mixin
 * example:
 * +iphone(all, landscape)
 *   body
 *     display none
 */
iphone($version = all, $orientation = all)
  $media-orientation = $orientation == all ? 'and' : 'and (orientation: ' + $orientation + ') and'
  if $version == '4' or $version == '4S' or $version == 'all'
    $query = 'only screen and (min-device-width: 320px) and (max-device-width: 480px) %s (-webkit-min-device-pixel-ratio: 2)' % $media-orientation
    @media $query
      {block}
  if $version == '5' or $version == '5S' or $version == 'SE' or $version == 'all'
    $query = 'only screen and (min-device-width: 320px) and (max-device-width: 568px) %s (-webkit-min-device-pixel-ratio: 2)' % $media-orientation
    @media $query
      {block}
  if $version == '6' or $version == '6S' or $version == '7' or $version == '7S' or $version == 'all'
    $query = 'only screen and (min-device-width: 375px) and (max-device-width: 667px) %s (-webkit-min-device-pixel-ratio: 2)' % $media-orientation
    @media $query
      {block}
  if $version == '6+' or $version == '7+' or $version == 'all'
    $query = 'only screen and (min-device-width: 414px) and (max-device-width: 736px) %s (-webkit-min-device-pixel-ratio: 3)' % $media-orientation
    @media $query
      {block}
```

Note - this is a mixin for the iPhone, but it works on the basis of the screen data, so it will fall under the many Android devices. Use only with JavaScript!

As for the iPad - then there is your mixin:

```stylus
ipad($version = all, $orientation = all)
  $media-orientation = $orientation == all ? 'and' : 'and (orientation: ' + $orientation + ') and'
  if $version == mini or $version == 1 or $version == 2 or $version == all
    $query = 'only screen and (min-device-width: 768px) and (max-device-width: 1024px) %s (-webkit-min-device-pixel-ratio: 1)' % $media-orientation
    @media $query
      {block}
  if $version == 3 $version == 4 or $version == all
    $query = 'only screen and (min-device-width: 768px) and (max-device-width: 1024px) %s (-webkit-min-device-pixel-ratio: 2)' % $media-orientation
    @media $query
      {block}
```

#### Track input edit

The method is common to all devices, not just Apple.

Usually developers use the onkeyup event to track changes, but then they realize that backspace is not responding to onkeyup and they are starting to use onkeydown. Next they do realize that pasting is possible not only by cmd+V (ctrl+V) - so they discover paste.

In the end they discover with horror that iPhone/Android can simply erase the selected text without notifying onkeyup or onkeydown or even paste. So experience is born something (you can throw any event, such as click)

```javascript
// $input - selected by jQuery object
$input.bind('propertychange change click keyup input paste', event => {
    // do something
})
```

#### Debug iPhone/iPad/Simulator from the Mac OS

I will not tell you details. I like [this description](https://webdesign.tutsplus.com/articles/quick-tip-using-web-inspector-to-debug-mobile-safari--webdesign-8787).

#### Using Simulator to test orientations

You can use cmd + > or cmd + < to change the orientation of iPad simulator.

Do not forget to test iPad 2 with iOS 9.3 (or closest) because at this time is a popular model still.

Be careful - Safari on iOS 9.3 does not support some ES6 features like Proxy and Babel will never implement it. (Especially for Proxy I have found some Google polyfill, but it doesn't work well with the webpack at 2016-11-07, an issue [here](https://github.com/GoogleChrome/proxy-polyfill/issues/10))

#### Using datepicker

Safari has a great support of native input type="date". I strongly recommend you to use this instead of any custom datepickers. 

The display format can depends on the settings, but data storage format is always be the same:

```scala
YYYY-MM-DD
```

To install today's date through the [moment js](http://momentjs.com/), you can use this code:

```javascript
// $input - selected by jQuery object
$input.val(moment().format('Y-MM-DD'))
```

For parsing it is also convenient to use moment js:

```javascript
// $input - selected by jQuery object
const date = moment($input.val(), 'YYYY-MM-DD')
date.isValid() // you can check that date is valid
```

#### Using window resize event

The devices will trigger window resize event any time user scrolling the page. 

So if you want to listen real resize event, not scroll, then you should replace code like this:

```javascript
$(window).resize(() => {
    // do your code here ...
})
```

To something like below:

```javascript
const screenWidth = $('body').data('screenCurrentWidth')
$(window).resize(() => {
    const currentScreenWidth = $(window).width()
    if (currentScreenWidth != screenWidth) {
        // just a trick with mobile devices
        // do your code here ...
        $('body').data('screenCurrentWidth', currentScreenWidth)
    }
})
```

#### Extra: surprises

What you might not expect in the FE development with iOS devices:

<iframe width="400" height="225" src="https://www.youtube-nocookie.com/embed/_bSEfx6D8mA?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

1. When you click on the input/textarea, the device can scroll the page to the height of the keyboard.
2. The device can do zoomOut after finishing text edit. Be sure to append user-scalable=0 in meta name="viewport" if you don't want to flash the white edges of the page.
3. iPhone can just give your page a horizontal scrolling, to avoid this use the following hack:

```stylus
html
body
   overflow-x hidden
```

#### Extra: war with Emoji

iOS, especially iPad love sometimes to replace the unicode with our emoji. 

Frequently suffer the symbols U+25B6 &#9654; and U+25C0 &#9664;.

You can open this page from your iPad and you will see that unicode icons turned into pictures.
To avoid such situations there are several solutions, the simplest is to use a time-tested Icon Fonts such as FontAwesome. A little more complicated to find a SVG version of the unicode character and convert it to png.

#### Extra: Treatment bugs of performance of Sticky blocks on iPhone 5S and below

If during the test you have identified some bugs of performance on these devices - this is the time-tested hack with additional hardware load for you:

```stylus
.my-sticky-block
  transform translate3d(0, 0, 0)
```

Be careful - this method apart from the additional expenses of battery of the device may bring to the sticky-elements some new bugs. Thoroughly test the hack on a real device and use only after that.

If possible, refrain from Sticky blocks on iPhone 5S and below, or close your eyes on the brakes - which may have not reflected very well on the seriousness of your website in the eyes of the user.

#### Extra: iPhone portrait mode and Google Maps V3

In portrait orientation, for iPhone all models at the current time (2016-11-06) there is a bug with incorrect positioning of the +/- at the bottom and your blocks if you are using any. The code below will help you solve the problem:

```javascript
// browser.isIPhone() - look at the top of the article
// $ is a simple jQuery
// gm-bundled-control-on-bottom - controls on bottom
// this.nodeElement - the block where Google Map initialized
$(window).on('orientationchange', () => {
    if (browser.isIPhone() && window.orientation != 90) {
        $(this.nodeElement).find('div.gm-bundled-control.gm-bundled-control-on-bottom')
            .css('bottom', '119px') // if the iPhone reacted quickly
        setTimeout(() => {
            $(this.nodeElement).find('div.gm-bundled-control.gm-bundled-control-on-bottom')
                .css('bottom', '119px')
            // with this delay the any model iPhone can give response on an iFrame
        }, 200)
    }
})
```

![Google Map Portrait](/images/map-example.png){:width="150px" align="left" style="margin-right: 15px"} As you can see, the code uses only != 90 orientation (Portrait Mode). In the orientationchange event code of the buttons will be restored automatically. Now an important comment about the window.orientation:

> This feature has been removed from the Web standards.

But do our code with a new standard window.screen.orientation is is impossible yet, because Safari does not yet support it (2016-11-06). Just be careful, you might be better just to use any polyfill.