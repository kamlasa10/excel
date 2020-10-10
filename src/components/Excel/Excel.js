import {$} from '@core/Dom';
import {Emitter} from '@core/Emitter';
import {SubscribeStore} from '@core/subscribeStore';
import {changeDateCreator} from '@/components/redux/actions';

export class Excel {
  static name = 'excel'

  constructor(options) {
    this.components = options.components ?? []
    this.store = options.store
    this.subscribe = new SubscribeStore(this.store)
  }

  getRoot() {
    const $root = $.create('div', Excel.name)
    const componentOptions = {
      emitter: new Emitter(),
      store: this.store
    }

    this.components = this.components.map((Component => {
      const el = $.create('div', `${Component.name}`)
      const component = new Component(el, componentOptions)
      el.html( component.toHTML())

      $root.append(el)

      return component
    }))

    return $root
  }

  render() {
    this.store.dispatch(changeDateCreator(new Date().toJSON()))
    this.components.forEach(component => component.init())
    this.subscribe.subscriberComponents(this.components)
  }
}
