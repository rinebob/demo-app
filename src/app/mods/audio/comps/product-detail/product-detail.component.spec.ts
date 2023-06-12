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

  it('has image, status text, headline, description and price', () => {
    const image = fixture.nativeElement.querySelector('img');
    const statusText = fixture.nativeElement.querySelector('.status-text');
    const headline = fixture.nativeElement.querySelector('.headline');
    const description = fixture.nativeElement.querySelector('.description');
    const price = fixture.nativeElement.querySelector('.price');
    
    expect(image).toBeTruthy();
    expect(statusText.textContent).toEqual('new product');
    expect(headline.textContent).toEqual('YX1 Wireless Earphones');
    expect(description.textContent.length).toEqual(206);
    expect(price.textContent).toEqual('$ 599');
  });

  it('has working increment and decrement count buttons', () => {
    const decrementButton = fixture.nativeElement.querySelector('.decrement-button');
    const incrementButton = fixture.nativeElement.querySelector('.increment-button');
    const countText = fixture.nativeElement.querySelector('.count');

    expect(decrementButton).toBeTruthy();
    expect(incrementButton).toBeTruthy();
    expect(countText.textContent).toEqual('1');
    
    incrementButton.click();
    fixture.detectChanges();
    
    expect(countText.textContent).toEqual('2');

    decrementButton.click();
    fixture.detectChanges();
    
    expect(countText.textContent).toEqual('1');
  });

  it('has features and in the box text elements', () => {
    const headlines = fixture.nativeElement.querySelectorAll('.headline-text');
    const description = fixture.nativeElement.querySelector('.description-text');
    const contents = fixture.nativeElement.querySelectorAll('.contents-text');
    
    expect(headlines[0].textContent).toEqual('features');
    expect(headlines[1].textContent).toEqual('in the box');
    expect(description.textContent.length).toEqual(734);
    expect(contents.length).toEqual(5);
    expect(contents[0].textContent).toEqual('2 x Earphone unit ');
    
  });

  it('has a main image and three detail images', () => {
    const images = fixture.nativeElement.querySelectorAll('img');

    expect(images.length).toEqual(4);
  });
});
