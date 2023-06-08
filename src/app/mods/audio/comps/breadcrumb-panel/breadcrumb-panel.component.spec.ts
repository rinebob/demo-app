import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';

import { AudioModule } from '../../audio.module';
import { BreadcrumbPanelComponent } from './breadcrumb-panel.component';
import { HomePageComponent } from '../home-page/home-page.component';

describe('BreadcrumbPanelComponent', () => {
  let component: BreadcrumbPanelComponent;
  let fixture: ComponentFixture<BreadcrumbPanelComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcrumbPanelComponent ],
      imports: [ AudioModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: {} },
        provideRouter([
          {path: 'audio/home', component: HomePageComponent}
        ])
      ],
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(BreadcrumbPanelComponent);
    component = fixture.componentInstance;
    component.url = '/audio/home';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has a GoBack link', () => {
    const link = fixture.nativeElement.querySelector('.nav-link');

    expect(link).toBeTruthy();
  });
  
  it('navigates to prior location when link is clicked', () => {
    const navSpy = spyOn(router, 'navigateByUrl');
    const link = fixture.nativeElement.querySelector('.nav-link');

    link.click();

    expect(navSpy).toHaveBeenCalledWith(
      router.createUrlTree([component.url]), 
      jasmine.anything()
    );
    expect(navSpy.calls.mostRecent().args[0].toString()).toEqual('/audio/home');
  });
});
