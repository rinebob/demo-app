import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelsViewComponent } from './parcels-view.component';

describe('ParcelsViewComponent', () => {
  let component: ParcelsViewComponent;
  let fixture: ComponentFixture<ParcelsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelsViewComponent ]
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
