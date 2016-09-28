---
layout: post
title:  "Yandex share problems"
date:   2016-09-01 15:15:27 +0400
categories: social share yandex
---
### Introduction
Quite convenient to use plug-in software for sharing - [https://tech.yandex.ru/share/](https://tech.yandex.ru/share/)

Past time I've faced with some problems and some of them I'll show now. 

Sometimes You need to change the data that are substituted in the dialog box after sharing. But as Facebook and VK.com are using meta-cache, the changes in the plugin settings and meta-tags (og tags) are not automatically picked up. For manual cleaning You can use these tools: [Facebook share debug](https://developers.facebook.com/tools/debug/), [VK.com pages clear cache](https://vk.com/dev/pages.clearCache) and [Twitter cards validator](https://cards-dev.twitter.com/validator).

### Solutions of common problems

1. To work with yandex-share is better to use [API yandex share](https://tech.yandex.ru/share/doc/dg/api-docpage/). 

Below is an example code:

{% highlight javascript %}
Ya.share2('<block id>', {
  content: {
    url: '<full share url>',
    title: '<share title>',
    description: '<share description>',
    image: '<share image>'
  },
  contentByService: {
    twitter: {
      url: '<url for twitter>',
      title: '<title for twitter>'
    }
  },
  theme: {
    services: 'twitter,vkontakte,facebook,odnoklassniki'
  }
});
{% endhighlight %}

2. Yandex-share doesn't create full URLs for odnoklassniki (ok) and a facebook and maybe plus few more social networks (doesn't add params like image, description, so on). In this case the networks pull the information from og-tags. One solution is - write an hack for replace result of ya-share work. It is also possible to properly set a backend, to give the correct og-tags. [Follow this link for more information](http://stackoverflow.com/questions/11616697/how-to-use-og-meta-tag-for-facebook-share).

3. It's better to assign the result object into a variable - it will allow You to control objects without recreating.

The example dirty yandex share hack for links replacement on Frontend:

{% highlight javascript %}
// $ is a jQuery. For AngularJS use angular.element instead.

// facebook example
$('.ya-share2__item_service_facebook a').attr('href', 
  'https://www.facebook.com/sharer.php?' +
  'u=' + '<full share url>' +
  '&picture=' + '<share image url>'  +
  '&title=' + '<share title>' +
  '&description=' + '<share description>');

// odnoklassniki aka ok example
$('.ya-share2__item_service_odnoklassniki a').attr('href', 
  'http://connect.ok.ru/dk?st.cmd=WidgetSharePreview' +
  '&st.shareUrl=' + '<full share url>' +
  '&st.title=' + '<share title>' +
  '&st.description=' + '<share description>' +
  '&st.imageUrl=' + '<share image url>');
{% endhighlight %}

Hope that I saved a little bit of your time.
