
doctests
========

Inspired by [doctestjs](https://github.com/ianb/doctestjs),
doctests lets you write tests directly in your code as a comment,
like an REPL session.
Out of the box, it is designed to be used with Mocha on Node.js.
Its purpose is to be able to quickly write tests for pure functions.

It also supports multiline input and output.

Usage
-----

Assuming a Mocha and Node setup, first install doctests.

```bash
npm install --save-dev doctests
```

Next, write your tests.

```js
// > interpretationForMidi([0x90, 0x40, 0x41])
// { midi: [0x90, 0x40, 0x41],
//   event: { on: true, hashKey: '0.64' },
//   info: { channel: 0, key: 64, velocity: 65 } }
function interpretationForMidi(midi) {
  return {
    midi:  midi,
    event: eventForMidi(midi),
    info:  infoForMidi(midi),
  }
}

// >   midiForInfo({
// ...   channel: 1,
// ...   key: 64,
// ...   velocity: 65
// ... }, false)
// [0x81, 64, 65]
function midiForInfo(info, on) {
  return M.create.note(on, info.channel, info.key, info.velocity)
}
```

Then run with with `mocha -r doctests`

```bash
> mocha -r doctests map_notes.js

  /Users/dtinth/midiguchi-rx/midiguchi/map_note.js doctests
    ✓ interpretationForMidi([0x90, 0x40, 0x41])
    ✓ midiForInfo({ channel: 1, key: 64, velocity: 65 }, false) → [0x81, 64, 65]
```

Under the Hood
--------------

When you `require('doctests')`,
it will monkey-patch Node.js's module compiling function to turn this code:

```javascript
// >   midiForInfo({
// ...   channel: 1,
// ...   key: 64,
// ...   velocity: 65
// ... }, false)
// [0x81, 64, 65]
function midiForInfo(info, on) {
  return M.create.note(on, info.channel, info.key, info.velocity)
}
```

…into this code:

```javascript
__doctest.example("midiForInfo({ channel: 1, key: 64, velocity: 65 }, false) → [0x81, 64, 65]", function() { __doctest.assert((  midiForInfo({
  channel: 1,
  key: 64,
  velocity: 65
}, false)),
([0x81, 64, 65])) });
function midiForInfo(info, on) {
  return M.create.note(on, info.channel, info.key, info.velocity)
}
```

A global called `__doctest` is included, which by default, delegates to Mocha's `describe` and `it`, and to Node's `assert` module. You can change this object to, for example, use a different assertion library or custom equality logic.






