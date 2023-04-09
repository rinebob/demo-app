import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeWayToggleComponent } from './three-way-toggle.component';

describe('ThreeWayToggleComponent', () => {
  let component: ThreeWayToggleComponent;
  let fixture: ComponentFixture<ThreeWayToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeWayToggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeWayToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
