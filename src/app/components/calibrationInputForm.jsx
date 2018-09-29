import React, { Component } from 'react'
class CalibrationInputForm extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.rawSample
    }
  }

  updateState(e) {
    this.setState({ value: e.target.value })
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.rawSample) {
      this.setState({ value: nextProps.rawSample })
    }
  }

  submitSample() {
    this.props.submitSampleFn(this.state.value)
  }

  render() {
    return (
      <div className="calibration_input">
        <label>Calibration data:</label>
        <textarea className="calibration_data" value={this.state.value} onChange={this.updateState.bind(this)}></textarea>
        <button className="evaluate_add_to_series" onClick={this.submitSample.bind(this)}>Add G80 sample</button>
      </div>
    )
  }
}
export default CalibrationInputForm
