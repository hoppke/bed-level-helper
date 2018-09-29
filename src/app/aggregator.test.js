/* eslint-disable no-undef */
import { aggregate } from './aggregator'
import { round } from './math'

require('./aggregator')

require('./normaliser')

let sampleOne = {
  baseGrid:
    [[0.177, 0.456, -0.025],
      [0.236, 0, -0.065],
      [0.504, 0.438, -0.162]],
  rows: 3,
  columns: 3,
  totalDeviation: 0.666,
  singleDeviation: 0.504,
  date: new Date()
}

let sampleTwo = {
  baseGrid:
    [[0.167, 0.456, 0.075],
      [0.236, 0, -0.065],
      [0.454, 0.138, -0.162]],
  rows: 3,
  columns: 3,
  totalDeviation: 0.618,
  singleDeviation: 0.456,
  date: new Date()
}

test('Single sample', () => {
  let result = aggregate(sampleOne)
  expect(result.sampleCount).toEqual(1)
  expect(result.samples[0].totalDeviation).toEqual(0.666)
  expect(result.stats.rows).toEqual(3)
  expect(result.stats.columns).toEqual(3)
  expect(result.stats.sampleCount).toEqual(1)

  let sampleOneSeries = [0.177, 0.456, -0.025, 0.236, 0, -0.065, 0.504, 0.438, -0.162]
  expect(flatten(result.stats.baseGrid).map(s => s.max)).toEqual(sampleOneSeries)
  expect(flatten(result.stats.baseGrid).map(s => s.min)).toEqual(sampleOneSeries)
  expect(flatten(result.stats.baseGrid).map(s => s.median)).toEqual(sampleOneSeries)

  expect(result.stats.totalDeviation).toEqual(0.666)
  expect(result.stats.singleDeviation).toEqual(0.504)

  expect(result.capturedOn.length).toBeGreaterThan(5)

})

test('Two samples', () => {
  let result = aggregate([sampleOne, sampleTwo])
  expect(result.sampleCount).toEqual(2)
  expect(result.samples[0].totalDeviation).toEqual(0.666)
  expect(result.stats.rows).toEqual(3)
  expect(result.stats.columns).toEqual(3)
  expect(result.stats.sampleCount).toEqual(2)

  expect(flatten(result.stats.baseGrid).map(s => s.max)).toEqual([0.177, 0.456, 0.075, 0.236, 0, -0.065, 0.504, 0.438, -0.162])
  expect(flatten(result.stats.baseGrid).map(s => s.min)).toEqual([0.167, 0.456, -0.025, 0.236, 0, -0.065, 0.454, 0.138, -0.162])
  expect(flatten(result.stats.baseGrid).map(s => round(s.median, 3))).toEqual([0.172, 0.456, 0.025, 0.236, 0, -0.065, 0.479, 0.288, -0.162])

  expect(result.stats.totalDeviation).toEqual(0.641)
  expect(result.stats.singleDeviation).toEqual(0.479)

  expect(result.capturedOn.length).toBeGreaterThan(10)
})

function flatten(arr) {
  return arr.reduce((acc, val) => acc.concat(val), [])
}
