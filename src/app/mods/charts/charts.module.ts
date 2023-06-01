import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsViewComponent } from './charts-view.component';
import { ComingSoonModule } from '../../shared/coming-soon/coming-soon.module';

import { ComingSoonSaComponent } from 'src/app/shared/coming-soon-sa/coming-soon-sa.component';


@NgModule({
  declarations: [
    ChartsViewComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    ComingSoonModule,
    ComingSoonSaComponent,
  ]
})
export class ChartsModule { }
