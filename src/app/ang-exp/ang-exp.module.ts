import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

import { AngExpRoutingModule } from './ang-exp-routing.module';
import { AngExpComponent } from './ang-exp.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { SignalsComponent } from './signals/signals.component';
import { AnimationsComponent } from './animations/animations.component';
import { FormArrayComponent } from './form-array/form-array.component';
import { OpenCloseComponent } from './animations/open-close/open-close.component';
import { CssTricksComponent } from './css-tricks/css-tricks.component';


@NgModule({
  declarations: [
    AngExpComponent,
    DragDropComponent,
    SignalsComponent,
    AnimationsComponent,
    FormArrayComponent,
    OpenCloseComponent,
    CssTricksComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    DragDropModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatTabsModule,


    AngExpRoutingModule
  ]
})
export class AngExpModule { }
