[![Build Status](https://travis-ci.org/DveMac/lru-cache-object.svg?branch=master)](https://travis-ci.org/DveMac/lru-cache-object)[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# lru-cache-object

A simple proxy to [lru-cache](https://github.com/isaacs/node-lru-cache) that creates plain javascript objects that behave like an lru cache.

Accepts the same configuration options as [lru-cache](https://github.com/isaacs/node-lru-cache/#options)

([What is an LRU cache?](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)))

## example

#### basic

```js
const lru = require('lru-cache-object');
const o = lru(/* lru-cache configurtion options */);
o.cat = 'meow';
console.log(o.cat); // ==> 'meow'

const o2 = lru(2); // init with 2 item max
o2.cat = 'meow';
o2.dog = 'woof';
o2.pig = 'oink';
console.log(Object.keys(o2)); // ==> ['pig', 'dog']
```

## recipes

#### with a redux reducer

With some caveats its possible to use it as lru cache reducer

```js
export const myReducer = (state = { items: lru(100) }, action) => {
  if (action.type === 'SOME_ACTION') {
    return {
      ...state,
      items: Object.assign(state.items, action.payload),
    }
  }
  return state;
};
```

caveats:

- can not use spread operator
- this essentially modifies the original object which is a bit of a  best practice no-no
- if you data is so large that you need this, it maybe be an indicator of a bigger architectural issue


## license

[MIT](./LICENSE)
