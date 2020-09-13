import {ExcelComponent} from '@core/ExcelComponent';
import {tableRender} from '@/components/Table/table.template';
import {shouldResize} from '@/components/Table/table.functions';
import {resizeHandler} from '@/components/Table/table.resize';

const ROW_COUNT = 20

export class Table extends ExcelComponent {
  static name = 'table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
    this.$root = $root
  }

  toHTML() {
    return tableRender(ROW_COUNT)
  }

  init() {
    super.initListeners(this)
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(e)
    }
  }
}
