import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

import { AngExpModule } from './ang-exp.module';
import { AngExpComponent } from './ang-exp.component';

describe('AngExpComponent', () => {
  let component: AngExpComponent;
  let fixture: ComponentFixture<AngExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngExpComponent ],
      imports: [ 
        AngExpModule,
        NoopAnimationsModule,
       ],
       providers: [ 
        { provide: ActivatedRoute, useValue: {} } 
      ],
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
