import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconNavBarComponent } from './icon-nav-bar.component';

describe('IconNavBarComponent', () => {
  let component: IconNavBarComponent;
  let fixture: ComponentFixture<IconNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
