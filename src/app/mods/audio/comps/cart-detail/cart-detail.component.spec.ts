import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of, take } from 'rxjs';
import { By } from '@angular/platform-browser';

import { AudioModule } from '../../audio.module';
import { CartDetailComponent } from './cart-detail.component';
import { AppText, CartDetailMode, CartDialogData, CartItem, Order, Product, ViewportMode } from '../../common/au-interfaces';
import { AudioStore } from '../../services/audio-store.service';
import { POPULATED_SHOPPING_CART } from '../../common/audio-mock-data';

describe('CartDetailComponent', () => {

  let populatedMockAudioStore = jasmine.createSpyObj(
    'AudioStore',
    ['setCustomer', 'addItemToCart', 'removeItemFromCart', 'updateCartItemCount', 'removeAllCartItems', 'setCustomerOrder', 'reset'],
    {cart$: of([...POPULATED_SHOPPING_CART])},
  );

  let emptyMockAudioStore = jasmine.createSpyObj(
    'AudioStore',
    [],
    {cart$: of([])},
  );

  async function setup(
      formValidity: string,
      mockAudioStore: any,
      dialogData?: CartDialogData,
      dialogRef = {close: () => {}},
    ) {
    await TestBed.configureTestingModule({
      declarations: [ CartDetailComponent ],
      imports: [ AudioModule ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: dialogData},
        {provide: MatDialogRef, useValue: dialogRef},
      ],
    }).compileComponents();

    TestBed.overrideProvider(AudioStore, {useValue: mockAudioStore});
    const fixture: ComponentFixture<CartDetailComponent> = TestBed.createComponent(CartDetailComponent);
    const component = fixture.componentInstance;
    component.customerFormValidity = formValidity;
    
    fixture.detectChanges();

    return {fixture, component}
  }
    
  // When embedded in CheckoutPage component
  describe('summary mode', () => {

    it('should create in summary mode', async () => {
      const {component} = await setup('INVALID', emptyMockAudioStore);

      expect(component).toBeTruthy();
      expect(component.mode).toEqual('summary');
    });

    it('has headline text', async () => {
      const {fixture} = await setup('INVALID', emptyMockAudioStore);
      const text = fixture.nativeElement.querySelector('.headline-text');

      expect(text.textContent).toEqual('summary');
    });
    
    it('shows empty cart message and disables continue button if no products are in cart', async () => {
      const {fixture} = await setup('INVALID', emptyMockAudioStore);
      const text = fixture.nativeElement.querySelector('.empty-cart-text');
      const button = fixture.debugElement.query(By.css('.checkout-button'));
      
      expect(text.textContent).toEqual('your cart is currently empty');
      expect(button).toBeTruthy();
      expect(button.nativeElement['disabled']).toBe(true);
    });

    it('has list of cart items in cart', async () => {
      const {component} = await setup('INVALID', populatedMockAudioStore);
      let cartItems: CartItem[] = [];

      component.cart$.pipe(take(1)).subscribe(items => {
        cartItems = items;
        // console.log('cD T cartItems: ', cartItems);
      });
      const quantity = Object.values(cartItems[0]);

      expect(cartItems.length).toEqual(6);
      expect(quantity).toEqual([2]);
    });

    it('shows correct number of product cards in UI', async () => {
      const {fixture, component} = await setup('INVALID', populatedMockAudioStore);
      const productCards = fixture.nativeElement.querySelectorAll('.product-container');

      expect(productCards.length).toEqual(6);

      let products: Product[] = [];

      component.productsInCart$.pipe().subscribe(prods => {
        products = prods;
        // console.log('cD T products: ', products);
      });
      expect(products.length).toEqual(6);

    });

    it('product card has image, title, cost and quantity', async () => {
      const {fixture} = await setup('INVALID', populatedMockAudioStore);
      const productCard = fixture.debugElement.query(By.css('.product-container'));
      // console.log('cD T product card: ', productCard);
      const image = productCard.nativeElement.querySelector('img');
      
      const els = image['src'].split('/');
      const imageTitle = els[els.length -1];
      const title = productCard.nativeElement.querySelector('.product-title-text');
      const cost = productCard.nativeElement.querySelector('.product-cost-text');

      expect(imageTitle).toEqual('image-product.jpg');
      expect(title.textContent).toEqual('XX99 Mark II Headphones');
      expect(cost.textContent).toEqual('$ 2999');
    });

    it('correctly initializes component with products and current order', async () => {
      const {component} = await setup('VALID', populatedMockAudioStore);
      spyOn(component, 'getCartProducts').and.callThrough();
      spyOn(component, 'updateLocalOrderState').and.callThrough();

      component.ngOnInit();

      expect(component.getCartProducts).toHaveBeenCalled();
      expect(component.updateLocalOrderState).toHaveBeenCalled();
      expect(component.productsInCartBS.value.length).toEqual(6);
      expect(component.productsInCartBS.value[0].slug).toEqual('xx99-mark-two-headphones');
      expect(component.productsInCartBS.value[0].count).toEqual(2);
      expect(component.currentOrderBS.value.totalItemsCount).toEqual(18);
    });

    it('bottom section has total, shipping, vat and grand total', async () => {
      const {fixture} = await setup('VALID', populatedMockAudioStore);
      const totalsLabels = fixture.nativeElement.querySelectorAll('.total-text');
      const amounts = fixture.nativeElement.querySelectorAll('.amount-text');

      expect(totalsLabels[0].textContent).toEqual('total');
      expect(totalsLabels[1].textContent).toEqual('shipping');
      expect(totalsLabels[2].textContent).toEqual('vat (included)');
      expect(totalsLabels[3].textContent).toEqual('grand total');

      expect(amounts[0].textContent).toEqual('$40,641.00');
      expect(amounts[1].textContent).toEqual('$50.00');
      expect(amounts[2].textContent).toEqual('$8,128.00');
      expect(amounts[3].textContent).toEqual('$48,819.00');
    });

    it('has continue and pay button which sets customer order in store and emits products when clicked', async () => {
      const {fixture, component} = await setup('VALID', populatedMockAudioStore);
      spyOn(component, 'handleProceed').and.callThrough();
      spyOn(component.continueAndPay, 'emit').and.callThrough();
    
      const button = fixture.debugElement.query(By.css('.checkout-button'));
      
      expect(button).toBeTruthy();
      expect(button.nativeElement.textContent).toEqual(' continue & pay ');
      expect(button.nativeElement['disabled']).toBe(false);

      button.nativeElement.click();

      expect(component.handleProceed).toHaveBeenCalled();
      expect(component.audioStore.setCustomerOrder).toHaveBeenCalled();
      expect(component.continueAndPay.emit).toHaveBeenCalledWith(component.productsInCartBS.value);
    });
  });

  // As dialog opened when NavBar ShowCart button is clicked
  describe('detail mode', async () => {

    const data: CartDialogData = {mode: CartDetailMode.DETAIL, viewportMode: ViewportMode.DESKTOP};

    it('has header text with correct number of cart items', async () => {
      const {fixture, component} = await setup('VALID', populatedMockAudioStore, data);
      const headlineText = fixture.nativeElement.querySelector('.headline-text');

      expect(component).toBeTruthy();
      expect(component.mode).toEqual('detail');
      expect(component.viewportMode).toEqual('desktop');
      expect(headlineText.textContent).toEqual('cart (18)');
    });

    // click remove all button empties cart
    it('has properly functioning remove all button and close dialog button', async () => {
      const {fixture, component} = await setup('VALID', populatedMockAudioStore, data);
      spyOn(component, 'handleRemoveAll').and.callThrough();
      spyOn(component, 'handleCloseDialog').and.callThrough();
      const removeAllButton = fixture.nativeElement.querySelector('.remove-all-button');
      const closeButton = fixture.nativeElement.querySelector('.close-button');

      expect(removeAllButton).toBeTruthy();
      expect(closeButton).toBeTruthy();

      removeAllButton.click();

      expect(component.handleRemoveAll).toHaveBeenCalled();

      closeButton.click();

      expect(component.handleCloseDialog).toHaveBeenCalled();
    });

    it('product card has working quantity management elements (3 buttons and count)', async () => {
      const {fixture, component} = await setup('VALID', populatedMockAudioStore, data);
      const decrementButton = fixture.nativeElement.querySelector('.decrement-button');
      const incrementButton = fixture.nativeElement.querySelector('.increment-button');
      const deleteButton = fixture.nativeElement.querySelector('.delete-button');
      spyOn(component, 'handleIncrementCount').and.callThrough();
      spyOn(component, 'handleRemoveItemFromCart').and.callThrough();

      expect(decrementButton).toBeTruthy();
      expect(incrementButton).toBeTruthy();
      expect(deleteButton).toBeTruthy();

      decrementButton.click();

      expect(component.handleIncrementCount).toHaveBeenCalledWith('xx99-mark-two-headphones', -1);
      
      incrementButton.click();

      expect(component.handleIncrementCount).toHaveBeenCalledWith('xx99-mark-two-headphones', 1);
      
      deleteButton.click();

      expect(component.handleRemoveItemFromCart).toHaveBeenCalledWith('xx99-mark-two-headphones');

    });

    it('has only total amount (no shipping, vat or grand total elements)', async () => {
      const {fixture} = await setup('VALID', populatedMockAudioStore, data);
      const totalsLabels = fixture.nativeElement.querySelectorAll('.total-text');
      const amounts = fixture.nativeElement.querySelectorAll('.amount-text');

      expect(totalsLabels.length).toEqual(1);
      expect(amounts.length).toEqual(1);
      expect(totalsLabels[0].textContent).toEqual('total');
      expect(amounts[0].textContent).toEqual('$40,641.00');
    });

    it('has checkout button which closes dialog which empties cart, puts items in cart and closes dialog', async () => {
      const {fixture, component} = await setup('VALID', populatedMockAudioStore, data);
      const checkoutButton = fixture.nativeElement.querySelector('.checkout-button');
      spyOn(component, 'handleProceed').and.callThrough();

      expect(checkoutButton).toBeTruthy();
      expect(checkoutButton['disabled']).toBe(false);
      expect(checkoutButton.textContent).toEqual(' checkout ');

      checkoutButton.click();

      expect(component.handleProceed).toHaveBeenCalled();
      expect(component.audioStore.removeAllCartItems).toHaveBeenCalled();
      expect(component.audioStore.addItemToCart).toHaveBeenCalledTimes(6);
    });

  });
});
