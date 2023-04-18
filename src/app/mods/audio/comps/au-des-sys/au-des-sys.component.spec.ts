import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuDesSysComponent } from './au-des-sys.component';

describe('AuDesSysComponent', () => {
  let component: AuDesSysComponent;
  let fixture: ComponentFixture<AuDesSysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuDesSysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuDesSysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
