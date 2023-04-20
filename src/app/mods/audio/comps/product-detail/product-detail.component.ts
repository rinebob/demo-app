import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PRODUCT_INITIALIZER } from '../../common/au-constants';
import { AddToCartProduct, AppText, Product } from '../../common/au-interfaces';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
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

  @Output() addedProduct = new EventEmitter<AddToCartProduct>();

  count = 1;

  readonly AppText = AppText;

  incrementCount(delta: number) {
    this.count = this.count + delta;
    this.count = this.count >= 0 ? this.count : 0;
    // console.log('pD iC count after increment: ', this.count);
  }
  
  addToCart() {
    const item: AddToCartProduct = {
      id: this.productBS.value.id,
      slug: this.productBS.value.slug,
    }
    
    // console.log('pD aTC add to cart item: ', item);
    this.addedProduct.emit(item);

  }

}
