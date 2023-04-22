import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PRODUCT_INITIALIZER } from '../../common/au-constants';
import { AppText, CartItem, Product } from '../../common/au-interfaces';
import { AudioStore } from '../../services/audio-store.service';
import { LocalStorageService } from '../../services/local-storage.service';

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

  count = 1;

  readonly AppText = AppText;

  constructor(readonly audioStore: AudioStore, readonly localStorage: LocalStorageService) {

  }

  incrementCount(delta: number) {
    this.count = this.count + delta;
    this.count = this.count >= 0 ? this.count : 0;
    // console.log('pD iC count after increment: ', this.count);
  }
  
  addToCart() {
    const item: CartItem = {
      [this.productBS.value.slug]: this.count
    }
    
    // console.log('pD aTC add to cart item: ', item);
    this.audioStore.addItemToCart(item);
    const data = JSON.stringify(item);
    // console.log('pD aTC saving item to storage: ', data);
    this.localStorage.saveData('cart', data);

  }

}
