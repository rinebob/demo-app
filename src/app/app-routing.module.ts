import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'kanban', pathMatch: 'full'},
  {
    path: 'kanban',
    loadChildren: () => import('./kanban.module').then(m => m.KanbanModule),
  },
  // {path: '**', component: BoardViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
