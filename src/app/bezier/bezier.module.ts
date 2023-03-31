import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BezierRoutingModule } from './bezier-routing.module';
import { BezierComponent } from './bezier.component';
import { ComingSoonModule } from '../shared/coming-soon/coming-soon.module';


@NgModule({
  declarations: [
    BezierComponent
  ],
  imports: [
    CommonModule,
    BezierRoutingModule,
    ComingSoonModule,
  ]
})
export class BezierModule { }
