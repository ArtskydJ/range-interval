var test = require('tape')
var rangeInterval = require('../')

function now() {
	return new Date().getTime()
}

function assertDuration(t, start, expect) {
	var actual = now() - start
	var ok = actual < (expect + 10)
	t.ok(ok, '' + actual + ' was not too late, expected ' + expect)
}

test('assertDuration()', function (t) {
	t.plan(1)
	var start = now()
	assertDuration(t, start, 0)
	t.end()
})

;[30, 60, 80, 200].forEach(function (interval, i) {
	test('interval timing ' + (i + 1), function (t) {
		var start = now()
		rangeInterval({
			start: 1,
			end: 5,
			step: 1,
			interval: interval
		}, function (n) {
			assertDuration(t, start, interval)
			start = now()
		}, function () { t.end() })
	})
})
