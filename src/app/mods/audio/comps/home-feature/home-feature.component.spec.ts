import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';

import { AudioModule } from '../../audio.module';
import { HomeFeatureComponent } from './home-feature.component';
import { By } from '@angular/platform-browser';
import { ProductPageComponent } from '../product-page/product-page.component';

describe('HomeFeatureComponent', () => {
  let component: HomeFeatureComponent;
  let fixture: ComponentFixture<HomeFeatureComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFeatureComponent ],
      imports: [ AudioModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: {} },
        provideRouter([
          {path: 'products/:id', component: ProductPageComponent}
        ])
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFeatureComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has three feature panels', () => {
    const panels = fixture.debugElement.queryAll(By.css('.feature'));

    expect(panels.length).toEqual(3);
  });

  it('navigates to correct product when see product button clicked', () => {
    const navSpy = spyOn(router, 'navigateByUrl');
    const button = fixture.nativeElement.querySelector('.see-product-button');
    
    button.click();

    expect(navSpy.calls.mostRecent().args[0].toString()).toEqual('/products/zx9-speaker');
  });
});
