import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraderRoutingModule } from './trader-routing.module';
import { TraderViewComponent } from './trader-view.component';
import { DashboardComponent } from './comps/dashboard/dashboard.component';
import { ChartsComponent } from './charts/charts.component';
import { PortfolioComponent } from './comps/portfolio/portfolio.component';
import { TradingComponent } from './comps/trading/trading.component';
import { DesignSystemComponent } from './comps/des-sys/des-sys.component';


@NgModule({
  declarations: [
    TraderViewComponent,
    DashboardComponent,
    ChartsComponent,
    PortfolioComponent,
    TradingComponent,
    DesignSystemComponent
  ],
  imports: [
    CommonModule,
    TraderRoutingModule
  ]
})
export class TraderModule { }
