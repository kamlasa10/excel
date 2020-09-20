export class Emitter {
  constructor() {
    this.subscribers = {}
  }

  subscribe(eventType, fn) {
    this.subscribers[eventType] = this.subscribers[eventType] || []
    this.subscribers[eventType].push(fn)

    return () => {
      this.subscribers = this.subscribers[eventType]
          .filter(subscribe => subscribe !== fn)
    }
  }

  emit(eventType, ...args) {
    if (!Array.isArray(this.subscribers[eventType])) return
    this.subscribers[eventType].forEach(subscribe => subscribe(...args))
  }
}
