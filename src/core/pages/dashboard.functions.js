import {
  storage,
  transformStrToArr
} from '@core/utils';

function templateRecord(key) {
  const date = storage(key)
  const hash = transformStrToArr(key, ':')[1]
  return `
      <li class="db__record">
        <a 
        href="/#excel/${hash}">${date.excelName}</a>
        <strong>
          ${new Date(date.openDate).toLocaleDateString()}
          ${new Date(date.openDate).toLocaleTimeString()}
        </strong>
      </li>
  `
}

function getAllKeys() {
  const keys = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.includes('excel')) {
      keys.push(key)
    }
  }

  return keys
}

export function renderRecords() {
  const keys = getAllKeys()

  if (!keys.length) {
    return `<p>Нет созданных таблиц</p>`
  }

  return `
   <div class="db__list-header">
    <span>Название</span>
    <span>Дата Открытия</span>
  </div>
  <ul class="db__list">
    ${keys.map(templateRecord).join('')}
  </ul>
  `
}
