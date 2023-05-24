import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesSearchComponent } from './vehicles-search.component';

describe('VehiclesSearchComponent', () => {
  let component: VehiclesSearchComponent;
  let fixture: ComponentFixture<VehiclesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
