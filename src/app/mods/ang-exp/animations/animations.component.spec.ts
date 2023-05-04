import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AngExpModule } from '../ang-exp.module';
import { AnimationsComponent } from './animations.component';

describe('AnimationsComponent', () => {
  let component: AnimationsComponent;
  let fixture: ComponentFixture<AnimationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimationsComponent ],
      imports: [ 
        AngExpModule,
        NoopAnimationsModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
