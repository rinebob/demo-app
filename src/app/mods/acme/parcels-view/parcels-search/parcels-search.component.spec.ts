import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelsSearchComponent } from './parcels-search.component';

describe('ParcelsSearchComponent', () => {
  let component: ParcelsSearchComponent;
  let fixture: ComponentFixture<ParcelsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelsSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcelsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
