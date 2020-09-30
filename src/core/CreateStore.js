export class CreateStore {
  constructor(rootReducer, initState) {
    this.reducer = rootReducer
    this.state = this.reducer({...initState}, {type: '__INIT__'})
    this.listeners = []
  }

  subscribe(fn) {
    this.listeners.push(fn)

    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn)
    }
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action)
    this.listeners.forEach(listener => listener(this.state))
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state))
  }
}
