import { ChangeDetectionStrategy, Component, OnInit, Optional } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

import { AUDIO_PRODUCTS } from '../../common/audio-mock-data';
import { AppText, AudioDialogCloseResult, CartDetailMode, CartItem, Order, Product } from '../../common/au-interfaces';
import { AudioStore } from '../../services/audio-store.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ORDER_INITIALIZER, SHIPPING_COST, VAT_TAX_RATE } from '../../common/au-constants';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailComponent implements OnInit {

  mode: CartDetailMode = CartDetailMode.SUMMARY;

  itemsCount = 0;
  totalCost = 0;
  readonly AppText = AppText;

  cart$ = this.audioStore.cart$;
  cartBS = new BehaviorSubject<CartItem[]>([]);

  productsInCartBS = new BehaviorSubject<Product[]>([]);
  productsInCart$: Observable<Product[]> = this.productsInCartBS;

  currentOrderBS = new BehaviorSubject<Order>(ORDER_INITIALIZER);
  currentOrder$: Observable<Order> = this.currentOrderBS;

  constructor(@Optional() public dialogRef: MatDialogRef<CartDetailComponent>,
    readonly audioStore: AudioStore,
    ) {}

  ngOnInit() {
    this.getCartProducts();
  }

  getCartProducts() {
    this.cart$.pipe().subscribe(cart => {
      // console.log('cD gCP cart sub: ', cart);
      
      this.cartBS.next([...cart]);
      
      const products: Product[] = []
      
      if (cart.length > 0) {
        
        for (const item of cart) {
          console.log('cD gCP item: ', item);
  
          const slug = Object.keys(item)[0];
  
          const product = AUDIO_PRODUCTS.find(item => item.slug === slug);
  
          // console.log('cD gCP slug: ', slug);
  
          if (product) {
            const quantity = Object.values(item)[0]; 
            product.count = quantity;
            products.push(product);
            // console.log('cD gCP product: ', product);
          }
  
  
          this.productsInCartBS.next(products);
          // console.log('cD gCP final products in cart: ', this.productsInCartBS.value);
          // console.log('cD gCP final total cost: ', this.totalCost);
        }

      } else {
        this.productsInCartBS.next([]);
        this.totalCost = 0;
        this.itemsCount = 0;
      }

      this.updateLocalCartState();

      this.updateLocalOrderState();

    });
  }

  handleRemoveAll() {
    this.audioStore.removeAllCartItems();
  }

  handleCloseDialog() {
    this.dialogRef.close({result: 'cart dialog closed dude'});
  }

  handleIncrementCount(slug: string, delta: number) {
    const product = this.productsInCartBS.value.find(product => product.slug === slug);
   
    if (product && product.count !== undefined) {
      // console.log('cD hIC product count before increment: ', product.count);
      product.count += delta;
      // console.log('cD hIC product count after increment: ', product.count);

      product.count = product.count > 0 ? product.count : 0;

      const cartItem: CartItem = {[product.slug]: product.count};

      this.audioStore.updateCartItemCount(cartItem);

    }
    // console.log('cD hIC productsBS: ', this.productsInCartBS.value);
  }

  handleRemoveItemFromCart(slug: string) {
    this.audioStore.removeItemFromCart(slug)
  }

  // this is the cost of the items only.  Doesn't include shipping, tax or VAT.
  generateItemCountAndTotalCost() {
    let cost = 0;
    let count = 0;
    for (const item of this.productsInCartBS.value) {
      if (item.count) {
        const itemCost = item.count * item.price;
        count += item.count;
        cost += itemCost;
      }
    }

    this.totalCost = cost;
    this.itemsCount = count;
  }

  updateLocalCartState() {
    let cost = 0;
    let count = 0;
    let cart: CartItem[] = []
    for (const item of this.productsInCartBS.value) {
      if (item.count) {
        const itemCost = item.count * item.price;
        count += item.count;
        cost += itemCost;

        const cartItem: CartItem = {[item.slug]: item.count};
        cart.push(cartItem);
      }
    }
    
    this.cartBS.next(cart);
    // console.log('cD uLCS updated local cart: ', this.cartBS.value);
    this.totalCost = cost;
    this.itemsCount = count;
  }

  updateLocalOrderState() {
    let totalCost = 0;
    let itemsCount = 0;
    let cart: CartItem[] = []
    for (const item of this.productsInCartBS.value) {
      if (item.count) {
        const itemCost = item.count * item.price;
        itemsCount += item.count;
        totalCost += itemCost;

        const cartItem: CartItem = {[item.slug]: item.count};
        cart.push(cartItem);
      }
    }
    
    this.cartBS.next(cart);
    // console.log('cD uLCS updated local cart: ', this.cartBS.value);
    this.totalCost = totalCost;
    this.itemsCount = itemsCount;

    const shippingCost = itemsCount > 0 ? SHIPPING_COST : 0;
    const vatCost = totalCost * VAT_TAX_RATE;
    const grandTotal = totalCost + vatCost + shippingCost;
    
    const currentOrder: Order = {
      customer: '',
      products: this.cartBS.value,
      totalCost,
      shippingCost,
      vatCost,
      grandTotal, 
      totalItemsCount: itemsCount,
      orderDate: new Date(),
    }
    
    console.log('cD uLCS current order: ', currentOrder);
    this.currentOrderBS.next(currentOrder);
  }

  handleProceedToCheckout() {
    const cart = this.cartBS.value;
    this.audioStore.removeAllCartItems();
    for (const item of cart) {
      if (Object.values(item)[0] > 0) {
        this.audioStore.addItemToCart(item);
      }
    }

    this.dialogRef.close({result: AudioDialogCloseResult.PROCEED_TO_CHECKOUT});
  }

  handleContinueAndPay() {
    console.log('cD hCAP continue and pay called');

  }
}
