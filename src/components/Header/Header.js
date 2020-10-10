import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';
import * as actions from '@/components/redux/actions';
import {ActiveRoute} from '@core/routes/activeRoute';

export class Header extends ExcelComponent {
  static name = 'header'

  constructor($root, options) {
    super($root, {
      listeners: ['input', 'click'],
      subscribers: ['excelName'],
      ...options
    });
  }

  toHTML() {
    const excelName = this.store.getState().excelName || 'Новая Таблица'

    return `
      <input type="text" class="header__input" value=${excelName}/>
      <div>
        <a href="#dashboard" data-delete="delete" class="button">
          <span data-delete="delete" class="material-icons">
              delete
          </span>
        </a>
        <a href="#dashboard" class="button">
          <span class="material-icons">
              exit_to_app
          </span>
        </a>
      </div>
    `
  }

  onInput = (e) => {
    this.$dispatch(actions.changeExcelNameCreator({value: $(e.target).text()}))
  }

  onClick(e) {
    const $target = $(e.target)

    if ($target.data('delete')) {
      localStorage.removeItem(`excel:${ActiveRoute.param}`)
    }
  }

  init() {
    super.initListeners(this)
  }
}
