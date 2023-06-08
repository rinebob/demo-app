import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { AudioModule } from '../../audio.module';
import { ProductPageComponent } from './product-page.component';
import { AUDIO_PRODUCTS } from '../../common/audio-mock-data';
import { of, take } from 'rxjs';
import { findComponent } from 'src/app/testing/test-utils';
import { UrlService } from '../../services/url.service';
import { Product } from '../../common/au-interfaces';
import { PRODUCT_INITIALIZER } from '../../common/au-constants';

const product = AUDIO_PRODUCTS[0];

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPageComponent ],
      imports: [ AudioModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: {data: of({product})} },
        { provide: UrlService, useValue: {previousUrl$: of('../../category')}}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders BreadcrumbPanel component', () => {
    const breadcrumb = findComponent(fixture, 'app-breadcrumb-panel');
    expect(breadcrumb).toBeTruthy();

  });

  it('retrieves product from activated route data', () => {
    let selectedProduct: Product = PRODUCT_INITIALIZER;

    component.ngOnInit();
    component.product$.pipe(take(1)).subscribe(prod => {
      selectedProduct = prod;
    });

    expect(selectedProduct).toEqual(AUDIO_PRODUCTS[0])

  });

  it('renders ProductDetail component', () => {
    const detail = findComponent(fixture, 'app-product-detail');
    expect(detail).toBeTruthy();
  });

  it('renders AlsoLikePanel component', () => {
    component.ngOnInit();
    const comp = findComponent(fixture, 'app-also-like-panel');
    expect(comp).toBeTruthy();
  });
  
  it('renders ShopPanel component', () => {
    component.ngOnInit();
    const comp = findComponent(fixture, 'app-shop-panel');
    expect(comp).toBeTruthy();
  });

  it('renders AboutPanel component', () => {
    const comp = findComponent(fixture, 'app-about-panel');
    expect(comp).toBeTruthy();
  });
});
