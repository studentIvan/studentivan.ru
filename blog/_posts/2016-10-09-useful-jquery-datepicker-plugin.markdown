---
title: Useful jQuery datepicker plugin
layout: post
---

Yesterday I got a task to attach some datepicker to inputs. Datepicker must be bounded with input, prohibited to select past date and date after 3 months from today. And of course I meant that it will easy. Case: no bootstrap attached, no jquery-ui attached, es6 webpack import, stylus, needed to be styled as site design. 
I realized that not so much plugins exist.

My datepicker markup (bemto pug mixin) was looking as

```javascript
mixin chooseDate(options)
  +b.choose-date
    +e.datepicker
        input(type='text' placeholder='Pick a date')
        +fontIcon({ name: 'calendar' })
```

When I found [PickMeUp](https://github.com/nazar-pc/PickMeUp), I said "yeah, it what I want". But after use I had several problems...

1. First I had to convert sass to stylus, if you want a solution [see my gist](https://gist.github.com/studentIvan/9bfb53a93513d2990c3ed3400296d284)

2. PickeMeUp always using body as container. If your page has fixed top navbar layout you will got a problem with riding calendar. It doesn't look fine. The solution from developer I found in [issue #111](https://github.com/nazar-pc/PickMeUp/issues/111) (use flat and shut up). It seemed okay but calendar has no activity in flat mode.

3. I want to bound it to input and trigger it by clicking whole datepicker div with icon. In flat mode by default you cant.

So I did modify the mixin

```javascript
mixin chooseDate(options)
  +b.choose-date
    +e.datepicker
        input(type='text' placeholder='Pick a date')
        +fontIcon({ name: 'calendar' })
    +e.datepickerbox
```

And do the total code in simple ES6 with MomentJS/jQuery/Vanilla mix

```javascript
import pickmeup from 'pickmeup'
import moment from 'moment'

const init = () => {
    $(() => {
        let today = new Date(), next3months = moment().add(3, 'months').toDate();
        let element = document.querySelector('.choose-date__datepickerbox');

        if (!element) {
            return;
        }

        let $picker = pickmeup(element, {
            min: today,
            max: next3months,
            select_year: false,
            select_month: false,
            flat: true,
            hide_on_select: true,
            format: 'Y.m.d'
        });

        $(element).each((i, found) => {
            pickmeup(found).hide();
            let $input = $(found).parent().find('input');
            // here I using europe date format Y.m.d
            $input.val(today.toISOString().substr(0, 10).replace(/-/g, '.'));
            $input.parent().click((event) => {
                let box = $(event.target).parent().parent()
                    .find('.choose-date__datepickerbox .pickmeup').get(0);
                box.classList.remove('pmu-hidden');
            });

            $input.keyup((event, remoteCall) => {
                let newDate = $input.val();
                if (/\d{4}\.\d{2}\.\d{2}/.test(newDate)) {
                    // here I using europe date format Y.m.d
                    let dateResult;
                    $picker.set_date(new Date(newDate.replace(/\./g, '-')));
                    setTimeout(() => {
                        dateResult = $picker.get_date(true);
                        $input.val(dateResult);
                    }, 1);
                    $picker.hide();
                }
            });
        });

        element.addEventListener('pickmeup-change', (event) => {
            pickmeup(event.target).hide();
            $(event.target).parent().find('input').val(event.detail.formatted_date);
        });
    });
}

export default init();
```


