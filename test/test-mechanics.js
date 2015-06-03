var test = require('tape')
var after = require('after')
var rangeInterval = require('../')

function roundTenth(n) {
	return Math.round(n * 10) / 10
}
function noop() {}

test('ends with a mixed number', function (t) {
	var tests = [5, 5.1, 5.9]
	t.plan(tests.length)
	var done = after(tests.length, function () {t.end()})
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
	function noop() {}
	var badOpts1 = {}
	var badOpts2 = {}
	var goodOpts = {
		interval: 1,
		end: 2
	}
	t.throws(      rangeInterval.bind(null, badOpts1, noop))
	t.throws(      rangeInterval.bind(null, badOpts1, noop, noop))
	t.throws(      rangeInterval.bind(null, badOpts2, noop))
	t.throws(      rangeInterval.bind(null, badOpts2, noop, noop))
	t.doesNotThrow(rangeInterval.bind(null, goodOpts, noop))
	t.doesNotThrow(rangeInterval.bind(null, goodOpts, noop, noop))
	t.throws(      rangeInterval.bind(null, { interval: 1 }, noop))
	t.throws(      rangeInterval.bind(null, { end: 1 }, noop))

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
		t.deepEqual([0, -1, -2, -3, -4, -5], arr, 'numbers look good')
		t.end()
	})
})

test('step sign mixup', function (t) {
	t.plan(6)
	var done = after(2, function () { t.end() })
	rangeInterval({
		start: 0,
		step: 1,
		end: -2,
		interval: 1
	}, t.pass.bind(t, 'pass'), done)
	rangeInterval({
		start: 0,
		step: -1,
		end: 2,
		interval: 1
	}, t.pass.bind(t, 'pass'), done)
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
		end: -2,
		interval: 3
	}, arr.push.bind(arr), function () {
		t.deepEqual([0, -1, -2], arr)
		t.end()
	})
})
