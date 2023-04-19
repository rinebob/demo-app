import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioViewComponent } from './audio-view.component';
import { AudioDesignSystemComponent } from './comps/au-des-sys/au-des-sys.component';
import { CategoryPageComponent } from './comps/category-page/category-page.component';
import { ProductPageComponent } from './comps/product-page/product-page.component';
import { CheckoutPageComponent } from './comps/checkout-page/checkout-page.component';
import { ThankYouComponent } from './comps/thank-you/thank-you.component';

const routes: Routes = [
  { path: '', component: AudioViewComponent },
  { path: 'category', component: CategoryPageComponent},
  { path: 'product', component: ProductPageComponent},
  { path: 'checkout', component: CheckoutPageComponent},
  { path: 'thank-you', component: ThankYouComponent},
  { path: 'design-system', component: AudioDesignSystemComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudioRoutingModule { }
