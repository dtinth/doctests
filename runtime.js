
var assert = require('assert')

module.exports = {
  file: function(filename, f) {
    return describe(filename + ' doctests', f)
  },
  example: function(title, f) {
    return it(title, f)
  },
  assert: function(input, output) {
    return assert.deepEqual(input, output)
  },
}
