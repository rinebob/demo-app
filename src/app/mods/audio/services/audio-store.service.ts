import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import { AudioState, CartItem, Customer, Order, PaymentMethod } from '../common/au-interfaces';
import { AUDIO_STATE_INITIALIZER, CUSTOMER_INITIALIZER, ORDER_INITIALIZER } from '../common/au-constants';

@Injectable({
  providedIn: 'root'
})
export class AudioStore extends ComponentStore<AudioState> {

  constructor() {
    super(AUDIO_STATE_INITIALIZER);
   }

  ///////////////////// REDUCERS ////////////////////////

  readonly setCustomer = this.updater((state, customer: Customer) => ({
    ...state,
    customer: {...customer},
  }));

  // readonly setCustomer = this.updater((state, customer: Customer) => {

  //   return {
  //     ...state,
  //     customer: {...customer},
  //   }
  // });

  // Checks whether an item already exists in the cart, and if so, increments 
  // the quantity with the additional quantity.  Otherwise just adds the
  // item to the cart
  readonly addItemToCart = this.updater((state, item: CartItem) => {
    // console.log('-----------------------');
    // console.log('aS aITC add item: ', item);

    const slug = Object.keys(item)[0];
    const newCount = Object.values(item)[0];
    
    const existingItems = [...state.cart];
    // console.log('aS aITC existing items: ', [...existingItems]);

    let keys: string[] = [];

    for (const exist of existingItems) {
      const key = Object.keys(exist)[0];
      keys.push(key);
    }

    // console.log('aS aITC slug: ', slug);
    // console.log('aS aITC keys: ', keys);

    if (!keys.includes(slug)) {

      existingItems.push(item);

    } else {
      
      for (const exist of existingItems) {
  
        const key = Object.keys(exist)[0];
  
        if (key === slug) {
          
          const existingCount = Object.values(exist)[0];
          const updatedCount = newCount + existingCount;
          const updatedItem: CartItem = {[slug]: updatedCount};
  
          const startInd = existingItems.indexOf(exist);
          existingItems.splice(startInd, 1, updatedItem);
        }
      }
    }

    return {
    ...state,
    cart: [...existingItems],
  }
  });

  readonly removeItemFromCart = this.updater((state, slug: string) => {
    let updatedCart: CartItem[] = [];

    for (const item of state.cart ) {
      if (Object.keys(item)[0] !== slug) {
        updatedCart.push(item);
      }
    }

    // console.log('aS rIFC start cart: ', state.cart)
    // console.log('aS rIFC removeItem/updatedCart: ', slug, updatedCart)
    
    return {
    ...state,
    cart: [...updatedCart],
    }
  });

  readonly updateCartItemCount = this.updater((state, item: CartItem) => {
    const items: CartItem[] = [];

    for (const prod of state.cart) {
      if (Object.keys(prod)[0] !== Object.keys(item)[0]) {
        items.push(prod);
      } else {
        items.push(item);
      }
    }

    // console.log('aS uCIC store cart: ', items);

    return {
      ...state,
      cart: [...items],
    }
  });

  readonly removeAllCartItems = this.updater((state) => ({
    ...state,
    cart: []
  }));

  readonly setCustomerOrder = this.updater((state, order: Order) => ({
    ...state,
    order: order
  }));

  readonly reset = this.updater((state) => ({
    ...state,
    customer: {...AUDIO_STATE_INITIALIZER.customer},
    cart: [],
    order: {...AUDIO_STATE_INITIALIZER.order},
  }));

  //////////////////// SELECTORS ////////////////////////////

  readonly customer$ = this.select((state) => state.customer);
  readonly cart$ = this.select((state) => state.cart);
  readonly order$ = this.select((state) => state.order);

  ////////////////////// LOCAL STORAGE SUPPORT /////////////////////
  // local storage
    // customer
    // customer orders


}
