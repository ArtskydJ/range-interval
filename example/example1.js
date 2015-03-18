var rangeInterval = require('../')

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
