'use strict'
import { parse, offsetToColourFn } from './parser'
import '../style/app.scss'

const sample = require('./sample.txt')

function getActiveHolder() {
  return document.getElementById('active_box_holder')
}

function insertNewBoxHolder() {
  let template = document.getElementsByClassName('box_holder_template')[0]
  let newHolder = template.cloneNode(true)
  newHolder.classList.remove('box_holder_template')
  // deactivate old box holder, if present

  while (getActiveHolder()) {
    getActiveHolder().removeAttribute('id')
  }
  newHolder.id = 'active_box_holder'

  newHolder.getElementsByClassName('calibration_data')[0].value = sample
  newHolder.getElementsByClassName('evaluate')[0].onclick = function (d) { fireUpdate(d); insertNewBoxHolder(d) }
  document.getElementsByClassName('holders_stack')[0].appendChild(newHolder)
}

function main() {
  insertNewBoxHolder()
}

function getFirstActive(classname) {
  return getActiveHolder().getElementsByClassName(classname)[0]
}

function fireUpdate(event) {
  let calibrationData = getFirstActive('calibration_data').value
  let parsedData = parse(calibrationData)
  console.log(parsedData)

  getFirstActive('calibration_input').remove()
  renderBed(parsedData)
  renderCalibrationPoints(parsedData)
  return false
}

function renderCalibrationPoints(data) {
  let node = getFirstActive('calibration_points')
  let cNode = node.cloneNode(false)
  node.parentNode.replaceChild(cNode, node)

  let grids = { rows: data.points_array.length, columns: data.points_array[0].length }

  let colorFn = offsetToColourFn(0.7)

  let tbody = document.createElement('tbody')

  for (let row = 0; row < grids.rows; row++) {
    let rowNode = document.createElement('tr')
    tbody.appendChild(rowNode)
    for (let column = 0; column < grids.columns; column++) {
      let td = document.createElement('td')
      let cellValue = data.points_array[row][column]
      td.innerHTML = Number(cellValue).toFixed(3)
      // td.dataset['value']= cellValue
      // td.dataset['color']=td.bgColor
      td.bgColor = colorFn(cellValue)
      rowNode.appendChild(td)
    }
  }
  cNode.appendChild(tbody)
}

function renderBed(data) {
  let node = getFirstActive('bed_grid')
  let cNode = node.cloneNode(false)
  node.parentNode.replaceChild(cNode, node)

  let grids = { rows: data.core_array.length, columns: data.core_array[0].length }

  let colorFn = offsetToColourFn(data.overall_deviation)

  let tbody = document.createElement('tbody')

  for (let row = 0; row < grids.rows; row++) {
    let rowNode = document.createElement('tr')
    tbody.appendChild(rowNode)
    for (let column = 0; column < grids.columns; column++) {
      let td = document.createElement('td')
      let cellValue = data.core_array[row][column]
      td.innerHTML = Number(cellValue).toFixed(3)
      // td.dataset['value']= cellValue
      // td.dataset['color']=td.bgColor
      td.bgColor = colorFn(cellValue)
      rowNode.appendChild(td)
    }
  }

  let head = document.createElement('h2')
  head.innerText = new Date().toLocaleTimeString()
  head.className = 'timestamp'

  cNode.parentNode.prepend(head)
  cNode.appendChild(tbody)
}

document.addEventListener('DOMContentLoaded', main, false)

// class TestClass {
//   constructor() {
//     let msg = 'Using ES2015+ syntax'
//     console.log(msg)
//   }
// }

// let test = new TestClass()
