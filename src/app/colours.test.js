/* eslint-disable no-undef */
const colours = require('./colours')

test('Sunny scenario', () => {

  let fun = colours.offsetToColourFn(100)

  expect(fun(0)).toEqual('#fff')
  expect(fun(1)).toEqual('#cacacc')
  expect(fun(100)).toEqual('#1f30cc')
  expect(fun(200)).toEqual('#1f30cc')
  expect(fun(-100)).toEqual('#cc1f1f')
  expect(fun(-200)).toEqual('#cc1f1f')
  
})
