
// > succ(1)
// 2
// > succ(
// ... 2)
// 3
function succ(x) {
  return x + 1
}

// > wrap(1)
// { value: 1,
//   truthy: true }
//
// > wrap(0)
// { value: 0,
//   truthy: false }
//
// >   wrap({
// ...   x: 1
// ... })
// { value: { x: 1 },
//   truthy: true }
function wrap(x) {
  return { value: x, truthy: !!x }
}
