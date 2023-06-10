import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioModule } from '../../audio.module';
import { CartDetailComponent } from './cart-detail.component';
import { CartDetailMode } from '../../common/au-interfaces';

describe('CartDetailComponent', () => {
  let component: CartDetailComponent;
  let fixture: ComponentFixture<CartDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartDetailComponent ],
      imports: [ AudioModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // async function setup(
  //     formValidity: string,
  //   ) {
  //   await TestBed.configureTestingModule({

  //   }).compileComponents();
  // }

  // When embedded in CheckoutPage component
  describe('summary mode', () => {

    // has headline text

    // shows empty cart message if no products are in cart

    // has list of products in cart

    // shows correct number of product cards in UI

    // product card has title and cost



  });

  // As dialog opened when NavBar ShowCart button is clicked
  describe('detail mode', () => {

  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // correctly 

});
