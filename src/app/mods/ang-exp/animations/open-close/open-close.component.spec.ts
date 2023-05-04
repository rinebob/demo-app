import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AngExpModule } from '../../ang-exp.module';
import { OpenCloseComponent } from './open-close.component';

describe('OpenCloseComponent', () => {
  let component: OpenCloseComponent;
  let fixture: ComponentFixture<OpenCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenCloseComponent ],
      imports: [
        AngExpModule,
        NoopAnimationsModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
