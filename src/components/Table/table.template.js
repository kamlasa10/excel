import {camelToKebabCase} from '@core/utils';
import {parse} from '@core/parse';

const CODES = {
  A: 65,
  Z: 90
}
const DEFAULT_VALUE = {
  width: 120,
  height: 24
}

const DEFAULT_STYLES = {
  textAlign: 'left',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none'
}

function templateRow(template, i = '', state) {
  const resize = i ?
    '<div data-resize="resizable" class="row-resize"></div>' :
    ''
  const value = getValue(i, state, 'rowsState')

  return `
    <div style="height: ${value}" data-row="${i}" data-type="row" class="row">
        <div class="row-info">
          ${i ? i : ''}
          ${resize}
        </div>
        <div class="row-data">
          ${template}
        </div>
     </div>
  `
}

function getValue(i, state, propName) {
  if (propName === 'colsState') {
    return (state[propName][i] || DEFAULT_VALUE.width) + 'px'
  }

  return (state[propName][i] || DEFAULT_VALUE.height) + 'px'
}

function getText(id, state) {
  return state.dataState[id] || ''
}

function getStyles(id, state) {
  const styles = state.dataStyles[id] || DEFAULT_STYLES

  return Object.keys(styles).map(style => {
    return `${camelToKebabCase(style)}:${styles[style]};`
  }).join('')
}

function toCol(state) {
  return (content, i) => {
    const value = getValue(i, state, 'colsState')
    return `
       <div 
            class="column" 
            data-col="${i}"
            data-type="col"
            style="width: ${value}"
            >
        ${content}
        <div data-resize="resizable" class="col-resize"></div>
       </div>
  `
  }
}

function toCell(rowNum, state) {
  return function(_, i) {
    const value = getValue(i, state, 'colsState')
    const text = getText(`${rowNum}:${i}`, state)
    const styles = getStyles(`${rowNum}:${i}`, state)
    return `<div class="cell" 
          data-cell="${rowNum}:${i}"
          data-col="${i}"
          style="width: ${value}; ${styles}"
          data-value="${text || ''}"
          contenteditable="true">${parse(text)}</div>`
  }
}

export function tableRender(rowCount, state) {
  const colsCount = CODES.Z - CODES.A + 1
  let charsColumn = []
  const table = []

  for (let i = 0; i < colsCount; i++) {
    const char = String.fromCharCode(CODES.A + (i))
    charsColumn.push(char)
  }

  charsColumn = charsColumn.map(toCol(state)).join('')
  table.push(templateRow(charsColumn, '', state))
  for (let i = 0; i < rowCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(i + 1, state))
        .join('')

    table.push(templateRow(cells, i + 1, state))
  }

  return table.join('')
}
