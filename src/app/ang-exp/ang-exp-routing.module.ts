import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngExpComponent } from './ang-exp.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';

const routes: Routes = [
  { path: '', component: AngExpComponent,
    children: [
      { path: 'drag-drop', component: DragDropComponent }

    ],
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngExpRoutingModule { }
