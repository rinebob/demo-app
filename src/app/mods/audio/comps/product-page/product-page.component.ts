import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { AddToCartProduct, Product, ViewportMode } from '../../common/au-interfaces';
import { PRODUCT_INITIALIZER, VIEWPORT_MIN_SIZE } from '../../common/au-constants';
import { UrlService } from '../../services/url.service';
import { ViewportService } from '../../services/viewport.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent {

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.viewportService.updateViewportMode(window.innerWidth);
  }

  viewportMode: ViewportMode = ViewportMode.DESKTOP;
  viewportMode$ = this.viewportService.viewportMode$;

  productBS = new BehaviorSubject<Product>(PRODUCT_INITIALIZER);
  product$: Observable<Product> = this.productBS;

  previousUrl$ = this.urlService.previousUrl$;

  url = '../../category'

  constructor(private router: Router, private route: ActivatedRoute,
      readonly urlService: UrlService, readonly viewportService: ViewportService
    ) {
      
      this.viewportMode$.pipe().subscribe(mode => {
        // console.log('pP ctor viewport mode sub: ', mode);
        this.viewportMode = mode;
        
      });
    

  }

  ngOnInit(): void {
    this.route.data.subscribe(({ product }) => {
      // console.log('pP ctor route data product: ', product);
      this.productBS.next(product);
      // console.log('pP ctor product BS value: ', this.productBS.value);
    })

    this.viewportService.updateViewportMode(window.innerWidth);
  }
}
