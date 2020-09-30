import {isEqual, isWatching} from '@core/utils';

export class SubscribeStore {
  constructor(store) {
    this.store = store
    this.sub = null
    this.prevState = {}
  }

  subscriberComponents(components) {
    this.prevState = this.store.getState()

    this.sub = this.store.subscribe(state => {
      Object.keys(state).forEach(key => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach(component => {
            if (isWatching(component.subscribers, key)) {
              component.storeChanges(state)
            }
          })
        }
      })

      this.prevState = this.store.getState()
    })
  }

  unsubscribeFroStore() {
    this.sub.unsubscribe()
  }
}
