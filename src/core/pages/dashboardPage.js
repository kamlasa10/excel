import {Page} from '@core/page';
import {$} from '@core/Dom';
import {renderRecords} from '@core/pages/dashboard.functions';

export class DashboardPage extends Page {
  static pageName = 'dashboard'

  constructor() {
    super();
  }

  getRoot() {
    const now = Date.now()
    const $el = $.create('div', 'db')

    $el.html(`
      <div class="db__header">
    <h1>Excel. Панель управления</h1>
  </div>
  <div class="db__new">
    <div class="db__view">
      <a data-create="table" href="#excel/${now}" class="db__create">
        Новая <br> Таблица
      </a>
    </div>
  </div>
  <div class="db__table db__view">
    ${renderRecords()}
  </div>
    `)

    return $el
  }
}
