import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static name = 'formula'

  constructor($root, options) {
    super($root, {
      listeners: ['keyup', 'input'],
      ...options
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
    const input = this.$root.find('.input')

    this.$on('table:input', (content) => {
      input.text(content)
    })

    this.$on('table:select', (content) => {
      input.text(content)
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
