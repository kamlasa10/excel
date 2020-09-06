import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static name = 'formula'

  constructor($root) {
    super($root, {
      listeners: ['input']
    })
  }
  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable="true" spellcheck="false"></div>
    `
  }

  init() {
    super.initListeners()
  }

  destroy() {
    super.removeListener()
  }

  onInput() {
    console.log('change')
  }
}
