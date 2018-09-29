/* eslint-disable no-undef */
import { BedSample } from './parser'
import { normalise } from './normaliser'
import { aggregate } from './aggregator'
const store = require('./store')

let bedSample = new BedSample([[1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6, 7]])
let normalisedSample = normalise(bedSample)
let sample = aggregate(normalisedSample)

console.log(JSON.stringify(sample))

test('Can store and retrieve', () => {
  let s = new store.Store()
  expect(s.count).toEqual(0)
  expect(s.latest).toEqual(undefined)
  s.insert(sample)
  expect(s.count).toEqual(1)
  expect(s.latest).toEqual(sample)
})

test('Storing generates incrementing IDs', () => {
  let s = new store.Store()
  s.insert(sample)
  expect(s.latest.id).toEqual(1)
  s.insert(sample)
  expect(s.latest.id).toEqual(2)
  expect(s.count).toEqual(2)
})


