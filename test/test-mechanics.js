var test = require('tape')
var rangeInterval = require('../')

function roundTenth(n) {
	return Math.round(n * 10) / 10
}

test('ends with a mixed number', function (t) {
	t.plan(3)
	;[5, 5.1, 5.9].forEach(function (end) {
		var arr = []
		rangeInterval({
			start: 1,
			end: end,
			step: 1,
			interval: 0
		}, function (n) {
			arr.push(n)
		}, function () {
			t.deepEqual(arr, [1, 2, 3, 4, 5], 'numbers look good')
		})
	})
	setTimeout(t.end.bind(t), 100)
})

test('fractional step', function (t) {
	t.plan(1)
	var arr = []
	rangeInterval({
		start: 0,
		end: 2.1,
		step: 0.4,
		interval: 0
	}, function (n) {
		arr.push(roundTenth(n))
	}, function () {
		t.deepEqual([0, 0.4, 0.8, 1.2, 1.6, 2], arr, 'numbers look good')
		t.end()
	})
})
