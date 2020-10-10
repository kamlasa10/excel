import * as types from '@/components/redux/types';

export function tableResizeCreator(data) {
  return {type: types.TABLE_RESIZE, data}
}

export function changeTextCreator(text, cellId) {
  return {type: types.CHANGE_TEXT, text, cellId}
}

export function changeToolbarStylesCreator(data) {
  return {type: types.CHANGE_TOOLBAR_STYLES, data}
}

export function changeExcelNameCreator(data) {
  return {type: types.CHANGE_EXCEL_NAME, data}
}

export function changeDateCreator(data) {
  return {type: types.CHANGE_DATE, data}
}
