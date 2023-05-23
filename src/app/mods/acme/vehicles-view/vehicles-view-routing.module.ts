import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesViewComponent } from './vehicles-view.component';

const routes: Routes = [{ path: '', component: VehiclesViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesViewRoutingModule { }
