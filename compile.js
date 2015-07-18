
function compile(contents, filename) {
  var lines = contents.split('\n')
  var state = null
  var match
  var affected = false
  function commit() {
    if (state) {
      if (state.input.length && state.output.length) {
        state.input[0] = '__doctest.example(' + JSON.stringify(getTitle(state.input, state.output)) +
          ', function() { __doctest.assert((' + state.input[0]
        state.input[state.input.length - 1] += '),'
        state.output[0] = '(' + state.output[0]
        state.output[state.output.length - 1] += ')) });'
        lines.splice.apply(lines, [state.start, state.finish - state.start + 1].concat(state.input, state.output))
        affected = true
      }
      state = null
    }
  }
  for (var i = 0; i < lines.length; i ++) {
    var line = lines[i]
    match = line.match(/^\s*\/\/ > ([\s\S]*)$/)
    if (match) {
      commit()
      state = { start: i, finish: i, input: [match[1]], output: [] }
    } else if (state) {
      if (!state.output.length) {
        match = line.match(/^\s*\/\/ \.\.\. ([\s\S]*)$/)
        if (match) {
          state.finish = i
          state.input.push(match[1])
          continue
        }
      }
      match = line.match(/^\s*\/\/ ([\s\S]*)$/)
      if (match) {
        state.finish = i
        state.output.push(match[1])
      } else {
        commit()
      }
    }
  }
  commit()
  if (affected) {
    lines[0] = '__doctest.file(' + JSON.stringify(filename) + ', function() {' + lines[0]
    lines.push('});')
  }
  return lines.join('\n')
}

module.exports = compile


// > getTitle(['f(', '2', ')'], ['{', '  value: 2', '}'])
// 'f( 2 ) → { value: 2 }'
function getTitle(input, output) {
  input = consolidate(input)
  output = consolidate(output)
  return input.length + output.length + 3 > 80 ? input : input + ' → ' + output
}


// > trim('  x   ')
// 'x'
function trim(string) {
  return string.trim()
}

// > consolidate(['test(', ' 2', ')'])
// 'test( 2 )'
// > consolidate(['    a  ', '  b ', 'c'])
// 'a b c'
function consolidate(array) {
  return array.map(trim)
}


// > consolidate(['test(', ' 2', ')'])
// 'test( 2 )'
// > consolidate(['    a  ', '  b ', 'c'])
// 'a b c'
function consolidate(array) {
  return array.map(trim).join(' ')
}
