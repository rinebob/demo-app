import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogPosition, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs';

import { CartDetailComponent } from '../cart-detail/cart-detail.component';
import { ShopPanelComponent } from '../shop-panel/shop-panel.component';
import { AudioStore } from '../../services/audio-store.service';
// import { LocalStorageService } from '../../services/local-storage.service';
import { AppText, AudioDialogCloseResult, CartDetailMode, CartItem, ViewportMode } from '../../common/au-interfaces';
import { POPULATED_SHOPPING_CART } from '../../common/audio-mock-data';
import { ViewportService } from '../../services/viewport.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavHeaderComponent implements OnDestroy {
  readonly destroy$ = new Subject<void>();
  @ViewChild('navHeaderContainer') navHeaderContainer: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.viewportService.updateViewportMode(window.innerWidth);
  }

  viewportMode: ViewportMode = ViewportMode.DESKTOP;
  viewportMode$ = this.viewportService.viewportMode$;

  navMenuPanelClass = 'nav-menu-panel-class';
  shoppingCartPanelClass = 'shopping-cart-panel-class';
  overlayPanelClass = ['nav-menu-container'];

  cart$ = this.audioStore.cart$;
  shoppingCartBS = new BehaviorSubject<CartItem[]>([]);

  readonly AppText = AppText;

  constructor(readonly dialog: MatDialog, readonly audioStore: AudioStore,
    readonly router: Router, readonly route: ActivatedRoute, readonly viewportService: ViewportService,
    // readonly localStorage: LocalStorageService,
    ) {

    this.viewportMode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
      // console.log('nH ctor viewport mode sub: ', mode);
      this.viewportMode = mode;
    });

    this.cart$.pipe(takeUntil(this.destroy$)).subscribe(cart => {
      // console.log('nH ctor shopping cart sub: ', cart);
      this.shoppingCartBS.next(cart);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    config.data = {mode: CartDetailMode.DETAIL, ref: this.navHeaderContainer, viewportMode: this.viewportMode};
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
