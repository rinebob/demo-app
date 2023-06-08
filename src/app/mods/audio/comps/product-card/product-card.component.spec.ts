import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';

import { AudioModule } from '../../audio.module';
import { ProductCardComponent } from './product-card.component';
import { AUDIO_PRODUCT_1, AUDIO_PRODUCT_2 } from '../../common/audio-mock-data';
import { Product, ViewportMode } from '../../common/au-interfaces';
import { ProductPageComponent } from '../product-page/product-page.component';

describe('ProductCardComponent', () => {

  async function setup(viewportMode: ViewportMode, even: boolean, product: Product) {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardComponent ],
      imports: [ AudioModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: {} },
        provideRouter([
          {path: 'products/:id', component: ProductPageComponent}
        ])
      ],
    }).compileComponents();

    const router = TestBed.inject(Router);
    const fixture: ComponentFixture<ProductCardComponent> = TestBed.createComponent(ProductCardComponent);
    const component = fixture.componentInstance;
    component.product = product;
    component.viewportMode = viewportMode;
    component.even = even;
    
    fixture.detectChanges();

    return {fixture, component, router}
  }

  it('should create', async () => {
    const {component} = await setup(ViewportMode.DESKTOP, true, AUDIO_PRODUCT_1);
    expect(component).toBeTruthy();
  });

  it('has an image, headline and description', async () => {
    const {fixture, component} = await setup(ViewportMode.DESKTOP, true, AUDIO_PRODUCT_1);
    const image = fixture.debugElement.query(By.css('.product-image'));
    const headline = fixture.debugElement.query(By.css('.headline'));
    const description = fixture.nativeElement.querySelector('.description');
    const button = fixture.nativeElement.querySelector('.see-product-button');

    expect(image).toBeTruthy();
    expect(headline).toBeTruthy();
    expect(description).toBeTruthy();
    expect(button).toBeTruthy();
    expect(description.textContent).toEqual(component.product.description);
    
  });

  it('new product has status text', async () => {
    const {fixture} = await setup(ViewportMode.DESKTOP, true, AUDIO_PRODUCT_1);
    const statusText = fixture.debugElement.query(By.css('.status-text'));
    
    expect(statusText).toBeTruthy();
  });

  it('puts new products at top of list', async () => {
    const {fixture} = await setup(ViewportMode.DESKTOP, true, AUDIO_PRODUCT_1);
    const innerContainer = fixture.debugElement.query(By.css('.product-card-inner-container'));

    expect(innerContainer).toBeTruthy();
    expect(innerContainer.classes['order-one']).toEqual(true);
  });

  it('puts old products at bottom of list', async () => {
    const {fixture} = await setup(ViewportMode.DESKTOP, true, AUDIO_PRODUCT_2);
    const innerContainer = fixture.debugElement.query(By.css('.product-card-inner-container'));

    expect(innerContainer).toBeTruthy();
    expect(innerContainer.classes['order-one'] === undefined).toBe(true);
  });

  it('navigates to product page when see product button clicked', async () => {
    const {fixture, component, router} = await setup(ViewportMode.DESKTOP, true, AUDIO_PRODUCT_1);
    const navSpy = spyOn(router, 'navigateByUrl');
    const button = fixture.nativeElement.querySelector('.see-product-button');

    button.click();

    expect(navSpy).toHaveBeenCalledWith(
      router.createUrlTree(['../../products', component.product.slug]), 
      jasmine.anything()
    );
    expect(navSpy.calls.mostRecent().args[0].toString()).toEqual('/products/yx1-earphones');
  });
});
