import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options) {
    super($root, options)
    this.emitter = options.emitter
    this.store = options.store
    this.subscribers = options.subscribers || []
    this.unSubscribers = []

    this.prepare()
  }

  $emit(eventType, ...args) {
    this.emitter.emit(eventType, ...args)
  }

  storeChanges(state) {}

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.store.subscribe(fn)
  }

  $on(eventType, fn) {
    const unsub = this.emitter.subscribe(eventType, fn)
    this.unSubscribers.push(unsub)
  }

  toHTML() {
    return ''
  }

  prepare() {}
}
