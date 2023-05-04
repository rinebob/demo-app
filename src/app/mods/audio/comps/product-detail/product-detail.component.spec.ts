import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioModule } from '../../audio.module';
import { ProductDetailComponent } from './product-detail.component';
import { AUDIO_PRODUCTS } from '../../common/audio-mock-data';

const product = AUDIO_PRODUCTS[0];

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      imports: [ AudioModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    component.product = product;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
