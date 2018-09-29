import * as math from './math'

export class NormalizedBedSample {

  _normalise(arr, offset) {
    return arr.map(row => row.map(v => v + offset))
  }

  constructor(bedSample) {
    this.baseGrid = this._normalise(bedSample.baseGrid, -bedSample.middleValue)
    this.middleValue = this.baseGrid && this.baseGrid[1][1]
    this.rows = this.baseGrid && this.baseGrid.length
    this.columns = this.baseGrid && this.baseGrid[0] && this.baseGrid[0].length
    let flat = this.baseGrid.reduce((acc, val) => acc.concat(val), [])
    let min = math.min(flat)
    let max = math.max(flat)
    this.totalDeviation = max - min
    this.singleDeviation = Math.max(Math.abs(max), Math.abs(min))
    this.date = new Date()
  }
}

export function normalise(bedSample) {
  return new NormalizedBedSample(bedSample)
}
