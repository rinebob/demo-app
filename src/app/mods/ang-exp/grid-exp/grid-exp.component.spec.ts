import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngExpModule } from '../ang-exp.module';
import { GridExpComponent } from './grid-exp.component';

describe('GridExpComponent', () => {
  let component: GridExpComponent;
  let fixture: ComponentFixture<GridExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridExpComponent ],
      imports: [ AngExpModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
