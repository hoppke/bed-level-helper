/* eslint-disable no-undef */
const parser = require('./parser')

let sampleOne = 'Send: G29 T1\n' +
  'Recv: echo:Home XYZ first\n' +
  'Recv: \n' +
  'Recv: Bed Topography Report for CSV:\n' +
  'Recv: \n' +
  'Recv: 0.256 0.170 0.140 0.535 0.183 0.159 0.054\n' +
  'Recv: 0.488 0.277 0.174 -0.049 0.125 0.020 0.027\n' +
  'Recv: 0.479 0.197 0.220 0.062 0.116 0.062 -0.053\n' +
  'Recv: 0.315 0.306 0.126 0.079 -0.096 -0.008 0.014\n' +
  'Recv: 0.444 0.362 0.162 0.084 -0.160 -0.100 -0.074\n' +
  'Recv: 0.506 0.293 0.195 0.274 0.093 -0.040 0.040\n' +
  'Recv: 0.583 0.265 0.174 0.517 0.042 -0.021 -0.083\n' +
  'Recv: ok P15 B3\n'

test('Can deal with missing data', () => {
  function asserts(sample) {
    expect(sample.baseGrid).toEqual([])
    expect(sample.columns).toEqual(0)
    expect(sample.rows).toEqual(0)
    expect(sample.points).toEqual([])
  }

  asserts(parser.parse(''))

  asserts(parser.parse(null))

  asserts(parser.parse('foo\nbar\nbaz'))
})

test('Sunny scenario', () => {
  let result = parser.parse(sampleOne)
  expect(result.points).toEqual([
    [0.256, 0.17, 0.14, 0.535, 0.183, 0.159, 0.054],
    [0.488, 0.277, 0.174, -0.049, 0.125, 0.02, 0.027],
    [0.479, 0.197, 0.22, 0.062, 0.116, 0.062, -0.053],
    [0.315, 0.306, 0.126, 0.079, -0.096, -0.008, 0.014],
    [0.444, 0.362, 0.162, 0.084, -0.16, -0.1, -0.074],
    [0.506, 0.293, 0.195, 0.274, 0.093, -0.04, 0.04],
    [0.583, 0.265, 0.174, 0.517, 0.042, -0.021, -0.083]
  ])
  expect(result.columns).toEqual(7)
  expect(result.rows).toEqual(7)
  expect(result.middleValue).toEqual(0.079)
  expect(result.baseGrid).toEqual([
    [ 0.256, 0.535, 0.054 ],
    [ 0.315, 0.079, 0.014 ],
    [ 0.583, 0.517, -0.083 ]
  ])
})
