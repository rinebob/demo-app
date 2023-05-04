import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../shared.module';
import { SocialIconLinksComponent } from './social-icon-links.component';

describe('SocialIconLinksComponent', () => {
  let component: SocialIconLinksComponent;
  let fixture: ComponentFixture<SocialIconLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialIconLinksComponent ],
      imports: [ SharedModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialIconLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
