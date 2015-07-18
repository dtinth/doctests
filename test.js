
var assert = require('assert')

// Require doctests first.
require('./index')

// Spy on __doctest to track `.assert()` calls.
var ran = false
__doctest.assert = (function(orig) {
  return function() {
    ran = true
    return orig.apply(this, arguments)
  }
})(__doctest.assert)

// Require the things to test
require('./example')

// The compiler has already been loaded when we `require('./index')`.
// So we need to clear that cache entry first.
delete require.cache[require.resolve('./compile')]
require('./compile')

// Finally, assert that assertions are ran.
describe('an assertion', function() {
  it('ran', function() {
    assert(ran)
  })
})
