import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngExpComponent } from './ang-exp.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { SignalsComponent } from './signals/signals.component';
import { AngExpRoutes } from '../common/interfaces';
import { AnimationsComponent } from './animations/animations.component';
import { FormArrayComponent } from './form-array/form-array.component';

const routes: Routes = [
  { path: '', component: AngExpComponent,
    children: [
      { path: AngExpRoutes.DRAG_DROP, component: DragDropComponent },
      { path: AngExpRoutes.ANIMATIONS, component: AnimationsComponent },
      { path: AngExpRoutes.SIGNALS, component: SignalsComponent },
      { path: AngExpRoutes.FORM_ARRAY, component: FormArrayComponent },
      {path: '', redirectTo: AngExpRoutes.FORM_ARRAY, pathMatch: 'full'},

    ],
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngExpRoutingModule { }
