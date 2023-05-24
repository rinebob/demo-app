import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { VehiclesViewRoutingModule } from './vehicles-view-routing.module';
import { VehiclesViewComponent } from './vehicles-view.component';
import { VehiclesTableComponent } from './vehicles-table/vehicles-table.component';
import { VehiclesSearchComponent } from './vehicles-search/vehicles-search.component';


@NgModule({
  declarations: [
    VehiclesViewComponent,
    VehiclesTableComponent,
    VehiclesSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    VehiclesViewRoutingModule,
  ],
  exports: [VehiclesTableComponent],
})
export class VehiclesViewModule { }
