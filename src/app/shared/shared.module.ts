import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialIconLinksModule } from './social-icon-links/social-icon-links.module';
import { ComingSoonModule } from './coming-soon/coming-soon.module';
import { ThreeWayToggleModule } from './three-way-toggle/three-way-toggle.module';
import { DarkModeSwitchModule } from './dark-mode-switch/dark-mode-switch.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocialIconLinksModule,
    ComingSoonModule,
    ThreeWayToggleModule,
    DarkModeSwitchModule
  ],
  exports: [],
})
export class SharedModule { }
