import './sass/index.scss'
import {Excel} from '@/components/Excel/Excel';
import {Header} from '@/components/Header/Header';
import {Toolbar} from '@/components/Toolbar/Toolbar';
import {Formula} from '@/components/Formula/Formula';
import {Table} from '@/components/Table/Table';
import {CreateStore} from '@core/CreateStore';
import {rootReducer} from '@/components/redux/reducer';
import {debounce, storage} from '@core/utils';
import {initialState} from '@/components/redux/initialState';

const store = new CreateStore(rootReducer, initialState)

store.subscribe(debounce((state) => {
  storage('excel-state', state)
}, 300))

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
