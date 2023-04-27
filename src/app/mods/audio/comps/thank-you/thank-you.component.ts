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
  quantity = 0;
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
    // console.log('tY ctor order/product: ', data.order, data.product);
    // console.log('tY ctor order/products: ', data.order, data.products);

    if (data && data.viewportMode) {
      this.viewportMode = data.viewportMode;
    }

    if (data.order && data.products) {
      this.order = data.order;
      this.products = data.products;
      
      this.initializeVars();

    }
  }

  initializeVars() {
    this.numOtherItems = 0;
    for (const item of this.products.slice(1)) {
      this.numOtherItems += item.count ?? 0;
      this.showOtherItemsButtonText = `and ${this.numOtherItems} other item(s)`
      // console.log('tY iV other items count/button text: ', this.numOtherItems, this.showOtherItemsButtonText);
      this.productsBS.next(this.showAllItems ? this.products : [this.products[0]]);
    }
  }

  handleToggleOtherItems() {
    this.showAllItems = !this.showAllItems;
    this.productsBS.next(this.showAllItems ? this.products : [this.products[0]]);

  }

  handleCloseDialog() {
    this.dialogRef.close({result: 'thank you dialog closed dude'});
  }

}
