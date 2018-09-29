import React, { Component } from 'react'
let math = require('../math')
class CellStat extends Component {
  render() {
    var precisionVO = ''
    var pipsVO = ''
    if (this.props.stat.min !== this.props.stat.max) {
      let absMax = Math.abs(this.props.stat.max)
      let absMin = Math.abs(this.props.stat.min)
      if ((absMax - absMin) <= 0.01) {
        precisionVO = 'error within 0.01'
      } else {
        precisionVO = 'error within ~' + math.round(Math.abs(this.props.stat.max - this.props.stat.min), 2)
        if (absMax - absMin > 0.05) {
          let downSlack = math.round(Math.abs(this.props.stat.median - this.props.stat.min), 2)
          let upSlack = math.round(Math.abs(this.props.stat.max - this.props.stat.median), 2)
          pipsVO = '+' + upSlack + '/-' + downSlack + ' slack'
        }
      }
      return (
        <td style={{ backgroundColor: this.props.colour }}>
          <div>{math.round(this.props.stat.median, 2)}</div>
          <div>{precisionVO}</div>
          <div>{pipsVO}</div>
        </td>)
    } else {
      return (
        <td style={{ backgroundColor: this.props.colour }}>
          <div>{math.round(this.props.stat.median, 2)}</div>
          <div></div>
          <div></div>
        </td>)
    }
  }
}
export default CellStat
