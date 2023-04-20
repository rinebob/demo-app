import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../common/au-interfaces';
import { BehaviorSubject } from 'rxjs';

import { AppText } from '../../common/au-interfaces';
import { PRODUCT_INITIALIZER } from '../../common/au-constants';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input()
  set even(even: boolean) {
    // console.log('pC @i even: ', even);
    this.evenBS.next(even);
  };
  get even() {
    return this.evenBS.value;
  }
  evenBS = new BehaviorSubject<boolean>(false);

  @Input()
  set product(product: Product) {
    if (product) {
      // console.log('pC @i input product: ', product);
      this.productBS.next(product);
    }
  }
  get product() {
    return this.productBS.value;
  }
  productBS = new BehaviorSubject<Product>(PRODUCT_INITIALIZER);

  readonly AppText = AppText;

  constructor(readonly router: Router, readonly route: ActivatedRoute) {

  }

  navigate(segment: string) {
    // console.log('pC n navigate to segment: ', segment);

    this.router.navigate(['../../products', {id: segment}], {relativeTo: this.route})

  }

}
