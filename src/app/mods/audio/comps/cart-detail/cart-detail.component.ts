import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

import { AUDIO_PRODUCTS } from '../../common/audio-mock-data';
import { AppText, AudioDialogCloseResult, CartDetailMode, CartDialogData, CartItem, Order, Product } from '../../common/au-interfaces';
import { AudioStore } from '../../services/audio-store.service';
import { ORDER_INITIALIZER, SHIPPING_COST, VAT_TAX_RATE } from '../../common/au-constants';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailComponent implements OnInit {

  @Input()
  set customerFormValidity(validity: string) {
    if (validity) {
      this.customerFormValidityBS.next(validity);
    }
    console.log('cD @i checkout form validity: ', this.customerFormValidityBS.value);
  }
  get customerFormValidity() {
    return this.customerFormValidityBS.value;
  }
  customerFormValidityBS = new BehaviorSubject<string>('INVALID');
  
  get customerFormInvalid() {
    let invalid = true;
    if (this.customerFormValidity === 'VALID') {
      invalid = false;
    } 
    console.log('cD @i checkout form invalid: ', invalid);
    return invalid;
  }
  
  get shouldDisablePayButton() {
    let should = false;
    if (this.mode === CartDetailMode.DETAIL) {
      should = !this.currentOrderBS.value || 
        this.currentOrderBS.value.products.length === 0;
    } else {
      should = 
        !this.currentOrderBS.value 
        || this.currentOrderBS.value.products.length === 0
        || this.customerFormInvalid;
   }

    return should;
  }

  @Output() readonly continueAndPay = new EventEmitter<void>()

  readonly CartDetailMode = CartDetailMode;
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
              @Optional() @Inject(MAT_DIALOG_DATA) readonly data: CartDialogData,
              readonly audioStore: AudioStore,
    ) {
      if (data && data.mode) {
        this.mode = data.mode;
      }
    }

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
          // console.log('cD gCP item: ', item);
  
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

      this.updateLocalOrderState();
    });
  }

  handleRemoveAll() {
    this.audioStore.removeAllCartItems();
  }

  handleCloseDialog() {
    this.dialogRef.close({result: 'cart dialog closed'});
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
    const vatCost = Math.floor(totalCost * VAT_TAX_RATE);
    const grandTotal = Math.floor(totalCost + vatCost + shippingCost);
    
    const currentOrder: Order = {
      products: this.cartBS.value,
      totalCost: Math.floor(totalCost),
      shippingCost,
      vatCost,
      grandTotal, 
      totalItemsCount: itemsCount,
      orderDate: new Date(),
    }
    
    // console.log('cD uLCS current order: ', currentOrder);
    this.currentOrderBS.next(currentOrder);
  }

  handleProceed() {

    if (this.mode === CartDetailMode.DETAIL) {

      const cart = this.cartBS.value;
      this.audioStore.removeAllCartItems();
      for (const item of cart) {
        if (Object.values(item)[0] > 0) {
          this.audioStore.addItemToCart(item);
        }
      }

      this.dialogRef.close({result: AudioDialogCloseResult.PROCEED_TO_CHECKOUT});

    } else {
      // console.log('cD hCAP cart detail continue and pay called. current order: ', this.currentOrderBS.value);
      this.audioStore.setCustomerOrder(this.currentOrderBS.value);
      this.continueAndPay.emit();

    }
  }
}
