import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngExpComponent } from './ang-exp.component';

describe('AngExpComponent', () => {
  let component: AngExpComponent;
  let fixture: ComponentFixture<AngExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngExpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
