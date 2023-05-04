import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../shared.module';
import { ThreeWayToggleComponent } from './three-way-toggle.component';

describe('ThreeWayToggleComponent', () => {
  let component: ThreeWayToggleComponent;
  let fixture: ComponentFixture<ThreeWayToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeWayToggleComponent ],
      imports: [ SharedModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeWayToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
