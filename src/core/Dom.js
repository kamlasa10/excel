class Dom {
  constructor(node) {
    this.$el = typeof node === 'string' ? document.querySelector(node) : node
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
    }

    return this.$el.innerHTML
  }

  clear() {
    this.$el.innerHTML = ''
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }

  on(eventName, fn) {
    this.$el.addEventListener(eventName, fn)
  }

  remove(eventName, fn) {
    this.$el.removeEventListener(eventName, fn)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = function(tagName, classes) {
  const el = document.createElement(tagName)
  el.classList.add(classes)

  return $(el)
}


