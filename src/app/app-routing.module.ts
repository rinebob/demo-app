import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'robert', pathMatch: 'full'},
  {path: 'robert', component: LandingPageComponent},
  {
    path: 'kanban',
    loadChildren: () => import('./kanban.module').then(m => m.KanbanModule),
  },
  { path: 'ang-exp', loadChildren: () => import('./ang-exp/ang-exp.module').then(m => m.AngExpModule) },
    // {path: '**', component: BoardViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
