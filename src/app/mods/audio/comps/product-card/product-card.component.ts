import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AppText, Product, ViewportMode } from '../../common/au-interfaces';
import { PRODUCT_INITIALIZER } from '../../common/au-constants';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input()
  set viewportMode(viewportMode: ViewportMode) {
    // console.log('pC @i viewportMode: ', viewportMode);
    this.viewportModeBS.next(viewportMode);
  };
  get viewportMode() {
    return this.viewportModeBS.value;
  }
  viewportModeBS = new BehaviorSubject<ViewportMode>(ViewportMode.DESKTOP);

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
