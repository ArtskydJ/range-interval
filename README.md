# range-interval

> Like setInterval, but called a configurable number of times.

[![Build Status](https://travis-ci.org/ArtskydJ/range-interval.svg)](https://travis-ci.org/ArtskydJ/range-interval)

# [demo][demo]

[![demo](https://cloud.githubusercontent.com/assets/1833684/12982905/967e7e8a-d0ac-11e5-9584-b2246718eccf.PNG)][demo]

# examples

```js
// example/example1.js
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

// h (printed after 200ms)
// e (printed after 400ms)
// l (printed after 600ms)
// l (printed after 800ms)
// o (printed after 1000ms)
```

```js
// example/example2.js
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
// 258be (printed after 1000ms)
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

# install

Install using [npm](https://nodejs.org/en/download/)

	npm install range-interval

# license

[MIT](http://mit-license.org/)

[demo]: http://artskydj.github.io/range-interval/
