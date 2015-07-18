
var Module = require('module')

var original = Module.prototype._compile
var compile = require('./compile')

Module.prototype._compile = function(contents, filename) {
  return original.call(this, compile(contents, filename), filename)
}

global.__doctest = require('./runtime')
