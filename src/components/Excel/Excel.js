import {$} from '@core/Dom';

export class Excel {
  static name = 'excel'

  constructor(selector, options) {
    this.$el = $(document.querySelector(selector))
    this.components = options.components ?? []
  }

  getRoot() {
    const $root = $.create('div', Excel.name)

    this.components = this.components.map((Component => {
      const el = $.create('div', `${Component.name}`)
      const component = new Component(el)
      el.html( component.toHTML())

      $root.append(el)

      return component
    }))

    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.components.forEach(component => component.init())
  }
}
