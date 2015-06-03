# range-interval

[![Build Status](https://travis-ci.org/ArtskydJ/range-interval.svg)](https://travis-ci.org/ArtskydJ/range-interval)
[![Dependency Status](https://david-dm.org/artskydj/range-interval.svg)](https://david-dm.org/artskydj/range-interval)
[![devDependency Status](https://david-dm.org/artskydj/range-interval/dev-status.svg)](https://david-dm.org/artskydj/range-interval#info=devDependencies)

Like setInterval, but called a configurable number of times.

# examples

### *example/example1.js*
```js
var rangeInterval = require('range-interval')

var text = 'hello'
var opts = {
	start: 0,
	step: 1,
	end: text.length-1,
	interval: 200
}

rangeInterval(opts, function (index) {
	console.log(text[index])
})
```
prints
```
h
e
l
l
o
```

### *example/example2.js*

```js
var rangeInterval = require('range-interval')

var text = '0123456789abcdef'
var str = ''
rangeInterval({
	start: 2,
	step: 3,
	end: text.length-1,
	interval: 200
}, function (index) {
	str += text[index]
}, function () {
	console.log(str)
})
```
prints
```
258be
```

# api

```js
var rangeInterval = require('range-interval')
```

# `rangeInterval(opts, each[, cb])`

The `each` function is called every `opts.interval` milliseconds. It is passed a number that starts at `opts.start`, and steps `opts.step` closer each iteration, until it gets to `opts.end`. Then the `cb` is called.

- `opts` is an object of options with the following properties:
	- `start` is the starting number. Optional, defaults to `0`.
	- `step` is the amount the number is incremented on each iteration. (This can be negative.) Optional, defaults to `1`.
	- `end` is the number at which the loop ends. **Required**.
	- `interval` is the number of ms between each iteration. **Required**.
- `each` is a function that is passed the following arguments:
	- `number` is a number between `opts.start` and `opts.end` that is incremented by `opts.step` each iteration.
- `cb` is an optional function that is called after `opts.end` is reached. No arguments are passed to it.

# license

[VOL](http://veryopenlicense.com)
