import React, { Component } from 'react'
import CellStat from './cellStat'
class Row extends Component {
  render() {
    return (
      <tr>
        {this.props.statsArr.map((stat, index) => <CellStat stat={stat} colour={this.props.colourFn(stat.median)} key={index}/>)}
      </tr>
    )    
  }
}
export default Row
