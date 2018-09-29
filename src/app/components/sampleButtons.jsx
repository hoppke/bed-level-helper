import React, { Component } from 'react'
class SampleButtons extends Component {
  render() {
    const clickFn = (s) => {
      return () => { this.props.setDataFn(require('../samples/sample_' + s + '.txt')) }
    }
    return (
      <div className="samples">
        {['Sample 0 (random)',
          'Sample 1 (cold)', 
          'Sample 2 (cold)', 
          'Sample 3 (cold)',
          'Sample 4 (60\u2103)', 
          'Sample 5 (60\u2103)', 
          'Sample 6 (<60\u2103)', 
          'Sample 7 (<60\u2103)'].map((name, i) =>
          <button id="sample_{i}" className="sample" onClick={clickFn(i)} key={i}>{name}</button>
        )}
      </div>
    )
  }
}
export default SampleButtons
