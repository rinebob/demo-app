import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { BehaviorSubject, of, take } from 'rxjs';

import { AudioModule } from '../../audio.module';
import { CategoryPageComponent } from './category-page.component';
import { AUDIO_PRODUCTS, ORDERED_AUDIO_PRODUCTS } from '../../common/audio-mock-data';
import { findAllComponents, findComponent, findEl } from 'src/app/testing/test-utils';
import { Product } from '../../common/au-interfaces';

describe('CategoryPageComponent', () => {
  let component: CategoryPageComponent;
  let fixture: ComponentFixture<CategoryPageComponent>;
  let activatedRouteMock = {
    paramMap: new BehaviorSubject<ParamMap>(
      convertToParamMap({id: "headphones"})
    ),
    data: of({products: [...AUDIO_PRODUCTS]}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPageComponent ],
      imports: [ AudioModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: activatedRouteMock } 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has title element', () => {
    const title = findEl(fixture, 'title');
    const text = title.nativeElement.textContent;

    expect(title).toBeTruthy();
    expect(text).toEqual('headphones');
  });
  
  it('has ShopPanel component', () => {
    const shopPanel = findComponent(fixture, 'app-shop-panel')
    expect(shopPanel).toBeTruthy();

  });
  
  it('has AboutPanel component', () => {
    const aboutPanel = findComponent(fixture, 'app-about-panel')
    expect(aboutPanel).toBeTruthy();
  });
  
  it('gets category from route params', () => {
    let category = '';
    component.category$.pipe(take(1)).subscribe(cat => {
      category = cat;
    });

    expect(category).toEqual('headphones');

  });

  it('sets orderedProducts from route data', () => {
    spyOn(component, 'setNewProductsFirst').and.callThrough();
    let products: Product[] = [];

    component.ngOnInit();
    component.products$.pipe(take(1)).subscribe(prods => {
      products = [...prods];
    });

    expect(component.setNewProductsFirst).toHaveBeenCalledWith(AUDIO_PRODUCTS)
    expect(products).toEqual(ORDERED_AUDIO_PRODUCTS);
  });

  it('shows the correct number of product detail cards', () => {
    component.ngOnInit();
    const comps = findAllComponents(fixture, 'app-product-card');

    expect(comps.length).toEqual(6);
  });
});
