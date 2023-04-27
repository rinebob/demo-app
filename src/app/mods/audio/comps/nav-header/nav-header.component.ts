import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogPosition, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, take } from 'rxjs';

import { CartDetailComponent } from '../cart-detail/cart-detail.component';
import { ShopPanelComponent } from '../shop-panel/shop-panel.component';
import { AudioStore } from '../../services/audio-store.service';
// import { LocalStorageService } from '../../services/local-storage.service';
import { AppText, AudioDialogCloseResult, CartDetailMode, CartItem } from '../../common/au-interfaces';
import { POPULATED_SHOPPING_CART } from '../../common/audio-mock-data';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavHeaderComponent {
  @ViewChild('navHeaderContainer') navHeaderContainer: ElementRef;

  navMenuPanelClass = 'nav-menu-panel-class';
  shoppingCartPanelClass = 'shopping-cart-panel-class';
  overlayPanelClass = ['nav-menu-container'];

  cart$ = this.audioStore.cart$;
  shoppingCartBS = new BehaviorSubject<CartItem[]>([]);

  readonly AppText = AppText;

  constructor(readonly dialog: MatDialog, readonly audioStore: AudioStore,
    readonly router: Router, readonly route: ActivatedRoute,
    // readonly localStorage: LocalStorageService,
    ) {
    this.cart$.pipe().subscribe(cart => {
      // console.log('nH ctor shopping cart sub: ', cart);
      this.shoppingCartBS.next(cart);
    });
  }
  
  handleOpenNavMenu() {
    // console.log('nH hONM open nav menu dialog called. nav header comp: ', this.navHeaderContainer);

    const config = new MatDialogConfig();

    config.panelClass = this.navMenuPanelClass;
    config.data = {ref: this.navHeaderContainer};
    const dialogRef = this.dialog.open(ShopPanelComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('nH hSSC nav menu dialog closed.  result: ', result);
      // console.log('nH hSSC t.route: ', this.route);
      if (result) {
        this.router.navigate(['/audio/category', result]);

      }

    });

  }

  handleShowShoppingCart() {
    // console.log('nH hSSC open shopping cart dialog called');
    const config = new MatDialogConfig();
    config.panelClass = this.shoppingCartPanelClass;
    config.data = {mode: CartDetailMode.DETAIL, ref: this.navHeaderContainer};
    const dialogRef = this.dialog.open(CartDetailComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('nH hSSC shopping cart dialog closed.  result: ', result);

      if (result && result === AudioDialogCloseResult.PROCEED_TO_CHECKOUT) {
      
        this.router.navigate(['./checkout'], {relativeTo: this.route});

      }

    });
  }

  populateCart() {

    for (const item of POPULATED_SHOPPING_CART) {
      this.audioStore.addItemToCart(item);
      
    }

    this.cart$.pipe(take(1)).subscribe(cart => {
      if (cart.length > 0) {
        
        const data = JSON.stringify(cart);
        // console.log('pD aTC saving item to storage: ', data);
        // this.localStorage.saveData('cart', data);

      }
      
    });

  }
}
