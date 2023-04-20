import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioViewComponent } from './audio-view.component';
import { AudioDesignSystemComponent } from './comps/au-des-sys/au-des-sys.component';
import { CategoryPageComponent } from './comps/category-page/category-page.component';
import { ProductPageComponent } from './comps/product-page/product-page.component';
import { CheckoutPageComponent } from './comps/checkout-page/checkout-page.component';
import { HomePageComponent } from './comps/home-page/home-page.component';
import { CategoryResolver, ProductResolver } from './common/audio-resolver';

const routes: Routes = [
  { path: '', component: AudioViewComponent, 
    children: [
      { path: 'home', component: HomePageComponent},
      { path: 'category/home', redirectTo: 'home'},
      { 
        path: 'category/:id',
        component: CategoryPageComponent,
        resolve: {products: CategoryResolver},
      },
      { path: 'products/:id',
        component: ProductPageComponent,
        resolve: {product: ProductResolver}
      },
      { path: 'checkout', component: CheckoutPageComponent},
      { path: 'design-system', component: AudioDesignSystemComponent},
      { path: '**', redirectTo: 'home'}
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudioRoutingModule { }
