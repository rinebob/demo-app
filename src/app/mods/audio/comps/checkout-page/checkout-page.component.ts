import { ChangeDetectionStrategy, Component, HostListener, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take, takeUntil, withLatestFrom } from 'rxjs/operators';

import { AppText, Customer, Order, Product, ViewportMode } from '../../common/au-interfaces';
import { AudioStore } from '../../services/audio-store.service';
import { ProductsService } from '../../services/products.service';
import { ThankYouComponent } from '../thank-you/thank-you.component';
import { UrlService } from '../../services/url.service';
import { ViewportService } from '../../services/viewport.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutPageComponent implements OnDestroy {
  readonly destroy$ = new Subject<void>();
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.viewportService.updateViewportMode(window.innerWidth);
  }

  viewportMode: ViewportMode = ViewportMode.DESKTOP;
  viewportMode$ = this.viewportService.viewportMode$;

  customer$ = this.audioStore.customer$;
  order$ = this.audioStore.order$;

  previousUrl$ = this.urlService.previousUrl$;

  customerFormValidityBS = new BehaviorSubject<string>('');
  customerFormValidity$: Observable<string> = this.customerFormValidityBS;;

  thankYouPanelClass = 'shopping-cart-panel-class';

  readonly AppText = AppText;

  constructor(readonly audioStore: AudioStore, readonly dialog: MatDialog,
              readonly productsService: ProductsService, readonly router: Router, 
              readonly route: ActivatedRoute,  readonly viewportService: ViewportService,
              readonly urlService: UrlService, 
    ) {
      this.viewportMode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
        // console.log('cP ctor viewport mode sub: ', mode);
        this.viewportMode = mode;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleCustomerFormValidity(validity: string) {
    // console.log('cP hCFV checkout form validity: ', validity);
    this.customerFormValidityBS.next(validity);
  }

  handleCustomerFromForm(customer: Customer) {
    this.audioStore.setCustomer({...customer});
    // console.log('cP hCFF customer from checkout form: ', {...customer});
  }
  
  handleContinueAndPay(products: Product[]) {
    // console.log('cP hCFF checkout page handle continue and pay called');

    // this.customer$.pipe(take(1)).subscribe(customer => {
    //   console.log('cP hCAP customer: ', customer);
    // });
    
    this.order$.pipe(
      withLatestFrom(this.customer$),
      take(1)
      ).subscribe(([order, customer]) => {
      console.log('cP hCAP order/customer: ', order, customer);

      order.customer = customer;

      this.audioStore.setCustomerOrder({...order});

      this.openThankYouDialog(order, products);

    });
  }

  openThankYouDialog(order: Order, products: Product[]) {
    // console.log('cP oTYD order: ', order);

    if (order && order.products.length > 0) {
      
      const slug = Object.keys(order.products[0])[0];
      const product = this.productsService.productById(slug);
  
      const config = new MatDialogConfig();
      config.panelClass = this.thankYouPanelClass;
      config.data = {order, product, viewportMode: this.viewportMode, products};
      const dialogRef = this.dialog.open(ThankYouComponent, config);
      dialogRef.afterClosed().subscribe(result => {
        // console.log('cP oTYD thank you dialog closed.  result: ', result);
        this.router.navigate(['./home'], {relativeTo: this.route});
        this.audioStore.reset();
      });

    }
  }

}
