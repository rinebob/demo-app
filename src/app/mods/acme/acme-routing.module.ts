import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcmeComponent } from './acme.component';
import { AcmeRoutes } from './common/interfaces-acme';

const routes: Routes = [
  { 
    path: '',
    component: AcmeComponent,
    children: [
      { 
        path: AcmeRoutes.PARCELS,
        loadChildren: () => import('./parcels-view/parcels-view.module').then(m => m.ParcelsViewModule) 
      },
      { 
        path: AcmeRoutes.VEHICLES,
        loadChildren: () => import('./vehicles-view/vehicles-view.module').then(m => m.VehiclesViewModule)
      },
      { path: '**', redirectTo: AcmeRoutes.PARCELS }
    ],
  },
  { path: '**', redirectTo: AcmeRoutes.PARCELS }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcmeRoutingModule { }
