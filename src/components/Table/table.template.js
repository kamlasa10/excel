const CODES = {
  A: 65,
  Z: 90
}

function templateRow(template, i = '') {
  const resize = i ?
    '<div data-resize="resizable" class="row-resize"></div>' :
    ''
  return `
    <div data-type="row" class="row">
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

function toCol(content, i) {
  return `
     <div 
          class="column" 
          data-col="${i}"
          data-type="col"
          >
      ${content}
      <div data-resize="resizable" class="col-resize"></div>
     </div>
  `
}

function toCell(rowNum) {
  return function(_, i) {
    return `<div class="cell" 
          data-cell="${rowNum}:${i}"
          data-col="${i}"
          contenteditable="true"></div>`
  }
}

export function tableRender(rowCount) {
  const colsCount = CODES.Z - CODES.A + 1
  let charsColumn = []
  const table = []

  for (let i = 0; i < colsCount; i++) {
    const char = String.fromCharCode(CODES.A + (i))
    charsColumn.push(char)
  }

  charsColumn = charsColumn.map(toCol).join('')

  table.push(templateRow(charsColumn))

  for (let i = 0; i < rowCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(i + 1))
        .join('')

    table.push(templateRow(cells, i + 1))
  }

  return table.join('')
}
