import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, withLatestFrom } from 'rxjs/operators';

import { Customer, Order } from '../../common/au-interfaces';
import { AudioStore } from '../../services/audio-store.service';
import { ProductsService } from '../../services/products.service';
import { ThankYouComponent } from '../thank-you/thank-you.component';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutPageComponent {

  customer$ = this.audioStore.customer$;
  order$ = this.audioStore.order$;

  customerFormValidityBS = new BehaviorSubject<string>('');
  customerFormValidity$: Observable<string> = this.customerFormValidityBS;;

  thankYouPanelClass = 'shopping-cart-panel-class';

  constructor(readonly audioStore: AudioStore, readonly dialog: MatDialog,
              readonly productsService: ProductsService, readonly router: Router, 
              readonly route: ActivatedRoute,
    ) {

  }

  handleCustomerFormValidity(validity: string) {
    console.log('cP hCFV checkout form validity: ', validity);
    this.customerFormValidityBS.next(validity);
  }

  handleCustomerFromForm(customer: Customer) {
    this.audioStore.setCustomer({...customer});
    // console.log('cP hCFF customer from checkout form: ', {...customer});
  }
  
  handleContinueAndPay() {
    // console.log('cP hCFF checkout page handle continue and pay called');

    // this.customer$.pipe(take(1)).subscribe(customer => {
    //   console.log('cP hCAP customer: ', customer);
    // });
    
    this.order$.pipe(
      withLatestFrom(this.customer$),
      take(1)
      ).subscribe(([order, customer]) => {
      // console.log('cP hCAP order/customer: ', order, customer);

      order.customer = customer;

      this.audioStore.setCustomerOrder({...order});

      this.openThankYouDialog(order);

    });
  }

  openThankYouDialog(order: Order) {
    // console.log('cP oTYD order: ', order);

    if (order && order.products.length > 0) {
      
      const slug = Object.keys(order.products[0])[0];
      const product = this.productsService.productById(slug);
  
      const config = new MatDialogConfig();
      config.panelClass = this.thankYouPanelClass;
      config.data = {order, product};
      const dialogRef = this.dialog.open(ThankYouComponent, config);
      dialogRef.afterClosed().subscribe(result => {
        // console.log('cP oTYD thank you dialog closed.  result: ', result);
        this.router.navigate(['./home'], {relativeTo: this.route});
        this.audioStore.reset();
      });

    }
  }

}
