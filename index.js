var qs = require('querystring')
var rangeInterval = require('range-interval')
var xtend = require('xtend')

var defaults = {
	start: 0,
	end: 10,
	interval: 500,
	step: 1
}
var alertTypes = [
	'alert-success',
	'alert-warning',
	'alert-danger',
	'alert-info'
]

var query = window.location.search.slice(1)
var params = xtend(defaults, qs.parse(query))

Object.keys(params).forEach(function (key) {
	document.querySelector('input[name="' + key + '"]').value = params[key] = Number(params[key])
})

rangeInterval(params, each, end)

function each(n) {
	var index = (n / params.step) % alertTypes.length
	document.getElementById('each').className = 'alert ' + alertTypes[index]
	document.getElementById('n').innerText = n
}

function end() {
	document.getElementById('each').className = 'alert alert-default'
	document.getElementById('end').className = 'alert alert-success'
}
