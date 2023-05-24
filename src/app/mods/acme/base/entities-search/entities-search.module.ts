import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { EntitiesSearchBaseComponent } from './entities-search.component';

@NgModule({
  declarations: [
    EntitiesSearchBaseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [EntitiesSearchBaseComponent],
})
export class EntitiesSearchModule { }
