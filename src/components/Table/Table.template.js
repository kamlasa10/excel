const CODES = {
  A: 65,
  Z: 90
}

function templateRow(template, i = '') {
  return `
    <div class="row">
        <div class="row-info">
          ${i}
        </div>
        <div class="row-data">
          ${template}
        </div>
       </div>
  `
}

export function tableRender(rowCount) {
  const colsCount = CODES.Z - CODES.A + 1
  let charsColumn = []
  let cells = []
  const table = []

  for (let i = 0; i <= colsCount; i++) {
    const char = String.fromCharCode(CODES.A + (i))
    charsColumn.push(char)
  }

  charsColumn = charsColumn.map(char => {
    return ` <div class="column">${char}</div>`
  })

  table.push(templateRow(charsColumn.join('')))

  cells = new Array(charsColumn.length)
      .fill('')
      .map(item => `<div class="cell" contenteditable="true"></div>`)

  for (let i = 0; i < rowCount; i++) {
    table.push(templateRow(cells.join(''), i + 1))
  }

  return table.join('')
}
