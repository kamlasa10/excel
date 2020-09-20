export class TableSelection {
  constructor() {
    this.current = null
    this.cellsSelected = []
  }

  clear() {
    this.cellsSelected.forEach(cell => {
      cell.removeClass('selected')
    })

    this.cellsSelected = []
  }

  selectGroup(cells) {
    this.clear()

    cells.forEach(cell => {
      cell.addClass('selected')
      this.cellsSelected.push(cell)
    })
  }

  select(selection) {
    this.clear()

    this.current = selection
    this.cellsSelected.push(this.current)
    this.current.focus().addClass('selected')
  }
}
