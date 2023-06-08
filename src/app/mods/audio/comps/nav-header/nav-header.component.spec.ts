import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { AudioModule } from '../../audio.module';
import { NavHeaderComponent } from './nav-header.component';
import { By } from '@angular/platform-browser';
import { findComponent } from 'src/app/testing/test-utils';
import { Component } from '@angular/core';

// Test host component so we can set screen width and test responsive features
@Component({
  template: `<app-nav-header [style.width]="screenWidth"></app-nav-header>`,
})
class TestHostComponent {
  screenWidth = '1500px';
}

describe('NavHeader component responsive', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let navHeader: NavHeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavHeaderComponent, TestHostComponent ],
      imports: [ AudioModule ],
      providers: [
        {provide: ActivatedRoute, useValue: {}}
      ],
      teardown: { destroyAfterEach: false }
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    navHeader = fixture.nativeElement.querySelector('app-nav-header');
    fixture.detectChanges();

  });

    it('should create', () => {
      expect(navHeader).toBeTruthy();
    });
  
    // this doesn't work.  Component is in DOM with display: none
    it('has menu icon button in tablet or mobile screen size', () => {
      const menuButton = fixture.nativeElement.querySelector('.open-menu-button');

      expect(menuButton).toBeTruthy();
    });
});


describe('NavHeaderComponent desktop', () => {
  let component: NavHeaderComponent;
  let fixture: ComponentFixture<NavHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavHeaderComponent ],
      imports: [ AudioModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: {} } 
      ],
      teardown: { destroyAfterEach: false },
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has logo, shopping cart icon button and nav links component', () => {
    const logo = fixture.debugElement.query(By.css('.header-title'));
    const navLinks = findComponent(fixture, 'app-nav-links');
    const showCartButton = fixture.debugElement.query(By.css('.show-cart-button'));

    expect(logo).toBeTruthy();
    expect(navLinks).toBeTruthy();
    expect(showCartButton).toBeTruthy();
    
  });
  
  it('shopping cart button click should open cart detail dialog', () => {
    spyOn(component, 'handleShowShoppingCart');
    const showCartButton = fixture.nativeElement.querySelector('.show-cart-button');

    expect(showCartButton).toBeTruthy();
    
    showCartButton.click();

    expect(component.handleShowShoppingCart).toHaveBeenCalled();
    
  });
});
