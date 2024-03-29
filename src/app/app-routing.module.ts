import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from './common/interfaces';
import { LandingPageComponent } from './comps/landing-page/landing-page.component';
import { DesignSystemComponent } from './comps/design-system/design-system.component';
import { MessagesViewComponent } from './comps/messages-view/messages-view.component';

const routes: Routes = [
  {path: '', redirectTo: AppRoutes.ROBERT, pathMatch: 'full'},
  {path: AppRoutes.ROBERT, component: LandingPageComponent},
  {path: AppRoutes.MESSAGES, component: MessagesViewComponent},
  {path: AppRoutes.DESIGN_SYSTEM, component: DesignSystemComponent},
  {
    path: AppRoutes.KANBAN,
    loadChildren: () => import('./mods/kanban/kanban.module').then(m => m.KanbanModule),
  },
  { 
    path: AppRoutes.ANG_EXP,
    loadChildren: () => import('./mods/ang-exp/ang-exp.module').then(m => m.AngExpModule) 
  },
  { 
    path: AppRoutes.AUDIO,
    loadChildren: () => import('./mods/audio/audio.module').then(m => m.AudioModule)
  },
  { path: AppRoutes.ACME,
    loadChildren: () => import('./mods/acme/acme.module').then(m => m.AcmeModule) 
  },
  {
    path: '**',
    component: LandingPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    enableTracing: false,
    scrollPositionRestoration: "enabled", 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


  // { 
  //   path: AppRoutes.CHARTS,
  //   loadChildren: () => import('./mods/charts/charts.module').then(m => m.ChartsModule)
  // },
  
  // { 
  //   path: AppRoutes.CUBIC_BEZIER,
  //   loadChildren: () => import('./mods/bezier/bezier.module').then(m => m.BezierModule)
  // },
  // { 
  //   path: AppRoutes.BIODATA,
  //   loadChildren: () => import('./mods/bio/bio.module').then(m => m.BioModule)
  // },
  
  // { 
  //   path: AppRoutes.TRADER,
  //   loadChildren: () => import('./mods/trader/trader.module').then(m => m.TraderModule) 
  // },