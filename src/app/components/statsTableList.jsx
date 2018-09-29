import React, { Component } from 'react'
import StatsTable from './statsTable'
class StatsTableList extends Component {
  render() {
    return (
      <div>
        {this.props.statsTables.slice(0).reverse().map((t, i) => <StatsTable aggregate={t} key={i}/>) }        
      </div>
    )
  }
}
export default StatsTableList
