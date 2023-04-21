import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

import { CartDetailComponent } from '../cart-detail/cart-detail.component';
import { AudioStore } from '../../services/audio-store.service';
import { CartItem } from '../../common/au-interfaces';
import { POPULATED_SHOPPING_CART } from '../../common/audio-mock-data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavHeaderComponent {

  shoppingCartPanelClass = 'shopping-cart-panel-class';

  cart$ = this.audioStore.cart$;
  shoppingCartBS = new BehaviorSubject<CartItem[]>([]);

  constructor(readonly dialog: MatDialog, readonly audioStore: AudioStore,
    readonly router: Router, readonly route: ActivatedRoute,
    ) {
    this.cart$.pipe().subscribe(cart => {
      // console.log('nH ctor shopping cart sub: ', cart);
      this.shoppingCartBS.next(cart);
    });
  }

  handleShowShoppingCart() {
    // console.log('nH hSSC open shopping cart dialog called');
    const config = new MatDialogConfig();
    config.panelClass = this.shoppingCartPanelClass;
    const dialogRef = this.dialog.open(CartDetailComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('nH hSSC shopping cart dialog closed.  result: ', result);
      this.router.navigate(['./checkout'], {relativeTo: this.route});

    });
  }

  populateCart() {

    for (const item of POPULATED_SHOPPING_CART) {
      this.audioStore.addItemToCart(item);
      
    }

  }
}
