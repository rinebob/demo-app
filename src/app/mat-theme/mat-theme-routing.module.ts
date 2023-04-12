import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatThemeComponent } from './mat-theme.component';

const routes: Routes = [{ path: '', component: MatThemeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatThemeRoutingModule { }
