import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, options) {
    if (!$root) {
      throw new Error('$root must be have provided in Component')
    }

    this.listeners = options.listeners || []
    this.$root = $root
  }
  initListeners(component) {
    this.listeners.forEach(eventName => {
      const methodName = getMethodName(eventName)

      if (!this[methodName]) {
        throw new Error(`Method ${methodName} not provider in $root`)
      }

      this.$root.on(eventName, this[methodName])
    })
  }

  removeListener() {
    this.listeners.forEach(eventName => {
      const methodName = getMethodName(eventName)
      this.$root.remove(eventName, this[methodName])
    })
  }
}

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`
}
