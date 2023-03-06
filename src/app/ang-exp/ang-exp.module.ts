import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AngExpRoutingModule } from './ang-exp-routing.module';
import { AngExpComponent } from './ang-exp.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';


@NgModule({
  declarations: [
    AngExpComponent,
    DragDropComponent
  ],
  imports: [
    CommonModule,

    DragDropModule,
    MatIconModule,
    MatSidenavModule,


    AngExpRoutingModule
  ]
})
export class AngExpModule { }
