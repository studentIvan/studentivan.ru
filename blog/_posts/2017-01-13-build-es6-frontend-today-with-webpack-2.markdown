---
title: "Build ES6 frontend today with the webpack 2"
date: 2017-01-13 10:54:58 +0400
layout: post
---

#### Introduction

Assessing the bulk of the opportunities of a stable standard ECMAScript 6 (Harmony), I realized that all of these capabilities are already readily available to us today. These new extensions of language as Arrow-functions that are compilated by transpilers as `function () {}` or new methods like [Object.assign](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) are already available to us today.

The whole range of modern browsers, except IE, Safari 9, Firefox ESR and Android anyway successfully pass more than 98% of tests in ES6. So why do we still use the transpilers?

Pluses of transpilers:

- leverage ES6, ES7, ESNEXT with support for IE, Safari 9, Firefox ESR and Android.
- the ability to use the style without ; (reduced syntactic sugar).
- the ability to implement additional logic in compile time.

Minuses of transpilers:

- Compile to ES5 or even ES3 transpiler forced to use complicated syntax, for example to replace the arrow functions by the ordinary.
- Support for older browsers requires the connection of additional polyfill libraries.
- Using polyfills, we can often lose browser code optimization.
Even if the polyfill is not used, but loaded - JS-engine still looks and precompile it.
- To compile at developing mode is spent additional time and computer resources.
- We are forced to use source maps for debugging the code.

A little bit about the browsers that don't support ES6:

- IE11 - stable version of Internet Explorer, the standard browser of Windows 8.1 and installed as an upgrade to Windows 7/Vista. Windows XP and below do not have official support from Microsoft and have less than half a percent of the market.
- Safari 9 is the standard browser of iOS 9, a system which is still popular, for example on iPad2.
- Firefox ESR - extended support release, is often used by banks and organizations. Many Internet banks in Russia recommend to use FF ESR to work with their online Bank.
- Android browser - standard browser from Google for Android phones. At the moment the old versions of Android recognized as only Android versions below 4.0.


#### ES6 Support Testing

Only for these browsers we have to use additional libraries with polyfills and do not use new JavaScript language features that cannot be described with polyfill, such as loop for-of or template strings.

The output which I suggest:

1. Two simple tests on the browser to check the work with ES6
2. Separate compilation of files for legacy browsers using transpiler

Simple and tasteful:

```javascript
/**
 * check that browser supports basic ES6
 * @return {Boolean}
 */
var isSupportsBasicES6 = function isSupportsBasicES6 () {
  "use strict";

  try { eval("let foo = (x)=>x+1"); }
  catch (e) { return false; }
  return true;
};

/**
 * check that browser supports param destructing
 * @return {Boolean}
 */
var isSupportsDefaultParamsDestructing = function isSupportsDefaultParamsDestructing () {
    "use strict";

    try {
        eval('(function({a = 1, b = 0, c = 3, x:d = 0, y:e = 5},'
          + '  [f = 6, g = 0, h = 8]) {'
          + 'return a === 1 && b === 2 && c === 3 && d === 4 &&'
          + 'e === 5 && f === 6 && g === 7 && h === 8;'
          + '}({b:2, c:undefined, x:4},[, 7, undefined]));');
    } catch (e) { return false; }
    return true;
};

var harmonyMode = isSupportsBasicES6() 
  && isSupportsDefaultParamsDestructing();
```

Why the two tests? Because the first will certainly weed out the browsers on the type of IE11, but it has the risk of runs in some browsers, which still has partial support for ES6.

If you look at the statistics table, these two tests should be enough to weed out the unwanted browsers, while not citing a specific UserAgent.

**[https://kangax.github.io/compat-table/es6/](https://kangax.github.io/compat-table/es6/)**

In General, these two test is quite efficient, despite the try/catch blocks.

#### With the webpack2 power

**[The webpack 2 supports native import/export](https://webpack.js.org/)**, so we no need for babelify this stuff anymore.

To build the simple scenarios, without the use of additional compilers like TS->JS, I wrote **[my ready frontend kit](https://github.com/studentIvan/ES6-cool-frontend-build)**, which includes productive script **[acme.js](https://github.com/studentIvan/ES6-cool-frontend-build/blob/master/src/entries/core/acme.js)** automatically determining what is to work with ES6, and preloading babelify version js of the project for lagging browsers. 

The kit is based on the webpack 2 and uses all its main features, including the [tree-shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html), almost does not perform compilation during development.

The test page you can find **[by the link](https://studentivan.github.io/ES6-cool-frontend-build/build/)**


