import React, { Component } from 'react'
import { offsetToColourFn } from '../colours'
import Row from './row'
let math = require('../math')
class StatsTable extends Component {

  render() {
    if (!this.props.aggregate || this.props.aggregate.sampleCount === 0) {
      return (<div></div>)
    }
    let aggregate = this.props.aggregate
    let colorFn = offsetToColourFn(aggregate.stats.totalDeviation)
    let bedId = 'bed_grid_' + aggregate.id

    let sampleDesc = (aggregate.sampleCount > 1)
      ? aggregate.sampleCount + ' samples. ' + aggregate.capturedOn
      : aggregate.capturedOn

    return (
      <div key={bedId} id={bedId} className='bed_grid'>
        <div className='session_title'>
          <h4>{sampleDesc}</h4>
        </div>
        <div className='session_desc'>
          Total bed deviation: {math.round(aggregate.stats.totalDeviation, 2)} mm (worst point: {math.round(aggregate.stats.singleDeviation, 2)} mm)
        </div>
        <table>
          <tbody>
            {aggregate.stats.baseGrid.map((row, index) => <Row statsArr={row} colourFn={colorFn} key={index} />)}
          </tbody>
        </table>
      </div>
    )
  }
}
export default StatsTable
