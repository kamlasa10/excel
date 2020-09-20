export function shouldResize(e) {
  return e.target.dataset.resize
}

export function isCell(e) {
  return e.target.dataset.cell
}

export function isPress(e) {
  return e.shiftKey
}

export function changeCell(keys, e) {
  return keys.includes(e.key)
}
