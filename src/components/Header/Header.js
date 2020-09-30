import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';
import * as actions from '@/components/redux/actions';

export class Header extends ExcelComponent {
  static name = 'header'

  constructor($root, options) {
    super($root, {
      listeners: ['input'],
      subscribers: ['excelName'],
      ...options
    });
  }

  toHTML() {
    const excelName = this.store.getState().excelName || 'Новая Таблица'

    return `
      <input type="text" class="header__input" value=${excelName}/>
      <div>
        <div class="button">
          <span class="material-icons">
              delete
          </span>
        </div>
        <div class="button">
          <span class="material-icons">
              exit_to_app
          </span>
        </div>
      </div>
    `
  }

  onInput = (e) => {
    this.$dispatch(actions.changeExcelNameCreator({value: $(e.target).text()}))
  }

  init() {
    super.initListeners(this)
  }
}
