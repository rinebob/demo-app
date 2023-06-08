import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioModule } from '../../audio.module';
import { CartDetailComponent } from './cart-detail.component';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // correctly 

});
