import React, { Component } from 'react'
import SampleButtons from './sampleButtons'
import CalibrationInputForm from './calibrationInputForm'
import { Store } from '../store'
import StatsTable from './statsTable'
import { parse } from '../parser'
import { normalise } from '../normaliser'
import { Aggregate } from '../aggregator'
import StatsTableList from './statsTableList'

class App extends Component {

  constructor(props) {
    super(props)
    let agg = new Aggregate()
    this.state = {
      sampleText: '',
      dataSeries: new Store(),
      openSession: agg,
      closedSessions: []
    }
  }

  setSampleText(text) {
    this.setState({ sampleText: text })
  }

  submitSample(text) {
    let parsedSample = parse(text)
    let normalised = normalise(parsedSample)
    this.setState((prevState, props) => {
      let oldSamples = prevState.openSession.samples
      let agg = new Aggregate(oldSamples.concat(normalised))
      return { openSession: agg }
    })
  }

  closeSession() {
    this.setState((s, p) => {
      let closedSessions = s.closedSessions.concat(s.openSession)
      let agg = new Aggregate()
      return { closedSessions: closedSessions, openSession: agg }
    })
  }

  render() {
    return (
      <div className="app">
        <SampleButtons setDataFn={this.setSampleText.bind(this)}/>
        <div className="left_box">
          <CalibrationInputForm rawSample={this.state.sampleText} submitSampleFn={this.submitSample.bind(this)}/>
          <button className="evaluate_finish_series" onClick={this.closeSession.bind(this)}>Finish session</button>
        </div>
        <div className="right_box holders_stack" id="active_box_holder">
          <StatsTable id='open_session' aggregate={this.state.openSession}/>
        </div>
        <div id="finished_sessions" className="bottom_box">
          <StatsTableList statsTables={this.state.closedSessions} />
        </div>
      </div>
    )
  }
}
export default App
