module.exports = function repeatDelay(opts, each, cb) {
	if (!opts || typeof opts !== 'object') throw new TypeError('Expected options to be an object.')
	if (typeof opts.interval !== 'number') throw new TypeError('Expected options.interval to be a number.')
	if (typeof opts.end !== 'number') throw new TypeError('Expected options.end to be a number.')

	var n = opts.start || 0
	var higher = (n < opts.end)
	var iv = setInterval(iterate, opts.interval)

	function iterate() {
		each(n)
		n += Math.abs(opts.step || 1) * (higher ? 1 : -1)
		if (higher ? (n > opts.end) : (n < opts.end)) {
			clearInterval(iv)
			cb && cb()
		}
	}
}
