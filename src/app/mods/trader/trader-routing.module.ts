import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TraderViewComponent } from './trader-view.component';
import { DashboardComponent } from './comps/dashboard/dashboard.component';
import { ChartsComponent } from './charts/charts.component';
import { PortfolioComponent } from './comps/portfolio/portfolio.component';
import { TradingComponent } from './comps/trading/trading.component';
import { DesignSystemComponent } from './comps/des-sys/des-sys.component';
import { TraderRoutes } from './common/tr-interfaces';

const routes: Routes = [
  { 
    path: '',
    component: TraderViewComponent,
    children: [
      {
        path: TraderRoutes.DASHBOARD, component: DashboardComponent
      },
      {
        path: TraderRoutes.CHARTS, component: ChartsComponent
      },
      {
        path: TraderRoutes.PORTFOLIO, component: PortfolioComponent
      },
      {
        path: TraderRoutes.TRADING, component: TradingComponent
      },
      {
        path: TraderRoutes.DESIGN_SYSTEM, component: DesignSystemComponent
      },
      {
        path: '**', redirectTo: TraderRoutes.DASHBOARD, pathMatch: 'full'
      },
    ],
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraderRoutingModule { }
