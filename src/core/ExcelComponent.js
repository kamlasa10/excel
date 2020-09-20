import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options) {
    super($root, options)
    this.emitter = options.emitter
    this.unSubscribers = []

    this.prepare()
  }

  $emit(eventType, ...args) {
    this.emitter.emit(eventType, ...args)
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
