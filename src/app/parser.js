'use strict'
const re = /(Recv:)?\s*(?:(-?[0-9]+\.?[0-9]*)[,\s]*){7}/

function atIndex(arr, indices) {
  if (typeof arr === 'undefined' || typeof indices === 'undefined') {
    return []
  } else {
    return indices.map(i => arr[i])
  }
}

function filterRelevantLines(calibrationInput) {
  let matchedLines = calibrationInput.split('\n').filter(s => re.test(s))
  return matchedLines.map(s => s.split(/ +/).slice(1).map(s => parseFloat(s)))
}

export function parse(calibrationInput) {
  if (typeof calibrationInput !== 'string') {
    return new BedSample()
  }
  let pointsLines = filterRelevantLines(calibrationInput)
  return new BedSample(pointsLines)
}

export class BedSample {
  constructor(points) {
    this.points = points || []
    this.rows = (points && points.length) || 0
    this.columns = (points && points[0] && points[0].length) || 0
    this.middleValue = 0
    if (this.columns === 7 && this.rows === 7) {
      this.baseGrid = atIndex(points, [0, 3, 6]).map(a => atIndex(a, [0, 3, 6]))
      this.middleValue = this.baseGrid[1][1]
    } else {
      this.baseGrid = []
    }
  }
}
