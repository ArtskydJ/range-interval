var test = require('tape')
var after = require('after')
var rangeInterval = require('../')

function roundTenth(n) {
	return Math.round(n * 10) / 10
}

test('ends with a mixed number', function (t) {
	var tests = [5, 5.1, 5.9]
	t.plan(tests.length + 1) // t.end asserts once
	var done = after(tests.length, t.end.bind(t))
	tests.forEach(function (end) {
		var arr = []
		rangeInterval({
			start: 1,
			end: end,
			step: 1,
			interval: 0
		}, arr.push.bind(arr), function () {
			t.deepEqual(arr, [1, 2, 3, 4, 5], 'numbers look good')
			done()
		})
	})
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

test('different configurations of arguments', function (t) {
	t.plan(1)
	var beforeEnd = true
	var opts = {}
	var fail = function () {
		if (beforeEnd) t.fail('called too soon')
	}
	var res = null

	res = rangeInterval(fail) || res
	res = rangeInterval(opts, fail) || res
	res = rangeInterval(fail, fail) || res
	res = rangeInterval(opts, fail, fail) || res

	t.equal(res, null, 'returns nothing')
	beforeEnd = false
	t.end()
})
