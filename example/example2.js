var rangeInterval = require('../')

var text = '0123456789abcdef'
var opts = {
	start: 2,
	step: 3,
	end: text.length-1,
	interval: 200
}
var str = ''

rangeInterval(opts, function (index) {
	str += text[index]
}, function () {
	console.log(str)
})
