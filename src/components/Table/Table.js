import {ExcelComponent} from '@core/ExcelComponent';
import {tableRender} from '@/components/Table/table.template';
import {
  changeCell,
  isCell,
  isPress,
  shouldResize
} from '@/components/Table/table.functions';
import {resizeHandler} from '@/components/Table/table.resize';
import {TableSelection} from '@/components/Table/TableSelection';
import {$} from '@core/Dom';
import {transformStrToArr} from '@core/utils';
import {matrix, nextCell, range} from '@/components/Table/table.helpers';
import * as actions from '@/components/redux/actions';
import {parse} from '@core/parse';

const ROW_COUNT = 20

export class Table extends ExcelComponent {
  static name = 'table'

  constructor($root, options) {
    super($root, {
      listeners: ['mousedown', 'keyup', 'input'],
      subscribers: ['currentText', 'dataStyles'],
      ...options
    })
    this.$root = $root
    this.keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight'
    ]
  }

  toHTML() {
    return tableRender(ROW_COUNT, this.store.getState())
  }

  prepare() {
    this.tableSelection = new TableSelection()
  }

  storeChanges({currentText}) {
    this.tableSelection.current.text(currentText)
  }

  updateText(value, cell) {
    this.store.dispatch(
        actions.changeTextCreator(value, cell)
    )
  }

  init() {
    super.initListeners(this)

    this.$on('formula:input', (content) => {
      const cell = this.tableSelection.current.id()

      this.updateText(content, cell)
      this.tableSelection.current.attr('data-value', content)
      this.tableSelection.current.text(parse(content))
    })

    this.$on('toolbar:click', styles => {
      Object.keys(styles).forEach(style => {
        this.tableSelection.current.css({
          [style]: styles[style]
        })
      })

      this.$dispatch(actions.changeToolbarStylesCreator({
        styles: styles,
        id: this.tableSelection.current.id()
      }))
    })

    this.$on('formula:done', () => {
      this.tableSelection.current.focus()
    })

    const activeCell = $(`[data-cell="1:0"]`)

    this.tableSelection.select(activeCell)
    this.$emit('table:select', activeCell.text(), activeCell)
  }

  async resize(e) {
    const data = await resizeHandler(e)
    this.$dispatch(actions.tableResizeCreator(data))
  }

  onMousedown = (e) => {
    if (shouldResize(e)) {
      this.resize(e)
    } else if (isCell(e)) {
      const $cell = $(e.target)

      if (isPress(e)) {
        const cellStart = transformStrToArr(
            this.tableSelection.current.id(),
            ':'
        )
        const cellEnd = transformStrToArr($cell.id(), ':')
        const cells = matrix(
            range(+cellStart[0], +cellEnd[0]),
            range(+cellStart[1], +cellEnd[1]))

        this.tableSelection.selectGroup(cells)
      } else {
        const content = $cell.text()

        this.tableSelection.select($cell)
        this.$emit('table:select', content, this.tableSelection.current)
      }
    }
  }

  onKeyup = (e) => {
    if (changeCell(this.keys, e)) {
      e.preventDefault()
      const ids = this.tableSelection.current.id(true)
      const $cell = nextCell(e.key, ids, ROW_COUNT)

      this.tableSelection.select($cell)
      this.$emit('table:select', $cell.text(), this.tableSelection.current)
    }
  }

  onInput = (e) => {
    const id = this.tableSelection.current.id()
    this.updateText($(e.target).text(), id)
  }
}

