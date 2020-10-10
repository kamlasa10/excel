
export function capitalize(str) {
  return (str[0].toLocaleUpperCase() + str.slice(1))
}

export function transformStrToArr(str, separator) {
  return str.split(separator)
}

export function formattedDate(d = new Date) {
  return [d.getDate(), d.getMonth()+1, d.getFullYear()]
      .map(n => n < 10 ? `0${n}` : `${n}`).join('.');
}

export function storage(key, data) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }

  localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  return a === b
}

export function isWatching(subscribers, key) {
  return subscribers.includes(key)
}

export function camelToKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function kebabCaseToCamel(s) {
  return s.replace(/-./g, x=>x.toUpperCase()[1])
}

export function debounce(fn, delay) {
  let timeout

  return function(...args) {
    const late = () => {
      clearTimeout(timeout)
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(late, delay)
  }
}

export function addZero(num) {
  if (+num <= 9) {
    return `0${num}`
  }

  return num
}
