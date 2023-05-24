import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesViewRoutingModule } from './vehicles-view-routing.module';
import { VehiclesViewComponent } from './vehicles-view.component';


@NgModule({
  declarations: [
    VehiclesViewComponent
  ],
  imports: [
    CommonModule,
    VehiclesViewRoutingModule
  ]
})
export class VehiclesViewModule { }
