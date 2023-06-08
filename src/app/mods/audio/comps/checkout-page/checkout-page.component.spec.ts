import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { AudioModule } from '../../audio.module';
import { CheckoutPageComponent } from './checkout-page.component';
import { findComponent } from 'src/app/testing/test-utils';

describe('CheckoutPageComponent', () => {
  let component: CheckoutPageComponent;
  let fixture: ComponentFixture<CheckoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutPageComponent ],
      imports: [ AudioModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: {} } 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has BreadcrumbPanel component', () => {
    const comp = findComponent(fixture, 'app-breadcrumb-panel');

    expect(comp).toBeTruthy();
  });

  it('has title', () => {
    const title = fixture.nativeElement.querySelector('.header-text');

    expect(title).toBeTruthy();
    expect(title.textContent).toEqual('checkout');
  });

  it('has CheckoutForm component', () => {
    const comp = findComponent(fixture, 'app-checkout-form');

    expect(comp).toBeTruthy();
  });

  it('has CartDetail component', () => {
    const comp = findComponent(fixture, 'app-cart-detail');

    expect(comp).toBeTruthy();
  });
});
