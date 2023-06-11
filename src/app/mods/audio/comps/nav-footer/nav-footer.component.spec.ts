import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { AudioModule } from '../../audio.module';
import { NavFooterComponent } from './nav-footer.component';
import { findComponent } from 'src/app/testing/test-utils';
import { FOOTER_COPYRIGHT, FOOTER_TEXT } from '../../common/au-constants';
import { AppText } from '../../common/au-interfaces';

describe('NavFooterComponent', () => {
  let component: NavFooterComponent;
  let fixture: ComponentFixture<NavFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavFooterComponent ],
      imports: [ AudioModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: {} } 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have logo and nav links component, all text and icon buttons', () => {
    const logoText = fixture.nativeElement.querySelector('.logo-text');
    const comp = findComponent(fixture, 'app-nav-links');
    const descText = fixture.nativeElement.querySelector('.description');
    const copyright = fixture.nativeElement.querySelector('.copyright');
    const fbIcon = fixture.nativeElement.querySelector('.facebook-icon');
    const twIcon = fixture.nativeElement.querySelector('.twitter-icon');
    const igIcon = fixture.nativeElement.querySelector('.instagram-icon');

    expect(logoText).toBeTruthy();
    expect(comp).toBeTruthy();
    expect(descText).toBeTruthy();
    expect(copyright).toBeTruthy();
    expect(fbIcon).toBeTruthy();
    expect(twIcon).toBeTruthy();
    expect(igIcon).toBeTruthy();
    expect(logoText.textContent).toEqual(AppText.LOGO_TEXT);
    expect(descText.textContent).toEqual(FOOTER_TEXT);
    expect(copyright.textContent).toEqual(FOOTER_COPYRIGHT);
  });
});
