import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsModule } from './charts.module';
import { ChartsViewComponent } from './charts-view.component';

describe('ChartsViewComponent', () => {
  let component: ChartsViewComponent;
  let fixture: ComponentFixture<ChartsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsViewComponent ],
      imports: [ ChartsModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
