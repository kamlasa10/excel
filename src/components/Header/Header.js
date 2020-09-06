import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static name = 'header'

  constructor($root) {
    super($root, {
      listeners: ['click']
    });
  }

  toHTML() {
    return `
      <input type="text" class="header__input" value="Новая таблица"/>
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

  onClick() {
    console.log('click')
  }

  init() {
    super.initListeners(this)
  }
}
