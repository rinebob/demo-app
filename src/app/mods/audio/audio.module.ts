import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AudioRoutingModule } from './audio-routing.module';
import { AudioViewComponent } from './audio-view.component';
import { AudioDesignSystemComponent } from './comps/au-des-sys/au-des-sys.component';
import { NavHeaderComponent } from './comps/nav-header/nav-header.component';
import { BannerComponent } from './comps/banner/banner.component';
import { ShopPanelComponent } from './comps/shop-panel/shop-panel.component';
import { HomeFeatureComponent } from './comps/home-feature/home-feature.component';
import { AboutPanelComponent } from './comps/about-panel/about-panel.component';
import { NavFooterComponent } from './comps/nav-footer/nav-footer.component';
import { CategoryPageComponent } from './comps/category-page/category-page.component';
import { ProductPageComponent } from './comps/product-page/product-page.component';
import { ProductCardComponent } from './comps/product-card/product-card.component';
import { ProductDetailComponent } from './comps/product-detail/product-detail.component';
import { AlsoLikePanelComponent } from './comps/also-like-panel/also-like-panel.component';
import { BreadcrumbPanelComponent } from './comps/breadcrumb-panel/breadcrumb-panel.component';
import { CartDetailComponent } from './comps/cart-detail/cart-detail.component';
import { CheckoutPageComponent } from './comps/checkout-page/checkout-page.component';
import { CheckoutFormComponent } from './comps/checkout-form/checkout-form.component';
import { CartSummaryComponent } from './comps/cart-summary/cart-summary.component';
import { ThankYouComponent } from './comps/thank-you/thank-you.component';
import { HomePageComponent } from './comps/home-page/home-page.component';
import { NavLinksComponent } from './comps/nav-links/nav-links.component';


@NgModule({
  declarations: [
    AudioViewComponent,
    AudioDesignSystemComponent,
    NavHeaderComponent,
    BannerComponent,
    ShopPanelComponent,
    HomeFeatureComponent,
    AboutPanelComponent,
    NavFooterComponent,
    CategoryPageComponent,
    ProductPageComponent,
    ProductCardComponent,
    ProductDetailComponent,
    AlsoLikePanelComponent,
    BreadcrumbPanelComponent,
    CartDetailComponent,
    CheckoutPageComponent,
    CheckoutFormComponent,
    CartSummaryComponent,
    ThankYouComponent,
    HomePageComponent,
    NavLinksComponent,
  ],
  imports: [
    CommonModule,

    ReactiveFormsModule,
    RouterModule,
    
    MatDialogModule,
    MatIconModule,
    MatMenuModule,

    AudioRoutingModule,
  ]
})
export class AudioModule { }
