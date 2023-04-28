import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

import { AppText, CartDialogData, Order, Product, ViewportMode } from '../../common/au-interfaces';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThankYouComponent {

  order: Order;
  products: Product[];
  totalProducts = 0;
  numOtherItems = 0;
  showAllItems = false;

  productsBS = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productsBS;

  viewportMode: ViewportMode = ViewportMode.DESKTOP;
  showOtherItemsButtonText = '';

  readonly AppText = AppText;

  constructor(@Inject(MAT_DIALOG_DATA) readonly data: CartDialogData,
              public dialogRef: MatDialogRef<ThankYouComponent>,
  ) {
    // console.log('tY ctor order: ', data.order);
    // console.log('tY ctor product: ', data.product);
    // console.log('tY ctor products: ', data.products);
    
    if (data && data.viewportMode) {
      this.viewportMode = data.viewportMode;
    }
    
    if (data.order && data.products) {
      // console.log('tY ctor initializing vars: ', data.products);
      this.order = data.order;
      this.products = data.products;
      this.totalProducts = data.products.length;
      
      this.productsBS.next(this.showAllItems ? this.products : [this.products[0]]);
      this.initializeVars();

    }
  }

  initializeVars() {
    this.numOtherItems = 0;
    const otherItems = this.products.slice(1);
    if (otherItems.length > 0) {
      
      for (const item of otherItems) {
        this.numOtherItems += item.count ?? 0;
        this.showOtherItemsButtonText = `and ${this.numOtherItems} other item(s)`;
        // console.log('tY iV other items count/button text: ', this.numOtherItems, this.showOtherItemsButtonText);
        // console.log('tY iV products bs pre: ', this.productsBS.value);
        // this.productsBS.next(this.showAllItems ? this.products : [this.products[0]]);
        // console.log('tY iV products bs post: ', this.productsBS.value);
      }
      
    } else {
      this.productsBS.next(this.products);
      this.numOtherItems = this.products[0].count ?? 0;
      this.showOtherItemsButtonText = `${this.numOtherItems} total item(s) in your cart`;

    }
  }

  handleToggleOtherItems() {
    if (this.products.length > 1) {
      this.showAllItems = !this.showAllItems;
      this.productsBS.next(this.showAllItems ? this.products : [this.products[0]]);
    }

  }

  handleCloseDialog() {
    this.dialogRef.close({result: 'thank you dialog closed dude'});
  }

}
