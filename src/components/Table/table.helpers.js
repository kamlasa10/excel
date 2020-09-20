import {$} from '@core/Dom';

export function matrix(row, col) {
  const cells = []
  row.forEach(item => {
    col.forEach(i => {
      const cell = document.querySelector(`[data-cell="${item}:${i}"]`)
      cells.push($(cell))
    })
  })

  return cells
}

export function range(start, end) {
  const cellsNumber = []

  if (start > end) {
    [end, start] = [start, end]
  }

  for (let i = start; i <= end; i++) {
    cellsNumber.push(+i)
  }

  return cellsNumber
}

export function nextCell(key, {row, col}, rowCount) {
  const MIN_VALUE = 0
  const MAX_VALUE = rowCount

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = row + 1 > MAX_VALUE ? row : ++row
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col = col -1 < MIN_VALUE ? col : --col
      break
    case 'ArrowUp':
      console.log(row - 1)
      row = row - 1 <= MIN_VALUE ? row : --row
      break
  }

  return $(`[data-cell="${row}:${col}"]`)
}
