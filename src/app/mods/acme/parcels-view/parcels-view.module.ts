import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { ParcelsViewRoutingModule } from './parcels-view-routing.module';
import { ParcelsViewComponent } from './parcels-view.component';
import { ParcelsTableComponent } from './parcels-table/parcels-table.component';

import { EntitiesSearchModule } from '../base/entities-search/entities-search.module';
import { EntitiesTableModule } from '../base/entities-table/entities-table.module';
import { ParcelsSearchComponent } from './parcels-search/parcels-search.component';

@NgModule({
  declarations: [
    ParcelsViewComponent,
    ParcelsTableComponent,
    ParcelsSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,

    ParcelsViewRoutingModule,

    EntitiesSearchModule,
    EntitiesTableModule,
  ]
})
export class ParcelsViewModule { }
