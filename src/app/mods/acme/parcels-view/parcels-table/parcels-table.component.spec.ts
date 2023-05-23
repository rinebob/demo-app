import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelsTableComponent } from './parcels-table.component';

describe('ParcelsTableComponent', () => {
  let component: ParcelsTableComponent;
  let fixture: ComponentFixture<ParcelsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcelsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
