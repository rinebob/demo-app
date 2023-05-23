import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParcelsViewRoutingModule } from './parcels-view-routing.module';
import { ParcelsViewComponent } from './parcels-view.component';


@NgModule({
  declarations: [
    ParcelsViewComponent
  ],
  imports: [
    CommonModule,
    ParcelsViewRoutingModule
  ]
})
export class ParcelsViewModule { }
