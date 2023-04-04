import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatThemeRoutingModule } from './mat-theme-routing.module';
import { MatThemeComponent } from './mat-theme.component';


@NgModule({
  declarations: [
    MatThemeComponent
  ],
  imports: [
    CommonModule,
    MatThemeRoutingModule
  ]
})
export class MatThemeModule { }
