import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngExpComponent } from './ang-exp.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { SignalsComponent } from './signals/signals.component';
import { AngExpRoutes } from '../common/interfaces';
import { AnimationsComponent } from './animations/animations.component';

const routes: Routes = [
  { path: '', component: AngExpComponent,
    children: [
      { path: AngExpRoutes.DRAG_DROP, component: DragDropComponent },
      { path: AngExpRoutes.ANIMATIONS, component: AnimationsComponent },
      { path: AngExpRoutes.SIGNALS, component: SignalsComponent },

    ],
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngExpRoutingModule { }
