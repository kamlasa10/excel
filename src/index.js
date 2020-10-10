import './sass/index.scss'
import {Route} from '@core/routes/route';
import {DashboardPage} from '@core/pages/dashboardPage';
import {ExcelPage} from '@core/pages/excelPage';


new Route('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage
})


