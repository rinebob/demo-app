import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialIconLinksModule } from './social-icon-links/social-icon-links.module';
import { ComingSoonModule } from './coming-soon/coming-soon.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocialIconLinksModule,
    ComingSoonModule
  ],
  exports: [],
})
export class SharedModule { }
