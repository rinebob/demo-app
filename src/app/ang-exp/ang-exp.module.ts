import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AngExpRoutingModule } from './ang-exp-routing.module';
import { AngExpComponent } from './ang-exp.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { SignalsComponent } from './signals/signals.component';
import { AnimationsComponent } from './animations/animations.component';
import { FormArrayComponent } from './form-array/form-array.component';


@NgModule({
  declarations: [
    AngExpComponent,
    DragDropComponent,
    SignalsComponent,
    AnimationsComponent,
    FormArrayComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    DragDropModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,


    AngExpRoutingModule
  ]
})
export class AngExpModule { }
