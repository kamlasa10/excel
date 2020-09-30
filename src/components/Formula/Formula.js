import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static name = 'formula'

  constructor($root, options) {
    super($root, {
      listeners: ['keyup', 'input'],
      subscribers: ['currentText'],
      ...options
    })
  }
  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable="true" spellcheck="false"></div>
    `
  }

  storeChanges({currentText}) {
    this.formula.text(currentText)
  }

  init() {
    super.initListeners()
    this.formula = this.$root.find('.input')

    this.$on('table:select', (_, cell) => {
      this.formula.text(cell.data('value'))
    })
  }

  destroy() {
    super.removeListener()
  }

  onInput = (e) => {
    const text = e.target.textContent
    this.emitter.emit('formula:input', text)
  }

  onKeyup = (e) => {
    const keys = ['Enter', 'Tab']
    if (keys.includes(e.key)) {
      e.preventDefault()
      this.$emit('formula:done')
    }
  }
}
