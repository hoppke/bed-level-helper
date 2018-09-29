import * as math from './math'

export function aggregate(normalizedSample) {
  return new Aggregate(normalizedSample)
}

export class Aggregate {

  constructor(sample) {
    this.samples = []
    this.stats = []
    this.sampleCount = 0
    if (sample) {
      if (Array.isArray(sample)) {
        this.samples = sample
      } else {
        this.samples.push(sample)
      }
      this.sampleCount = this.samples.length
      this.stats = this._recalculateStats()   
    }
    this.capturedOn = this._capturedOn()
  }

  _recalculateStats() {
    let statsGrid = []

    let xs = this.samples[0].columns
    let ys = this.samples[0].rows

    for (let y = 0; y < ys; y++) {
      statsGrid[y] = []
      for (let x = 0; x < xs; x++) {
        let series = this.samples.map(r => r.baseGrid[y][x])
        let min = math.min(series)
        let max = math.max(series)
        let median = math.median(series)
        statsGrid[y][x] = new CellStat(min, max, median)
      }
    }
    return new Stats(statsGrid, this.samples.length)
  }

  _capturedOn() {
    switch (this.sampleCount) {
      case 0:
        return ''
      case 1:
        return this.samples[0].date.toLocaleTimeString()
      default:
        return this.samples[0].date.toLocaleTimeString() + ' - ' + this.samples[this.samples.length - 1].date.toLocaleTimeString()
    }
  }
}

class CellStat {
  constructor(min, max, median) {
    this.min = min
    this.max = max
    this.median = median
  }
}

class Stats {
  constructor(baseGrid, sampleCount) {
    this.baseGrid = baseGrid
    this.sampleCount = sampleCount
    this.rows = this.baseGrid && this.baseGrid.length
    this.columns = this.baseGrid && this.baseGrid[0] && this.baseGrid[0].length
    let flat = this.baseGrid.reduce((acc, val) => acc.concat(val), [])
    let medians = flat.map(s => s.median)
    let min = math.min(medians)
    let max = math.max(medians)
    this.totalDeviation = max - min
    this.singleDeviation = Math.max(Math.abs(max), Math.abs(min))
  }
}
