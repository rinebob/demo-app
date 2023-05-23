import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { ParcelsViewRoutingModule } from './parcels-view-routing.module';
import { ParcelsViewComponent } from './parcels-view.component';
import { ParcelsTableComponent } from './parcels-table/parcels-table.component';

import { EntitiesTableModule } from '../base/entities-table/entities-table.module';

@NgModule({
  declarations: [
    ParcelsViewComponent,
    ParcelsTableComponent
  ],
  imports: [
    CommonModule,

    MatTableModule,

    ParcelsViewRoutingModule,
    EntitiesTableModule,
  ]
})
export class ParcelsViewModule { }
