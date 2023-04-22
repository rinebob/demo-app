import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { AddToCartProduct, Product, ViewportMode } from '../../common/au-interfaces';
import { PRODUCT_INITIALIZER, VIEWPORT_MIN_SIZE } from '../../common/au-constants';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent {

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.innerWidth;
    // console.log('cP oR inner width: ', this.innerWidth);
    this.updateViewportMode();
  }

  innerWidth = 0;
  viewportMode: ViewportMode = ViewportMode.DESKTOP;

  productBS = new BehaviorSubject<Product>(PRODUCT_INITIALIZER);
  product$: Observable<Product> = this.productBS;

  previousUrl$ = this.urlService.previousUrl$;

  url = '../../category'

  constructor(private router: Router, private route: ActivatedRoute,
      readonly urlService: UrlService,
    ) {
    // console.log('pP ctor route: ', route);
    

  }

  ngOnInit(): void {
    this.route.data.subscribe(({ product }) => {
      // console.log('pP ctor route data product: ', product);
      this.productBS.next(product);
      // console.log('pP ctor product BS value: ', this.productBS.value);
    })

    const width = window.innerWidth;
    // console.log('cP ngOI inner width: ', width);
    this.innerWidth = width;
    this.updateViewportMode();
  }

  updateViewportMode() {
    const width = this.innerWidth;
    // console.log('cP uVM inner width: ', width);
    
    const desktopMin = VIEWPORT_MIN_SIZE.get(ViewportMode.DESKTOP)!;
    const tabletMin = VIEWPORT_MIN_SIZE.get(ViewportMode.TABLET)!;
    
    if (width > desktopMin) {
      this.viewportMode = ViewportMode.DESKTOP;
    } else if (width < desktopMin && width >= tabletMin ) {
      this.viewportMode = ViewportMode.TABLET;
    } else {
      this.viewportMode = ViewportMode.MOBILE;
    }
    
    // console.log('cP uVM final viewport mode: ', this.viewportMode);

  }
}
