import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatThemeComponent } from './mat-theme.component';

describe('MatThemeComponent', () => {
  let component: MatThemeComponent;
  let fixture: ComponentFixture<MatThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatThemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
