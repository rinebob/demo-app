import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';

import { AcmeRoutingModule } from './acme-routing.module';
import { AcmeComponent } from './acme.component';


@NgModule({
  declarations: [
    AcmeComponent
  ],
  imports: [
    CommonModule,

    MatSidenavModule,
    
    AcmeRoutingModule
  ]
})
export class AcmeModule { }
