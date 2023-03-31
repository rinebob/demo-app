import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsViewComponent } from './charts-view.component';
import { ComingSoonModule } from '../shared/coming-soon/coming-soon.module';



@NgModule({
  declarations: [
    ChartsViewComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    ComingSoonModule,
  ]
})
export class ChartsModule { }
