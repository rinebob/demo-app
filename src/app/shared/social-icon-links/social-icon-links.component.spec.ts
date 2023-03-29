import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialIconLinksComponent } from './social-icon-links.component';

describe('SocialIconLinksComponent', () => {
  let component: SocialIconLinksComponent;
  let fixture: ComponentFixture<SocialIconLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialIconLinksComponent ]
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
