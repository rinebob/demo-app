import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs';

import { AudioStore } from './audio-store.service';
import { CartItem, Customer, Order } from '../common/au-interfaces';
import { CUSTOMER_INITIALIZER, ORDER_INITIALIZER } from '../common/au-constants';
import { POPULATED_SHOPPING_CART } from '../common/audio-mock-data';

describe('AudioStore', () => {
  let service: AudioStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sets the customer', () => {
    const customer: Customer = {...CUSTOMER_INITIALIZER, name: 'new customer'};
    let customerName = '';

    service.setCustomer(customer);

    service.customer$.pipe(take(1)).subscribe(cust => {
      customerName = cust.name;
    });

    expect(customerName).toEqual('new customer');
  });

  it('adds an item to the cart', () => {
    const item: CartItem = {'slug': 2};
    let quantity = 0;

    service.addItemToCart(item);

    service.cart$.pipe(take(1)).subscribe(cart => {
      quantity = cart[0]['slug'];
    });

    expect(quantity).toEqual(2);
  });

  it('removes an item from the cart', () => {
    let quantity = 0;

    service.cart$.pipe(take(1)).subscribe(cart => {
      quantity = cart.length;
    });
    
    expect(quantity).toEqual(0);

    const item: CartItem = {'slug': 2};

    service.addItemToCart(item);

    service.cart$.pipe(take(1)).subscribe(cart => {
      quantity = cart.length;
    });

    expect(quantity).toEqual(1);

    service.removeItemFromCart('slug');

    service.cart$.pipe(take(1)).subscribe(cart => {
      quantity = cart.length;
    });

    expect(quantity).toEqual(0);

  });

  it('updates cart item count', () => {
    let quantity = 0;
    const item: CartItem = {'slug': 2};

    service.addItemToCart(item);

    service.cart$.pipe(take(1)).subscribe(cart => {
      quantity = cart[0]['slug'];
    });

    expect(quantity).toEqual(2);

    const updatedItem: CartItem = {'slug': 4};

    service.updateCartItemCount(updatedItem);
    
    service.cart$.pipe(take(1)).subscribe(cart => {
      quantity = cart[0]['slug'];
    });

    expect(quantity).toEqual(4);

  });

  it('removes all cart items', () => {
    let quantity = 0;
    const item: CartItem = {'slug': 2};

    service.addItemToCart(item);

    service.cart$.pipe(take(1)).subscribe(cart => {
      quantity = cart.length;
    });

    expect(quantity).toEqual(1);

    service.removeAllCartItems();

    service.cart$.pipe(take(1)).subscribe(cart => {
      quantity = cart.length;
    });

    expect(quantity).toEqual(0);

  });

  it('sets a customer order', () => {
    let customerName = '';
    let numProducts = 0;
    const customer: Customer = {...CUSTOMER_INITIALIZER, name: 'new customer'};
    const order: Order = {...ORDER_INITIALIZER, customer};
    order.products = [...POPULATED_SHOPPING_CART];

    service.setCustomerOrder(order);

    service.order$.pipe(take(1)).subscribe(ord => {
      customerName = ord.customer?.name || '';
      numProducts = ord.products.length;
    });

    expect(customerName).toEqual('new customer');
    expect(numProducts).toEqual(6);

  });

  it('resets the state', () => {
    let customerName = '';
    let numProducts = 0;
    const customer: Customer = {...CUSTOMER_INITIALIZER, name: 'new customer'};
    const order: Order = {...ORDER_INITIALIZER, customer};
    order.products = [...POPULATED_SHOPPING_CART];

    service.setCustomer(customer);
    service.setCustomerOrder(order);
    
    service.order$.pipe(take(1)).subscribe(ord => {
      customerName = ord.customer?.name || '';
      numProducts = ord.products.length;
    });

    expect(customerName).toEqual('new customer');
    expect(numProducts).toEqual(6);

    service.reset();

    service.customer$.pipe(take(1)).subscribe(cust => {
      customerName = cust?.name || '';
    });

    service.order$.pipe(take(1)).subscribe(ord => {
      numProducts = ord.products.length;
    });

    expect(customerName).toEqual('');
    expect(numProducts).toEqual(0);
  });

});
