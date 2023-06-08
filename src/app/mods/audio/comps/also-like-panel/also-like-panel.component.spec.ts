import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';

import { AudioModule } from '../../audio.module';
import { AlsoLikePanelComponent } from './also-like-panel.component';
import { AUDIO_PRODUCT_1 } from '../../common/audio-mock-data';
import { ProductPageComponent } from '../product-page/product-page.component';
import { By } from '@angular/platform-browser';

fdescribe('AlsoLikePanelComponent', () => {
  let component: AlsoLikePanelComponent;
  let fixture: ComponentFixture<AlsoLikePanelComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlsoLikePanelComponent ],
      imports: [ AudioModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: {} },
        provideRouter([
          {path: 'products/:id', component: ProductPageComponent}
        ])
      ],
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AlsoLikePanelComponent);
    component = fixture.componentInstance;
    component.products = AUDIO_PRODUCT_1.others;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has headline text', () => {
    const text = fixture.nativeElement.querySelector('.headline-text');

    expect(text.textContent).toEqual('you may also like');
  });

  it('has correct number of products', () => {
    expect(component.products.length).toEqual(3);
    expect(component.products[0].name).toEqual('XX99 Mark I');

    const headlines = fixture.nativeElement.querySelectorAll('.product-headline-text');

    expect(headlines.length).toEqual(3);
    expect(headlines[0].textContent).toEqual('XX99 Mark I');
  });

  fit('clicking a product button navigates to product page', () => {
    const navSpy = spyOn(router, 'navigateByUrl');
    const button = fixture.nativeElement.querySelector('.see-product-button');

    expect(button).toBeTruthy();

    button.click();

    expect(navSpy).toHaveBeenCalledWith(
      router.createUrlTree(['/products/xx99-mark-one-headphones']), 
      jasmine.anything()
    );
    expect(navSpy.calls.mostRecent().args[0].toString()).toEqual('/products/xx99-mark-one-headphones');

    
  });

});
