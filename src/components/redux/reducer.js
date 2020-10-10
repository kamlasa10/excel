import * as types from '@/components/redux/types';

export function rootReducer(initialState, action) {
  let prevState
  let prop
  switch (action.type) {
    case types.TABLE_RESIZE:
      prop = action.data.type === 'col' ? 'colsState' : 'rowsState'
      prevState = {...initialState[prop]} || {}
      prevState[action.data.id] = action.data.value

      return {
        ...initialState,
        [prop]: prevState
      }

    case types.CHANGE_TEXT:
      prevState = initialState.dataState
      initialState.currentText = action.text
      prevState[action.cellId] = initialState.currentText
      return {
        ...initialState,
        dataState: prevState
      }

    case types.CHANGE_TOOLBAR_STYLES:
      prevState = initialState.dataStyles || {}
      prevState[action.data.id] = action.data.styles

      return {
        ...initialState,
        dataStyles: prevState
      }

    case types.CHANGE_EXCEL_NAME:
      return {
        ...initialState,
        excelName: action.data.value
      }

    case types.CHANGE_DATE:
      return {...initialState, openDate: action.data}

    default:
      return initialState
  }
}
