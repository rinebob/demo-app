import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BezierModule } from './bezier.module'
import { BezierComponent } from './bezier.component';

describe('BezierComponent', () => {
  let component: BezierComponent;
  let fixture: ComponentFixture<BezierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BezierComponent ],
      imports: [ BezierModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BezierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
