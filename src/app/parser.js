'use strict'
import hsvToRgb from './colours'
const re = /Recv:\s*(?:(-?[0-9]+\.?[0-9]*)[,\s]*){7}/

function atIndex(arr, indices) {
  return indices.map(i => arr[i])
}

function normalise(arr, offset) {
  return arr.map(row => row.map(v => v + offset))
}

function findMaxMin(arr) {
  let flat = arr.reduce((acc, val) => acc.concat(val), [])
  return [Math.max.apply(Math, flat), Math.min.apply(Math, flat)]
}
function filterRelevantData(calibrationInput) {
  let matchedLines = calibrationInput.split('\n').filter(s => re.test(s))
  return matchedLines.map(s => s.split(/ +/).slice(1).map(s => parseFloat(s)))
}

export function parse(calibrationInput) {
  let pointsArray = filterRelevantData(calibrationInput)
  let coreArray = atIndex(pointsArray, [0, 3, 6]).map(a => atIndex(a, [0, 3, 6]))
  let normalisedArray = normalise(coreArray, -coreArray[1][1])

  let maxMin = findMaxMin(normalisedArray)
  let totalDeviation = maxMin[0] - maxMin[1]
  let singleDeviation = Math.max.apply(Math, maxMin.map(Math.abs))
  return { overall_deviation: totalDeviation, core_array: normalisedArray, points_array: pointsArray, max_single_deviation: singleDeviation }
}

function offsetRemapper(offset, peak) {
  let saturationLimit = 0.85
  return saturationLimit * Math.min(Math.abs(offset), peak) / peak
}

function toHexString(rgb) {
  return '#' + rgb.map(s => Number(Math.round(s)).toString(16).padStart(2, '0')).join('')
}

export function offsetToColourFn(peak) {
  return function (offset) {
    var level = offsetRemapper(offset, peak)
    if (offset > 0) {
      // blue
      return toHexString(hsvToRgb(0.65, level, 0.8))
    } else if (offset < 0) {
      // red
      return toHexString(hsvToRgb(0.0, level, 0.8))
    }
    return '#fff'
  }
}
