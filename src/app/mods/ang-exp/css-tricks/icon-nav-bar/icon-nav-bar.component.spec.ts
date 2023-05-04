import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngExpModule } from '../../ang-exp.module';
import { IconNavBarComponent } from './icon-nav-bar.component';
import { ICON_NAV_BAR_LINKS } from 'src/app/common/constants';

describe('IconNavBarComponent', () => {
  let component: IconNavBarComponent;
  let fixture: ComponentFixture<IconNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconNavBarComponent ],
      imports: [AngExpModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconNavBarComponent);
    component = fixture.componentInstance;
    component.navBarLinks = ICON_NAV_BAR_LINKS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
