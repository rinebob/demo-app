import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AudioModule } from '../../audio.module';
import { NavLinksComponent } from './nav-links.component';
import { Router, provideRouter } from '@angular/router';
import { CategoryPageComponent } from '../category-page/category-page.component';
import { NAV_BUTTONS } from '../../common/au-constants';

describe('NavLinksComponent', () => {
  let component: NavLinksComponent;
  let fixture: ComponentFixture<NavLinksComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavLinksComponent ],
      imports: [
        AudioModule,
        RouterTestingModule.withRoutes([]) 
      ],
      providers: [ 
        provideRouter([
          {path: 'category/:id', component: CategoryPageComponent}
        ])
      ],
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NavLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have four links (home headphones speakers earphones)', () => {
    const links = fixture.nativeElement.querySelectorAll('.nav-link');

    // console.log('nL T links: ', links);

    expect(links.length).toEqual(4);
    expect(links[0].text).toEqual(' home ');
    expect(links[1].text).toEqual(' headphones ');
    expect(links[2].text).toEqual(' speakers ');
    expect(links[3].text).toEqual(' earphones ');
    
  });
  
  it('should redirect user when link clicked', () => {
    const navSpy = spyOn(router, 'navigateByUrl');
    const links = fixture.nativeElement.querySelectorAll('.nav-link');

    links[0].click();

    expect(navSpy).toHaveBeenCalledWith(
      router.createUrlTree(['category/', NAV_BUTTONS[0].link]), 
      jasmine.anything()
    );
    expect(navSpy.calls.mostRecent().args[0].toString()).toEqual('/category/home');

    links[1].click();

    expect(navSpy).toHaveBeenCalledWith(
      router.createUrlTree(['category/', NAV_BUTTONS[1].link]), 
      jasmine.anything()
    );
    expect(navSpy.calls.mostRecent().args[0].toString()).toEqual('/category/headphones');
  });

});
