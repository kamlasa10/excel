import {storage} from '@core/utils';

const defaultState = {
  rowsState: {},
  colsState: {},
  dataState: {},
  currentText: '',
  dataStyles: {},
  excelName: 'Новая таблица',
  openDate: new Date().toJSON()
}

export const initialState = storage('excel-state') ?
  storage('excel-state') :
  defaultState
