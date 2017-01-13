---
title: Magic of Object.create(null)
layout: post
date: 2017-01-13 12:20:43 +0400
---

#### Object.create(null)

Few weeks ago I did open the `Object.create(null)` power. 

The `Object.create(null)` does create the simple JavaScript **object** with the `null` prototype.

Default JavaScript **object**, for example `const simple = {};`, contains prototype link to the JavaScript **[Object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object) object** and contains all of it methods and properties.

In some cases the Object.create(null) can be used as hash-data-storage-object with speed up to 10% on the basic object of Object.

Let's test:

* Creation

```javascript
console.time('Object object');
for (let i = 9e5; i >= 0; i--) {
  let simple = {};
}
console.timeEnd('Object object');

console.time('null object');
for (let i = 9e5; i >= 0; i--) {
  let simple = Object.create(null);
}
console.timeEnd('null object');
```

**null** object slow down to 2 times

* Write

```javascript
(function () {
'use strict';
console.time('Object object');
let simple = {};
for (let i = 9e4; i >= 0; i--) {
  simple[`val_${i}`] = i;
}
console.timeEnd('Object object');
}());

(function () {
'use strict';
console.time('null object');
let simple = Object.create(null);
for (let i = 9e4; i >= 0; i--) {
  simple[`val_${i}`] = i;
}
console.timeEnd('null object');
}());
```

**null** object fast up to 10%

* Write/Access

```javascript
(function () {
'use strict';
console.time('Object object');
let simple = {};
for (let i = 9e4; i >= 0; i--) {
  simple[`val_${i}`] = i;
}
for (let i = 9e4; i >= 0; i--) {
  simple[`val_${i}`];
}
console.timeEnd('Object object');
}());

(function () {
'use strict';
console.time('null object');
let simple = Object.create(null);
for (let i = 9e4; i >= 0; i--) {
  simple[`val_${i}`] = i;
}
for (let i = 9e4; i >= 0; i--) {
  simple[`val_${i}`];
}
console.timeEnd('null object');
}());
```

**null** object fast up to 15%

#### Summary

We can use `Object.create(null)` when we need just empty map with some memory optimization and no overhead to worry about inherited properties. But in other cases the Object prototype will be better to use.
