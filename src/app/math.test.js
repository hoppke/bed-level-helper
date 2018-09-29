/* eslint-disable no-undef */
const math = require('./math')

let sample = [1, 2, 5, 10, 3, 7, 2, 1]

test('Max works', () => {
  expect(math.max(sample)).toEqual(10)
})

test('Min works', () => {
  expect(math.min(sample)).toEqual(1)

})

test('Median works', () => {
  expect(math.median(sample)).toEqual(2.5)
})

test('Rounding down works', () => {
  expect(math.round(1.12345, 3)).toEqual(1.123)
})

test('Rounding up works', () => {
  expect(math.round(1.12345, 4)).toEqual(1.1235)
})


