import {ExcelComponent} from '@core/ExcelComponent';

export class ComponentState extends ExcelComponent {
  constructor(...props) {
    super(...props)
  }

  get template() {
    return 'html'
  }

  initState(state = {}) {
    this.state = state
  }

  setState(newState) {
    this.state = {...this.state, ...newState}
    this.$root.html(this.template)
  }
}
