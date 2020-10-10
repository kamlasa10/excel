import {Page} from '@core/page';
import {Excel} from '@/components/Excel/Excel';
import {Header} from '@/components/Header/Header';
import {Toolbar} from '@/components/Toolbar/Toolbar';
import {Formula} from '@/components/Formula/Formula';
import {Table} from '@/components/Table/Table';
import {CreateStore} from '@core/CreateStore';
import {rootReducer} from '@/components/redux/reducer';
import {debounce, storage} from '@core/utils';
import {ActiveRoute} from '@core/routes/activeRoute';
import {initialState} from '@/components/redux/initialState';

function storageName(path) {
  return `excel:${path}`
}

export class ExcelPage extends Page {
  static pageName = 'excelPage'

  constructor() {
    super()
  }

  getRoot() {
    const state = storage(storageName(ActiveRoute.param)) || initialState
    const store = new CreateStore(
        rootReducer,
        state
    )

    store.subscribe(debounce((state) => {
      console.log(state)
      storage(storageName(ActiveRoute.param), state)
    }, 300))

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.render()
  }
}
