import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BezierComponent } from './bezier.component';

const routes: Routes = [{ path: '', component: BezierComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BezierRoutingModule { }
