'use strict'
function hsvToRgb(h, s, v) {
  let r, g, b

  let i = Math.floor(h * 6)
  let f = h * 6 - i
  let p = v * (1 - s)
  let q = v * (1 - f * s)
  let t = v * (1 - (1 - f) * s)

  switch (i % 6) {
    case 0: {
      r = v; g = t; b = p; break
    }
    case 1: {
      r = q; g = v; b = p; break
    }
    case 2: {
      r = p; g = v; b = t; break
    }
    case 3: {
      r = p; g = q; b = v; break
    }
    case 4: {
      r = t; g = p; b = v; break
    }
    case 5: {
      r = v; g = p; b = q; break
    }
  }

  return [r * 255, g * 255, b * 255]
}

function offsetRemapper(offset, peak) {
  let saturationLimit = 0.85
  return saturationLimit * Math.min(Math.abs(offset), peak) / peak
}

function toHexString(rgb) {
  return '#' + rgb.map(s => Number(Math.round(s)).toString(16).padStart(2, '0')).join('')
}

export function offsetToColourFn(peak) {
  return function (offset) {
    let level = offsetRemapper(offset, peak)
    if (offset > 0) {
      // blue
      return toHexString(hsvToRgb(0.65, level, 0.8))
    } else if (offset < 0) {
      // red
      return toHexString(hsvToRgb(0.0, level, 0.8))
    }
    return '#fff'
  }
}
