export function capitalize(str) {
  return (str[0].toLocaleUpperCase() + str.slice(1))
}

export function transformStrToArr(str, separator) {
  return str.split(separator)
}
