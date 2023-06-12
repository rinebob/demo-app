import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AudioModule } from '../../audio.module';
import { ThankYouComponent } from './thank-you.component';
import { CartDialogData } from '../../common/au-interfaces';
import { PRODUCTS_IN_CART, MOCK_ORDER } from '../../common/audio-mock-data'
import { take } from 'rxjs';

const dialogData: CartDialogData = {
  order: MOCK_ORDER,
  products: [...PRODUCTS_IN_CART],
}

describe('ThankYouComponent', () => {
  let component: ThankYouComponent;
  let fixture: ComponentFixture<ThankYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankYouComponent ],
      imports: [ AudioModule ],
      providers: [
        {provide: MatDialogRef, useValue: {close: () => {}}},
        {provide: MAT_DIALOG_DATA, useValue: dialogData},
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has thank you and confirmation messages', () => {
    const headerText = fixture.nativeElement.querySelector('.header-text');
    const messageText = fixture.nativeElement.querySelector('.message-text');

    expect(headerText.textContent).toEqual('thank you for your order');
    expect(messageText.textContent).toEqual('You will receive an email confirmation shortly.');
  });

  it('shows first product in list of products purchased', () => {
    spyOn(component, 'initializeVars').and.callThrough();
    const image = fixture.nativeElement.querySelector('img');
    const productNameText = fixture.nativeElement.querySelector('.product-name-text');
    const priceText = fixture.nativeElement.querySelector('.price-text');

    component.initializeVars();

    let numProducts = 0;
    
    component.products$.pipe().subscribe(products => {
      numProducts = products.length;
    });

    expect(image).toBeTruthy();
    expect(productNameText.textContent).toEqual('YX1 Wireless Earphones');
    expect(priceText.textContent).toEqual('$599.00');
    expect(numProducts).toEqual(1);
    expect(component.numOtherItems).toEqual(16);
    expect(component.showOtherItemsButtonText).toEqual('and 16 other item(s)');
    expect(component.initializeVars).toHaveBeenCalled();
  });

  it('clicking other items button shows remaining purchased products', () => {
    const button = fixture.nativeElement.querySelector('.show-other-items-button');
    let numProducts = 0;
    
    expect(button.textContent).toEqual(' and 16 other item(s) ');
    
    button.click();
    fixture.detectChanges();
    
    component.products$.pipe(take(1)).subscribe(products => {
      numProducts = products.length;
    });
    
    expect(numProducts).toEqual(6);
    expect(button.textContent).toEqual(' view less ');
  });

  it('shows purchase grand total amount', () => {
    const grandTotalText = fixture.nativeElement.querySelector('.grand-total-text');
    const totalCostText = fixture.nativeElement.querySelector('.total-cost-text');

    expect(grandTotalText.textContent).toEqual('grand total');
    expect(totalCostText.textContent).toEqual('$48,819.00');

  });

  it('clicking back to home button closes dialog', () => {
    spyOn(component, 'handleCloseDialog').and.callThrough();
    spyOn(component.dialogRef, 'close').and.callThrough();
    const button = fixture.nativeElement.querySelector('.back-to-home-button');

    button.click();

    expect(component.handleCloseDialog).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
