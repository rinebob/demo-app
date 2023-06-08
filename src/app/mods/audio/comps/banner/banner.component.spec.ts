import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { AudioModule } from '../../audio.module';
import { BannerComponent } from './banner.component';
import { findElByClass } from 'src/app/testing/test-utils';
import { AppText } from '../../common/au-interfaces';
import { ProductPageComponent } from '../product-page/product-page.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
      imports: [ 
        AudioModule,
      ],
      providers: [ 
        { provide: ActivatedRoute, useValue: {} },
        provideRouter([
          {path: 'products/:id', component: ProductPageComponent}
        ])
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has status text', () => {
    const text = findElByClass(fixture, '.status-text');

    // console.log('bC T status text: ', text);

    expect(text.nativeElement.textContent).toEqual('new product');
  });

  it('has headline', () => {
    const text = findElByClass(fixture, '.headline');

    expect(text.nativeElement.textContent).toEqual('xx 99 mark ii headphones');

  });

  it('has description', () => {
    const text = findElByClass(fixture, '.description');

    expect(text.nativeElement.textContent.length).toEqual(106);
  });

  it('navigates to product when link clicked', () => {
    const navSpy = spyOn(router, 'navigateByUrl');
    const link = fixture.nativeElement.querySelector('.see-product-button')

    expect(link).toBeTruthy();
    
    link.click()

    expect(navSpy).toHaveBeenCalledWith(
      router.createUrlTree(['../products', AppText.XX99_HEADPHONES_SLUG]), 
      jasmine.anything()
    );
    expect(navSpy.calls.mostRecent().args[0].toString()).toEqual('/products/xx99-mark-two-headphones');
  });
});
