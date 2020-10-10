import {$} from '@core/Dom';
import {ActiveRoute} from '@core/routes/activeRoute';

export class Route {
  constructor(selector, pages = {}) {
    if (!selector) {
      throw new Error('selector is required')
    }

    this.$placeholder = $(selector)
    this.routes = pages
    this.init()
  }

  init() {
    this.$placeholder.on('click', this.onClickHandler)
    window.addEventListener('hashchange', this.changeHashHandler)
    this.changeHashHandler()
  }

  changeHashHandler = (e) => {
    const Page = this.routes[ActiveRoute.path.split('/')[0]] ||
      this.routes.dashboard

    if (Page) {
      const page = new Page()
      this.$placeholder.clear()
      this.$placeholder.append(page.getRoot())
      page.afterRender()
    }
  }
}
