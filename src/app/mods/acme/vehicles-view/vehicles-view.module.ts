import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { VehiclesViewRoutingModule } from './vehicles-view-routing.module';
import { VehiclesViewComponent } from './vehicles-view.component';
import { VehiclesTableComponent } from './vehicles-table/vehicles-table.component';


@NgModule({
  declarations: [
    VehiclesViewComponent,
    VehiclesTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    VehiclesViewRoutingModule,
  ],
  exports: [VehiclesTableComponent],
})
export class VehiclesViewModule { }
