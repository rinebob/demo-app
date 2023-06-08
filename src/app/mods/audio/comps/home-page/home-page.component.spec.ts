import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { AudioModule } from '../../audio.module';
import { HomePageComponent } from './home-page.component';
import { findComponent } from 'src/app/testing/test-utils';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      imports: [ AudioModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: {} } 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders Banner component', () => {
    const banner = findComponent(fixture, 'app-banner')
    expect(banner).toBeTruthy();

  });
  
  it('renders ShopPanel component', () => {
    const shopPanel = findComponent(fixture, 'app-shop-panel')
    expect(shopPanel).toBeTruthy();

  });
  
  it('renders HomeFeature component', () => {
    const homeFeature = findComponent(fixture, 'app-home-feature')
    expect(homeFeature).toBeTruthy();
  });
  
  it('renders AboutPanel component', () => {
    const aboutPanel = findComponent(fixture, 'app-about-panel')
    expect(aboutPanel).toBeTruthy();
  });
  
});
