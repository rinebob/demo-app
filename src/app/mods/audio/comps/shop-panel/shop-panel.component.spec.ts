import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { AudioModule } from '../../audio.module';
import { ShopPanelComponent } from './shop-panel.component';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { CategoryPageComponent } from '../category-page/category-page.component';

const mockDialogRef = {
  close(category: string) {}
}

describe('ShopPanelComponent', () => {
  async function setup(url: string, mode?: boolean) {
    await TestBed.configureTestingModule({
      declarations: [ ShopPanelComponent ],
      imports: [ AudioModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef },
        provideRouter([
          {path: 'category/:id', component: CategoryPageComponent}
        ])
      ],
    }).compileComponents();
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(ShopPanelComponent);
    const component = fixture.componentInstance;
    component.url = url;
    component.dialogMode = mode ? mode : false;

    return ({router, fixture, component});
  };

  it('should create', async () => {
    const {component} = await setup('../category');

    // console.log('sP T comp.url: ', component.url);

    expect(component).toBeTruthy();
    expect(component.url).toEqual('../category');
  });

  // Regular mode
  it('has images, text and buttons for all categories', async () => {
    const {fixture, component} = await setup('../category');
    component.ngOnInit();
    fixture.detectChanges();

    const images = fixture.debugElement.queryAll(By.css('.image-container'));
    const textEls = fixture.debugElement.queryAll(By.css('.category-text'));
    const buttons = fixture.debugElement.queryAll(By.css('.shop-text'));

    expect(images.length).toEqual(3);
    expect(textEls.length).toEqual(3);
    expect(buttons.length).toEqual(3);
  });

  it('navigates to clicked category', async () => {
    const {fixture, component, router} = await setup('../category');
    const navSpy = spyOn(router, 'navigateByUrl');
    component.ngOnInit();
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('.shop-text');
    
    expect(button).toBeTruthy();

    button.click();

    expect(navSpy.calls.mostRecent().args[0].toString()).toEqual('/category/headphones');
  });

  // Dialog mode
  it('has shop button for each category', async () => {
    const {fixture, component} = await setup('./audio', true);
    component.ngOnInit();
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('.shop-text'));
    // console.log('sP T buttons: ', buttons);

    expect(buttons.length).toEqual(4);
  });

  it('closes dialog and sets the correct category when shop button clicked', async () => {
    const {fixture, component} = await setup('./audio', true);
    spyOn(component, 'handleNavigation');

    component.ngOnInit();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.shop-text');
    button.click();

    expect(component.handleNavigation).toHaveBeenCalledWith('headphones');
  });

  it('navigates back to home when back to home button clicked', async () => {
    const {fixture, component} = await setup('./audio', true);
    spyOn(component, 'handleNavigation');
    
    component.ngOnInit();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.back-button');
    button.click();

    expect(component.handleNavigation).toHaveBeenCalledWith('home');
  });
});
