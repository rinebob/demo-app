import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from './common/interfaces';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DesignSystemComponent } from './design-system/design-system.component';

const routes: Routes = [
  {path: '', redirectTo: AppRoutes.ROBERT, pathMatch: 'full'},
  {path: AppRoutes.ROBERT, component: LandingPageComponent},
  {path: AppRoutes.DESIGN_SYSTEM, component: DesignSystemComponent},
  {
    path: AppRoutes.KANBAN,
    loadChildren: () => import('./kanban.module').then(m => m.KanbanModule),
  },
  { 
    path: AppRoutes.CHARTS,
    loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
  },
  { 
    path: AppRoutes.ANG_EXP,
    loadChildren: () => import('./ang-exp/ang-exp.module').then(m => m.AngExpModule) 
  },
  { 
    path: AppRoutes.CUBIC_BEZIER,
    loadChildren: () => import('./bezier/bezier.module').then(m => m.BezierModule)
  },
  { 
    path: AppRoutes.BIODATA,
    loadChildren: () => import('./bio/bio.module').then(m => m.BioModule)
  },
  { 
    path: AppRoutes.MAT_THEME,
    loadChildren: () => import('./mat-theme/mat-theme.module').then(m => m.MatThemeModule)
  },
  {
    path: '**',
    component: LandingPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
