module.exports = function repeatDelay(opts, each, cb) {
	if (!opts || typeof opts !== 'object') throw new TypeError('Expected options to be an object.')
	if (typeof opts.interval !== 'number') throw new TypeError('Expected options.interval to be a number.')
	if (typeof opts.end !== 'number') throw new TypeError('Expected options.end to be a number.')
	if (typeof opts.step !== 'number') opts.step = 1
	if (typeof opts.start !== 'number') opts.start = 0
	if (opts.start === opts.end) throw new Error('options.start must not equal options.end')
	if (opts.step === 0) throw new RangeError('options.step must not be 0')
	if (opts.step < 0 !== (opts.end - opts.start) < 0) throw new Error('options.step causes the iterator to diverge.')

	var n = opts.start
	var iv = setInterval(iterate, opts.interval)

	function iterate() {
		each(n)
		n += opts.step
		if (opts.start < opts.end ? n > opts.end : n < opts.end) {
			clearInterval(iv)
			if (cb) cb()
		}
	}
}
