# range-interval

[![Build Status](https://travis-ci.org/ArtskydJ/range-interval.svg)](https://travis-ci.org/ArtskydJ/range-interval)

Like setInterval but only called x times

# examples

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

-----

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

# `rangeInterval([opts,] each[, cb])`

The `each` function is called every `opts.interval` milliseconds. It is passed a number that starts at `opts.start`, and steps `opts.step` closer each iteration, until it gets to `opts.end`. Then the `cb` is called.

- `opts` is an optional object of options with the following properties:
	- `start` is the starting number. Optional, defaults to `0`.
	- `step` is the amount the number is incremented on each iteration. Optional, defaults to `1`.
	- `end` is the number at which the loop ends. Optional, defaults to `100`.
	- `interval` is the number of ms between each iteration. Optional, defaults to `10`.
- `each` is a function that is passed the following arguments:
	- `number` is a number between `opts.start` and `opts.end` that is incremented by `opts.step` each iteration.
- `cb` is an optional function that is called after every iteration. No arguments are passed to it.

# license

[VOL](http://veryopenlicense.com)