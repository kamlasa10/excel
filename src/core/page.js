export class Page {
  constructor() {
  }

  getRoot() {
    throw new Error('getRoot must be provided in Component')
  }

  afterRender() {}
}
