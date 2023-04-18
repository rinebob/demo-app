import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioViewComponent } from './audio-view.component';
import { AudioDesignSystemComponent } from './comps/au-des-sys/au-des-sys.component';

const routes: Routes = [
  { path: '', component: AudioViewComponent },
  { path: 'design-system', component: AudioDesignSystemComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudioRoutingModule { }
