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
      { 
        path: AngExpRoutes.DRAG_DROP,
        component: DragDropComponent,
        data: {animation: 'DragDropPage'} 
      },
      { 
        path: AngExpRoutes.ANIMATIONS,
        component: AnimationsComponent,
        data: {animation: 'AnimationsPage'} 
      },
      { 
        path: AngExpRoutes.SIGNALS,
        component: SignalsComponent,
        data: {animation: 'SignalsPage'}
      },
      { 
        path: AngExpRoutes.FORM_ARRAY,
        component: FormArrayComponent,
        data: {animation: 'FormArrayPage'}

      },
      { path: '', redirectTo: AngExpRoutes.ANIMATIONS, pathMatch: 'full' },

    ],
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngExpRoutingModule { }
