var xtend = require('xtend')
var defaultOpts = {
	start: 0,
	end: 100,
	step: 1,
	interval: 10
}

// Consider publishing this on npm
module.exports = function repeatDelay(options, each, cb) {
	if (typeof options === 'function') {
		cb = each
		each = options
		options = {}
	}
	var opts = xtend(defaultOpts, options)

	var n = opts.start
	var iv = setInterval(iterate, opts.interval)
	function iterate() {
		each(n)
		n += opts.step
		if (n > opts.end) {
			clearInterval(iv)
			cb && cb()
		}
	}
}
