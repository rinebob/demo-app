import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AngExpModule } from '../ang-exp.module';
import { CssTricksComponent } from './css-tricks.component';

describe('CssTricksComponent', () => {
  let component: CssTricksComponent;
  let fixture: ComponentFixture<CssTricksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CssTricksComponent ],
      imports: [
        AngExpModule,
        NoopAnimationsModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssTricksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
