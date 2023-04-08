import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardViewComponent } from './comps/board-view/board-view.component';
import { BoardsResolver } from '../../common/resolvers';
import { DesignSystemComponent } from './comps/design-system/design-system.component';

const routes: Routes = [
  // {path: '', redirectTo: 'boards', pathMatch: 'full'},
  {
    path: '',
    component: BoardViewComponent,
    // resolve: {
    //   board: BoardsResolver
    // },
  },
  {path: 'design-system', component: DesignSystemComponent},
  {path: '**', component: BoardViewComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class KanbanRoutingModule { }
