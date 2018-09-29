/* eslint-disable no-undef */
import { BedSample } from './parser'
import { normalise } from './normaliser'

require('./parser')

require('./normaliser')

let bedSample = new BedSample([
  [0.256, 0.17, 0.14, 0.535, 0.183, 0.159, 0.054],
  [0.488, 0.277, 0.174, -0.049, 0.125, 0.02, 0.027],
  [0.479, 0.197, 0.22, 0.062, 0.116, 0.062, -0.053],
  [0.315, 0.306, 0.126, 0.079, -0.096, -0.008, 0.014],
  [0.444, 0.362, 0.162, 0.084, -0.16, -0.1, -0.074],
  [0.506, 0.293, 0.195, 0.274, 0.093, -0.04, 0.04],
  [0.583, 0.265, 0.174, 0.517, 0.042, -0.021, -0.083]
])

test('Sunny scenario', () => {
  let result = normalise(bedSample)
  expect(result.baseGrid).toEqual([
    [ 0.177, 0.456, -0.025 ],
    [ 0.236, 0, -0.065 ],
    [ 0.504, 0.438, -0.162 ]
  ])
  expect(result.totalDeviation).toEqual(0.666)
  expect(result.singleDeviation).toEqual(0.504)
  expect(result.rows).toEqual(3)
  expect(result.columns).toEqual(3)
  expect(result.middleValue).toEqual(0)
  expect(result.date).toBeInstanceOf(Date)
})
