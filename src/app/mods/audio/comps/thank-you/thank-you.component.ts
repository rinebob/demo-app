import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AppText, CartDialogData, Order, Product } from '../../common/au-interfaces';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThankYouComponent {

  order: Order;
  product: Product;
  quantity = 0;
  numOtherItems = 0;

  readonly AppText = AppText;

  constructor(@Inject(MAT_DIALOG_DATA) readonly data: CartDialogData,
              public dialogRef: MatDialogRef<ThankYouComponent>,
  ) {
    // console.log('tY ctor order/product: ', data.order, data.product);
    console.log('tY ctor order: ', data.order);

    if (data.order && data.product) {
      this.order = data.order;
      this.product = data.product

      this.initializeVars();

    }
  }

  initializeVars() {
    const slug = this.product.slug;
    let otherItemsCount = 0;
    for (const item of this.order.products) {
      
      const id = Object.keys(item)[0];
      const quantity = Object.values(item)[0];
      console.log('tY iV id/quantity: ', id, quantity);
      
      if (id === slug) {
        this.quantity = quantity;
        console.log('tY iV id = slug. quantity: ', this.quantity);
        
      } else {
        otherItemsCount += quantity;
        console.log('tY iV id not equal slug. other items count: ', otherItemsCount);

      }
      
    }

    this.numOtherItems = otherItemsCount;


  }

  handleCloseDialog() {
    this.dialogRef.close({result: 'thank you dialog closed dude'});
  }

}
