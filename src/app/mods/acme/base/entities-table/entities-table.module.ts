import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { EntitiesTableBaseComponent } from './entities-table.component';

@NgModule({
  declarations: [
    EntitiesTableBaseComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
  ],
  exports: [EntitiesTableBaseComponent],
})
export class EntitiesTableModule { }
