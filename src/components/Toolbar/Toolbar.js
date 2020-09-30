import {renderToolbar} from '@/components/Toolbar/toolbar.template';
import {$} from '@core/Dom';
import {ComponentState} from '@core/ComponentState';
import {kebabCaseToCamel, transformStrToArr} from '@core/utils';

export class Toolbar extends ComponentState {
  static name = 'toolbar'

  constructor($root, options) {
    super($root, {
      ...options,
      listeners: ['click'],
    })
  }

  toHTML() {
    return renderToolbar(this.state)
  }

  get template() {
    return renderToolbar(this.state)
  }

  prepare() {
    this.initState({
      textAlign: 'left',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none'
    })
  }

  init() {
    super.initListeners(this)
    this.$on('table:select', (_, cell) => {
      let styles = transformStrToArr(cell.attr('style'), ';')

      styles = styles.reduce((acc, style) => {
        let [prop, value] = transformStrToArr(style, ':')
        prop = kebabCaseToCamel(prop).replace(/ /g, '')

        if (!prop || prop === 'width') {
          return acc
        }

        value = value.replace(/ /g, '')
        acc[prop] = value
        return acc
      }, {})

      this.setState(styles)
    })
  }

  onClick = (e) => {
    const $target = $(e.target)

    if ($target.data('type') === 'button') {
      const value = JSON.parse($target.data('value'))
      Object.keys(this.state).forEach(key => {
        if (value[key]) {
          this.setState({[key]: value[key]})
          this.$emit('toolbar:click', this.state)
        }
      })
    }
  }
}
