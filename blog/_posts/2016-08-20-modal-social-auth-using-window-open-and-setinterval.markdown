---
layout: post
title:  "Modal social auth using window.open and setInterval"
date:   2016-08-20 12:00:28 +0400
categories: social modal openauth
---
### Introduction
The social authorization without page reloading is a modern web common problem. Many libraries are resolving backend problems with social auth like Django Social Auth (python/django) or HybridAuth (php/symfony) but no one of them does frontend code. The code below is my simple AngularJS Solution and You can adapt it for any framework even Vanilla.

### Code solution
{% highlight javascript %}
vm.socialAuth = function () {
  var chWindow = $window.open('http://' + $location.host() + '/app/login/vk-oauth2/');
  // in this case /app/login/vk-oauth2/ is a simple django social auth url for vk.com
  // replace it by function variable and You will got an multi-network code.
  // $window.open does open new tab-window
  // without angular is just smth like window.open('/app/login/vk-oauth2/');
  var chInterval = $interval(function() {  // without angular is just setInterval
    if (chWindow.closed) { // chWindow will receive closed state after close
      // the window is closed - we must recheck our session
      $log.debug('child window closed - reload seesion pls =)'); // just console.log
      $interval.cancel(chInterval); // in Vanilla is clearInterval(chInterval);
    }
  }, 100); // do not set to zero! else You can catch some bugs with it.
};
{% endhighlight %}

After that just attach this code to any social auth button like 

![Sign in with VK.com](/images/vk.com-login-buttion.png)

Hope that I saved a little bit of your time.
