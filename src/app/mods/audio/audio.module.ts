import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { AudioRoutingModule } from './audio-routing.module';
import { AudioViewComponent } from './audio-view.component';
import { AudioDesignSystemComponent } from './comps/au-des-sys/au-des-sys.component';
import { NavHeaderComponent } from './comps/nav-header/nav-header.component';
import { BannerComponent } from './comps/banner/banner.component';
import { ShopPanelComponent } from './comps/shop-panel/shop-panel.component';
import { HomeFeatureComponent } from './comps/home-feature/home-feature.component';
import { AboutPanelComponent } from './comps/about-panel/about-panel.component';
import { NavFooterComponent } from './comps/nav-footer/nav-footer.component';


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
  ],
  imports: [
    CommonModule,

    MatIconModule,

    AudioRoutingModule,
  ]
})
export class AudioModule { }
