export function max(arr) {
  return Math.max.apply(Math, arr)
}

export function min(arr) {
  return Math.min.apply(Math, arr)
}

export function median(arr) {
  arr.sort((a, b) => a - b)
  let half = Math.floor(arr.length / 2)

  if (arr.length % 2) {
    return arr[half]
  } else {
    return (arr[half - 1] + arr[half]) / 2.0
  }
}

export function round(n, p) {
  return Number(n.toFixed(p))
}
