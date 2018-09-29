'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import '../style/app.scss'
import App from './components/app'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app'))
}, false)
