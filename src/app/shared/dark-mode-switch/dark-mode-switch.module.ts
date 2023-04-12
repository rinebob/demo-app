import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { DarkModeSwitchComponent } from './dark-mode-switch.component';

@NgModule({
  declarations: [
    DarkModeSwitchComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  exports: [DarkModeSwitchComponent],
})
export class DarkModeSwitchModule { }
