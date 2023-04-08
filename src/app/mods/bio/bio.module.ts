import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BioRoutingModule } from './bio-routing.module';
import { BioComponent } from './bio.component';
import { ComingSoonModule } from '../../shared/coming-soon/coming-soon.module';


@NgModule({
  declarations: [
    BioComponent
  ],
  imports: [
    CommonModule,
    BioRoutingModule,
    ComingSoonModule,
  ]
})
export class BioModule { }
