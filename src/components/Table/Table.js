import {ExcelComponent} from '@core/ExcelComponent';
import {tableRender} from '@/components/Table/Table.template';

export class Table extends ExcelComponent {
  static name = 'table'

  constructor($root) {
    super($root, {
      listeners: ['click']
    });
  }

  toHTML() {
    return tableRender(100)
  }

  init() {
    super.initListeners(this)
  }

  onClick() {
    console.log('click')
  }
}
