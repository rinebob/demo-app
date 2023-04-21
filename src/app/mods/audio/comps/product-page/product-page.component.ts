import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { AddToCartProduct, Product } from '../../common/au-interfaces';
import { PRODUCT_INITIALIZER } from '../../common/au-constants';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent {

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
  }
}
