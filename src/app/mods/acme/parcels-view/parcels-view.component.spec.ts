import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelsViewComponent } from './parcels-view.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ParcelsViewComponent', () => {
  let component: ParcelsViewComponent;
  let fixture: ComponentFixture<ParcelsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelsViewComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcelsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
