import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComingSoonSaComponent } from './coming-soon-sa.component';

describe('ComingSoonSaComponent', () => {
  let component: ComingSoonSaComponent;
  let fixture: ComponentFixture<ComingSoonSaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ComingSoonSaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComingSoonSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
