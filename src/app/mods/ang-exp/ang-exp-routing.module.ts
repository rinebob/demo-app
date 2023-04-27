import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngExpComponent } from './ang-exp.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { SignalsComponent } from './signals/signals.component';
import { AngExpRoutes } from '../../common/interfaces';
import { AnimationsComponent } from './animations/animations.component';
import { FormArrayComponent } from './form-array/form-array.component';
import { CssTricksComponent } from './css-tricks/css-tricks.component';
import { GridExpComponent } from './grid-exp/grid-exp.component';

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
      { 
        path: AngExpRoutes.CSS_TRICKS,
        component: CssTricksComponent,
        data: {animation: 'CssTricksPage'}
      },
      { 
        path: AngExpRoutes.CSS_GRID,
        component: GridExpComponent,
        data: {animation: 'CssGridPage'}
      },
      { path: '', redirectTo: AngExpRoutes.CSS_GRID, pathMatch: 'full' },

    ],
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngExpRoutingModule { }
