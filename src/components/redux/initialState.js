import {storage} from '@core/utils';

const defaultState = {
  rowsState: {},
  colsState: {},
  dataState: {},
  currentText: '',
  dataStyles: {},
  excelName: 'Новая таблица'
}

export const initialState = storage('excel-state') ?
  storage('excel-state') :
  defaultState
