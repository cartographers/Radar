const maybe = (val) => {
  value: () => val,
  map : (mapFunc) => val === undefined || val === null ? maybe(null): maybe(mapFunc(val))
}







// value: () => val
// value() {
//   return val
// }