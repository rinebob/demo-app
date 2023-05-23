import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParcelsViewComponent } from './parcels-view.component';

const routes: Routes = [{ path: '', component: ParcelsViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParcelsViewRoutingModule { }
