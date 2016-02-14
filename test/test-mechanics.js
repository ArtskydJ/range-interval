var test = require('tape')
var rangeInterval = require('../')

function roundTenth(n) {
	return Math.round(n * 10) / 10
}
function noop() {}

;[ 5, 5.1, 5.9 ].forEach(function (end, i) {
	test('floating point end number' + (i + 1),function (t) {
		var arr = []
		rangeInterval({
			start: 1,
			end: end,
			step: 1,
			interval: 0
		}, arr.push.bind(arr), function () {
			t.deepEqual(arr, [ 1, 2, 3, 4, 5 ])
			t.end()
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
		t.deepEqual([ 0, 0.4, 0.8, 1.2, 1.6, 2 ], arr)
		t.end()
	})
})

test('different configurations of arguments', function (t) {
	t.throws(rangeInterval.bind(null, {}, noop), /options\.interval/)
	t.throws(rangeInterval.bind(null, {}, noop, noop), /options\.interval/)
	t.throws(rangeInterval.bind(null, { interval: 1 }, noop), /options\.end/)
	t.throws(rangeInterval.bind(null, { end: 1 }, noop), /options\.interval/)
	t.doesNotThrow(rangeInterval.bind(null, { interval: 1, end: 2 }, noop))
	t.doesNotThrow(rangeInterval.bind(null, { interval: 1, end: 2 }, noop, noop))
	t.end()
})

test('negative step', function (t) {
	t.plan(1)
	var arr = []
	rangeInterval({
		start: 0,
		end: -5,
		step: -1,
		interval: 10
	}, arr.push.bind(arr), function () {
		t.deepEqual([ 0, -1, -2, -3, -4, -5 ], arr)
		t.end()
	})
})

test('step/end combos', function (t) {
	t.throws(rangeInterval.bind(null, { start: 0, step: 1, end: -2, interval: 1 }, noop), /options\.step.+diverge/)
	t.throws(rangeInterval.bind(null, { start: 0, end: -2, interval: 1 }, noop), /options\.step.+diverge/)
	t.throws(rangeInterval.bind(null, { step: 0, end: 1, interval: 1 }, noop), /options\.step.+0/)
	t.throws(rangeInterval.bind(null, { start: 0, step: -1, end: 2, interval: 1 }, noop), /options\.step.+diverge/)
	t.throws(rangeInterval.bind(null, { start: 4, step: -1, end: 4, interval: 1 }, noop), /must not equal/)
	t.throws(rangeInterval.bind(null, { start: 4, step: 1, end: 4, interval: 1 }, noop), /must not equal/)
	t.doesNotThrow(rangeInterval.bind(null, { start: 6, step: -1, end: 2, interval: 1 }, noop))
	t.end()
})

test('cb called after', function (t) {
	t.plan(6)
	var cbCalled = false
	rangeInterval({
		start: 0,
		end: 5,
		step: 1,
		interval: 0
	}, function (n) {
		t.notOk(cbCalled)
	}, function () {
		cbCalled = true
		setTimeout(function () {
			t.end()
		}, 100)
	})
})

test('defaults', function (t) {
	t.plan(1)
	var arr = []
	rangeInterval({
		step: -1,
		end: -2,
		interval: 3
	}, arr.push.bind(arr), function () {
		t.deepEqual([ 0, -1, -2 ], arr)
		t.end()
	})
})

test('pass through zero', function (t) {
	t.plan(1)
	var arr = []
	rangeInterval({
		start: 9,
		end: -4,
		step: -2,
		interval: 10
	}, arr.push.bind(arr), function () {
		t.deepEqual([ 9, 7, 5, 3, 1, -1, -3 ], arr)
		t.end()
	})
})
