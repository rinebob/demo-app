import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { ThreeWayToggleComponent } from './three-way-toggle.component';

@NgModule({
  declarations: [
    ThreeWayToggleComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [ThreeWayToggleComponent],
})
export class ThreeWayToggleModule { }
