import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleViewComponent } from './vehicles-view.component';

describe('VehicleViewComponent', () => {
  let component: VehicleViewComponent;
  let fixture: ComponentFixture<VehicleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
